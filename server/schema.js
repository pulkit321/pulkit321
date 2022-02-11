/*const mongoose= require('mongoose')

// user schema
const userSchema= mongoose.Schema({
    name:{
        type: String,
		required: true
    },
    mail:{
        type: String,
        required: true,
        unique: true
    },
    username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	isAdmin: {
		type: Boolean,
		default: false
    },
    phone:{
        type: String,
        required: true
    }

})

module.exports={
    userSchema: userSchema
}*/

//**********************************************************************

const mongoose= require('mongoose')

// user schema
const userSchema= mongoose.Schema({
    name:{
        type: String,
		required: true
    },

    username: {
		type: String,
		unique: true,
		required: true
	},
  mail:{
      type: String,
      required: true,
      unique: true
  },
  phone:{
      type: String,
      required: true
  },
	password: {
		type: String,
		required: true
	},
	isAdmin: {
		type: Boolean,
		default: false
  },
  profileImg: {
    type: String,
  },
  branch: {
    type: String,
  },
  tellus: {
    type: String,
  },
  interestedfeilds: {
    type: String,
  },
  skills: {
    type: String,
  },
  githubprofile: {
    type: String,
  }




})


// group member schema
let memberSchema= mongoose.Schema({
    name: String,
    role: String,
    id: String,
    isLead: Boolean
})


// project schema
const projectSchema= mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default: "progress"
    },
    members: [memberSchema],

    description: String,

    isPublic: {
        type: Boolean,
        default: true
    }
},{timestamp: true})

// task schema
var taskSchema= mongoose.Schema({
    tid: String,
    task: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
    deadline: String
})

// personal to-do
const personalTodoSchema= mongoose.Schema({
    member: String,
    uid: String,
    tasks:[taskSchema],
    responsibility: String,
})

// group to-do .................. title in groupTodo is the name of responsibility board...
const groupTodoSchema= mongoose.Schema({
    todo: [personalTodoSchema],
    title: {
        type: String,
        required: true
    },
    project_id: String
})

// messageSchema
const messageSchema= mongoose.Schema({
    sender: String,
    senderUid: String,
    message: {
        type: String,
        required: true
    }
},{timestamp: true})

// discussion schema
const discussionSchema= mongoose.Schema({
    title:{
        required: true,
        type: String
    },
    initiator: String,
    initiatorUid: String,
    brief:{
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    discussion:[messageSchema]
})

// idea schema
const ideaSchema= mongoose.Schema({
    initiator: String,
    initiatorUid: String,
    title: {
        type: String,
        required: true
    },
    brief: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "not started"
    },
    upvotes: {
        type: Number,
        default: 0
    },
})

// competitionSchema
const competitionSchema= mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
})

module.exports={
    userSchema: userSchema,
    projectSchema: projectSchema,
    personalTodoSchema: personalTodoSchema,
    groupTodoSchema: groupTodoSchema,
    discussionSchema: discussionSchema,
    ideaSchema: ideaSchema,
    competitionSchema: competitionSchema
}

/*module.exports={
    userSchema: userSchema
}*/
