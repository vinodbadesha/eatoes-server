const MenuItem = require("../models/MenuItem")

exports.getAllMenuItems = async (request, response) => {
    try{
        const {category, availability, minimumPrice, maximumPrice} = request.query
        let filter = {}

        if (category) filter.category = category
        if (availability) filter.availability = availability
        if (minimumPrice || maximumPrice){
            filter.price = {}
            if (minimumPrice) filter.price.$gte = Number(minimumPrice)
            if (maximumPrice) filter.price.$lte = Number(maximumPrice)
        }

        const items = await MenuItem.find(filter)
        response.json(items)
    }
    catch(error){
        response.status(500).json({error: error.message})
    }
}

exports.searchMenuItems = async(request, response) => {
    try{
        const {q} = request.query
        const items = await MenuItem.find({
            $text: {$search : q}
        })

        response.json(items)
    }
    catch(error){
        response.status(500).json({error: error.message})
    }
}

exports.getMenuItemByID = async (request, response) => {
    try{
        const item = await MenuItem.findById(request.params.id)
        if (!item) response.status(404).json({message: "Item Not Found"})

        response.json(item)
    }
    catch(error){
        response.status(500).json({error: "Invalid ID"})
    }
}

exports.createMenuItem = async (request, response) => {
    try{
        const item = await MenuItem.create(request.body)
        response.status(201).json(item)
    }
    catch(error){
        response.status(500).json({error: error.message})
    }
}

exports.updateMenuItemByID = async (request, response) => {
    try{
        const item = await MenuItem.findByIdAndUpdate(
            request.params.id,
            request.body,
            {new: true}
        )
        response.json(item)
    }
    catch(error){
        response.status(500).json({error: error.message})
    }
}

exports.deleteMenuItemByID = async (request, response) => {
    try{
        await MenuItem.findByIdAndDelete(request.params.id)
        response.json("Item Deleted Successfully")
    }
    catch(error){
        response.status(500).json({error: error.message})
    }
}

exports.toggleAvailability = async (request, response) => {
    try{
        const item = await MenuItem.findById(request.params.id)
        item.availability = !item.availability
        await item.save()
        response.json(item)
    }
    catch(error){
        response.status(500).json({error: error.message})
    }
}