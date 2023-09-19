const mongoose = require("mongoose");

const datesNotAvailableSchema = new mongoose. Schema({
    _id:{
        type: String
    },
    propertyId: {
        type: String,
        require: true
    },
    startDate: {
        type: String,
        require: true
    },
    endDate: {
        type: String,
        require: true
    },
    datesNotAvailable: [
        String
    ]
})

module.exports = mongoose.model("availability", datesNotAvailableSchema, "noAvailabilityDays")