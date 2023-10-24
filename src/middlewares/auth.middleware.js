const jwt = require("../lib/jwt.lib");
require("dotenv").config();
const createError = require("http-errors");

const auth = (req, res, next) => {
  try {
    const authorization = req.headers.authorization || "";
    const token = authorization.replace("Bearer ", "");
    const isVerified = jwt.verify(token, "colabora");
    if (!isVerified.id === req.body.userCreator) {
      throw createError(401, "You are not logged!"); // ? podria ser un 401
    }
    next();
  } catch (error) {
    res.status(401);
    res.json({
      succes: false,
      message: ("error en el auth", error),
    });
  }
};

module.exports = auth;
