const express = require("express");
const router = express.Router();
const {
  createProperty,
  deleteProperty,
  getProperties,
  getPropertiesById,
  patchProperty,
} = require("../usecases/property.usecases");
const auth = require("../middlewares/auth.middleware");

router.post("/", auth, async (req, res) => {
  try {
    const user = await createProperty(req.body);
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

router.get("/:id", auth, async (req, res) => {
  try {
    const reservation = await getPropertiesById(req.params.id);
    res.status(200);
    res.json({
      success: true,
      data: reservation,
    });
  } catch (err) {
    res.status(404);
    res.json({
      success: false,
      message: "Property has been not found",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const reservations = await getProperties();
    res.status(200);
    res.json({
      success: true,
      data: reservations,
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
    const property = await deleteProperty(req.params.id);
    let response = {
      status: 200,
      message: "Property has been deleted",
    };
    if (!property) {
      response.status = 404;
      response.message = "Property not found";
    }
    res.status(response.status);
    res.json({
      success: true,
      message: response.message,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const property = await patchProperty(req);
    res.status(200);
    res.json({
      success: true,
      message: "Property updated successfully",
      data: property,
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
