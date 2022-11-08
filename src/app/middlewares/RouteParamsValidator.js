import { object, string, number } from 'yup';

export default async function (req, res, next) {
    if (req.url === "/plans" && req.method === "POST") {
        try {
            await CreatePlanParams.validate(req.body, { strict: true });
            next();
            return;
        } catch (error) {
            const { message } = error;
            return res.status(400).json({
                title: "Invalid params",
                detail: message,
                status: 400,
            });
        }
    }


    if (req.url === "/generate-token" && req.method === "POST") {
        try {
            await GenCardTokenParams.validate(req.body, { strict: true });
            next();
            return;
        } catch (error) {
            const { message } = error;
            return res.status(400).json({
                title: "Invalid params",
                detail: message,
                status: 400,
            });
        }
    }

    next();
}

const GenCardTokenParams = object({
    sessionId: string().required(),
    amount: string().required(),
    cardNumber: string().required(),
    cardBrand: string().required(),
    cardCvv: string().required(),
    cardExpirationMonth: string().required(),
    cardExpirationYear: string().required(),
});

const CreatePlanParams = object({
    name: string().required(),
    period: string().required(),
    amountPerPayment: number().required().positive().test(
        'is-decimal',
        'Invalid decimal on amountPerPayment',
        value => (value + "").match(/^\d*\.{1}\d*$/)),
    maxUses: number().required().positive(),
    description: string().required(),
});
