import React, { Component } from 'react';
import {Card,Button,Modal } from 'react-bootstrap';
import axios from 'axios'

class TileFindHome extends Component {
  constructor(props)
  {
      super(props);
      this.handleModal = this.handleModal.bind(this);
      this.state={
          show:false,
          profile: ''
      }

  }

  handleModal()
  {
      this.setState({show:!this.state.show})
  }
  finduser=(n)=>{
    const stat={
      userid: n
    }
    axios.post("http://localhost:8000/register/finduser", stat).then(res=>{
      console.log(res.data)
      this.setState({profile: res.data.profile})
    }).catch(err=>{
      console.log(err)
    })
  }

    /*finduser=(n)=>{
      const stat={
        userid: n
      }
      axios.post("http://localhost:8000/todo/register/finduser", stat).then(res=>{
        console.log(res.data)
      }).catch(err=>{
        console.log(err)
      })
    }*/
    render() {
      console.log(typeof(this.props.people.tellus))
        return (
            <div className="home_tile_find">
                <Card className="home_find_card">
                    <Card.Img variant="top" className="find_tile_img" variant="top" src={this.props.people.profileImg} />
                    <Card.Body>
                        <Card.Title>{this.props.people.name}</Card.Title>
                        <Card.Text>
                            {this.props.people.tellus? this.props.people.tellus.substring(0,32) : null}...
                        </Card.Text>
                        <Button type="button" onClick={()=>{this.handleModal(); this.finduser(this.props.people._id);}} className="home_find_button">View Profile</Button>
                        <Modal show={this.state.show} onHide={()=>this.handleModal()}>
                            <Modal.Header  className="modal_header">
                                <h2>{this.props.people.name}</h2>
                                <span className="close-modal-btn" onClick={this.handleModal}>x</span>
                            </Modal.Header>
                            <Modal.Body  className="modal_body">
                                <div>
                                    <img className="modal_img" src={this.state.profile.profileImg}  />
                                    <div className="row">
                                        <h6 className="col-3">Name: </h6>
                                        <p>{this.state.profile.name}</p>
                                    </div>
                                    <div className="row">
                                        <h6 className="col-3">User-Name: </h6>
                                        <p>{this.state.profile.username}</p>
                                    </div>
                                    <div className="row">
                                        <h6 className="col-3">Branch: </h6>
                                        <p>{this.state.profile.branch}</p>
                                    </div>
                                    <div className="row">
                                        <h6 className="col-3">Bio: </h6>
                                        <p>{this.state.profile.tellus}</p>
                                    </div>
                                    <div className="row">
                                        <h6 className="col-3">Skills: </h6>
                                        <p>{this.state.profile.skills}</p>
                                    </div>
                                    <div className="row">
                                        <h6 className="col-3">Fields Interested: </h6>
                                        <p>{this.state.profile.interestedfeilds}</p>
                                    </div>
                                    <div className="row">
                                        <h6 className="col-3">Git-Hub Link: </h6>
                                        <p><a href={this.state.profile.githubprofile}>{this.state.profile.githubprofile}</a></p>
                                    </div>
                                    <div className="row">
                                        <h6 className="col-3">E-Mail: </h6>
                                        <p>{this.state.profile.mail}</p>
                                    </div>

                                </div>
                            </Modal.Body>
                            <Modal.Footer className="modal_header">
                                <Button className="modal_btn" onClick={this.handleModal}>Chat</Button>
                                <Button className="modal_btn" onClick={this.handleModal}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </Card.Body>
                </Card>
            </div>
         );
    }
}

export default TileFindHome;
