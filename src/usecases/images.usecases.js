const Images = require("../models/images.model");
const { getPropertiesById } = require("./property.usecases");
const { getUserById } = require("./user.usecase");

const saveImages = async (body) => {
  const property = await getPropertiesById(body.propertyId);
  const user = await getUserById(body.userId);
  const images = await Images.create(body);
  const imagesType = images.imageType;
  switch (imagesType) {
    case "profile":
      user.userImage.push(images);
      user.save();
      break;
    case "document":
      user.userImage.push(images);
      user.save();
      break;
    case "property":
      property.documents.push(images);
      property.save();
      break;
  }
  return images;
};

const deletedImage = async (body) =>{
  const property = await getPropertiesById(body.propertyId);
  const user = await getUserById(body.userId);
}


module.exports = { saveImages, deletedImage };