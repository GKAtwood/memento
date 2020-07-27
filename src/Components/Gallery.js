import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default class Gallery extends Component {

 
    render(props) {
console.log(this.props)
        return (
            <div className = "gallery-header">
                <h1>Your memories</h1>
                <h3>Kind of girly with a little bit of edge</h3>
                <div className="add-box">
                    <Link to="/dashboard/addentry/photo"><button className="big-button">+ photo</button></Link>
                    <Link to="/dashboard/addentry/journal"><button className="big-button">+ journal</button></Link>
                </div>
              
                <div className="gallery-container">
                <div className="entry-holder">
            <div className="entry-body">
                <b>Title</b>
               <p>Entry</p>
               <img src="https://images.unsplash.com/photo-1594991384727-e0e1dbf577bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60" alt={props}/>
            </div>
            <c>Location</c>
            <p>Year</p>
           
        </div>
                </div>
            </div>
        )
    }
}