import axios from "axios";
import convert from 'xml-js';

class SessionController {
    async store(_req, res) {
        const { PAGSEGURO_EMAIL, PAGSEGURO_TOKEN } = process.env;

        const options = {
            method: 'POST',
            url: `${process.env.PAGSEGURO_API}/v2/sessions`,
            params: { email: PAGSEGURO_EMAIL, token: PAGSEGURO_TOKEN }
        };

        try {
            const response = await axios(options);
            const data = JSON.parse(convert.xml2json(response.data, { compact: true }));
            const sessionId = data.session.id._text
            return res.json({ session: sessionId });
        } catch (error) {
            const { status } = error.response;
            switch (status) {
                case 401:
                    console.error({
                        title: "Unauthorized",
                        detail: "The request is propably missing either email or token",
                        status: 401,
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
    }
}

export default new SessionController();
