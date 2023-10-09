const express = require("express");
const router = express.Router();
const { getRating, deleteRating, createRating } = require("../usecases/ratings.usecases");
const auth = require("../middlewares/auth.middleware")

router.post("/", auth, async (req, res) => {
  try {
    req.body.date = new Date()
    const rating = await createRating(req.body)
    res.status(201)
    res.json({
      success: true,
      data: rating
    })
  }catch(err){
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message,
    });
  };
});

router.get("/", async (req, res) => {
  try {
    const rating = await getRating();
    res.status(201);
    res.json({
      success: true,
      data: rating,
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
    console.log("aca ando")
    const rating = await deleteRating(req.params.id);
    res.status(200);
    res.json({
      success: true,
      message: "rating deleted",
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
