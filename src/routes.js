import React from 'react'
import {Route} from 'react-router-dom'
import {Switch} from 'react-router-dom'
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Login from './Components/Login';
import Gallery from './Components/Gallery';


export default function Routes(){
    return (
        <Switch>
            <Route exact path= "/" component= {Home}/>
            <Route path = "/dashboard" component= {Dashboard} />
            <Route path = "/login" component={Login}/>
            <Route path = "/dashboard/gallery" component={Gallery}/>

            
        </Switch>
    )
}