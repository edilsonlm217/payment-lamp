import axios from "axios";
import { stringify } from 'qs';

class CardTokenController {
    async store(req, res) {
        try {
            const { PAGSEGURO_EMAIL, PAGSEGURO_TOKEN } = process.env;

            const options = {
                method: 'POST',
                url: process.env.PAGSEGURO_GEN_CARD_TOKEN_URL,
                params: { email: PAGSEGURO_EMAIL, token: PAGSEGURO_TOKEN },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Accept: 'application/json'
                },
                data: stringify(req.body)
            };

            const response = await axios(options);
            return res.json(response.data);
        } catch (error) {
            console.error({
                title: "Internal Server Error",
                detail: `Something unexpected happened when requesting from ${req.url}`,
                status: 500,
            });

            return res.status(500).json({
                title: "Internal Server Error",
                detail: "The request made by the Server to PagSeguro has failed",
                status: 500,
            });
        }
    }
}

export default new CardTokenController();
