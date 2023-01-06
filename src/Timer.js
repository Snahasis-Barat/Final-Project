import React, { useEffect, useState } from 'react'

function Timer() {

    const [time,setTime]=useState("");
    useEffect(()=>{
        
    const timer=setInterval(()=>{
    
     setTime(new Date().toLocaleTimeString());
    },1000);
    return ()=>clearInterval(timer)
    },[]);
    
    
    
  return (
    <div>
       <h4 style={{color:"white"}}>{time}</h4>
    </div>
  )
}

export default Timer