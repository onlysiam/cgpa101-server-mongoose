const { User, validate } = require("../models/user");
const { Semester } = require("../models/semester");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find().populate("semester").sort("name");
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });
  user = await user.save();

  res.send(user);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone,
    },
    { new: true }
  );

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(user);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(user);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-__v");

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(user);
});

module.exports = router;
