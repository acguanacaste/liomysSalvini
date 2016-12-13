import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taxonomySchema = new Schema({

  taxonomyType : {type : 'String', required: false},
  taxonomyName : {type : 'String', required : false},
  description : {type : 'String', required : false},
  taxonomyPadre : {type : 'String', required : false},
});

export default mongoose.model('Taxonomy', taxonomySchema);
