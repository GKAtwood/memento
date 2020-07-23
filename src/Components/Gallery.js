import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default class Gallery extends Component {

 
    render(props) {

        return (
            <div className = "gallery-header">
                <h1>Your memories</h1>
                <h3>Kind of girly with a little bit of edge</h3>
                <div className="add-box">
                    <Link to="/dashboard/addentry/photo"><button className="big-button">+ photo</button></Link>
                    <Link to="/dashboard/addentry/journal"><button className="big-button">+ journal</button></Link>
                </div>
              
                <div className="gallery-container">
                   
                </div>
            </div>
        )
    }
}