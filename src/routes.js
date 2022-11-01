import { Router } from 'express';

import SubscriptionController from './app/controllers/SubscriptionController'

const routes = new Router();

routes.post('/subscription', SubscriptionController.store);

export default routes;
