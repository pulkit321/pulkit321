import React from 'react';
import axios from 'axios';
import { Component } from 'react';
import { Form,Button } from 'react-bootstrap';
import ls from 'local-storage'

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.onChangeFile = this.onChangeFile.bind(this);
    this.onChangeBranch = this.onChangeBranch.bind(this);
    this.onChangeTellus = this.onChangeTellus.bind(this);
    this.onChangeSkills = this.onChangeSkills.bind(this);
    this.onChangeGithub = this.onChangeGithub.bind(this);
    this.onChangeIntfeilds = this.onChangeIntfeilds.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleState = this.toggleState.bind(this);

    this.state = {
      profileImg: '',
      branch: '',
      tellus: '',
      skills: '',
      github: '',
      intfeilds: [],
      toggle: false
    }
  }

  toggleState() {
    this.setState({
      toggle:!this.state.toggle}
      )
  }

  /*componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }*/

  onChangeFile(e) {
    this.setState({
      profileImg: e.target.files[0]
    })
  }
  onChangeBranch(e) {
    this.setState({
      branch: e.target.value
    })
  }
  onChangeSkills(e) {
    this.setState({
      skills: e.target.value
    })
  }
  onChangeTellus(e) {
    this.setState({
      tellus: e.target.value
    })
  }
  onChangeGithub(e) {
    this.setState({
      github: e.target.value
    })
  }
  onChangeIntfeilds(e)
  {
    const options = this.state.intfeilds
    let index

   // check if the check box is checked or unchecked
   if (e.target.checked) {
     // add the numerical value of the checkbox to options array
     options.push(e.target.value)
   } else {
     // or remove the value from the unchecked checkbox from the array
     index = options.indexOf(e.target.label)
     options.splice(index, 1)
   }

   // update the state with the new array of options
   this.setState({ intfeilds: options })
  }

  onSubmit(e) {
    e.preventDefault();
    /*axios.post('http://localhost:8000/auth/me',{uid: ls.get('uid')})
      .then(res=>{
        this.setState({uid: res.data._id})
        console.log(res.data)
      })
      .catch(err=>console.error(err))*/

    const formData = new FormData()
        formData.append('profileImg', this.state.profileImg)
        formData.append('branch', this.state.branch)
        formData.append('tellus', this.state.tellus)
        formData.append('skills', this.state.skills)
        formData.append('github', this.state.github)
        formData.append('intfeilds', this.state.intfeilds)
        formData.append('uid', ls.get('uid'))
    console.log(formData);

    axios.put('http://localhost:8000/register/user-profile', formData)
      .then(res => console.log(res.data)).catch(err => {
        console.log(err)
      });

    window.location = '/home';
  }
    render() {
        return (
            <div className="container">
                <h1 className="heading">Team<span>UP</span>.</h1>
                <div className="container edit_profile">
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label className="edit_profile_text">Your Image</Form.Label>
                        <Form.Control  className="edit_profile_text" onChange={this.onChangeFile} type="file" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label className="edit_profile_text">Select Your Branch</Form.Label>
                        <Form.Control as="select" custom onChange={this.onChangeBranch}>
                        <option value="COE">COE</option>
                        <option value="CSE">CSE</option>
                        <option value="ENC">ENC</option>
                        <option value="ECE">ECE</option>
                        <option value="ME">ME</option>
                        <option value="CE">CE</option>
                        <option value="BT">BT</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.Description">
                        <Form.Label className="edit_profile_text">Tell us about yourselves</Form.Label>
                        <Form.Control as="textarea" rows="3" value={this.state.tellus} onChange={this.onChangeTellus}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="edit_profile_text">Select the fields you are interested to work in</Form.Label>
                            <Form.Check  className="edit_profile_text" type="radio" label="Machine Learning" aria-label="radio 1" value="Machine Learning" onChange={this.onChangeIntfeilds}/>
                            <Form.Check  className="edit_profile_text" type="radio" label="Web Development" aria-label="radio 1" value="Web Development" onChange={this.onChangeIntfeilds}/>
                            <Form.Check  className="edit_profile_text" type="radio" label="Android App Development" aria-label="radio 1" value="Android App Development" onChange={this.onChangeIntfeilds}/>
                            <Form.Check  className="edit_profile_text" type="radio" label="Blockchain Technology" aria-label="radio 1" value="Blockchain Technology" onChange={this.onChangeIntfeilds}/>
                            <Form.Check  className="edit_profile_text" type="radio" label="Internet of Things" aria-label="radio 1" value="Internet of Things" onChange={this.onChangeIntfeilds}/>
                            <Form.Check  className="edit_profile_text" type="radio" label="Artificial Inteligence" aria-label="radio 1" value="Artificial Intelligence" onChange={this.onChangeIntfeilds}/>
                            <Form.Check  className="edit_profile_text" type="radio" label="Games Development" aria-label="radio 1" value="Games Development" onChange={this.onChangeIntfeilds}/>
                            <Form.Check  className="edit_profile_text" type="radio" label="Competitive Coding" aria-label="radio 1" value="Competitive Codiing" onChange={this.onChangeIntfeilds}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.Skills">
                        <Form.Label className="edit_profile_text">skills</Form.Label>
                        <Form.Control as="textarea" rows="3" value={this.state.skills} onChange={this.onChangeSkills}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.">
                        <Form.Label className="edit_profile_text">Git-Hub profile</Form.Label>
                        <Form.Control as="input" value={this.state.github} onChange={this.onChangeGithub}/>
                    </Form.Group>
                    <Button className="edit_profile_button" type="submit">
                            Submit
                    </Button>
                </Form>
                </div>

            </div>

         );
    }
}

export default EditProfile;
