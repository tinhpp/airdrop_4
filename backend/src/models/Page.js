const mongoose = require('mongoose');
const { Schema } = mongoose;

const pageSchema = new Schema({
  title: { type: String },
  image: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true
});

pageSchema.plugin(require('mongoose-delete'), { deletedBy: true, deletedAt: true, overrideMethods: true })


module.exports = mongoose.model('Page', pageSchema);