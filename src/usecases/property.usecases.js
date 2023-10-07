const { array } = require("../middlewares/awsS3.middleware");
const Property = require("../models/property.model");

const createProperty = async (data) => {
  const property = await Property.create(data);
  return property;
};

const getProperties = async () => {
  const properties = await Property.find()
    .populate("ratings", {
      userId: 1,
      rating: 1,
    })
    .populate("comments", {
      userId: 1,
      comment: 1,
    });
  const propertiesAndScore = properties.reduce((acc, act) => {
    let score = 0;
    if (act.ratings.length > 0) {
      score =
        act.ratings.reduce((acc, act) => {
          return acc + act.rating;
        }, 0) / act.ratings.length;
    }
    act.score = score.toFixed(1);
    acc.push(act);
    return acc;
  }, []);
  return propertiesAndScore;
};

const getPropertiesById = async (id) => {
  const property = await Property.findById(id)
    .populate("ratings", {
      userId: 1,
      rating: 1,
    })
    .populate("comments", {
      userId: 1,
      comment: 1,
    })
    .populate("reservations", {
      _id: 1,
      startDate: 1,
      endDate: 1,
    });
  let score = 0;
  if (property.ratings.length > 0) {
    score =
      property.ratings.reduce((acc, act) => {
        return acc + act.rating;
      }, 0) / property.ratings.length;
  }
  property.score = score.toFixed(1);
  const noAvailabilityDays = property.reservations.reduce((acc, act) => {
    console.log("act start", act.startDate)
    let start = new Date(act.startDate);
    console.log(("start day", start))
    let end = new Date(act.endDate);
    console.log("end day", end)
    if (start === end) {
      acc.push(start);
    } else {
      while (start <= end) {
        acc.push(new Date(start));
        start.setDate(start.getDate() + 1);
      }
    }
    return acc;
  }, []);
  property.noAvailabilityDays = [];
  console.log("not availability", noAvailabilityDays)
  property.noAvailabilityDays = noAvailabilityDays;
  return property;
};
const deleteProperty = async (id) => {
  const propertyDeleted = await Property.findByIdAndDelete(id);
  return propertyDeleted;
};

module.exports = {
  createProperty,
  deleteProperty,
  getProperties,
  getPropertiesById,
};
