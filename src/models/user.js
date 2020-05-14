// Require mongoose module
const mongoose = require('mongoose');

// Require validator module
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

// Define your schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      default: 'Walter White',
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) throw new Error('Age must be a positive value!');
      },
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value))
          throw new Error('This is not a valid Email ID!');
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(pass) {
        if (pass.toLowerCase().includes('password'))
          throw new Error("Password cannot contain 'password'!");
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

// Setup tasks virtual field
userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner',
});

/**
 * Setup pre/post hooks for middleware
 *  */

userSchema.pre('save', async function (next) {
  if (this.isModified('password'))
    this.password = await bcrypt.hash(this.password, 8);

  next();
});

userSchema.pre('remove', async function (next) {
  await Task.deleteMany({ owner: this._id });

  next();
});

// generate auth token
userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);

  this.tokens = this.tokens.concat({ token });
  await this.save();

  return token;
};

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Unable to login!');

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error('Unable to login!');

  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
