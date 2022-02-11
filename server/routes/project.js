const express= require('express')
const {Project}= require('../models')
const {User}=require('../models')

const project= express.Router()

project.get('/add', (req ,res)=>{
    res.send("create project component will be shown")
})

project.post('/add',async(req, res)=>{
  var alreadyPresent= await Project.findOne({name: req.body.name })
  if(alreadyPresent) return res.send("a project with same name is already present is already present")
    try{
        var pro= new Project(req.body)
        await pro.save().then(data => {
          res.status(200).json({
            mem:data
          });
        })
        //res.send(`saved your new project. \n ${data}`)
    }
    catch(err){
        res.status(400).send(err)
    }
})

project.put('/add_member',async(req, res)=>{

  console.log(req.body.projectid)
    try{
        var pro= await Project.findOne({_id: req.body.projectid})
        if(! pro) return
        /*pro.members.push(req.body.update)*/
        pro.members.push({name: req.body.name , role: req.body.role , id: req.body.userid})
        console.log(pro.members)
        var data= await pro.save()
        res.send(`updated your project. \n ${data}`)
    }
    catch(err){
        res.status(400).send(err)
    }
})

project.put('/add_members',async(req, res)=>{
  console.log(req.body.projectid)
  var memberid
    try{
        var pro= await Project.findOne({_id: req.body.projectid})
        if(! pro) return
        /*pro.members.push(req.body.update)*/
        User.findOne({username: req.body.name}).then(data => {
          memberid=data._id
        }).catch(err=>{
          console.log(err)
        });
        console.log(memberid)
        pro.members.push({name: req.body.name , role: req.body.role , id: memberid})
        console.log(pro.members)
        var data= await pro.save()
        res.send(`updated your project. \n ${data}`)
    }
    catch(err){
        res.status(400).send(err)
    }
})

project.get("/getprojects", (req,res)=> {
  /*var p = Project.find({ispublic: 'true'})
  console.log(p)
      res.status(200).send({
          projects: p
      });*/

      Project.find({isPublic: 'true'}).then(data => {
          res.status(200).json({
              projects: data
          });
      });

})

project.post("/userprojects", (req,res)=> {
  /*var p = Project.find({ispublic: 'true'})
  console.log(p)
      res.status(200).send({
          projects: p
      });*/
      var d=[];

      Project.find().then(data => {
        data.map(data1 => {
          data1.members.map(memb => {
            if(memb.name == req.body.username){
              d.push(data1)
            }
          })
        })
          res.status(200).json({
              projecs: d
          });
      });

})

project.post("/findproject", (req, res, next) => {
    Project.findOne({_id: req.body.userid}).then(data => {
        res.status(200).json({
            project: data
            //profileImg: data.profileImg
        });
    });
});

project.post("/find", (req, res, next) => {
    Project.findOne({_id: req.body.id}).then(data => {
      console.log(data)
        res.status(200).json({
            project: data
            //profileImg: data.profileImg
        });
    });
});



module.exports= project
