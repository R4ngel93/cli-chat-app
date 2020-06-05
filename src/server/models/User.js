/* Set up */
const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

/* Create Schema */
const UserSchema = new Schema({
  nickname: {
    type: String,
    trim: true,
    required: true,
    maxlength: 20,
    unique: 1
  },
  password: {
    type: String,
    trim: true
  }
});

/* Methods */
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;
      next();
    } catch (error) {
      return next(error);
    }
  }
});

UserSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

/* Export model */
module.exports = model('User', UserSchema, 'clichat-users');