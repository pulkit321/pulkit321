const express= require('express')
const {PersonalToDo, GroupToDo}= require('../models')

const todo= express.Router()

/*todo.post('/personalToDo/create', async(req, res)=>{
  /*  var alreadyPresent= await PersonalToDo.findOne({_id: "5f0cb69f73c1a1a6fc45af89"})
    if (alreadyPresent) return res.send('you already have a todo, edit that instead')
*/
  /*  try{
    console.log(req.body)
        var list= new PersonalToDo({
          uid: req.body.uid,
          member: req.body.member
        })
        var data= await list.save()
        var list= await PersonalToDo.findOne({uid: req.body.uid}).exec()
        list.tasks.push("welcome")
        var data= await list.save()
        res.send(`saved your todo list. \n ${data}`)
   }
    catch(err){
        console.log(err)
    }

})*/
todo.post('/personalToDo/create', async(req, res)=>{
  /*  var alreadyPresent= await PersonalToDo.findOne({_id: "5f0cb69f73c1a1a6fc45af89"})
    if (alreadyPresent) return res.send('you already have a todo, edit that instead')
*/
    try{
        console.log("ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")
        var list= new PersonalToDo(req.body)
        var data= await list.save()
        res.send(`saved your todo list. \n ${data}`)
        console.log("ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")
   }
    catch(err){
        console.log(err)
    }

})


todo.post('/groupToDo/create', async(req, res)=>{
    var alreadyPresent= await GroupToDo.findOne({project_id: req.body.project_id})
    if (alreadyPresent) return res.send('you already have a todo, edit that instead')

    try{
        var list= new GroupToDo(req.body)
        var data= await list.save()
        res.send(`saved your todo list. \n ${data}`)
    }
    catch(err){
        console.log(err)
    }

})

// there is a security bug: a person can use the user id of someone else to change his todo
// solution: check if the cookie (storing jwt) confirms his uid as that of req.... but later

/*todo.put('/personalToDo/add', async(req, res)=>{
    try{
        var list= await PersonalToDo.findOne({uid: req.body.uid}).exec()
        list.tasks.push(req.body.tasks)
        var newList= await list.save()
        res.send(`updated, your new todo list looks like \n ${newList}`)
    }
    catch(err){
        console.log(err)
    }
})*/

todo.put('/personalToDo/add', async(req, res)=>{
    try{
        var list= await PersonalToDo.findOne({uid: req.body.uid}).exec()
        list.tasks.push(req.body.tasks)
        var newList= await list.save()
        res.send(`updated, your new todo list looks like \n ${newList}`)
    }
    catch(err){
        console.log(err)
    }
})


todo.put('/groupToDo/add', async(req, res)=>{
    try{
        var list= await GroupToDo.findOne({project_id: req.body.project_id}).exec()
        if(! list) return res.status(404).send("No project todo for this project, create one first")
        list.todo.push(...req.body.todo)
        var newList= await list.save()
        res.send(`updated, your new todo list looks like \n ${newList}`)
    }
    catch(err){
        console.log(err)
    }
})

todo.put('/personalToDo/update_status', async(req, res)=>{
    try{
        var list= await PersonalToDo.findOne({uid: req.body.uid}).exec()
        // list.tasks.findOne({tid: req.body.tid}).set({status: req.body.status})
        var task= list.tasks.find(obj=> obj._id== req.body.tid)
        task.status= req.body.status
        //console.log(req.body.status)
        var newList= await list.save()
        res.send(`updated, your new todo list looks like \n ${newList}`)
    }
    catch(err){
        console.log(err)
    }
})

todo.put('/groupToDo/update_status', async(req, res)=>{
    try{
        var list= await PersonalToDo.findOne({project_id: req.body.project_id}).exec()
        // list.tasks.findOne({tid: req.body.tid}).set({status: req.body.status})
        var task= list.todo.tasks.find(obj=> obj.tid== req.body.tid)
        task.status= req.body.status
        var newList= await list.save()
        res.send(`updated, your new todo list looks like \n ${newList}`)
    }
    catch(err){
        console.log(err)
    }
})
/*todo.put("/myTodo", (req, res) => {
  //console.log("drftyguhijokojihugyf");
  try{
    var list= PersonalToDo.findOne({uid: req.body.uid}).then(data => {
      /*data.tasks.forEach(obj => {
        console.log(obj)
      })*//*try{
      if(data.tasks.length() != 0)
      {
      var x = data.tasks.filter(obj=> obj.status== "pending")
      console.log(x)
        res.status(200).json({
            tasks: x
        })
      }
      else{
        res.status(200).json({
            tasks: data
        })
      }
      }catch(err){
        console.log(err)
      }

    })

  }
  catch(err){
      console.log(err)
  }
});*/

todo.post("/myTodo1", async(req, res) => {

    var list= await PersonalToDo.findOne({uid: req.body.uid}).exec()
      /*data.tasks.forEach(obj => {
        console.log(obj)
      })*/
      console.log("ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
      var x = list.tasks.filter(obj=> obj.status== "pending")

      
        res.status(200).json({
            tasks: x
        })
});


todo.get("/myTodo", (req, res) => {

    var list= PersonalToDo.findOne({uid: "5f094de7c30b346650d86cc0"}).then(data => {
      /*data.tasks.forEach(obj => {
        console.log(obj)
      })*/
      var x = data.tasks.filter(obj=> obj.status== "pending")
      console.log(x)
        res.status(200).json({
            tasks: x
        })

    });
});

module.exports= todo
