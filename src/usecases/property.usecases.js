const Property= require("../models/property.model");

const createProperty = async (data) => {
  const property = await Property.create(data);
  return property;
};

const getProperties  = async() => {
  const propertys = await Property.find();
  return propertys;
}

const getPropertiesById = async(id) => {
  const property = await Property.findById(id);
  return property;
}
const deleteProperty  = async(id) => {
  const propertyDeleted = await Property.findByIdAndDelete(id)
  return propertyDeleted
}

module.exports = { createProperty , deleteProperty , getProperties , getPropertiesById };