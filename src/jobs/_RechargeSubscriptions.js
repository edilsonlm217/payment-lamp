import { ChargeCardAtPagSeguro, RegisterChargeLog } from '../database/procedures';

import Subscription from '../app/schemas/Subscription';

export default async function RechargeSubscriptions(job) {
    // Este JOB roda todos os dias.
    // Este JOB pega todas as assinturas marcadas com should_retry_charge = TRUE
    // e cobra novamente.

    const subscriptions = await Subscription.find({
        should_retry_charge: true,
        recharge_attempts: {
            $lt: 3
        }
    });

    for (const sub of subscriptions) {
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

            await RegisterChargeLog({
                subscription_id: sub._id,
                status: response.data.status,
                plan_description: sub.plan_description,
                plan_value: sub.plan_value,
                card: credit_card,
            });

            sub.recharge_attempts = sub.recharge_attempts + 1;
            await sub.save();

            if (sub.recharge_attempts === 3) {
                sub.should_retry_charge = false;
                sub.recharge_attempts = 0;
                sub.status = 'inactive';
                await sub.save();
            }
        } catch (error) {
            const { error_messages } = error.response.data;
            console.error(error_messages);
        }
    }
}