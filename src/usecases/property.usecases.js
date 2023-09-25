const Property= require("../models/property.model");

const createProperty = async (data) => {
  const property = Property.create(data);
  return property;
};

const getPropertys  = async() => {
  const propertys = await Property.find();
  return propertys;
}

const getPropertysById = async(id) => {
  const property = await Property.findById(id);
  return property;
}
const deleteProperty  = async(id) => {
  const propertyDeleted = await Property.findByIdAndDelete(id)
  return propertyDeleted
}

module.exports = { createProperty , deleteProperty , getPropertys , getPropertysById };