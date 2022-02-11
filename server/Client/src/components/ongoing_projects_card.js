import React, { Component } from 'react';
import { Card,Button,Modal } from 'react-bootstrap';
import Project from './project'
import axios from 'axios'
import { Link } from "react-router-dom";

class Projects_Card extends Component {
    constructor(props)
    {
        super(props);
        this.handleModal = this.handleModal.bind(this);
        this.state={
            show:false,
            project: ''
        }

    }

    handleModal()
    {
        this.setState({show:!this.state.show})
    }

    open=(n)=>{
      const stat={
        userid: n
      }
      axios.post("http://localhost:8000/project/findproject", stat).then(res=>{
        console.log(res.data)
        this.setState({project: res.data.project});
        //<Project detail={this.state.project}/>
      }).catch(err=>{
        console.log(err)
      })



    }

    render() {
        return (
                <div>
                    <Card className="projects_card">
                        <Card.Body>
                            <Card.Title>{this.props.project.name}</Card.Title>
                            <Card.Text>
                              {this.props.project.description}
                            </Card.Text>
                            <Button className="home_find_button ongoing"><Link className="home_find_button" to={"/project/" + this.props.project._id} params={{ detail: this.props.project._id }}>View Full Project</Link></Button>

                        </Card.Body>
                        <Modal show={this.state.show} onHide={()=>this.handleModal()}>
                                <Modal.Header  className="modal_header">
                                    <h2>{this.props.project.name}</h2>
                                    <span className="close-modal-btn" onClick={this.handleModal}>x</span>
                                </Modal.Header>
                                <Modal.Body  className="modal_body">
                                    <div>
                                        <div className="row">
                                            <h6 className="col-3">Name: </h6>
                                            <p>{this.props.project.name}</p>
                                        </div>
                                        <div className="row">
                                            <h6 className="col-3">Created By: </h6>
                                            <p>{/*this.props.project.members[0]*/}</p>
                                        </div>
                                        <div className="row">
                                            <h6 className="col-3">Description: </h6>
                                            <p>{this.props.project.description}</p>
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer className="modal_header">
                                    <Button className="modal_btn" onClick={this.handleModal}>Chat with Leader</Button>
                                    <Button className="modal_btn" onClick={this.handleModal}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                    </Card>
                </div>
         );
    }
}

export default Projects_Card;

/*  onClick={()=>{this.open(this.props.project._id)}}*/
