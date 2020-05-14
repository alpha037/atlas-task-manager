// Require mongoose module
const mongoose = require('mongoose');

// Require validator module
const validator = require('validator');

// Define task schema
const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Define task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
