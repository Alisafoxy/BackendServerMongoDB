const mongoose = require('mongoose')
const URL = 'mongodb+srv://user:123@cluster1.yb0cf.mongodb.net/sample_flax'

const connect = async() =>{
    await mongoose.connect(URL)
    console.log('connected to DB')
}

const userSchema = mongoose.Schema({
    "id":String,
    "name":String,
    "email":String,
    "phone":String
})
const userModel = mongoose.model("user",userSchema)

module.exports = {
    connect,
    userModel
}