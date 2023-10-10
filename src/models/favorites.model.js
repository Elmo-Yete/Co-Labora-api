const mongoose = require("mongoose");
const Schema = mongoose.Schema

const favoritesSchema = new Schema({
    propertyId: {
        type: Schema.Types.ObjectId,
        ref: 'property'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    property: {
        name: {
            type: String,
        },
        image: {
            type: String
        },
        rate: {
            type: Number
        },
        price: {
            type: Number
        }
    }
})

module.exports = mongoose.model("favorites", favoritesSchema, "Favorites")