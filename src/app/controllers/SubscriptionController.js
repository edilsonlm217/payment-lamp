import { startOfDay, add, addHours } from 'date-fns';
import {
    ChargeCardAtPagSeguro,
    CreateSubscriptionInDatabase,
    RegisterChargeLog,
    DeleteSubscriptionById,
    FindSubscriptionByCNPJ
} from '../../database/procedures';

class SubscriptionController {
    async store(req, res) {
        const { selection, cnpj, credit_card } = req.body;

        try {
            const sub = await FindSubscriptionByCNPJ(cnpj);

            if (sub) {
                return res.status(400).json({
                    message: "This CNPJ is already attached to a subscription"
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: "Failed to [FindSubscriptionByCNPJ]"
            });
        }

        try {
            const response = await ChargeCardAtPagSeguro(
                selection.description,
                selection.value,
                credit_card,
                'INITIAL'
            );

            const chargeIsDeclined = response.data.status === 'DECLINED';

            if (chargeIsDeclined) {
                return res.status(400).json(response.data.payment_response);
            }

            try {
                const today = new Date();
                const nextCharge = add(addHours(startOfDay(today), 12), { months: 1 });
                const subscription = await CreateSubscriptionInDatabase({
                    cnpj: cnpj,
                    status: response.data.status === 'AUTHORIZED' ? 'pending' : 'active',
                    plan_description: selection.description,
                    plan_value: selection.value,
                    card: credit_card,
                    next_charge: nextCharge,
                });

                try {
                    await RegisterChargeLog({
                        subscription_id: subscription._id,
                        status: response.data.status,
                        plan_description: subscription.plan_description,
                        plan_value: subscription.plan_value,
                        card: credit_card,
                    });
                } catch (error) {
                    await DeleteSubscriptionById(subscription._id);
                    return res.status(500).json({
                        message: "Failed to [RegisterChargeLog]"
                    })
                }

                return res.json(subscription);
            } catch (error) {
                return res.status(500).json({
                    message: "Failed to [CreateSubscriptionInDatabase]"
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: 'Failed to register [ChargeCardAtPagSeguro]'
            });
        }
    }
}

export default new SubscriptionController();
