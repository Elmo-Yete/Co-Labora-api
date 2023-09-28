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
  const user = await User.find();
  return user;
};

const patchDescription = async (data) => {
  const { id, update } = data;
  // console.log("esto es el id del usuario", id);
  // console.log("esta es la descripcion", update);
  const description = await User.findByIdAndUpdate(id, { description: update });
  return description;
};

const deleteUser = async (id) => {
  const deleted = await User.findByIdAndDelete(id);
};

module.exports = { create, login, getUsers, patchDescription, deleteUser };
