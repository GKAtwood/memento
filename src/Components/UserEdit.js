  
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {login} from '../ducks/reducer';
import axios from 'axios';



class UserEdit extends Component {
    constructor(){
        super();
        this.state = {
            firstName: '',
            lasteName: '',
            email: '',
            password: '',
            
            aa: false,
            bb: false,
            cc: false,
            dd: false,
            
        };
        this.edit=this.edit.bind(this)
    }

    edit(firstName, lastName, email, password, pic){
        var user = {firstName:firstName||this.props.user.firstName, lastName:lastName||this.props.user.lastName, email: email||this.props.user.email, password:password||this.props.user.password, pic:pic||this.props.user.pic}
        axios.put(`/api/memento/users/${this.props.user.uid}`, user).then(res=>{
                this.props.login(res.data.user);
                this.browser.history.push('/dashboard/gallery');
            }).catch(error=>{
                console.log(error)
            })
    }

    render() {
        console.log(this.state)
        return (
            <div className="user-edit-page">

                <div className="reg-container">
                    <big>Update your deets below</big><br/><br/>
                    <div className="align-input-fields">
                    FIRST NAME<br/>{this.props.user.firstName} &nbsp;
                    <button onClick={e=>this.setState({aa:true})}>edit</button> 
                    {this.state.aa && 
                    <input placeholder={this.props.user.firstName} onChange={event=>{this.setState({firstName: event.target.value})}}/>}<br/><br/>

                    LAST NAME <br/>{this.props.user.lastName} &nbsp;
                    <button onClick={e=>this.setState({bb:true})}>edit</button>
                    {this.state.bb && 
                    <input placeholder={this.props.user.lastName} onChange={event=>{this.setState({lastName: event.target.value})}}/>}<br/><br/>

                    EMAIL <br/>{this.props.user.email} &nbsp;
                    <button onClick={e=>this.setState({cc:true})}>edit</button>
                    {this.state.cc && 
                    <input type="email" placeholder={this.props.user.email}  onChange={event=>{this.setState({email: event.target.value})}}/>}<br/><br/>

                    PASSWORD <br/>
                    <button onClick={e=>this.setState({dd:true})}>edit</button>
                    {this.state.dd && 
                    <input type="password"  onChange={event=>{this.setState({password: event.target.value})}}/>}<br/><br/>

                    *By clicking submit, you consent to sharing your info.<br/>
                        <button className="big-button" onClick={event=>{this.edit(this.state.firstName, this.state.lastName, this.state.email,this.state.password)} }>Submit</button>  
                    </div>
                </div>

                <div className="prof-pic-big"><img src="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f13d2595-f83b-4330-bf3f-7edc411502d7/69.jpg" alt="prof pic"/></div>
            </div>
        );
    }
}
 
function mapStateToProps (state) {
    return {
        user: state.user
      }
}
const mapDispatchToProps = {
    login: login
  }

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);