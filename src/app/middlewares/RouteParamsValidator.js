import CreatePlan from '../validators/CreatePlan';
import GenCardToken from '../validators/GenCardToken';
import SubscribePlan from '../validators/SubscribePlan';

const routesToValidate = [
  {
    url: "/plans",
    method: "POST",
    validator: CreatePlan
  },
  {
    url: "/generate-token",
    method: "POST",
    validator: GenCardToken
  },
  {
    url: "/subscription",
    method: "POST",
    validator: SubscribePlan
  },
];

export default async function (req, res, next) {
  const match = routesToValidate.filter(route =>
    route.url === req.url &&
    route.method === req.method
  )[0];

  if (!match) { next() }

  try {
    const { validator } = match;
    await validator.validate(req.body, { strict: true });
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
