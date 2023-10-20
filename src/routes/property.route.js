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
<<<<<<< HEAD
const arrayUpload = upload.fields([
  { name: "property-images", maxCount: 10 },
  { name: "property-documents", maxCount: 10 },
  { name: "property-dni", maxCount: 10 },
=======
const arrayUpload = upload.any([
  {name: "propertyImages", maxCount: 10}, 
  {name: "propertyDocuments", maxCount: 10},
  {name: "propertyDni", maxCount: 10}
>>>>>>> develop
]);
const test = upload.any("propertyDni")

router.post("/", auth, arrayUpload, async (req, res) => {
<<<<<<< HEAD
  try {
    const filesImages = req.files["property-images"];
    const filesDocs = req.files["property-documents"];
    const filesDni = req.files["property-dni"];
    const propertyImages = filesImages.map((file) => file.location);
    const propertyDocs = filesDocs.map((file) => file.location);
    const propertyDni = filesDni.map((file) => file.location);
    const propertyData = {
      imagesProperty: propertyImages,
      docsProperty: propertyDocs,
      dniProperty: propertyDni,
      userId: req.body.userId,
      name: req.body.name,
      location: {
        ownerLocationDescription: req.body.ownerLocationDescription,
        street: req.body.street,
        neighbor: req.body.neighbor,
        number: req.body.number,
        zip: req.body.zip,
        city: req.body.city,
        mapCoordinates: {
          lat: req.body.lat,
          lng: req.body.lng,
        },
      },
      description: req.body.description,
      amenities: {
        wifi: req.body.wifi,
        parking: req.body.parking,
        airConditioner: req.body.airConditioner,
        reception: req.body.reception,
        petFriendly: req.body.petFriendly,
        cleanServices: req.body.cleanServices,
      },
      addOns: {
        screwdrivers: req.body.screwdrivers,
        powerExtension: req.body.powerExtension,
        flexometer: req.body.flexometer,
        drill: req.body.drill,
        carpenterBrush: req.body.carpenterBrush,
        woodJigSaw: req.body.woodJigSaw,
      },
      price: req.body.price,
      ownerName: req.body.ownerName,
      measurements: {
        long: req.body.long,
        with: req.body.width,
      },
      workTime: {
        open: req.body.open,
        close: req.body.close,
      },
    };
    console.log("property", propertyData);
    const user = await createProperty(propertyData);
=======
  try{
    const filesImages = req.files.filter(item => item.fieldname.startsWith('propertyImages'));
    const filesDocs = req.files.filter(item => item.fieldname.startsWith('propertyDocuments'));
    const filesDni = req.files.filter(item => item.fieldname.startsWith('propertyDni'));
    const propertyImages = filesImages.map(file => file.location
    );
    const propertyDocs = filesDocs.map(file => file.location
    );
    const propertyDni = filesDni.map(file => file.location
    );
    const data = JSON.parse(req.body.data)
    data.propertyImages = propertyImages;
    data.documentsImages = propertyDocs;
    data.dniImage = propertyDni;
    const property = await createProperty(data);
>>>>>>> develop
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
