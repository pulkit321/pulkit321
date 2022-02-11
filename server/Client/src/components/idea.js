import React, { Component } from 'react';
import NavBar from './navbar';
import Idea_Card from './idea_card';
import Idea_Img from '../images/idea.svg';
import Footer from './footer';
import axios from 'axios'
class Idea extends Component {
  constructor(props){
    super(props);
    this.state = {
      projs: []

     }
  }
  componentDidMount()
  {
    axios.get('http://localhost:8000/project/getprojects')
    .then(response => {
      // console.log(response.data.profs)
    this.setState({ projs: response.data.projects })


  })
  .catch((error) => {
    console.log(error);
  })
  }
  projects(){
    return this.state.projs.map(proj => {
      return <div className="col-12 col-md-4">
      <Idea_Card proj={proj}/>
      </div>
    })
  }

    render() {
        return (
            <div>
                <NavBar />

                <div className="container">
                    <div className="row idea">
                        <h1 className="col-12 col-md-5 idea_heading">Find and Join New Ideas to <span>Work</span> upon</h1>
                        <img src={Idea_Img} className="col-12 col-md-7"></img>
                    </div>
                    <div className="row">

                          {this.projects()}
                    </div>
                </div>
                <Footer />
            </div>
         );
    }
}

export default Idea;
