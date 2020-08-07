import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import GalleryItem from './GalleryItem'



export default class Gallery extends Component {

 
    render(props) {
console.log(this.props)
        return (
           
            <div className = "gallery-header">
                <h1>Your memories</h1>
                <h3>We don't remember days, we remember moments</h3>
                <div className="add-box">
                    <Link to="/dashboard/addentry/photo"><button className="big-button"> photo</button></Link>
                    <Link to="/dashboard/addentry/journal"><button className="big-button"> journal</button></Link>
                </div>
         
                <div className="gallery-container">
            
                    {this.props.entries.map(entry=><GalleryItem key={entry.eid} entry={entry}/>)}
                </div>
            </div>
            
        )
    }
}
