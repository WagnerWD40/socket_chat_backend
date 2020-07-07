import { Router }  from 'express';

import UserController from './controllers/UserController';
import LoginController from './controllers/LoginController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.del);

routes.post('/login', LoginController.store);

export default routes;