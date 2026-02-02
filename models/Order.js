const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },
    items: [
        {
            menuItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "MenuItem",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Preparing", "Ready", "Delivered", "Cancelled"],
        default: "Pending"
    },
    customerName: {
        type: String,
    },
    tableNumber: {
        type: Number,
    }
},
    {
        timestamps: true
    }
)

orderSchema.pre("save", function (next) {
    if (!this.orderNumber){
        this.orderNumber = "ORDER-" + Date.now()
    }
    next()
})

module.exports = mongoose.model("Order", orderSchema)