import React, { Component } from 'react';
import Chat from "./chat"
class Project_Chat extends Component {
    state = {  }
    render() {
        return (
            <div>
                <div className="project_card">
                    <h4 className="col-12 card_heading">CHAT</h4>
                    <Chat id={this.props.id}/>
                </div>
            </div>
        );
    }
}

export default Project_Chat;
