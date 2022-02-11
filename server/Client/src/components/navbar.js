import React, { Component } from 'react';
import { Navbar,Nav,Form,FormControl,Button,Modal } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { FaPlusCircle } from 'react-icons/fa';
class NavigationBar extends Component {
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
            <div className="navigation_bar">
                <Navbar expand="xl">
                    <Navbar.Brand href="#home"><h3 className="navbar_title">Team<span>UP</span>.</h3></Navbar.Brand>
                    <Navbar.Toggle className="navbar_toggler_icon" aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse  id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to="/home"><Nav.Link href="#home"><h6 className="navbar_text">HOME</h6></Nav.Link></Link>
                            <Link to="/findpeople"><Nav.Link href="#findpeople"><h6 className="navbar_text">FIND PEOPLE</h6></Nav.Link></Link>
                            <Link to="/idea"><Nav.Link href="#idea"><h6 className="navbar_text">IDEAS</h6></Nav.Link></Link>
                            <Link to="/competition"><Nav.Link href="#competition"><h6 className="navbar_text">COMPETITIONS</h6></Nav.Link></Link>
                            <Link to="/discussion"><Nav.Link href="#discussion"><h6 className="navbar_text">DISCUSSION FORUM</h6></Nav.Link></Link>
                            <Link to="/about"><Nav.Link href="#"><h6 className="navbar_text">ABOUT US</h6></Nav.Link></Link>
                        </Nav>
                        <Form inline>
                            <i className="nav-icon"  onClick={this.handleModal}><FaPlus /></i>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button className="navbar_button" variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                    <Modal show={this.state.show} onHide={()=>this.handleModal()}>
                                <Modal.Header  className="modal_header">
                                    <h2>Name</h2>
                                    <span className="close-modal-btn" onClick={this.handleModal}>x</span>
                                </Modal.Header>
                                <Modal.Body  className="modal_body">
                                    <div>
                                        <form onSubmit={this.onSubmitProject}>
                                        <div className="row mb-2">
                                            <h6 className="col-3">Project Name: </h6>
                                            <input className="col-8" type="name" value={this.state.name} onChange={this.onChangeName} />
                                        </div>
                                        <div className="row mb-2">
                                            <h6 className="col-3">Description: </h6>
                                            <input className="col-8" type="name" value={this.state.description} onChange={this.onChangeDesc} />
                                        </div>
                                        <div className="row">
                                        <Form.Group controlId="exampleForm.ControlSelect1">
                                            <Form.Label className="col-3">Select privacy</Form.Label>
                                            <Form.Control as="select" custom onChange={this.onChangePublic}>
                                            <option value="true">public</option>
                                            <option value="false">private</option>
                                            </Form.Control>
                                        </Form.Group>
                                        </div>
                                        <Button className="modal_btn mb-2" type="submit">create project</Button>
                                         </form>
                                        <div className="row mb-2">
                                            <h5 className="col-11">ADD MEMBERS</h5>
                                        </div>
                                        <div className="row">
                                        <input className="inputtodo mb-2" type="text" placeholder="ADD MEMBER" value={this.state.mname} onChange={this.onChangeMname} />
                                        <input className="inputtodo" type="text" placeholder="ROLE" value={this.state.role} onChange={this.onChangeRole} />

                                        <i className="todo_btn" onClick={this.addmember}><FaPlusCircle /></i>
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer className="modal_header">
                                    <Button className="modal_btn" onClick={this.handleModal}>Chat</Button>
                                    <Button className="modal_btn" onClick={this.handleModal}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                </Navbar>
            </div>
          );
    }
}

export default NavigationBar;
