import { Router } from 'express';
import * as SightingController from '../controllers/sighting.controller';
const router = new Router();

// Get all Posts
router.route('/Observaciones').get(SightingController.getSighting);
export default router;
