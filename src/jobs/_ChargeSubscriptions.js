import { isToday } from 'date-fns';
import { ChargeCardAtPagSeguro, RegisterChargeLog } from '../database/procedures';

import Subscription from '../app/schemas/Subscription';

export default async function ChargeSubscriptions(job) {
    // Este JOB roda todos os dias.
    // Esse JOB é responsável por pegar todas as assinaturas ATIVAS que estão
    // vencendo no dia e fazer a cobrança dela junto a PAGSEGURO

    const subscriptions = await Subscription.find({ status: "active" });

    for (const sub of subscriptions) {
        const isExpiringToday = isToday(sub.next_charge);

        if (isExpiringToday) {
            try {
                const credit_card = {
                    number: sub.card_number,
                    exp_month: sub.card_exp_month,
                    exp_year: sub.card_exp_year,
                    security_code: sub.card_security_code,
                    holder_name: sub.card_holder_name
                };

                const response = await ChargeCardAtPagSeguro(
                    sub.plan_description,
                    sub.plan_value,
                    credit_card,
                    'SUBSEQUENT'
                );

                const isChargeDeclined = response.data.status === 'DECLINED';

                if (isChargeDeclined) {
                    sub.should_retry_charge = true;
                    await sub.save();
                }

                await RegisterChargeLog({
                    subscription_id: sub._id,
                    status: response.data.status,
                    plan_description: sub.plan_description,
                    plan_value: sub.plan_value,
                    card: credit_card,
                });
            } catch (error) {
                const { error_messages } = error.response.data;
                console.error(error_messages);
            }
        }
    }
}