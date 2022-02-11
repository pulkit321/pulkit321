import React, { Component } from 'react';
import Navbar from './navbar';
import { Button,Modal } from 'react-bootstrap';
import Discussion_Card from './discussion_cards';
import Footer from './footer';
import ls from 'local-storage'
import axios from 'axios'

class Discussion_Forum extends Component {
    constructor()
    {
        super();
        this.handleModal = this.handleModal.bind(this);
        this.state={
            show:false
        }
    }

    handleModal()
    {
        this.setState({show:!this.state.show})
    }

    componentDidMount(){
        axios.get('http://localhost:8000/discussion/getAll')
            .then(res=>{
                this.setState({
                    ... this.state,
                    allDis: res.data
                })
                console.log(this.state)
            })
            .catch(err=> console.error(err))
    }

    addDiscussion=(topic, description)=>{
        var newDiscussion={
            title: topic,
            brief: description,
            initiatorUid: ls.get('uid'),
            initiator: ls.get('username')
        }
        axios.post('http://localhost:8000/discussion/new', newDiscussion)
            .then(res=>{
                console.log(res.data)
            })
            .catch(err=> console.error(err))
    }

    addTopic=(e)=>{
        this.setState({
            ...this.state,
            temTopic: e.target.value
        })
    }
    addDes=(e)=>{
        this.setState({
            ...this.state,
            temDes: e.target.value
        })
    }

    render() {
        return (
            <div className="discussion_forum">
                <Navbar />
                <div className="row discussion_heading">
                    <h3 className="col-7 col-sm-8">DISCUSSION FORUM</h3>
                    <Button id="discussion_btn" className="col-2" onClick={this.handleModal}>Add a New Topic</Button>
                </div>
                <Modal show={this.state.show} onHide={()=>this.handleModal()}>
                                <Modal.Header  className="modal_header">
                                    <h2>Name</h2>
                                    <span className="close-modal-btn" onClick={this.handleModal}>x</span>
                                </Modal.Header>
                                <Modal.Body  className="modal_body">
                                    <div>
                                        <div className="row mb-2">
                                            <h6 className="col-3">Topic: </h6>
                                            <input placeholder="Topic"  onBlur={this.addTopic}></input>
                                        </div>
                                        <div className="row">
                                            <h6 className="col-3">Description: </h6>
                                            <input placeholder="Description of Topic" onBlur={this.addDes} ></input>
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer className="modal_header">
                                    <Button className="modal_btn" onClick={()=>this.addDiscussion(this.state.temTopic, this.state.temDes)} >Add</Button>
                                    <Button className="modal_btn" onClick={this.handleModal}>Close</Button>
                                </Modal.Footer>
                            </Modal>

                {
                    this.state.allDis?
                        this.state.allDis.map(obj=>(

                            <Discussion_Card des= {obj.brief} title={obj.title} upvotes={obj.upvotes} id={obj._id} msg={obj.discussion[0] ? obj.discussion[0]: {sender:'_', message: 'Kindly join discussion to add a comment'}} msgg={obj.discussion[1] ? obj.discussion[1]: {sender:'_', message: 'Kindly join discussion to add a comment'}}/>

                            )): null
                }


                <Footer />
            </div>
         );
    }
}

export default Discussion_Forum;
