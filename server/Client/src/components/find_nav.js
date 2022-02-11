import React, { Component } from 'react';
import { Navbar,Dropdown,DropdownButton } from 'react-bootstrap';

import ls from 'local-storage'

class FindNav extends Component {
    state = {  }
    
    setFilter=(e)=>{
        this.setState({
            ppf: e.target.value.toLowerCase()
        })
    }

    filter=()=>{
               
        ls.set("people_filter", this.state.ppf)     
        window.location.reload()
    }
    render() { 
        return (            
        <div>        
            <input className="find_input" onBlur={this.setFilter} />
            <button  className="find_input_btn" onClick={this.filter} >Filter</button>           
        </div>
         );
    }
}
 
export default FindNav;