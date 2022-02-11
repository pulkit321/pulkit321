import React, { Component } from 'react';
import axios from 'axios'
import ls from 'local-storage'
class TileHomeToDO extends Component {
    constructor(props){
      super(props);
      this.state = {
        status: ''
      }
    }
    done=(n)=>{
      this.setState({status: 'done'})
      const status={
        uid: ls.get('uid'),
        status: this.state.status,
        tid: n
      }
      axios.put("http://localhost:8000/todo/personalToDo/update_status", status).then(res=>{
        console.log(res.data)
        window.location.reload()
      }).catch(err=>{
        console.log(err)
      })
    }
    render() {

        return (
            <div className="row align-items-center tile_home_todo mr-3 ml-3">
                 <div className="col-9">
                     {this.props.tod.task}
                 </div>
                 <div className="col-2 ml-1">
                     <button className="tile_home_button " onClick={()=> this.done(this.props.tod._id)} type="button">Done</button>
                     {/*<button className="tile_home_button ml-2 X" type="button">X</button>*/}
                 </div>
            </div>
          );
    }
}

export default TileHomeToDO;

/* onClick={this.done(this.props.tod._id)}*/
