import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  name: { type: 'String', required: true },
  decrypToken: { type: 'String', required: true },
  description: { type: 'String', required: true },
  state: { type: 'String', required: false },
  species: []
});

export default mongoose.model('Application', applicationSchema);
