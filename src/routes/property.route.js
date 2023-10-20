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
const upload = require("../middlewares/awsS3.middleware");
const arrayUpload = upload.any([
  { name: "propertyImages", maxCount: 10 },
  { name: "propertyDocuments", maxCount: 10 },
  { name: "propertyDni", maxCount: 10 },
]);
const test = upload.any("propertyDni");

router.post("/", auth, arrayUpload, async (req, res) => {
  try {
    const filesImages = req.files.filter((item) =>
      item.fieldname.startsWith("propertyImages")
    );
    const filesDocs = req.files.filter((item) =>
      item.fieldname.startsWith("propertyDocuments")
    );
    const filesDni = req.files.filter((item) =>
      item.fieldname.startsWith("propertyDni")
    );
    const propertyImages = filesImages.map((file) => file.location);
    const propertyDocs = filesDocs.map((file) => file.location);
    const propertyDni = filesDni.map((file) => file.location);
    const data = JSON.parse(req.body.data);
    data.propertyImages = propertyImages;
    data.documentsImages = propertyDocs;
    data.dniImage = propertyDni;
    const property = await createProperty(data);
    res.status(201);
    res.json({
      success: true,
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

router.get("/:id", async (req, res) => {
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
