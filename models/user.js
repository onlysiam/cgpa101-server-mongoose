const Joi = require("joi");
const Semester = require("./semester");
const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    semesters: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Semester",
    },
  })
);

function validateCustomer(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    username: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateCustomer;
