import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Comment from './comment';
import {Link} from 'react-router-dom'


class Discussion_Cards extends Component {
    state = {  }
    render() { 
        var {des, title, upvotes, id, msg, msgg}= this.props
        var linkTo= "/topic/"+id
        return ( 
            <div className="container discussion">
                <div className="row">
                    <h3 className="col-6 col-sm-9">{title}</h3>
                    <Button className="col-4 col-sm-2" id="discussion_btn"><Link id="discussion_btn_text" to={linkTo}>Join Discussion</Link></Button>
                    
                </div>
                <p>{des}</p>
                <h4>upvotes: {upvotes}</h4>
                <Comment from={msg.sender} msg={msg.message} />
                <Comment from={msgg.sender} msg={msgg.message} />
               
                
            </div>
         );
    }
}
 
export default Discussion_Cards;