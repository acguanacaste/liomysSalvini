import { Router } from 'express';
import * as SightingController from '../controllers/sighting.controller';
const router = new Router();

// Get all Sightings
router.route('/Observaciones').get(SightingController.getSightings);

//Get one sighting by catalogNumber
router.route('/Observaciones/:request').get(SightingController.getSighting);

// Get sightings by specie
router.route('/Observaciones/especie/:specie').get(SightingController.getSightingsSpecie);

export default router;
