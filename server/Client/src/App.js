import React from 'react';
import './App.css';
import Login from './components/login'
import LoginImg from './images/login.svg';
import EditProfile from './components/edit_profile'

function App() {
  return (
    <div className="App">
      <div className="container login">
      <h1 className="heading">Team<span>UP</span>.</h1>
        <div className="row align-items-center">
          <div className="col-12 col-sm-6 align-self-center">
            <img className="loginImg" src={LoginImg} alt="LoginImg"></img>
          </div>
          <div className="col-12 col-sm-6">
            <div className="gradient">
              <Login />
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
