import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const specieSchema = new Schema({
  idPadre : {type : 'String', required : false},
  scientificName : {type : 'String', required : false},
  description : {type : 'String', required : false},
});

export default mongoose.model('Specie', specieSchema);
