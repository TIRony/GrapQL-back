const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registerValidation,
  loginValidation,
} = require("../validators/authValidator");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.errors[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  const user = new User(req.body);

  try {
    const savedUser = await user.save();
    res.send({ user: savedUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.login = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.errors[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or password is wrong");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  const token = generateToken(user._id);
  res.header("auth-token", token).send(token);
};
