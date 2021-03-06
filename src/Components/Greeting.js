import React, {useState, useEffect} from 'react';





export default props => {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setDateTime(new Date()), 1000);
        return () => {
            clearInterval(id);
        }
    }, []);

 
    
    let now = new Date();
    let hrs = now.getHours();
    let msg = "";

if (hrs >  0) msg = "Good Morning Sunshine"; 
if (hrs >  6) msg = "Good Morning";     
if (hrs > 12) msg = "Good Afternoon";    
if (hrs > 17) msg = "Good Evening";     
if (hrs > 22) msg = "Go to bed";        


 
    return(
        
        <div className ='greeting'>
        
         {msg} <img src="https://www.pngkey.com/png/detail/363-3631438_hi-bubble-welcome-comments-welcome-icon.png" alt="Hello" className="icon"  width="30"/><br/><br/>
        <h4>Today is {`${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`}</h4>
   
        </div>

     

   
    )
    }