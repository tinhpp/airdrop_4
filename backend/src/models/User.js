const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.plugin(require('mongoose-slug-generator'));

const userSchema = new Schema({
  socialId: { type: String, indexed: true, unique: true, require: true },
  name: { type: String, required: true },
  slug: { type: String, slug: "name", unique: true },
  avatar: { type: String },
  provider: { type: String, required: true }
}, {
  timestamps: true
});

userSchema.plugin(require('mongoose-delete'), { deletedBy: true, deletedAt: true, overrideMethods: true })

const User = mongoose.model('User', userSchema);

module.exports = User;
