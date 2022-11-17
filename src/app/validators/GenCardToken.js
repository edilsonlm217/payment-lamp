import { object, string } from 'yup';

const GenCardToken = object({
    sessionId: string().required(),
    amount: string().required(),
    cardNumber: string().required(),
    cardBrand: string().required(),
    cardCvv: string().required(),
    cardExpirationMonth: string().required(),
    cardExpirationYear: string().required(),
});

export default GenCardToken;