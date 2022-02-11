const express= require('express')
const {Discussion, Competition}= require('../models')

const discussion= express.Router()


discussion.get('/getAll',(req,res)=>{
        console.log(69)
        Discussion.find()
            .then(allDis=>{
                console.log(allDis)
                res.send(allDis)
            })
            .catch(err=> console.error("some error occurred ")) 

})

discussion.get('/:id', async(req, res)=>{
    var did= req.params.id
    try {
        var found= await Discussion.findOne({_id: did})
        if(! found) return res.status(400).send('this discussion no longer exists or was never created')
        res.send(found)
    } 
    catch (err) {
        console.error(err)
    }

    
    
})

discussion.post('/new', async(req, res)=>{
    try{
        var newDiscussion= new Discussion(req.body)
        var data= await newDiscussion.save()
        res.send(data)
    }
    catch(err){
        console.error(err)
    }
})

// did -> discussion id
discussion.put('/edit', async (req, res)=>{
    try {
        var dis= await Discussion.findOne({_id: req.body.did})
        if(! dis) return
        if(dis.initiatorUid != req.body.uid) return res.status(403).send("access denied")

        dis.title= req.body.title? req.body.title : dis.title
        dis.brief= req.body.brief? req.body.brief : dis.brief
        var data= await dis.save()
        res.send(`added your discussion\nit now looks like \n${data}`)
    }
    catch (error) {
        console.error(err)
    }
})

discussion.put('/participate', async (req, res)=>{
    try {
        var dis= await Discussion.findOne({_id: req.body.did})
        if(! dis) return
        dis.discussion.push(req.body.msg)
        var data= await dis.save()
        res.send(`added your message\nit now looks like \n${data}`)
    }
    catch (error) {
        console.error(err)
    }
})

discussion.put('/vote', async (req, res)=>{
    try {
        var dis= await Discussion.findOne({_id: req.body.did})
        if(! dis) return
        if(req.body.vote=="down") dis.downvotes+=1
        else dis.upvotes+=1
        var data= await dis.save()
        res.send(`added your message\nit now looks like \n${data}`)
    }
    catch (error) {
        console.error(err)
    }
})

/* -------------------- competition routes ---------------------*/
discussion.get('/competitions',(req, res)=>{
    res.send("competition page will be displayed")
})

discussion.post('/competition/new', async(req, res)=>{
    try {
        var com= new Competition(req.body)
        var data= await com.save()
        res.send(data)
    }
    catch (err) {
        console.error(err)
    }
})

discussion.put('/competition/edit', async(req, res)=>{
    try {
        var com= await Competition.findOne({_id: req.body.cid})
        if(! com) return
        com.from= req.body.from? req.body.from: com.from
        com.to= req.body.to? req.body.to: com.to
        com.title= req.body.title? req.body.title: com.title
        com.link= req.body.link? req.body.link: com.link
        var data= await com.save()
        res.send(data)
    }
    catch (err) {
        console.error(err)
    }
})
/* -------------------------------------------------------- */
module.exports= discussion
