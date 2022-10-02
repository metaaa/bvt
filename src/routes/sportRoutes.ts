import { Router } from 'express';
import SportController from '@modules/sports/controllers/SportController';

const sportRouter: Router = Router();
const sportController = new SportController();

sportRouter.get('/', sportController.index);
sportRouter.get('/all', sportController.listAll);

export default sportRouter;
