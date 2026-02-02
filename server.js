const express = require("express")
const cors = require("cors")
const { default: mongoose } = require("mongoose")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

const menuRoutes = require("./routes/menuRoutes")
const orderRoutes = require("./routes/orderRoutes")

const PORT = process.env.PORT || 3000

const startServer = async () => {
    try{
        mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MONGODB connected successfully.")
        app.listen(PORT, () => {
            console.log(`Server is running successfully at PORT: ${PORT}`)
        })
    })
        }
        catch(error){
        console.log(`MONGODB connection error: ${error}`)
    }
}

startServer()

app.get("/", (req, res) => {
  res.send("Server is working!")
})

app.use("/menu", menuRoutes)
app.use("/orders", orderRoutes)