import React, {useState} from 'react';
import GalleryItem from './GalleryItem';




export default props => {
    console.log(props)

    return(
        <div className='board'>
        <h1>Share on social media</h1>
        

        <div className="gallery-container">
                    {props.entries.map(entry=><GalleryItem key={entry.eid} entry={entry}/>)}
                    
                </div>
            </div>
       

     

   
    )
}



// function Connect
//     constructor(props){
//         super(props);
//         this.state = {
//             entries: [],
            
//             };  
        
//         };
    

 
    

//     render() {
// console.log(this.props)
//         return (
//             <div>
//                 <div className='board'>
//                     <h1>What inspires you?</h1>
//                     <h3>Share on social media</h3>
                  
//                 </div>
//                </div>
//         )}}