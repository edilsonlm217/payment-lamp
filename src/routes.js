import { Router } from 'express';

import PlanController from './app/controllers/PlanController';
import SessionController from './app/controllers/SessionController';
import CardTokenController from './app/controllers/CardTokenController';
import SubscriptionController from './app/controllers/SubscriptionController';

import RouteParamValidator from './app/middlewares/RouteParamsValidator';

const routes = new Router();

routes.get('/plans', PlanController.index);
routes.post('/plans', RouteParamValidator, PlanController.store);

routes.post('/session', SessionController.store);

routes.post('/generate-token', RouteParamValidator, CardTokenController.store);

routes.post('/subscription', RouteParamValidator, SubscriptionController.store);


export default routes;
