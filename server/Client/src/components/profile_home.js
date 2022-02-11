import React, { Component } from 'react';
import Profile_Img from '../images/test2.png'
import axios from 'axios';
import ls from 'local-storage'
class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      profile: '',
      profileImg: ''
     }
  }
  componentDidMount(){
    axios.post('http://localhost:8000/register/getprofile',{uid: ls.get('uid')}).then(response => {

      this.setState({
        profile: response.data.profile,
        profileImg: response.data.profileImg
      })
      console.log(this.state.profileImg)
    }).catch(err => {
      console.log(err)
    });
  }

    render() {
        return (
            <div className="container">
                <div className="profile col-12">
                    <img className="profile_img" src={this.state.profileImg} alt="abc" />
                    <div className="profile_text">
                        <h2>{this.state.profile.name}</h2>
                        <h3>{this.state.profile.username}</h3>
                        <div className="row">
                          <div className="col-12">
                            <p>{this.state.profile.tellus}</p>
                          </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-6">
                                <h6>Mobile No: {this.state.profile.phone}</h6>
                                <h6>E-Mail: {this.state.profile.mail}</h6>
                                <h6>Skills: {this.state.profile.skills}
                                </h6>
                                <h6>Git-Hub Profile: {this.state.profile.githubprofile}</h6>
                            </div>
                            <div className="col-6">
                                <h5>FIELDS INTERESTED IN</h5>
                                <h6>{this.state.profile.interestedfeilds}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}

export default Profile;
