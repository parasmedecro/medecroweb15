const UserModel = require('../models/user')

const createUser = async (req,res)=>
{
    const {name,email,password,userId,role} = req.body;

    try{
        if(await UserModel.findOne({email}))
        {
            return res.status(400).json({error:"User Already Exists"})
        }
        const newuser = await UserModel.create({name,email,password,userId,role});
        res.status(201).json(newuser)
    }
    catch(error)
    {
        res.status(400).json({error:error.message});
    }
    
}

const decrypt = (text, shift) => {
    return text.split('').map(char => {
        const charCode = char.charCodeAt(0);
        const shiftedCharCode = (charCode - shift) % 256;
        return String.fromCharCode(shiftedCharCode);
    }).join('');
  }

const loginAuth = async (req,res)=>
{
    try
    {
        const user = await UserModel.findOne({email:req.body.email});
        if(user)
        {
            if(req.body.password==decrypt(user.password,3))
            {
                return res.status(200).json(user);
            }
            else
            {
                return res.status(400).json({message:"Wrong Password"});
            }
            console.log("found User")
            res.status(200)
        }
        else
        {
            return res.status(400).json({message:"User Don't Exists"});
        }
    }
    catch(error)
    {
        res.status(400).json({message:error.message});
    }
}

module.exports = {createUser,loginAuth}