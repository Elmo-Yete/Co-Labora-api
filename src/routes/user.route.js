const express = require("express");
const router = express.Router();
const {
  create,
  login,
  getUsers,
  patchDescription,
  deleteUser,
  getUserById
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

router.get("/", async (req, res) => {
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

router.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const users = await getUserById(id);
    res.status(200);
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

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("esta es la request de delete", userId);
    const users = await deleteUser(userId);
    res.status(200);
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

router.patch("/", async (req, res) => {
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
