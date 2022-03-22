const { Course } = require("../models/course");
const { Semester } = require("../models/semester");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const semesters = await Semester.find().populate("user").sort("name");
  res.send(semesters);
});

router.post("/", async (req, res) => {
  const name = req.body.name;
  const user = req.body.user;
  let semester = new Semester({ name, user });
  semester = await semester.save();

  await User.findByIdAndUpdate(
    user,
    { $push: { semesters: semester._id } },
    {
      new: true,
    }
  );
  res.send(semester);
});

router.put("/:id", async (req, res) => {
  const semester = await Semester.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!semester)
    return res
      .status(404)
      .send("The semester with the given ID was not found.");

  res.send(semester);
});

router.delete("/:id", async (req, res) => {
  const semester = await Semester.findByIdAndRemove(req.params.id);

  if (!semester)
    return res
      .status(404)
      .send("The semester with the given ID was not found.");

  res.send(semester);
});

router.get("/:id", async (req, res) => {
  const semester = await Semester.findById(req.params.id).select("-__v");

  if (!semester)
    return res
      .status(404)
      .send("The semester with the given ID was not found.");

  res.send(semester);
});

module.exports = router;
