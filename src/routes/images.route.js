const express = require("express");
const router = express.Router();
const { saveImages, deletedImage } = require("../usecases/images.usecases");
const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/awsS3.middleware");
const arrayUpload = upload.array("images", 10);

router.post("/upload", auth,  arrayUpload,  async (req, res) => {
  try{
    const files = req.files;
    const updateFilesInfo = files.map(file => file.location
    );
    res.status(201)
    res.json({
      success: true,
      data: updateFilesInfo
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
