const express= require('express')
const {Idea}= require('../models')

const idea= express.Router()

idea.get('/',(req, res)=>{
    res.send('idea page will be shown')
})

idea.post('/new', async(req, res)=>{
    try{
        var newIdea= new Idea(req.body)
        var data= await newIdea.save()
        res.send(data)
    }
    catch(err){
        console.error(err)
    }
})

// iid -> idea id
idea.put('/edit', async (req, res)=>{
    try {
        var ide= await Idea.findOne({_id: req.body.iid})
        if(! ide) return
        if(ide.initiatorUid != req.body.uid) return res.status(403).send("access denied")

        ide.title= req.body.title? req.body.title : ide.title
        ide.brief= req.body.brief? req.body.brief : ide.brief
        var data= await ide.save()
        res.send(`added your discussion\nit now looks like \n${data}`)
    }
    catch (error) {
        console.error(err)
    }
})

idea.put('/upvote', async (req, res)=>{
    try {
        var ide= await Idea.findOne({_id: req.body.did})
        if(! ide) return
        ide.upvotes+=1
        var data= await ide.save()
        res.send(`added your message\nit now looks like \n${data}`)
    }
    catch (error) {
        console.error(err)
    }
})

module.exports= idea
