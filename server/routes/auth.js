const express= require('express')
const bcrypt= require('bcrypt')
const jwt = require("jsonwebtoken");
const authmdw= require('../middleware/authmdw')
const { User }= require('../models')



const auth= express.Router()

auth.get('/',(req,res)=>{
    res.send('login form will be showed')
})

auth.post('/login', async(req, res)=>{
    var user= await User.findOne({mail: req.body.mail })
    if(!user) return res.status(404).send("incorrect email address")
    try{
        const valid= await bcrypt.compare(req.body.password, user.password)
        if(! valid) return res.send("wrong password")
        else{
            const token= jwt.sign({
                _id: user._id,
                isAdmin: user.isAdmin
            }, 'secret key')

            res.cookie('jwt',token, {expires: new Date(Date.now() + 24*3*60*60*1000), httpOnly: false })
            
            res.json({
                id: user._id,
                username: user.username
            })
        }
    }
    catch(err){
        res.send(err)
    }

})

// current user
auth.post('/me', async (req,res)=>{
    var user= await User.findOne({_id: req.body.uid}).select(['-__v','-password'])
    res.send(user)
})

module.exports =auth
