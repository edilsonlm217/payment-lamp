import axios from "axios";
import convert from 'xml-js';

import Plan from "../schemas/Plan";

class PlanController {
    async store(req, res) {
        const { name, period, amountPerPayment, maxUses } = req.body;

        const plan = await Plan.create({
            name,
            period,
            amountPerPayment,
            maxUses
        });

        const options = {
            method: 'POST',
            url: `${process.env.PAGSEGURO_API}/pre-approvals/request/`,
            params: {
                email: process.env.PAGSEGURO_EMAIL,
                token: process.env.PAGSEGURO_TOKEN
            },
            headers: {
                Accept: 'application/vnd.pagseguro.com.br.v3+xml;charset=ISO-8859-1',
                'Content-Type': 'application/xml'
            },
            data: `<?xml version="1.0" encoding="ISO-8859-1" standalone="yes"?>\n<preApprovalRequest>\n<preApproval>\n<name>${name}</name>\n<reference>${plan.id}</reference>\n<charge>AUTO</charge>\n<period>${period}</period>\n<amountPerPayment>${amountPerPayment}</amountPerPayment>\n</preApproval>\n<maxUses>${maxUses}</maxUses>\n</preApprovalRequest>`
        };

        try {
            const response = await axios(options);
            const data = convert.xml2js(response.data, { compact: true, spaces: 4 });
            const planCode = data.preApprovalRequest.code._text;
            plan.planCode = planCode;
            await plan.save();
        } catch (error) {
            const { status } = error.response;
            switch (status) {
                case 400:
                    console.error({
                        title: "Content-Type is missing in Header",
                        detail: "The request is propably missing Content-Type",
                        status: 400,
                    });
                    break;

                case 401:
                    console.error({
                        title: "Unauthorized",
                        detail: "The request is propably missing either email or token",
                        status: 401,
                    });
                    break;

                case 404:
                    console.error({
                        title: "Not Foud",
                        detail: "The request method is wrong or url does not exists",
                        status: 404,
                        instance: "This problema is a backend issue"
                    });
                    break;

                case 406:
                    console.error({
                        title: "Content-Type is missing",
                        detail: "The request is propably missing Content-Type",
                        status: 406,
                    });
                    break;

                case 408:
                    console.error({
                        title: "Request Timeout",
                        detail: "The request is timed-out",
                        status: 408,
                    });
                    break;

                default:
                    console.error({
                        title: "Internal Server Error",
                        detail: `Something unexpected happened when requesting from ${options.url}`,
                        status: 500,
                    });
                    break;
            }

            return res.status(500).json({
                title: "Internal Server Error",
                detail: "The request made by the Server to PagSeguro is missing some required info or is timed-out",
                status: 500,
            });
        }

        return res.json(plan);
    }
}

export default new PlanController();
