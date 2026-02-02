const express = require("express")
const router = express.Router()

const {
    getOrders,
    getOrderByID,
    createOrder,
    updateOrderStatus
} = require("../controllers/orderController")

router.get("/", getOrders)
router.get("/:id", getOrderByID)
router.post("/", createOrder)
router.put("/:id", updateOrderStatus)

module.exports = router