import { Router } from 'express';
import * as TaxonomyController from '../controllers/taxonomy.controller';

const router = new Router();

router.route('/Taxonomias').get(TaxonomyController.getTaxonomy);
export default router;
