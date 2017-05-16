import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  _id : {type: 'String', required : false},
  decrypToken: { type: 'String', required: true },
  name: { type: 'String', required: true },
  title: { type: 'String', required: true },
  state: { type: 'String', required: true },
  species: []
});

export default mongoose.model('Application', applicationSchema);
