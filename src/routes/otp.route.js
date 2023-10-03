const express = require("express");
const router = express.Router();

const { verify } = require("../usecases/otpVerify.usecases");

router.post("/", async (req, res) => {
  try {
    const ver = await verify(req.body);
    if (ver) {
      res.status(201);
      res.json({
        success: true,
        data: ver,
      });
      res.end();
    } else {
      return;
    }
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
