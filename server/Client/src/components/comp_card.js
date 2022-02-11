import React, { Component } from 'react';
import {Card,Button} from 'react-bootstrap';

class Comp_Card extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <div className="find_tile">
                    <Card className="find_card">
                        <Card.Body>
                            <Card.Title>Competition</Card.Title>
                            <Card.Text>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                            </Card.Text>
                            <Button className="home_find_button">Register</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
         );
    }
}
 
export default Comp_Card;