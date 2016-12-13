import { Router } from 'express';
import * as SpecieController from '../controllers/specie.controller';

const router = new Router();

//Get all species
router.route('/Especies').get(SpecieController.getSpecies);

//Get one specie by scientificName
router.route('/Especies/:request').get(SpecieController.getSpecie);

export default router;
