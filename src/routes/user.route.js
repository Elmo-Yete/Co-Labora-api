const express = require("express");
const router = express.Router();
const {
  create,
  getUsers,
  patchUser,
  deleteUser,
  getUserById,
} = require("../usecases/user.usecase");
const auth = require("../middlewares/auth.middleware");

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

router.get("/", auth, async (req, res) => {
  try {
    const users = await getUsers();
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

router.get("/:id", auth, async (req, res) => {
  const id = req.params.id;
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

router.delete("/:id", auth, async (req, res) => {
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

router.patch("/", auth, async (req, res) => {
  console.log("este es el body de la request", req.body);
  try {
    const user = await patchUser(req.body);
    res.status(200);
    res.json({
      success: true,
      message: "User updated successfully",
      data: user.description,
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
