import { Router } from 'express';
import * as SpecieController from '../controllers/specie.controller';

const router = new Router();

router.route('/Especies').get(SpecieController.getSpecie);
export default router;
