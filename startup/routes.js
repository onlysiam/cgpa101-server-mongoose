const express = require("express");
const courses = require("../routes/courses");
const semesters = require("../routes/semesters");
const users = require("../routes/users");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/semesters", semesters);
  app.use("/api/courses", courses);
  app.use("/api/users", users);
};
