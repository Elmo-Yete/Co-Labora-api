const express = require("express");
const router = express.Router();
const { getRating, deleteRating } = require("../usecases/ratings.usecases");
router.get("/raitings", async (req, res) => {
  try {
    const raiting = await getRating();
    res.status(201);
    res.json({
      success: true,
      data: raiting,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      succes: false,
      message: err.message,
    });
  }
});

router.delete("/deleteRate", async (req, res) => {
  try {
    const raiting = await getRating(req.body);
    res.status(201);
    res.json({
      success: true,
      message: "rating deleted",
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
