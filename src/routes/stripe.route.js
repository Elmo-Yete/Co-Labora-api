const express = require("express");
const router = express.Router();
const {
  payment,
  create,
  onBoard,
  delAcc,
} = require("../usecases/stripe.usecases");

router.post("/", async (req, res) => {
  try {
    const pay = await payment(req.body);
    res.status(201);
    res.json({
      success: true,
      data: pay,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: ("error de back", err.message),
    });
  }
});

router.post("/create", async (req, res) => {
  try {
    const account = await create();
    console.log(res);
    res.status(200);
    res.json({
      succes: true,
      data: account,
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      succes: false,
      message: ("error de back", error.message),
    });
  }
});

router.post("/onBoard", async (req, res) => {
  try {
    const link = await onBoard(req.body.id);
    if (link) {
      res.status(200);
      res.json({
        succes: true,
        data: link.url,
      });
    }
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      succes: false,
      message: ("error del back", error.message),
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await delAcc(req.params.id);
    if (deleted.deleted) {
      res.status(200);
      return deleted;
    }
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      succes: false,
      message: ("error en la ruta de stripe", error.message),
    });
  }
});

module.exports = router;
