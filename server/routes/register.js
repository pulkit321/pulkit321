/*const express= require('express')
const bcrypt= require('bcrypt')
const { User }= require('../models')
const jwt = require("jsonwebtoken");
const joi = require("joi");

const register= express.Router()

register.get('/',(req,res)=>{
    res.send('signup form will be showed')
})

register.post('/create', validateRegisterUserReq, async(req, res)=>{
    var alreadyPresent= await User.findOne({username: req.body.username })
    if(alreadyPresent) return res.send("a user with this username is already present")

    try{
        var usr= new User(req.body)

        var salt= await bcrypt.genSalt(10)
        usr.password= await bcrypt.hash(req.body.password, salt)

        var data= await usr.save()

        const token= jwt.sign({
            _id: data._id,
            isAdmin: data.isAdmin
        },'secret key')

        newData= await User.findById(usr._id).select(['-password','-__v'])

        res.cookie('jwt',token, {expires: new Date(Date.now() + 24*3*60*60*1000), httpOnly: true })
        res.header('x-auth-token',token).send(newData)

    }
    catch(err){
        return res.send(err)
    }
})

/* -----------------------will be shifted to a separate folder ----------------- */

/*const userVal= joi.object().keys(
    {
        name: joi.string().required(),
		username: joi.string().required(),
		password: joi.string().min(8).required(),
        isAdmin: joi.bool().default(false),
        mail: joi.string().regex(/@thapar.edu/),
        phone: joi.string().min(10).max(10).regex(/[6-9][0-9]{9}/)
	}
)
function validateRegisterUserReq(req, res, next) {
	joi.validate(JSON.stringify(req.body), userVal, (err, value)=>{
        if(err) return res.status(422).send(`${err}`)
        next()
    })
}

module.exports= register*/

//**************************************************************************

const express= require('express')
const bcrypt= require('bcrypt')
const { User }= require('../models')
const jwt = require("jsonwebtoken");
const joi = require("joi");
let multer = require('multer'),
    mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4'),
    router = express.Router();
//mongoose.set('useFindAndModify', false);
const register= express.Router()
var idi;
const authmdw  = require('../middleware/authmdw')
var x;
register.post('/getprof',(req,res)=>{
  var uid=req.body.uid


  
    var a=[]
  User.find().then(data => {
    data.map(da=>{
      if(da._id != uid){
        a.push(da)
      }
    })
    //console.log(a)
      res.status(200).json({
          profs: a
      });
  }).catch(err=>{
    console.log(err)
  })
  
  
  
})
/*register.route('/add').post((req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const mail = req.body.mail;
  //const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;

  const newuser = new User({
    name,
    username,
    mail,
    phone,
    password,
  });

  newuser.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});*/


register.post('/create', validateRegisterUserReq, async(req, res)=>{
  console.log("value is passed");
    var alreadyPresent= await User.findOne({username: req.body.username })
    if(alreadyPresent) return res.send("a user with this username is already present")

    try{
        var usr= new User(req.body)

        var salt= await bcrypt.genSalt(10)
        usr.password= await bcrypt.hash(req.body.password, salt)

        var data= await usr.save()

        const token= jwt.sign({
            _id: data._id,
            isAdmin: data.isAdmin
        },'secret key')

        newData= await User.findById(usr._id).select(['-password','-__v'])

        res.cookie('jwt',token, {expires: new Date(Date.now() + 24*3*60*60*1000), httpOnly: true })
        res.header('x-auth-token',token).send(newData)

    }
    catch(err){
        return res.send(err)
    }
})

/* -----------------------will be shifted to a separate folder ----------------- */

const userVal= joi.object().keys(
    {
        name: joi.string().required(),
		username: joi.string().required(),
		password: joi.string().min(8).required(),
        isAdmin: joi.bool().default(false),
        mail: joi.string().regex(/@thapar.edu/),
        phone: joi.string().min(10).max(10).regex(/[6-9][0-9]{9}/),
        /*profileImg: joi.string().required(),
        branch: joi.string().required(),
        tellus: joi.string().required(),
        interestedfeilds: joi.string().required(),
        skills: joi.string().required(),
        githubprofile: joi.string().required()*/
	}
)
function validateRegisterUserReq(req, res, next) {
	joi.validate(JSON.stringify(req.body), userVal, (err, value)=>{
        if(err) return res.status(422).send(`${err}`)
        next()
    })
}
//*********************************************************************

const DIR = './uploads/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

// User model
//let Legendupload = require('../models/legendupload.model');
//var idimage;
register.put('/user-profile', upload.single('profileImg'), (req, res, next) => {
  console.log("profile is listening")
    const url = req.protocol + '://' + req.get('host');
    //idimage = new mongoose.Types.ObjectId();
    x=req.body.uid
    console.log(req.body)
    User.findByIdAndUpdate( req.body.uid ,
    {
      skills: req.body.skills,
      githubprofile: req.body.github,
      tellus: req.body.tellus,
      interestedfeilds: req.body.intfeilds,
      branch: req.body.branch,
      profileImg: url + '/uploads/' + req.file.filename
    },function(err, result){

        if(err){
          console.log(err)
            res.send(err)
        }
        else{
            res.send(result)
        }

    }
)

    /*const imageupload = new User({
        //_id: idimage,
        skills: req.body.skills,
        githubprofile: req.body.githubprofile,
        tellus: req.body.tellus,
        interestedfeilds: req.body.interestedfeilds,
        branch: req.state.branch,
        profileImg: url + '/uploads/' + req.file.filename
    });*/
    /*imageupload.save().then(result => {
        res.status(201).json({
            message: "User registered successfully!",
            imageCreated: {
                //_id: result._id,
                number: result.number,
                name: result.name,
                desc: result.desc,
                profileImg: result.profileImg
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })*/
})
/*router.post('/legend', (req, res) => {
  const number = req.body.number;
  const name = req.body.name;
  const desc = req.body.desc;

  /*const newExercise = new Exercise({
    name,
    rollno,
    branch,
    email,
    phoneno,
    year,
  });*/
  /*Legendupload.update({_id: idimage}, {$set: {number: number , name: name , desc: desc}});

  /*newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));*/
//});


register.post("/getprofile", (req, res, next) => {
    User.findOne({_id: req.body.uid}).then(data => {
        res.status(200).json({
            profile: data,
            profileImg: data.profileImg
        });
    });
});

register.post("/finduser", (req, res, next) => {
    User.findOne({_id: req.body.userid}).then(data => {
        res.status(200).json({
            profile: data
            //profileImg: data.profileImg
        });
    });
});

//module.exports = router;

module.exports= register
