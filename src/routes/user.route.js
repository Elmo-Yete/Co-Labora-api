const express = require("express");
const router = express.Router();
const {
  create,
  login,
  getUsers,
  patchDescription,
  deleteUser,
} = require("../usecases/user.usecase");

router.post("/", async (req, res) => {
  try {
    const user = await create(req.body);
    res.status(201);
    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/getUsers", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(201);
    res.json({
      success: true,
      data: users,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

router.delete("/deleteUser", async (req, res) => {
  try {
    console.log("esta es la request de delete", req.query);
    const users = await deleteUser(req.query.id);
    res.status(201);
    res.json({
      success: true,
      message: "user deleted",
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

router.patch("/description", async (req, res) => {
  try {
    const user = await patchDescription(req.body);
    res.status(201);
    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
