import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class Home extends Component {
    render() {
     
  
      return (
        <div className="App-home">
         
          <header className="App-header">
            <div className="App-title"><b><b>Memento</b></b></div>
            <div className="login-box">
             
              <Link to='/login' className="links"><button className="login-home-button"><b>enter</b></button></Link>
              
            </div>
          </header>
          <footer className="home-footer">
            Gabi Atwood @DevMountain Full Stack Immersive Personal Project<br/>
                 </footer>
          
  
          
        </div>
      );
    }
  }   
  
  export default Home; 