import React, { Component } from 'react';
import axios from 'axios';
import {Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../ducks/reducer'
import Gallery from './Gallery';
import UserEdit from './UserEdit';
import Board from './Board';
import AddEntry from './AddEntry';
import Connect from './Connect'
import Greeting from './Greeting'
import Viewer from './Viewer'



class Dashboard extends Component{
    constructor(){
        super();
        this.state = {
            entries: [],
            
            };  
        this.logout=this.logout.bind(this)
        };

   

        componentDidMount(){
            axios.get('/api/memento/users').then(res=>{
                this.props.login(res.data);
                axios.get(`/api/memento/entries/get?uid=${this.props.user.uid}`).then(resp=>{
                    this.setState({
                        entries: resp.data
                       })
                       console.log(this.state.entries)
                    }).catch(err=>console.log(err))
            }).catch(err=>{
                console.log('session does not exist', this.state.isLoggedIn);
                this.setState({entries: []})
                this.props.history.push('/login')
            })
          
        }

        
     
    
        logout() {
            
            axios.delete('/api/memento/auth/logout')
            .then(()=>{
                this.props.logout()
            })
            .catch(err => console.log(err));
        
          }
    


   render(){
    let name = ""
    if (this.props.user !== undefined){
       name=this.props.user.firstname;
    }
    return(
        <div className="dashboard">
                
                <main>
                
                <div className="dash-greeting">
                    <div className="prof-pic-small"><img src="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f13d2595-f83b-4330-bf3f-7edc411502d7/69.jpg" alt=""/></div><Greeting user={this.props.user}/>{name}!
                </div>
                    <Route path='/dashboard/gallery' render={()=><Gallery entries={this.state.entries}/>}/>
                    <Route path="/dashboard/board" component={Board}/>
                    <Route path='/dashboard/addentry/:type' component={AddEntry}/>
                    <Route path='/dashboard/viewer/:eid' component={Viewer}/>
                    <Route path='/dashboard/useredit' component={UserEdit}/>
                    <Route path="/dashboard/share" render={()=><Connect entries={this.state.entries}/>}/>
               
               

                </main>
                <aside className="all-header">
                    <div className="all-title"><Link to="/dashboard/gallery"><b>Memento</b></Link></div>
                    <div className="user-box">
                        <Link to='/dashboard/share'><img src="https://icons-for-free.com/iconfiles/png/512/friends+icojam+link+material+send+share+icon-1320184943953279931.png" alt="Share on Social Media" className="icon"  width="30"/></Link>
                        <Link to='/dashboard/board'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQl679HqNTHtCIGPWQ60ca5TdYB5GG7mSBhFQ&usqp=CAU" alt="Inspiration" className="icon"  width="30"/></Link>
                        <Link to='/dashboard/useredit'><img src="https://image.flaticon.com/icons/png/512/84/84380.png" alt="user edit" className="icon" width="30"/></Link>
                        <Link to ='/'><img src="data:image/png;base64,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" width="30"  alt ="logout" className="icon" onClick={this.logout}/></Link>
                        
                    </div> 
                </aside>
            </div>
        )
    }}


const mapStateToProps = state => {
    return {
      user: state.user
    }
  }
  const mapDispatchToProps = dispatch => {
    return{
        login: (user) => dispatch(login(user))
    
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);