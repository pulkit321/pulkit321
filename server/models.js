/*const mongoose= require('mongoose')
const {userSchema}= require('./schema')

const User= mongoose.model('User', userSchema)

module.exports= {
    User: User
}*/

const mongoose= require('mongoose')
const {userSchema, projectSchema, personalTodoSchema, groupTodoSchema, discussionSchema, ideaSchema, competitionSchema}= require('./schema')

const User= mongoose.model('User', userSchema)
const Project= mongoose.model('Project', projectSchema)
const PersonalToDo= mongoose.model('PersonalToDo', personalTodoSchema)
const GroupToDo= mongoose.model('GroupToDo', groupTodoSchema)
const Discussion= mongoose.model('Discussion', discussionSchema)
const Idea= mongoose.model('Idea', ideaSchema)
const Competition= mongoose.model('Competition', competitionSchema)

module.exports= {
    User: User,
    Project: Project,
    PersonalToDo: PersonalToDo,
    GroupToDo: GroupToDo,
    Discussion: Discussion,
    Idea: Idea,
    Competition: Competition
}
