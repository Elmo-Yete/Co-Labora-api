const express = require("express");
const router = express.Router();
const { saveImages, deletedImage } = require("../usecases/images.usecases");
const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/awsS3.middleware");
const arrayUpload = upload.fields([
  {name: "property-images", maxCount: 10}, 
  {name: "property-documents", maxCount: 10},
  {name: "property-dni", maxCount: 10}
]);


router.post("/upload", auth,  arrayUpload,  async (req, res) => {
  try{
    const filesImages = req.files["property-images"];
    const filesDocs = req.files["property-documents"];
    const filesDni = req.files["property-dni"];
    const propertyImages = filesImages.map(file => file.location
    );
    const propertyDocs = filesDocs.map(file => file.location
    );
    const propertyDni = filesDni.map(file => file.location
    );
    const output = {
      imagesProperty: propertyImages,
      docsProperty: propertyDocs,
      dniProperty: propertyDni,
      name: req.body.name,
      location: req.body.location
    }
    res.status(201)
    res.json({
      success: true,
      data: output
    })
  } catch(err){
    res.status(err.status || 500)
    res.json({
      success: false,
      message: err.message
    });
  };
});

router.post("/", auth, async (req, res) => {
  try {
    const images = await saveImages(req.body);
    res.status(201);
    res.json({
      success: true,
      data: images,
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
