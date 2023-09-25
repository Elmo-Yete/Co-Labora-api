const mongoose = require("mongoose");

const favoritesSchema = new mongoose.Schema({
    propertyId: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    property: {
        name: {
            type: String,
        },
        image: {
            type: String
        },
        location: {
            neighbor: {
                tyoe: String
            },
            city: {
                type: String
            },
            zip: {
                type: String
            },
            price: {
                type: Number
            }
        }
    }
})

module.exports = mongoose("favorites", favoritesSchema, "Favorites")