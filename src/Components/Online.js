import useOnlineStatus from '@rehooks/online-status';
import React from 'react';
 
export default function Online(){
  const onlineStatus = useOnlineStatus();
  return (
    <div className='online'>
      <h1>You are {onlineStatus ? "Online" : "Offline"}</h1>
    </div>
  );
}