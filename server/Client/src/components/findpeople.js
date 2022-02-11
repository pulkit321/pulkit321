import React, { Component } from 'react';
import NavigationBar from './navbar';
import FindTile from './find_tiles';
import FindNav from './find_nav';
import Footer from './footer';
import axios from 'axios';
import ls from 'local-storage'
class Find extends Component {
    constructor(props){
      super(props);
      this.state = {
        peoples: []

       }
    }

    componentDidMount(){
     // ls.remove('people_filter')
      axios.post('http://localhost:8000/register/getprof',{uid: ls.get('uid')})
      .then(response => {
        console.log(response.data.profs)
        var filtered =[]
        if(ls.get('people_filter')!=''){
          response.data.profs.map(obj=>{
            try {
              if(obj.interestedfeilds.toLowerCase().includes(ls.get('people_filter')) )
              filtered.push(obj)
            } catch (err) {
              console.error(err)
            }

          })
        } else{
          filtered= response.data.profs
        }

      this.setState({ peoples: filtered })

    })
    .catch((error) => {
      console.log(error);
    })
    }
    peopl(){
      return this.state.peoples.map(people => {
        return <div className="col-12 col-md-3">
        <FindTile people={people}/>
        </div>
      })
    }
    render() {
        return (
            <div>
                <NavigationBar />
                <FindNav />
                <div className="container find">
                    <div className="row">

                        {this.peopl()}
                </div>

                </div>
                <Footer />
            </div>
         );
    }
}

export default Find;
