  
import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';




export default class Viewer extends Component {
    constructor(){
        super();
        this.state = {
            entry: {}
            };  
        };
    
    componentDidMount () {
        axios.get(`/api/memento/entries/get/${this.props.match.params.eid}`).then(resp=>{
            this.setState({entry: resp.data})
            console.log(this.state.entry)
        }).catch(err=>{console.log(err)})
    }
    

    render() {
console.log(this.state)
        return (
            <div className="Viewer">
                <h1>{this.state.entry.title}</h1>
                <h3>{this.state.entry.location}, {this.state.entry.year}</h3>
                <div id="mob123">{this.state.entry.location}<br/> {this.state.entry.year}</div>
                    {this.state.entry.type==="photo"? 
                    <div id="bigger-image"><img src={this.state.entry.image} alt={this.state.entry.title}/></div>
                : <p>{this.state.entry.journal}</p>}
                <br/>
                <div id="close-delete">
                    <div id="entry-delete"><Link to="/dashboard/gallery">Close</Link></div>
                    <div id="entry-delete" onClick={event=>{
                    axios.delete(`/api/memento/entries/delete/${this.state.entry.eid}`)
                    .then(res=>{console.log('deleted');this.props.history.push('/dashboard/gallery')})
                    .catch(err=>{console.log(err)})}
                    }>Delete this entry</div>
                </div>
            </div>
        )
    }
}