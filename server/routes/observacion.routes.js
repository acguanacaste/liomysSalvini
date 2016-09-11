import { Router } from 'express';
import * as ObservacionController from '../controllers/observacion.controller';
const router = new Router();

// Get all Posts
router.route('/observacion').get(ObservacionController.getObservacion);
export default router;
