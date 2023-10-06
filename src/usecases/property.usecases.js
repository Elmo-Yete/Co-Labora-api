const Property= require("../models/property.model");

const createProperty = async (data) => {
  const property = await Property.create(data);
  return property;
};

const getProperties  = async() => {
  const properties = await Property.find().populate('ratings', {
    userId: 1,
    rating: 1,
  });
  console.log("properties", properties[0].ratings)
  return properties;
}

const getPropertiesById = async(id) => {
  const property = await Property.findById(id).populate("ratings", {
    userId: 1,
    rating: 1
  });
  return property;
}
const deleteProperty  = async(id) => {
  const propertyDeleted = await Property.findByIdAndDelete(id)
  return propertyDeleted
}

module.exports = { createProperty , deleteProperty , getProperties , getPropertiesById };