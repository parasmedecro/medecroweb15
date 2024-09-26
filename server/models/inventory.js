const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required :true
        },
        status:{
            type:String,
            enum: ['Available', 'Out of Stock'],
            required:true
        },
        measure:{
            type:String,
            required:true
        },
        inStock:{
            type:Number,
            required:true
        }
    }
)

module.exports = mongoose.model('Inventory',inventorySchema);