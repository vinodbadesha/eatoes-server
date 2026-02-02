const Order = require("../models/Order")

exports.getOrders = async (request, response) => {
    try{
        const {status, page = 1, limit = 5} = request.query
        let filter = {}

        if (status) filter.status = status
        const orders = await Order.find(filter)
        .populate("items.menuItem")
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .sort({createdAt: -1})

        const totalOrders = await Order.countDocuments(filter)
        response.json(
            {totalOrders,
            page: Number(page),
            orders}
        )
    }
    catch(error){
        response.status(500).json({error: error.message})
    }
}

exports.getOrderByID = async (request, response) => {
    try{
        const order = await Order.findById(request.params.id)
        .populate("items.menuItem")

        if (!order){
            response.status(404).json({message: "Order Not Found"})
        }

        response.json(order)
    }
    catch(error){
        response.status(500).json({error: error.message})
    }
}

exports.createOrder = async (request, response) => {
    try{
        const {items, customerName, tableNumber} = request.body
        
        const totalAmount = items.reduce(
            (sum, item) => sum + (item.price * item.quantity), 0
        )

        const order = await Order.create({
            items, totalAmount, customerName, tableNumber
        })

        response.json(order)
    }
    catch(error){
        response.status(400).json({error: error.message})
    }
}

exports.updateOrderStatus = async (request, response) => {
    try{
        const {status} = request.body
        const order = await Order.findByIdAndUpdate(
            request.params.id,
            {status},
            {new: true}
        )
        response.json(order)

        if (!order) {
            return response.status(404).json({message: "Order Not Found"})
        }
    }
    catch(error){
        response.status(400).json({error: error.message})
    }
}