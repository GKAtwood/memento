import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';


class AddEntry extends Component {
    constructor(props){
        super(props);
        this.state = {
            
            type: this.props.match.params.type,
            title: '',
            image: '',
            journal: '',
            location: '',
            year: 0
        };
        this.createEntry = this.createEntry.bind(this);
       
    }


    createEntry(title, image, journal, location, year){
        console.log(this.props.user.uid)
        const entry={
            type: this.props.match.params.type,
            title: title,
            image: image,
            journal: journal,
            location: location,
            year: year,
            uid: this.props.user.uid
        }
        axios.post('/api/memento/entries/create', entry).then(() => {
			this.props.history.push('/dashboard/gallery');
		});
	}

 
 

    render() {
        console.log(this.props.user)

        if (this.props.match.params.type==="photo") {
            return (
                <div className="reg-container">
                    <div className="align-input-fields">
                        TITLE<br/> <input onChange={(e)=>{this.setState({title:e.target.value})}}/><br/><br/>
                        IMAGE URL <br/><input onChange={(e)=>{this.setState({image:e.target.value})}}/> <br/><br/>
                        LOCATION <br/><input onChange={(e)=>{this.setState({location:e.target.value})}}/> <br/><br/>
                        YEAR <br/><input  type="number" min="1969" max="2999" onChange={(e)=>{this.setState({year:e.target.value})}}/>
                    </div><br/><br/>
                        <button className="big-button" onClick={event=>{  this.createEntry(this.state.title,  this.state.image, this.state.journal, this.state.location, this.state.year)} }>Submit</button>
                </div>)
        }
        else if (this.state.type==="journal"){
            return (
                <div className="reg-container">
                    <div className="align-input-fields">
                        TITLE <br/><input onChange={(e)=>{this.setState({title:e.target.value})}}/><br/><br/>
                        JOURNAL ENTRY <br/><textarea  maxLength="1000" id="journal-textbox" onChange={(e)=>{this.setState({journal:e.target.value})}}> </textarea><br/><br/>
                        LOCATION<br/><input onChange={(e)=>{this.setState({location:e.target.value})}}/><br/><br/>
                        YEAR <br/><input type="number" min="1969" max="2999" onChange={(e)=>{this.setState({year:e.target.value})}}/>
                    </div><br/><br/>
                    <button className="big-button" onClick={event=>{this.createEntry(this.state.title,  this.state.image, this.state.journal, this.state.location, this.state.year)} }>Submit</button>
                </div>)
        }
    }
}

const mapStateToProps = state => {
    return {
      user: state.user
    }
  }

export default connect(mapStateToProps)(AddEntry);