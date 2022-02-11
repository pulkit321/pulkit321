import React, { Component } from 'react';
import Navbar from './navbar';
import Comment from './comment';
import {Button} from 'react-bootstrap';
import {FaArrowAltCircleUp,FaArrowAltCircleDown,FaBookmark} from 'react-icons/fa';
import Footer from './footer';
import axios from 'axios'
import ls from 'local-storage'

class Topic extends Component {
    state = {  }

    componentDidMount(){

        var loc=window.location.href.split('/')
        var did=loc[loc.length-1]
        this.setState({
            ...this.state,
            did: did
        })
        var url='http://localhost:8000/discussion/'+did
        axios.get(url)
            .then(res=>{
                this.setState({
                    dis: res.data
                })
                console.log(this.state.dis)
            })
            .catch(err=> console.log(err))
    }
    insertComment=(e)=>{
        this.setState({
            ... this.state,
            temCom: e.target.value,

        })
    }
    addComment=()=>{
        var comment={
            msg:{
                message: this.state.temCom,
                senderUid: ls.get('uid'),
                sender: ls.get('username')
            },

            did: this.state.did
        }
        axios.put('http://localhost:8000/discussion/participate', comment)
            .then(res=> {
                alert('added')
                window.location.reload()
            })
            .catch(err=> console.error(err))
    }
    vote=(vt)=>{
        var body={
            vote: vt,
            did: this.state.did
        }
        axios.put('http://localhost:8000/discussion/vote', body)
            .then(()=>{
                window.location.reload()
            })
            .catch(err=>console.error(err))
    }

    render() {
        return (
            <div className="discussion_topic">
                <Navbar />
                <div className="container topic">
                    <div className="row">
                        <h3 className="col-10">{this.state.dis? this.state.dis.title: '' }</h3>
                        <i className="topic_icons" onClick={()=>this.vote('up')} ><FaArrowAltCircleUp /></i>
                        <i className="topic_icons" onClick={()=>this.vote('down')} ><FaArrowAltCircleDown /></i>
                        
                    </div>
                    <p>{this.state.dis? this.state.dis.brief: ''}</p>
                    <h4>Upvotes: {this.state.dis? this.state.dis.upvotes: ''}</h4>
                    <h4>Downvotes: {this.state.dis? this.state.dis.downvotes: ''}</h4>
                    <h4>Comments: </h4>
                    <div className="row">
                        <input className="topic_input col-7 col-sm-9 ml-4 mr-2" placeholder="Add Comment" onBlur={this.insertComment} ></input>
                        <Button id="discussion_btn" className="col-3 col-sm-2" onClick={this.addComment} >Add Comment</Button>
                    </div>
                    {
                        this.state.dis?

                            this.state.dis.discussion.map(obj=> (
                                <Comment from= {obj.sender} msg= {obj.message} />

                            ))
                            : null
                    }


                </div>
                <Footer />
            </div>
         );
    }
}

export default Topic;
