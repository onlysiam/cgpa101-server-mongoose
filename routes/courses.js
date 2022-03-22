const { Course } = require("../models/course");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const courses = await Course.find().select("-__v").sort("name");
  res.send(courses);
});

router.post("/", async (req, res) => {
  let course = new Course({ name: req.body.name });
  course = await course.save();

  res.send(course);
});

router.put("/:id", async (req, res) => {
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  res.send(course);
});

router.delete("/:id", async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id);

  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  res.send(course);
});

router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id).select("-__v");

  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  res.send(course);
});

module.exports = router;
