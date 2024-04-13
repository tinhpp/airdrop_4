const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.plugin(require('mongoose-slug-generator'));

const noteSchema = new Schema({
  title: { type: String, required: true },
  image: {type: String },
  slug: { type: String, slug: "title", unique: true },
  content: { type: String },
  page: { type: Schema.Types.ObjectId, ref: 'Page' },
  isPublic: { type: Boolean, default: false }
}, {
  timestamps: true
});

noteSchema.plugin(require('mongoose-delete'), { deletedBy: true, deletedAt: true, overrideMethods: true })

module.exports = mongoose.model('Note', noteSchema);