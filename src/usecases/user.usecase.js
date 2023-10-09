const bcrypt = require("bcrypt");
const createError = require("http-errors");
const jwt = require("../lib/jwt.lib");
const User = require("../models/user.model");

const login = async (email, textPassword) => {
  const user = await User.findOne({ email });
  if (!user) throw createError(401, "Invalid data");
  const isValidPassword = await bcrypt.compare(textPassword, user.password);
  if (!isValidPassword) throw createError(401, "Invalid data");
  const token = jwt.sign({ email: user.email, id: user._id });
  return token;
};

const create = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  data.password = hashedPassword;
  const register = await User.create(data);
  return register;
};

const getUsers = async () => {
  const user = await User.find() .populate("notifications", {
    author: 1,
    content: 1
  }).populate("userImage", {
    imagesUrls: 1
  }).populate("documents", {
    imagesUrls: 1
  })
  return user;
};

const patchUser = async (data) => {
  const id = data.params.id;
  const update = data.body;
  const email = update.email;
  email ? delete update.email : update
  let password = data.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  update.password = hashedPassword;
  const user = await User.findByIdAndUpdate(id, update);
  return user;
};

const getUserById = async (id) => {
  const user = await User.findById(id)
  .populate("notifications", {
    author: 1,
    content: 1
  }).populate("userImage", {
    imagesUrls: 1
  }).populate("documents", {
    imagesUrls: 1
  })
  return user
}

const deleteUser = async (id) => {
  const deleted = await User.findByIdAndDelete(id);
};

module.exports = { create, login, getUsers, patchUser, deleteUser, getUserById };
