const express = require("express");
const router = express.Router();
const { getComments, deleteComment } = require("../usecases/comments.usecases");

router.get("/comments", async (req, res) => {
  try {
    const comment = await getComments();
    res.status(201);
    res.json({
      success: true,
      data: comment,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      succes: false,
      message: err.message,
    });
  }
});

router.delete("/deleteComment", async (req, res) => {
  try {
    const comment = await deleteComment();
    res.status(201);
    res.json({
      success: true,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      succes: false,
      message: err.message,
    });
  }
});

module.exports = router;
