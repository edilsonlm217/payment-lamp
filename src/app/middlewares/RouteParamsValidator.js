import { object, string, number } from 'yup';

export default async function (req, res, next) {
    if (req.url === '/plans' && req.method === 'POST') {
        try {
            await CreatePlanParams.validate(req.body, { strict: true });
            next();
        } catch (error) {
            const { message } = error;
            return res.status(400).json({
                title: "Invalid params",
                detail: message,
                status: 400,
            });
        }
    }

    if (req.url === '/plans' && req.method === 'GET') {
        next();
    }
}

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
