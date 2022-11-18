import axios from "axios";

class SubscriptionController {
    async store(req, res) {
        const { plan } = req.body.order;
        const { name, email, hash, phone_number, address, documents } = req.body.from;
        const [areaCode, number] = [phone_number.slice(0, 2), phone_number.slice(2)];
        const { type, creditCard } = req.body.payment_data;
        const { holder } = creditCard;
        const [holderAreaCode, holderNumber] = [holder.phone_number.slice(0, 2), holder.phone_number.slice(2)];

        const options = {
            method: 'POST',
            url: `${process.env.PAGSEGURO_API}/pre-approvals`,
            params: { email: process.env.PAGSEGURO_EMAIL, token: process.env.PAGSEGURO_TOKEN },
            headers: {
                Accept: 'application/vnd.pagseguro.com.br.v1+json;charset=ISO-8859-1',
                'Content-Type': 'application/json'
            },
            data: {
                plan: plan,
                reference: 'TESTE',
                sender: {
                    name: name,
                    email: email,
                    hash: hash,
                    phone: { areaCode: areaCode, number: number },
                    address: {
                        street: address.street,
                        number: address.number,
                        complement: address.complement,
                        district: address.district,
                        city: address.city,
                        state: address.state,
                        country: address.country,
                        postalCode: address.postalCode.replace(/\D/g, '')
                    },
                    documents: [documents]
                },
                paymentMethod: {
                    type: type,
                    creditCard: {
                        token: creditCard.token,
                        holder: {
                            name: holder.name,
                            birthDate: holder.birthDate,
                            documents: [holder.documents],
                            phone: { areaCode: holderAreaCode, number: holderNumber },
                            billingAddress: {
                                street: holder.billingAddress.street,
                                number: holder.billingAddress.number,
                                complement: holder.billingAddress.complement,
                                district: holder.billingAddress.district,
                                city: holder.billingAddress.city,
                                state: holder.billingAddress.state,
                                country: holder.billingAddress.country,
                                postalCode: holder.billingAddress.postalCode.replace(/\D/g, '')
                            }
                        }
                    }
                }
            }
        };

        try {
            const response = await axios(options);
            return res.json(response.data);
        } catch (error) {
            const { status } = error.response;
            switch (status) {
                case 400:
                    console.error({
                        title: "Bad Request",
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

export default new SubscriptionController();
