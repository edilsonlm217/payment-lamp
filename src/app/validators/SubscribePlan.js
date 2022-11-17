import { object, string } from 'yup';

const SubscribePlan = object({
    from: object({
        name: string().required(),
        email: string().email().required(),
        hash: string().required(),
        phone_number: string().required().test(
            'is-valid',
            'Invalid phone number',
            value => (value + "").match(/^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/)
        ),
        address: object({
            street: string().required(),
            number: string().required(),
            district: string().required(),
            city: string().required(),
            state: string().required(),
            country: string().required(),
            postalCode: string().required().test(
                'is-valid',
                'Invalid postalCode',
                value => (value + "").match(/^[0-9]{5}-[0-9]{3}$/)
            )
        }),
        documents: object({
            type: string().required(),
            value: string().required().test(
                'is-valid',
                'Invalid CPF',
                value => (value + "").match(/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/)
            )
        })
    }),
    payment_data: object({
        type: string().required(),
        creditCard: object({
            token: string().required(),
            holder: object({
                name: string().required(),
                birthDate: string().required(),
                documents: object({
                    type: string().required(),
                    value: string().required().test(
                        'is-valid',
                        'Invalid CPF',
                        value => (value + "").match(/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/)
                    )
                }),
                phone_number: string().required().test(
                    'is-valid',
                    'Invalid phone number',
                    value => (value + "").match(/^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/)
                ),
                billingAddress: object({
                    street: string().required(),
                    number: string().required(),
                    district: string().required(),
                    city: string().required(),
                    state: string().required(),
                    country: string().required(),
                    postalCode: string().required().test(
                        'is-valid',
                        'Invalid postalCode',
                        value => (value + "").match(/^[0-9]{5}-[0-9]{3}$/)
                    )
                })
            })
        })
    }),
    order: object({
        plan: string().required()
    })
});

export default SubscribePlan;