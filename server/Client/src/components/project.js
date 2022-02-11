import React, { Component } from 'react';
import Navbar from './navbar';
import Project_Card from './project_card';
import Project_Todo from './project_todo';
import Project_Chat from './project_chat';

import axios from 'axios';

import Footer from './footer';

class Project extends Component {
    constructor(props){
      super(props);
      this.state={
        project: ''
      }
    }
    componentDidMount(){
      axios.post("http://localhost:8000/project/find",{id: this.props.match.params.detail}).then(res=>{
        this.setState({project: res.data.project})
        console.log(res.data.project)

      }).catch(err=>{
        console.log(err)
      })
    }
    render() {
      console.log(this.props.match.params.detail)
      console.log(this.state.project)
        return (
            <div>
                <Navbar />
                <div className="project">
                    <div className="row">
                        <h4 className="col-12 project_heading">{this.state.project.name}</h4>

                    </div>
                    <div className="row">
                        <div className="col-12 col-md-3 mb-3">
                            <Project_Card project={this.state.project}/>
                        </div>
                        <div className="col-12 col-md-4 mb-3">
                            <Project_Todo />
                        </div>
                        <div className="col-12 col-md-5 mb-3">
                            <Project_Chat id={this.state.project._id}/>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
         );
    }
}

export default Project;
