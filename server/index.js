require('dotenv').config();

const express = require('express')
const cors  = require('cors')
const mongoose = require('mongoose')
const app = express()
const userroute = require('../server/Routes/userrouter')
const inventoryroute = require('../server/Routes/inventoryrouter')

app.use(express.json())
app.use(cors())

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGODB_URL,options)
.then(()=>{console.log("Connected to MongoDB");app.listen(5000,()=>console.log(`Server is running on the port 5000..`))})
.catch((error)=>console.error("Couldn't connect to MongoDB ",error))

app.get('/',(req,res)=>
{
    res.send('<h1>Express Server</h1>')
})

app.use('/api/users',userroute);
app.use('/api/inventory',inventoryroute);