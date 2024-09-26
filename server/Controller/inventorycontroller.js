const inventoryModel = require('../models/inventory')

const addDrug = async (req,res)=>
{
    try
    {
        const {name,price,status,inStock,measure} = req.body.data
        const newdrug = await inventoryModel.create({name,price,status,inStock,measure})
        res.status(200).json({message:"Data Successfully Added in the Database",data:newdrug})
    }
    catch(error)
    {
        res.status(400).json({message:error.message})
    }
}

const getDrugs = async(req,res)=>
{
        try
        {
            const data = await inventoryModel.find({})
            res.status(200).json(data)
        }
        catch(error)
        {
            res.status(400).json({message:error.message})
        }
}

module.exports = {addDrug,getDrugs}