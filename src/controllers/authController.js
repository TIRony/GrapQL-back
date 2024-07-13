const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registerValidation,
  loginValidation,
} = require("../validators/authValidator");
const generateToken = require("../utils/generateToken");

exports.register = async (data) => {
  const { error } = registerValidation(data);
  if (error) throw new Error(error.details[0].message);

  const emailExist = await User.findOne({ email: data.email });
  if (emailExist) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = new User({ ...data, password: hashedPassword });
  const savedUser = await user.save();

  const token = generateToken(savedUser._id);
  return {
    token,
    user: { id: savedUser._id, name: savedUser.name, email: savedUser.email },
  };
};

exports.login = async (email, password) => {
  const { error } = loginValidation({ email, password });
  if (error) throw new Error(error.details[0].message);

  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email");

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) throw new Error("Invalid password");

  const token = generateToken(user._id);
  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

exports.getUserById = async (id) => {
  return await User.findById(id);
};

exports.getAllUsers = async () => {
  return await User.find();
};

exports.updateUser = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, { new: true });
  if (!user) throw new Error("User not found");
  return user;
};

exports.deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error("User not found");
  return user;
};
