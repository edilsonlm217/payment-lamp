import { AderirPlanoPagSeguro } from "../pagseguro/procedures";
import Plan from '../schemas/Plan';
class SubscriptionController {
    async store(req, res) {
        const { plan: planCode } = req.body.order;
        const plan = await Plan.findOne({ planCode: planCode });

        const planExists = plan === null ? false : true;
        const isPlanAbleToGetSubscriptions = plan?.currentUses < plan?.maxUses;

        if (!planExists || !isPlanAbleToGetSubscriptions) {
            return res.status(400).json({
                title: "Bad Request",
                detail: "Plan does not exist or has reached maxUses",
                status: 400,
            });
        }

        try {
            const response = await AderirPlanoPagSeguro(req.body);
            plan.currentUses = plan.currentUses + 1;
            await plan.save();
            return res.json(response.data);
        } catch (error) {
            const { status } = error.response;
            switch (status) {
                case 400:
                    console.error({
                        title: "Bad Request",
                        detail: "The request is propably missing either email or token",
                        status: 400,
                    });
                    break;

                default:
                    console.error({
                        title: "Internal Server Error",
                        detail: `Something unexpected happened when requesting from ${options.url}`,
                        status: 500,
                    });
                    break;
            }

            return res.status(500).json({
                title: "Internal Server Error",
                detail: "The request made by the Server to PagSeguro is missing some required info or is timed-out",
                status: 500,
            });
        }

    }
}

export default new SubscriptionController();
