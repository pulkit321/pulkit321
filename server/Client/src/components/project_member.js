import React, { Component } from 'react';
import { Modal,Button } from 'react-bootstrap';

class Members extends Component {
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
    render() { 
        return ( 
            <div>
                <div className="col-12 mt-2">
                    <div className="row members ml-1 mr-1 align-items-center">
                        <h6 className="col-9">Member</h6>
                        <button  onClick={()=>{this.handleModal()}} className="member_button">Rate</button>
                    </div>
                </div>
                <Modal show={this.state.show} onHide={()=>this.handleModal()}>
                                <Modal.Body  className="modal_body">
                                    <div>
                                        <div className="row">
                                            <h6 className="col-4">Rate Member: </h6>
                                            <input className="col-2" placeholder="Rate"></input>
                                            <h6 className="col"> /5</h6>
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer className="modal_header">
                                    <Button className="modal_btn" onClick={this.handleModal}>Submit</Button>
                                    <Button className="modal_btn" onClick={this.handleModal}>Close</Button>
                                </Modal.Footer>
                </Modal>
            </div>
         );
    }
}
 
export default Members;