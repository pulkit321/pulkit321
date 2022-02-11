/*const express= require('express')
const bodyParser= require('body-parser')
const mongoose= require('mongoose')
const register= require('./routes/register')
const auth= require('./routes/auth')

const app= express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

mongoConnection= 'mongodb://localhost/teamUp'
mongoose.connect(mongoConnection,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log(`connected to ${mongoConnection}`))
    .catch(err=>console.log(`could not connect to DB ${err}`))

app.use('/register', register)
app.use('/auth', auth)

app.listen(8000)*/

//*********************************************************************
const express= require('express');
const bodyParser= require('body-parser');
const path = require('path');
const cors = require('cors');



const mongoose= require('mongoose');
const register= require('./routes/register');
const auth= require('./routes/auth')
const project= require('./routes/project')
const todo= require('./routes/todo')
const discussion= require('./routes/discussion')
const idea= require('./routes/idea')

const app= express()
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/uploads', express.static('uploads'));

const mongoConnection= "mongodb+srv://teamUP:teamup@123@cluster0.vwydn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoConnection,{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(()=>console.log(`connected to ${mongoConnection}`))
    .catch(err=>console.log(`could not connect to DB ${err}`))
//mongoose.set('useFindAndModify', false);
app.use('/register', register)
app.use('/auth', auth)
app.use('/todo', todo)
app.use('/project', project)
app.use('/discussion', discussion)
app.use('/idea', idea)
app.use(express.static("Client/build"));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static("Client/build"));
    app.get("*", (req,res) => {
      res.sendFile(path.join(__dirname,"Client","build", 'index.html'));
    })
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
