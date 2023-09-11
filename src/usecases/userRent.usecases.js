const bcrypt = require("bcrypt");
const createError = require("http-errors");
const jwt = require("../lib/jwt.lib");
const userRent = require("../models/userRent.model");

const login = async (email, textPassword) => {
  const user = await userRent.findOne({ email });
  if (!user) throw createError(401, "Invalid data");
  const isValidPassword = await bcrypt.compare(textPassword, user.password);
  if (!isValidPassword) throw createError(401, "Invalid data");
  const token = jwt.sign({ email: user.email, id: user._id });
  return token;
};

const create = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  data.password = hashedPassword;
  const user = userRent.create(data);
  return user;
};