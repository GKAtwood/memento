import React, { Component } from 'react';

import axios from 'axios';
import BoardItem from './BoardItem';

export default class Board extends Component {
    constructor(){
        super();
        this.state = {
            items: [],
            };  
        };
    

    componentDidMount(){

        axios.get(`https://api.unsplash.com/photos/random?client_id=Vf4TsJcCO7cjlLSOMtBrVRpdVZakw9mKvRRc0oqqJqE&query=arts-culture&count=18`).then(resp=>{
        this.setState({
            items: resp.data
           })
           console.log(this.state.entries)
        }).catch(error=>console.log(error))
  
    }
   

    render() {

        return (
            <div className = 'board'>
            <h1>Get Inspired</h1>
            <h3>Art is not what you see, but what you make others see.... - Edgar Degas</h3>
            <div className="gallery-container">
                    {this.state.items.map(item=><BoardItem key={item.id} item={item}/>)}
            </div>
            </div>
        )
    }
}