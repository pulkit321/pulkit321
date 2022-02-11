import React, { Component } from 'react';
import {Card,Button,Modal} from 'react-bootstrap';
import axios from "axios"
class Idea_Card extends Component {
    constructor()
    {
        super();
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

    proje=(n)=>{
      const stat={
        userid: n
      }
      axios.post("http://localhost:8000/project/findproject", stat).then(res=>{
        console.log(res.data)
        this.setState({project: res.data.project})
      }).catch(err=>{
        console.log(err)
      })
    }


    render() {
      console.log(this.state)
        return (
            <div>
                <div className="idea_tile">
                    <Card className="idea_card">
                        <Card.Body>
                            <Card.Title>{this.props.proj.name}</Card.Title>
                            <Card.Text>
                              {this.props.proj.description}
                            </Card.Text>
                            <Button className="home_find_button"  onClick={()=>{this.handleModal(); this.proje(this.props.proj._id);}}>View Full Idea</Button>
                        </Card.Body>
                    </Card>
                    <Modal show={this.state.show} onHide={()=>this.handleModal()}>
                                <Modal.Header  className="modal_header">
                                    <h2>{this.props.proj.name}</h2>
                                    <span className="close-modal-btn" onClick={this.handleModal}>x</span>
                                </Modal.Header>
                                <Modal.Body  className="modal_body">
                                    <div>
                                        <div className="row">
                                            <h6 className="col-3">Name: </h6>
                                            <p>{this.state.project.name}</p>
                                        </div>
                                        <div className="row">
                                            <h6 className="col-3">Created By: </h6>
                                            <p>sartaj</p>
                                        </div>
                                        <div className="row">
                                            <h6 className="col-3">phone: </h6>
                                            <p>7009395378</p>
                                        </div>
                                        <div className="row">
                                            <h6 className="col-3">mail: </h6>
                                            <p>sartaj@thapar.edu</p>
                                        </div>
                                        <div className="row">
                                            <h6 className="col-3">github: </h6>
                                            <p><a href="https://github.com/sartajsehgal">click to see </a></p>
                                        </div>
                                        <div className="row">
                                            <h6 className="col-3">Description: </h6>
                                            <p>{this.state.project.description}</p>
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer className="modal_header">
                                    <Button className="modal_btn" onClick={this.handleModal}>Chat with Leader</Button>
                                    <Button className="modal_btn" onClick={this.handleModal}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                </div>
            </div>
         );
    }
}

export default Idea_Card;
