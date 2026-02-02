const mongoose = require("mongoose")
const { text } = require("stream/consumers")

const menuItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            index: true
        },
        description: {
            type: String
        },
        category: {
            type: String,
            required: true,
            enum: ["Appetizer", "Main Course", "Dessert", "Beverage"]
        },
        price: {
            type: Number,
            required: true
        },
        ingredients: {
            type: [String],
        },
        isAvailable: {
            type: Boolean,
            default: true
        },
        preparationTime: {
            type: Number
        },
        imageURL: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

menuItemSchema.index({
    name: "text",
    ingredients: "text"
})

module.exports = mongoose.model("MenuItem", menuItemSchema)