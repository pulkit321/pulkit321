import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Talk from 'talkjs';
import ls from 'local-storage'

export default class Chat extends Component {

    constructor(props) {
        super(props);

        this.inbox1 = undefined;
    }

    componentDidMount() {
        // Promise can be `then`ed multiple times
        Talk.ready
            .then(() => {
                const me = new Talk.User({
                    id: "12345231",
                    name: "Machine Learning Project",
                    email: "sartaj@thapar.edu",
                    photoUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fgroup_166258&psig=AOvVaw0q-PFuqCWBrQ7qeopaCWvg&ust=1595162176646000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIDq36no1uoCFQAAAAAdAAAAABAD",
                    welcomeMessage: "Hey there! How are you? :-)"
                });

                const other = new Talk.User({
                    id: "54321",
                    name: "Machine Learning Project",
                    email: "jai@thapar.edu",
                    photoUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fgroup_166258&psig=AOvVaw0q-PFuqCWBrQ7qeopaCWvg&ust=1595162176646000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIDq36no1uoCFQAAAAAdAAAAABAD",
                    welcomeMessage: "Hey there! Love to chat :-)"
                });

                console.log(this.props.id)

                if(ls.get('uid') == "61ae1b4642e5454960d7d09d")
                {
                if (!window.talkSession) {
                    window.talkSession = new Talk.Session({
                        appId: "tmnOoRS4",
                        me: me
                    });
                }
              }
              else{
                if (!window.talkSession) {
                    window.talkSession = new Talk.Session({
                        appId: "tmnOoRS4",
                        me: other
                    });
                }
              }


            //   this.inbox.destroy();

                /*const other = new Talk.User({
                    id: "54321",
                    name: "Ronald Raygun",
                    email: "ronald@teflon.com",
                    photoUrl: "https://talkjs.com/docs/img/ronald.jpg",
                    welcomeMessage: "Hey there! Love to chat :-)"
                });*/

                // You control the ID of a conversation. oneOnOneId is a helper method that generates
                // a unique conversation ID for a given pair of users.
                const conversationId1 = Talk.oneOnOneId(me, other);

                const conversation1 = window.talkSession.getOrCreateConversation(conversationId1);
                conversation1.setParticipant(me);
                conversation1.setParticipant(other);

                if (this.inbox1) {
                    this.inbox1.destroy();
                }

                
                this.inbox1 = window.talkSession.createInbox({
                    selected: conversation1
                });
                
                this.inbox1.mount(this.container);

            })
            .catch(e => console.error(e));
    }

    componentWillUnmount() {
        if (this.inbox1) {
            this.inbox1.destroy();
        }
    }

    render() {
        return (<span>
            <div style={{height: '500px'}} ref={c1 => this.container = c1}>Loading...</div>
        </span>);
    }
}
