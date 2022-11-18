import axios from "axios";

function AderirPlanoPagSeguro(params) {
    const { plan } = params.order;
    const { name, email, hash, phone_number, address, documents } = params.from;
    const { type, creditCard } = params.payment_data;
    const { holder } = creditCard;

    const areaCode = phone_number.slice(0, 2);
    const number = phone_number.slice(2);
    const holderAreaCode = holder.phone_number.slice(0, 2);
    const holderNumber = holder.phone_number.slice(2);

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

    return axios(options);
}

export { AderirPlanoPagSeguro }