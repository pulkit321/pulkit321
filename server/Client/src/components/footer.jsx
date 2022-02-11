import React, { Component } from 'react';
import {Form,Col,Button} from 'react-bootstrap';
import {FaGithub,FaInstagram,FaFacebook,FaYoutube} from 'react-icons/fa';

class Footer extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <h4>Contact Us</h4>
                                <h6>Join our Newsletter: </h6>
                                <Form>
                                <Form.Row className="align-items-center">
                                    <Col xs="auto">
                                    <Form.Label htmlFor="inlineFormInput" srOnly>
                                        Email
                                    </Form.Label>
                                    <Form.Control
                                        className="mb-2"
                                        id="inlineFormInput"
                                        placeholder="Email"
                                    />
                                    </Col>
                                    <Col xs="auto">
                                    <Button className="navbar_button mb-2" type="submit">
                                        Submit
                                    </Button>
                                    </Col>
                                </Form.Row>
                                </Form>
                            </div>
                            <div className="col-12 col-sm-5 align-self-center  offset-sm-1">
                                <i><FaGithub /></i>
                                <i><FaInstagram /></i>
                                <i><FaYoutube /></i>
                                <i><FaFacebook /></i>
                            </div>
                        </div>
                        <div className="row mt-2 align-items-center justify-content-center">
                            <p>Copyright &copy; 2020 TeamUP India, Inc. All rights reserved.</p> 
                        </div>
                    </div>
                </footer>
            </div>
         );
    }
}
 
export default Footer;