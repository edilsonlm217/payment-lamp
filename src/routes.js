import { Router } from 'express';

import CardTokenController from './app/controllers/CardTokenController';
import PlanController from './app/controllers/PlanController';
import SessionController from './app/controllers/SessionController';

import RouteParamValidator from './app/middlewares/RouteParamsValidator';

const routes = new Router();

routes.use(RouteParamValidator);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);

routes.post('/session', SessionController.store);

routes.post('/generate-token', CardTokenController.store)


export default routes;
