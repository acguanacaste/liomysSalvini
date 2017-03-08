import { Router } from 'express';
import * as TaxonomyController from '../controllers/taxonomy.controller';

const router = new Router();

// Get all taxonomies
router.route('/Taxonomias').get(TaxonomyController.getTaxonomys);

// Get one Taxonomy by taxonomyname
router.route('/Taxonomias/:request').get(TaxonomyController.getTaxonomy);

// Get Taxonomies by type
router.route('/Taxonomias/tipoTaxonomia/:taxonomyType').get(TaxonomyController.getTaxonomybyType);


export default router;
