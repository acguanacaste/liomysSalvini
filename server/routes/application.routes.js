import { Router } from 'express';
import * as ApplicationController from '../controllers/application.controller';

const router = new Router();

//Get all Aplications
router.route('/Aplicaciones').get(ApplicationController.getApplications);

//Get a app by name
router.route('/Aplicaciones/:appName').get(ApplicationController.getApplication);

//Au
router.route('/Aplicaciones/CheckState/:appName').get(ApplicationController.checkAppState);

export default router;
