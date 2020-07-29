import React, {useState} from 'react';



export default props => {
    console.log(props)
    let now = new Date();
    let hrs = now.getHours();
    let msg = "";

if (hrs >  0) msg = "Good Morning Sunshine!"; 
if (hrs >  6) msg = "Good Morning";     
if (hrs > 12) msg = "Good Afternoon";    
if (hrs > 17) msg = "Good Evening";     
if (hrs > 22) msg = "Go to bed!";        


 
    return(
        <div>
        
        Ciao Bella! {msg}
   
        </div>

     

   
    )
}