import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const sightingSchema = new Schema({
  catalogNumber: {type: 'String', required: false},
  recordNumber: {type: 'String', required: false},
  organismName: {type: 'String', required: false},
  scientificName: {type: 'String', required: false},
  genus: {type: 'String', required: false},
  subFamily: {type: 'String', required: false},
  family: {type: 'String', required: false},
  order: {type: 'String', required: false},
  class: {type: 'String', required: false},
  phylum: {type: 'String', required: false},
  kingdom: {type: 'String', required: false},
  locality: {type: 'String', required: false},
  sector:{type: 'String', required: false},
  stateProvince: {type: 'String', required: false},
  country: {type: 'String', required: false},
  tribu: {type: 'String', required: false},
  subtribu: {type: 'String', required: false},
  habitat: {type: 'String', required: false},
  decimalLatitud: {type: 'String', required: false},
  decimalLongitud: {type: 'String', required: false},
  evenDate: {type: 'String', required: false },
  species_homepage: {type: 'String', required: false},
  references: {type: 'String', required: false},
  fotografia: {type: 'String', required: false},
  vista: {type: 'String', required: false},
  sex: {type: 'String', required: false},
  comentario: {type: 'String', required: false},
  recorderBy: {type: 'String', required: false},
  emailAutor: {type: 'String', required: false},
});

export default mongoose.model('Sighting', sightingSchema);
