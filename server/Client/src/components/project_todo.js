import React, { Component } from 'react';
import Project_Todo_list from './project_todo_list';
import {FaPlusCircle} from 'react-icons/fa';

class Project_Todo extends Component {
    state = {  }
    render() { 
        return (  
            <div>
                <div className="project_card">
                    <div className="row mr-0">
                        <h4 className="card_heading col-12">TO-DO LIST</h4>
                    </div>
                    <div className="row">
                        <form className="col-11" onSubmit={this.onSubmit}>
                          <input className="inputtodo" type="text" placeholder="ADD TASK"  onChange={this.onChangeTodo} />
                          <i className="todo_btn" onClick={this.onSubmit}><FaPlusCircle /></i>
                        </form>
                    </div>
                    
                    <Project_Todo_list />
                    <Project_Todo_list />
                    <Project_Todo_list />
                               
                </div>
            </div>
        );
    }
}
 
export default Project_Todo;