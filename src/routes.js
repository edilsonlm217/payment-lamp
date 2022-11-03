import { Router } from 'express';
import PlanController from './app/controllers/PlanController';

import RouteParamValidator from './app/middlewares/RouteParamsValidator';

const routes = new Router();

routes.use(RouteParamValidator);
routes.post('/plans', PlanController.store)


export default routes;
