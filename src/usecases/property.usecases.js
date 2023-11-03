const { array } = require("../middlewares/awsS3.middleware");
const Property = require("../models/property.model");
const { getUserById } = require("./user.usecase");

const createProperty = async (data) => {
  console.log("data", data);
  const user = await getUserById(data.userId);
  const area =
    parseInt(data.measurements.long) * parseInt(data.measurements.broad);
  data.measurements.area = area;
  const property = await Property.create(data);
  console.log("property", property);
  user.properties.push(property);
  user.save();
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
    .populate("propertyImages", {});
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
      tenantId: 1,
      subtotal: 1,
    })
    .populate("propertyImages", {});
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
        acc.push(new Date(start).toString());
        start.setDate(start.getDate() + 1);
      }
    }
    return acc;
  }, []);
  // const notRepeatedDaysSet = new Set(noAvailabilityDays);
  // const notRepeatedDays = Array.from(notRepeatedDaysSet);
  const notRepeatedDays = noAvailabilityDays.filter(
    (date, ind) => noAvailabilityDays.indexOf(date) === ind
  );

  property.noAvailabilityDays = [];
  property.noAvailabilityDays = notRepeatedDays;
  return property;
};
const deleteProperty = async (id) => {
  const propertyDeleted = await Property.findByIdAndDelete(id);
  return propertyDeleted;
};

const patchProperty = async (data) => {
  const id = data.params.id;
  const update = data.body;
  const area = update.measurements.long * update.measurements.broad;
  update.measurements.area = area;
  const property = await Property.findByIdAndUpdate(id, update, { new: true });
  return property;
};

const getPropertiesByUserId = async (userId) => {
  try {
    // Buscar todas las propiedades que estén relacionadas con el usuario específico
    const properties = await Property.find({ userId }).exec();

    // A continuación, puedes realizar operaciones adicionales en la lista de propiedades, como población de datos, cálculo de puntaje, etc.
    for (let property of properties) {
      // Realiza la población de datos de la propiedad según tus necesidades
      // Puedes mantener el código de población existente para ratings, comments, reservations, propertyImages, score, y noAvailabilityDays aquí.
      const populatedProperty = await Property.findById(property._id)
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
        .populate("propertyImages", {})
        .exec();

      // Por ejemplo, para calcular el puntaje promedio de ratings
      let score = 0;
      if (
        populatedProperty.ratings !== null &&
        populatedProperty.ratings.length > 0
      ) {
        score =
          populatedProperty.ratings.reduce((acc, act) => acc + act.rating, 0) /
          populatedProperty.ratings.length;
      }
      populatedProperty.score = score.toFixed(1);

      // Para encontrar los días no disponibles
      const noAvailabilityDays = populatedProperty.reservations.reduce(
        (acc, act) => {
          let start = new Date(act.startDate);
          let end = new Date(act.endDate);

          if (start === end) {
            acc.push(start);
          } else {
            while (start <= end) {
              acc.push(new Date(start).toString());
              start.setDate(start.getDate() + 1);
            }
          }
          return acc;
        },
        []
      );

      const notRepeatedDays = noAvailabilityDays.filter(
        (date, ind) => noAvailabilityDays.indexOf(date) === ind
      );

      populatedProperty.noAvailabilityDays = notRepeatedDays;

      // Agregar la propiedad poblada a la lista
      property = populatedProperty;
    }

    return properties;
  } catch (error) {
    // Manejo de errores
    console.error(error);
    throw error;
  }
};
const filterPropertyByInput = async (filter) => {
  const properties = await Property.find({
    $or: [
      { name: { $regex: filter, $options: "i" } },
      { "location.street": { $regex: filter, $options: "i" } },
      { "location.neighbor": { $regex: filter, $options: "i" } },
      { "location.city": { $regex: filter, $options: "i" } },
    ],
  })
    .populate("ratings", {
      userId: 1,
      rating: 1,
    })
    .populate("comments", {
      userId: 1,
      comment: 1,
    })
    .populate("propertyImages", {});
  if (!properties) {
    return null;
  }
  return properties;
};

const filterPropertyByPreferences = async (preferences) => {
  let data = [];

  if (preferences.minPrice) {
    data.push({ price: { $gte: preferences.minPrice } });
  }

  if (preferences.maxPrice) {
    data.push({ price: { $lte: preferences.maxPrice } });
  }

  if (preferences.rating) {
    data.push({ score: { $gte: preferences.rating } });
  }

  if (preferences.wifi) {
    data.push({ "amenities.wifi": true });
  }

  if (preferences.petFriendly) {
    data.push({ "amenities.wifi": true });
  }

  if (preferences.parking) {
    data.push({ "amenities.parking": true });
  }

  if (preferences.airConditioner) {
    data.push({ "amenities.airConditioner": true });
  }

  if (preferences.reception) {
    data.push({ "amenities.reception": true });
  }

  if (preferences.cleanService) {
    data.push({ "amenities.cleanService": true });
  }
  const properties = await Property.find({ $and: data });
  return properties;
};

module.exports = {
  createProperty,
  deleteProperty,
  getProperties,
  getPropertiesById,
  getPropertiesByUserId,
  patchProperty,
  filterPropertyByInput,
  filterPropertyByPreferences,
};
