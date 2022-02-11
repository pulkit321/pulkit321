import React, { Component } from 'react';

class Project_Todo_list extends Component {
    state = {  }
    render() { 
        return (
            <div className="row align-items-center tile_home_todo mr-3 ml-3">
                 <div className="col-9">
                    <p>Task </p>
                 </div>
                 <div className="col-3 ml-0">
                     <button className="tile_home_button " type="button">Done</button>
                 </div>
            </div>
          );
    }
}
 
export default Project_Todo_list;