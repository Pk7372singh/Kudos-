const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  kudosReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Kudos' }],
  kudosSent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Kudos' }],
});

module.exports = mongoose.model('User', UserSchema);
