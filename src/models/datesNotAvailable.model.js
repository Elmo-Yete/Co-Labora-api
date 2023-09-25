const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const datesNotAvailableSchema = new mongoose. Schema({
    propertyId: {
        type: Schema.Types.ObjectId,
        ref: "property"
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
        {
            type: String
        }
    ]
})

module.exports = mongoose.model("availability", datesNotAvailableSchema, "Availability")