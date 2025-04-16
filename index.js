const express = require('express');
const cors = require('cors');
const {connect,userModel}=require('./mongoose.js')
//יבואים
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
   connect()
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Route example
app.get('/hello', (req, res) => {
  res.send('ברוכה הבאה לשרת 🎉');
})
app.delete('/4', (req, res) => {
    res.send('4 is deleted')
})

app.get('/users',async (req,res)=>{
    const data =await userModel.find({})
    if(data.length==0)
        res.status(404).send("there are no users")
    else
        res.status(200).send(data)
})

app.get('/user', async(req,res)=>{
    const {id} = req.query
    if(id.length != 9)
        res.status(400).send("id not valid")
    const data = await userModel.findOne({"id":id})
    if(data !=undefined)
        res.status(200).send(data)
    else
        res.status(204).send(`user with id ${id} not found`)
})

app.post('/addUser',async (req,res)=>{
    const {id} = req.body
    const find = await userModel.findOne({"id":id})
    if(find != undefined){
        res.status(409).send(`user with id ${id} allready in DB`)
    }
    else{
        const result = await userModel.insertOne(req.body)
        res.status(200).send(result)
    }
})
app.post('/addUsers',async(req,res)=>{
    //אם הוא קיים
    let list = []
    const data = await userModel.find({})
    req.body.map((item)=>{
        const isExsist = data.filter((row)=>row.id == item.id)
        console.log(isExsist)
        if(isExsist[0]== undefined){
            list.push(item)
        }
    })
    const result = await userModel.insertMany(list)
    res.send(result)
})

app.delete('/deleteUser',async(req,res)=>{
    const {id} = req.query
    const result = await userModel.deleteOne({"id":id})
    res.send(result)
})
app.delete('/clear',async (req,res)=>{
    const result = await userModel.deleteMany({})
    res.send(result)
})
app.put('/updateUser',async(req,res)=>{
    const {id} = req.query
    if(req.body.id ==undefined){
        const result = await userModel.updateOne({"id":id},req.body)
        res.status(200).send(result)
    }
    else{
        res.status(409).send("in put request body, cant add id filed")
    }
})



// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});