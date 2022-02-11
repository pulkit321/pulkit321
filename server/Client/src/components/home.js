import React, { Component } from 'react';
import TileHomeToDo from './tilehomeToDo'
import NavigationBar from './navbar';
import TileFindHome from './tilehomeFind';
import Profile from './profile_home'
import { MdModeEdit } from 'react-icons/md';
import Projects_Card from './ongoing_projects_card';
import {FaPlusCircle} from 'react-icons/fa';
import {Modal,Button,Form} from 'react-bootstrap';
import Footer from './footer';
import axios from 'axios';
import { Link } from "react-router-dom";

import ls from 'local-storage'

class Home extends Component {
  constructor(props){
    super(props);
    this.onChangeTodo = this.onChangeTodo.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDesc = this.onChangeDesc.bind(this);
    this.onChangePublic = this.onChangePublic.bind(this);
    this.onChangeMname = this.onChangeMname.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.todolists = this.todolists.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitProject = this.onSubmitProject.bind(this);
    this.addmember = this.addmember.bind(this);
    this.state = {
      show:false,
      todo: {
        task: ''
      } ,
      todolists: [],
      peoples: [],
      name: '',
      description: '',
      ispublic: true,
      mname: '',
      role: '',
      projects: [],
      projectid: ''
     }
  }

  handleModal()
    {
        this.setState({show:!this.state.show})
    }

  onChangeTodo(e){
    this.setState({
      todo: {
        task: e.target.value
      }
    })
  }
  onChangeName(e){
    this.setState({
      name: e.target.value
    })
  }

  onChangeDesc(e){
    this.setState({
      description: e.target.value
    })
  }
  onChangePublic(e){
    this.setState({
      ispublic: e.target.value
    })
  }
  onChangeMname(e){
    this.setState({
      mname: e.target.value
    })
  }
  onChangeRole(e){
    this.setState({
      role: e.target.value
    })
  }


  todolists=()=>{
    return(
      this.state.todolists.map(obj=>{
        return <TileHomeToDo tod={obj}/>
      })
    )
  }

  componentDidMount(){

    axios.post('http://localhost:8000/auth/me',{uid: ls.get('uid')})
      .then(res=>{
        console.log(res.data)
      })
      .catch(err=>console.error(err))

    axios.post('http://localhost:8000/register/getprof', {uid: ls.get('uid')})
    .then(response => {
      // console.log(response.data.profs)
    this.setState({ peoples: response.data.profs })

    axios.post('http://localhost:8000/project/userprojects',{username: ls.get('username')})
      .then(res=>{
        this.setState({projects: res.data.projecs})
      })
      .catch(err=>console.error(err))


  })
  .catch((error) => {
    console.log(error);
  })

    axios.post('http://localhost:8000/todo/mytodo1',{uid: ls.get('uid')})
    .then(res=>{
      this.setState({
        todolists: res.data.tasks

      })
      console.log(this.state)
    })
    .catch(err=>{console.error(err)})
  }
  onSubmit(e){
     e.preventDefault();
    const work = {
      tasks: this.state.todo,
      uid: ls.get('uid')
    }
    axios.put('http://localhost:8000/todo/personalToDo/add', work).then(res => {
      console.log(res);
      window.location.reload()
    }).catch(err => {
      console.log(err)
    });

    /*axios.get('http://localhost:8000/todo/getpersonaltodo').then(response => {
      this.setState({
        todolists: response
      })
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
    this.forceUpdate();*/


  }
  onSubmitProject(e)
  {
    e.preventDefault();
    const project ={
      name: this.state.name,
      description: this.state.description,
      isPublic: this.state.ispublic
    }
    axios.post('http://localhost:8000/project/add', project).then(res => {
      console.log(res)
      this.setState({projectid: res.data.mem._id})
      const update ={
        projectid: this.state.projectid,
        userid: ls.get('uid'),
        name: ls.get('username'),
        role: "leader"
      }
      //alert(this.state.mname)
      axios.put('http://localhost:8000/project/add_member', update).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })

      //console.log(this.state.projectid)
    }).catch(err => {
      console.log(err)
    });

    /*const update ={
      projectid: this.state.projectid,
      userid: ls.get('uid'),
      name: ls.get('username'),
      role: "leader"
    }
    alert(this.state.projectid)
    //alert(this.state.mname)
    axios.put('http://localhost:8000/project/add_member', update).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })*/


  }
  addmember(){
    const update ={
      projectid: this.state.projectid,
      name: this.state.mname,
      role: this.state.role
    }
    axios.put('http://localhost:8000/project/add_members', update).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  peopl(){
    return this.state.peoples.map(people => {
      return <TileFindHome people={people}/>
    })
  }
  pros(){
    return this.state.projects.map(project => {
      return <Projects_Card project={project} />
    })
  }


    render() {
        return (
            <div>
                <NavigationBar />

                <div className="home">
                    <div className="home_card grid1">
                    <div className="row mr-0">
                            <h4 className="card_heading col-10">PROFILE</h4>

                            <Link id="todo_btn" to="/editprofile"><i><MdModeEdit /></i></Link>
                        </div>
                        <Profile />
                    </div>
                    <div className="home_card grid2">
                        <h4 className="card_heading">TO-DO LIST</h4>
                        <div className="row">
                          <form className="col-11" onSubmit={this.onSubmit}>
                          <input className="inputtodo" type="text" placeholder="ADD TASK"  onChange={this.onChangeTodo} />

                          <i className="todo_btn" onClick={this.onSubmit}><FaPlusCircle /></i>

                          </form>
                          <div className="col-12">
                          {this.todolists()}
                          </div>
                          </div>
                    </div>
                    <div className="home_card grid3">
                        <h4 className="card_heading">FIND PEOPLE</h4>
                        <div className="row">
                            {this.peopl()}
                        </div>
                    </div>
                    <div className="home_card grid4">
                    <div className="row mt-2">
                            <h4 className="card_heading col-10">PROJECTS WORKING ON</h4>
                            {/*<button className="card_heading_btn_prj col-1 mt-2 mb-2 ">+</button>*/}
                            <i className="todo_btn"  onClick={this.handleModal}><FaPlusCircle /></i>
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
                        </div>
                        <div className="row">
                          {this.pros()}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
         );
    }
}

export default Home;
