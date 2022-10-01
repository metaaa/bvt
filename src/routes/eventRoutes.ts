import {Router} from 'express';
import EventController from "@modules/events/controllers/EventController";

const eventRouter: Router = Router();
const eventController = new EventController();

eventRouter.get('/:sportId', eventController.index);

export default eventRouter;
