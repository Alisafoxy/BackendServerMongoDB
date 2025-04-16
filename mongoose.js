require('dotenv').config(); // מייבא את המשתנים מה-.env

const URL = process.env.MONGO_URI;

const mongoose = require('mongoose')

const connect = async () => {
    await mongoose.connect(URL)
    console.log('connected to DB')
}

const userSchema = mongoose.Schema({
    "id": String,
    "name": String,
    "email": String,
    "phone": String
})
const userModel = mongoose.model("user", userSchema)

module.exports = {
    connect,
    userModel
}