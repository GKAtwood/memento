import React, { Component } from 'react';
import {Link} from 'react-router-dom';


export default class GalleryItem extends Component {
    render(props){
        return (this.props.entry.type === "photo" ?
                                
        <Link to={`/dashboard/gallery/${this.props.entry.eid}`}><div className="entry-holder">
                <div className="entry-body">
                    <img src={this.props.entry.image} alt={this.props.entry.title}/>
                </div>
                <c>{this.props.entry.title}</c><br/>
                {this.props.entry.location}, {this.props.entry.year} 
                </div></Link>
        :
        <Link to={`/dashboard/gallery/${this.props.entry.eid}`}><div className="entry-holder">
                <div className="entry-body">
                    {this.props.entry.journal.substr(0,400)}
                </div>
                <c>{this.props.entry.title}</c><br/>
                {this.props.entry.location}, {this.props.entry.year} 
            </div></Link>)
        
    }   
} 