import React, { Component } from 'react';
import {connect} from 'react-redux';
import {login} from '../ducks/reducer';
import axios from 'axios';
import {Link} from 'react-router-dom';



class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            registered: true,
            firstName: '',
            lastName: '',
            email: '',
            password: ''
            
        }


        this.login=this.login.bind(this)
        this.register=this.register.bind(this)
    }

    login(email, password){
        var user = {"email": email, "password": password}
        axios.post('/api/memento/users/login', user).then(res=>{
                this.props.login(res.data.user);
                this.props.history.push('/dashboard');
            }).catch(res=>{
             
                console.log(res)
            })
    }



    register(firstName, lastName, email, password){
        var user = {"firstName": firstName, "lastName": lastName, "email": email, "password": password}
        axios.post('/api/memento/users/create', user).then(res=>{
                this.props.login(res.data.user);
                this.props.history.push('/dashboard');
            }).catch(res=>{
               
                console.log(res)
            })
    }

    // componentDidMount(){
    //     axios.get('/api/memento/users').then(res=>{
    //     this.props.history.push('/dashboard')
    //     })
    // }

    render() {
        
        return (
            <div className="App-login">
                
                <div className="login-container">
                    
                {this.state.registered ?
                <div className="reg-container">
                    
                    <div className="align-input-fields">
                    EMAIL <br/> <input type="email" onChange={event=>{this.setState({email: event.target.value})}} required /><br/><br/>
                    PASSWORD <br/><input type="password" onChange={event=>{this.setState({password: event.target.value})}} required /> 
                    </div>
                    <br/><br/>
                    <div>
                        <button className="big-button" onClick={this.login}>Submit</button> 
                        <button className="small-button" onClick={event=>{this.setState({registered: false})}}>Sign Up</button>
                    </div>
                </div>
                :
                <div className="reg-container">
                    
                    <div className="align-input-fields">
                    <br/><br/>
                    FIRST NAME <br/><input onChange={event=>{this.setState({firstName: event.target.value})}}/><br/><br/>
                    LAST NAME <br/> <input onChange={event=>{this.setState({lastName: event.target.value})}}/><br/><br/>
                    EMAIL <br/> <input type="email" onChange={event=>{this.setState({email: event.target.value})}}/><br/><br/>
                    PASSWORD <br/> <input  type="password" onChange={event=>{this.setState({password: event.target.value})}}/>            
                    </div>
                    <br/><br/>
                    <div>
                    *Your info is safe with us.<br/>
                        <button className="big-button" onClick={event=>{this.register(this.state.firstName, this.state.lastName, this.state.email,this.state.password)} }>Submit</button>  
                        <button className="small-button" onClick={event=>{this.setState({registered: true})}}>Login instead</button>
                    </div>
                </div>
                }
                </div>
                <header className="login-header">
                    <div className="login-title"><Link to='/'><b><b>Memento</b></b></Link></div>
                </header>
                
            </div>
        );
    }
}
 

const mapDispatchToProps = dispatch => {
    return{
        login: () => dispatch(login())
    }
  }

export default connect(null, mapDispatchToProps)(Login);