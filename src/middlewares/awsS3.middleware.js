const aws = require("aws-sdk");
const multer = require('multer');
const multerS3 = require('multer-s3');
const sharp = require('sharp')

// Plugin our access credentials
aws.config.update({
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  accessKeyId: process.env.S3_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
  correctClockSkew: true
});

const s3 = new aws.S3();

// Now lets create a function that validates the file type
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/webp" || file.mimetype === "image/svg" || file.mimetype === "image/jpg"){
    cb(null, true);
  } else {
    cb(new Error ("Invalid file type, only JPEG,WEBP,SVG and PNG is allowed!"), false);
  }
};

//Setup Multer to process the image and send it to the S3 bucket
const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: "public-read",
    s3: s3, 
    bucket: process.env.S3_BUCKET_NAME,
    contentType:  multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: "TESTING_METADATA"});
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
  }),
});

module.exports = upload