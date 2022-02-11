var initialState= {
    uid: "",
    username: "",
    completedProjects: [],
    ongoingProjects:[]
}

const reducer= (state= initialState, action)=>{

    switch(action.type){
        case "ADD_UID":{
            return{
                ...state,
                uid: action.value
            }
        }
        case "ADD_USER_NAME":{
            return{
                ...state,
                username: action.value
            }
        }
        case "ADD_CP":{
            return{
                ...state,
                completedProjects: state.completedProjects.push(action.value) 
            }
        }
        case "ADD_OP":{
            return{
                ...state,
                ongoingProjects: state.ongoingProjects.push(...action.value)
            }
        }

        default: 
            break
    }


    return state
}

export default reducer