import { Router } from 'express';
import EventController from '@modules/events/controllers/EventController';

const eventRouter: Router = Router();
const eventController = new EventController();

eventRouter.get('/', eventController.listAll)
eventRouter.get('/:eventId', eventController.index)

export default eventRouter;
