import React from 'react';
import { Component } from 'react';
import { Form,Button } from 'react-bootstrap';
import axios from 'axios';
import ls from 'local-storage'

import {connect} from 'react-redux'

class Login extends Component {

    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeMail = this.onChangeMail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmitsignup = this.onSubmitsignup.bind(this);
        this.onSubmitlogin = this.onSubmitlogin.bind(this);
        this.state = {
            new_user: false,
            name: '',
            username: '',
            mail: '',
            phone: '',
            password: '',
        };
    }

    toggleState = () => {
        this.setState({
            new_user: !this.state.new_user
        })
    }
    /*nextpage = () => {
        window.location= '/editprofile';
    }*/
    onChangeName(e) {
      this.setState({
        name: e.target.value
      })
    }
    onChangeUsername(e) {
      this.setState({
        username: e.target.value
      })
    }
    onChangePhone(e) {
      this.setState({
        phone: e.target.value
      })
    }
    onChangeMail(e) {
      this.setState({
        mail: e.target.value
      })
    }
    onChangePassword(e) {
      this.setState({
        password: e.target.value
      })
    }

    onSubmitsignup(e) {
      e.preventDefault();

      const signup = {
        name: this.state.name,
        username: this.state.username,
        phone: this.state.phone,
        mail: this.state.mail,
        password: this.state.password
      }

      axios.post('http://localhost:8000/register/create', signup)
        .then(res => {
          var personalToDo={
            uid: ls.get('uid'),
            member: res.data.username
          }

          alert(personalToDo)
          axios.post('http://localhost:8000/todo//personalToDo/create', personalToDo)
            .then(res=>{
              console.log(res.data)
            })
            .catch(err=> console.error(err))
          console.log(res.data)
        })

        .catch(err => {
          console.log(err);
        });

        window.location = '/';
    }

    onSubmitlogin(e) {
      e.preventDefault();

      const login = {
        mail: this.state.mail,
        password: this.state.password
      }

      console.log(login);

      axios.post('http://localhost:8000/auth/login', login)
        .then(res => {
          if(res.data != "wrong password"){
          console.log(JSON.stringify(res.data))
          this.props.add_uid(res.data.id)
          this.props.add_username(res.data.username)
          ls.set('uid', res.data.id )

          ls.set('username', res.data.username )

          /*var personalToDo={
            uid: ls.get('uid'),
            member: res.data.username
          }

          axios.post('http://localhost:8000/todo//personalToDo/create', personalToDo)
            .then(res=>{
              console.log(res.data)
            })
            .catch(err=> console.error(err))
*/
          window.location = '/home'
        }
        else{
          alert("wrong password")
  }

  var personalToDo={
    uid: ls.get('uid'),
    member: res.data.username
  }

  alert(personalToDo)
  axios.post('http://localhost:8000/todo//personalToDo/create', personalToDo)
    .then(res=>{
      console.log(res.data)
    })
    .catch(err=> console.error(err))
        })
        .catch(err=> console.error(err))


    }


    show = () => {

        if(this.state.new_user)
        {
            return(
                <div className="container">
                <h1 className="signup_title">SIGN UP</h1>
                <Form onSubmit={this.onSubmitsignup}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label className="signup_text" >Name</Form.Label>
                        <Form.Control  type="name" value={this.state.name} onChange={this.onChangeName} placeholder="Enter Name" />
                    </Form.Group>
                    <Form.Group controlId="formBasicUserName">
                        <Form.Label  className="signup_text" >User Name</Form.Label>
                        <Form.Control  type="name" value={this.state.username} onChange={this.onChangeUsername} placeholder="Enter User Name" />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label  className="signup_text" >Email address</Form.Label>
                        <Form.Control  type="email" value={this.state.mail} onChange={this.onChangeMail} placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPhone">
                        <Form.Label  className="signup_text" >Mobile Number</Form.Label>
                        <Form.Control  type="phone_number" value={this.state.phone} onChange={this.onChangePhone} placeholder="Enter Mobile Number" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label  className="signup_text">Password</Form.Label>
                        <Form.Control type="password" value={this.state.password} onChange={this.onChangePassword} placeholder="Password" />
                    </Form.Group>

                    <div className="row">
                        <Button className="signup_button" type="submit">
                            Sign Up
                        </Button>
                        <Button onClick={this.nextpage} className="signup_button" type="button">
                            Cancel
                        </Button>
                        <Form.Label  className="signup_text_link" >Already a user, <Button onClick={this.toggleState} className="signup_button" type="button">Log In</Button></Form.Label>
                    </div>
                </Form>
            </div>
            )

        }
        else
        {
            return(
                <div className="container">
                <h1 className="login_title">LOG IN</h1>
                <Form onSubmit={this.onSubmitlogin}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label  className="login_text" >Email address</Form.Label>
                        <Form.Control  type="email" value={this.state.mail} onChange={this.onChangeMail} placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label  className="login_text">Password</Form.Label>
                        <Form.Control type="password" value={this.state.password} onChange={this.onChangePassword} placeholder="Password" />
                    </Form.Group>
                    <div className="row">
                        <Button className="login_button" type="submit">
                            Log In
                        </Button>
                        <Button onClick={this.toggleState} className="login_button" type="button">
                            Cancel
                        </Button>
                        <Form.Label  className="login_text_link" >New User, <Button onClick={this.toggleState} className="signup_button" type="button">Sign Up</Button></Form.Label>
                    </div>
                </Form>
            </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.show()}
            </div>
         )
    }
}

const mapStateToProps = (state) => {
  return {
    uid: state.uid,
    username: state.username,
    completedProjects: state.completedProjects,
    ongoingProjects: state.ongoingProjects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add_uid: (val) => {
      dispatch({
        type: 'ADD_UID',
        value: val
      })
    },
    add_username: (val) => {
      dispatch({
        type: 'ADD_USER_NAME',
        value: val
      })
    },
    add_cp: (val) => {
      dispatch({
        type: 'ADD_OP',
        value: val
      })
    },
    add_op: (val) => {
      dispatch({
        type: 'ADD_OP',
        value: val
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
