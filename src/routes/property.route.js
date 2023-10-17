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
const arrayUpload = upload.fields([
  {name: "property-images", maxCount: 10}, 
  {name: "property-documents", maxCount: 10},
  {name: "property-dni", maxCount: 10}
]);

router.post("/", auth, arrayUpload, async (req, res) => {
  try {
    const filesImages = req.files["property-images"];
    const filesDocs = req.files["property-documents"];
    const filesDni = req.files["property-dni"];
    const propertyImages = filesImages.map(file => file.location
    );
    const propertyDocs = filesDocs.map(file => file.location
    );
    const propertyDni = filesDni.map(file => file.location
    );
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
          lng: req.body.lng
        }
      },
      description: req.body.description,
      amenities: {
        wifi: req.body.wifi,
        parking: req.body.parking,
        airConditioner: req.body.airConditioner,
        reception: req.body.reception,
        petFriendly: req.body.petFriendly,
        cleanServices: req.body.cleanServices
      },
      addOns: {
        screwdrivers: req.body.screwdrivers,
        powerExtension: req.body.powerExtension,
        flexometer: req.body.flexometer,
        drill: req.body.drill,
        carpenterBrush: req.body.carpenterBrush,
        woodJigSaw: req.body.woodJigSaw
      },
      price: req.body.price, 
      ownerName: req.body.ownerName,
      measurements: {
        long: req.body.long,
        with: req.body.width,
      },
      workTime: {
        open: req.body.open,
        close: req.body.close  
      }
    }
    console.log("property", propertyData)
    const user = await createProperty(propertyData);
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
