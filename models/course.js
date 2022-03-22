const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  credit: {
    type: Number,
    required: true,
  },
  gradeLetter: {
    type: String,
    required: true,
  },
  gradePoint: {
    type: Number,
    required: true,
  },
});

const Course = mongoose.model("Course", courseSchema);

exports.courseSchema = courseSchema;
exports.Course = Course;
