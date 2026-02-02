const express = require("express")
const router = express.Router()

const {
    getAllMenuItems,
    searchMenuItems,
    getMenuItemByID,
    createMenuItem,
    updateMenuItemByID,
    deleteMenuItemByID,
    toggleAvailability
} = require("../controllers/menuController")

router.get("/", getAllMenuItems)
router.get("/search", searchMenuItems)
router.get("/:id", getMenuItemByID)
router.post("/", createMenuItem)
router.put("/:id", updateMenuItemByID)
router.delete("/:id", deleteMenuItemByID)
router.patch("/:id", toggleAvailability)

module.exports = router