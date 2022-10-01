import { Router } from 'express';
import eventRoutes from '../routes/eventRoutes';
import sportRoutes from '../routes/sportRoutes';

const router = Router();

router.use('/sports', sportRoutes);
router.use('/events', eventRoutes);

export default router;
