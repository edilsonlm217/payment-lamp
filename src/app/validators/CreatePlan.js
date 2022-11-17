import { object, string, number } from 'yup';

const CreatePlan = object({
    name: string().required(),
    period: string().required(),
    amountPerPayment: number().required().positive().test(
        'is-decimal',
        'Invalid decimal on amountPerPayment',
        value => (value + "").match(/^\d*\.{1}\d*$/)),
    maxUses: number().required().positive(),
    description: string().required(),
});

export default CreatePlan;