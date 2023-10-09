const { array } = require("../middlewares/awsS3.middleware");
const Property = require("../models/property.model");
const { getUserById } = require("./user.usecase")

const createProperty = async (data) => {
  const user = await getUserById(data.userId);
  const area = data.measurements.long * data.measurements.with;
  data.measurements.area = area;
  const property = await Property.create(data);
  user.properties.push(property)
  user.save()
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
    })
    .populate("images", {

    });;
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
    })
    .populate("images", {

    });
    console.log("property", property)
  let score = 0;
  if (property.ratings !== null && property.ratings.length > 0) {
    score =
      property.ratings.reduce((acc, act) => {
        return acc + act.rating;
      }, 0) / property.ratings.length;
  }
  property.score = score.toFixed(1);
  const noAvailabilityDays = property.reservations.reduce((acc, act) => {
    let start = new Date(act.startDate);
    let end = new Date(act.endDate);

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
  property.noAvailabilityDays = noAvailabilityDays;
  return property;
};
const deleteProperty = async (id) => {
  const propertyDeleted = await Property.findByIdAndDelete(id);
  return propertyDeleted;
};

const patchProperty = async (data) => {
  const id = data.params.id;
  const update = data.body;
  const area = update.measurements.long * update.measurements.with;
  update.measurements.area = area;
  const property = await Property.findByIdAndUpdate(id, update, {new:true});
  console.log("property", property)
  return property;
}

module.exports = {
  createProperty,
  deleteProperty,
  getProperties,
  getPropertiesById,
  patchProperty
};
