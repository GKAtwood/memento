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

        axios.get(`https://api.unsplash.com/photos/random?count=10`).then(res=>{
        this.setState({
            items: res.data
           })
           console.log(this.state.entries)
        }).catch(err=>console.log(err))
  
    }

    
   

    render() {
      console.log(this.state)
        return (
            <div className="board">
            <h1>Get some Inspiration</h1>
            <h3>Sometimes you will never know the value of a moment, until it becomes a memory.... - Dr. Seuss</h3>
           
           
          
            <div className="gallery-container">
                   <BoardItem/> 
            </div>
            </div>
        )
    }
}
