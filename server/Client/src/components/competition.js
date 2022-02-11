import React, { Component } from 'react';
import Competition_Img from '../images/competitions.svg';
import Navbar from './navbar';
import Comp_Card from './comp_card';
import Footer from './footer';

class Competition extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Navbar />
                <div className="container competition">
                    <div className=" row heading_competition">
                        <h1 className="col-12 col-md-5" >Find the Competitions you can <span>Participate</span> in.</h1>
                        <img className="col-12 col-md-6 competition_img" src={Competition_Img}></img>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-3">
                            <Comp_Card />
                        </div>
                        <div className="col-12 col-md-3">
                            <Comp_Card />
                        </div>
                        <div className="col-12 col-md-3">
                            <Comp_Card />
                        </div>
                        <div className="col-12 col-md-3">
                            <Comp_Card />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            
         );
    }
}
 
export default Competition;
