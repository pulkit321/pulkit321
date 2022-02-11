import React, { Component } from 'react';

class Comment extends Component {
    state = {  }
    render() { 
        return ( 
            <div class="comment">
                <h5> {this.props.from}</h5>
                <p>{this.props.msg}</p>
            </div>
         );
    }
}
 
export default Comment;