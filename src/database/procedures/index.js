import axios from 'axios';

import Subscription from '../../app/schemas/Subscription';
import ChargeLog from '../../app/schemas/PagSeguro/ChargeLog';
import PagSeguroApp from '../../app/schemas/PagSeguroApp';

const PagSeguroToken = process.env.PAGSEGURO_TOKEN;

const ChargeApiUrl = `${process.env.PAGSEGURO_API}/charges`;
const CreateAppApiUrl = `${process.env.PAGSEGURO_API}/oauth2/application`;

const config = {
    headers: {
        Authorization: `Bearer ${PagSeguroToken}`
    }
}

export function ChargeCardAtPagSeguro(description, value, card, chargeType) {
    return axios.post(ChargeApiUrl, {
        description: description,
        amount: {
            value: value,
            currency: "BRL"
        },
        payment_method: {
            type: "CREDIT_CARD",
            installments: 1,
            capture: false,
            card: {
                number: card.number,
                exp_month: card.exp_month,
                exp_year: card.exp_year,
                security_code: card.security_code,
                holder: {
                    name: card.holder_name
                }
            }
        },
        recurring: {
            type: chargeType
        }
    }, config);
}

export function CreateSubscriptionInDatabase(params) {
    const { cnpj, charger_id, status, plan_description, plan_value, card, next_charge } = params;
    return Subscription.create({
        cnpj,
        charger_id,
        status,
        plan_description,
        plan_value,
        card_number: card.number,
        card_exp_month: card.exp_month,
        card_exp_year: card.exp_year,
        card_security_code: card.security_code,
        card_holder_name: card.holder_name,
        next_charge,
    });
}

export function RegisterChargeLog(params) {
    const { subscription_id, status, plan_description, plan_value, card } = params;
    return ChargeLog.create({
        subscription_id,
        status,
        plan_description,
        plan_value,
        card_number: card.number,
        card_exp_month: card.exp_month,
        card_exp_year: card.exp_year,
        card_security_code: card.security_code,
        card_holder_name: card.holder_name,
    });
}

export function DeleteSubscriptionById(id) {
    return ChargeLog.findByIdAndDelete(id.toString());
}

export function FindSubscriptionByCNPJ(cnpj) {
    return Subscription.findOne({
        cnpj: cnpj,
    });
}

export function CreateApplicationAtPagSeguro() {
    const appName = process.env.PAGSEGURO_APPLICATION_NAME;
    return axios.post(CreateAppApiUrl, { name: appName }, config);
}

export function CreatePagSegurpAppOnDatabase(data) {
    return PagSeguroApp.create(data);
}

export function GetPagSeguroApp() {
    return PagSeguroApp.findOne();
}