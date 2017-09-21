import { Router } from 'express';
import * as SightingController from '../controllers/sighting.controller';
const router = new Router();

// Get all Sightings
router.route('/Observaciones').get(SightingController.getSightings);

//Get one sighting by catalogNumber
router.route('/Observaciones/:request').get(SightingController.getSighting);

// Get sightings by specie
router.route('/Observaciones/especie/:specie').get(SightingController.getSightingsSpecie);

//GEt sighting by genus
router.route('/Observaciones/genero/:genus').get(SightingController.getSightingsGenus);

//Get sightings by family
router.route('/Observaciones/familia/:family').get(SightingController.getSightingsFamily);

// Get sightings with token
router.route('/:token/:appName/Observaciones').get(SightingController.getSightingsbyToken);

//run csv
router.route('/Observaciones/csv').post(SightingController.runCsv);

export default router;
