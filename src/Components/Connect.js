import React from 'react';
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



