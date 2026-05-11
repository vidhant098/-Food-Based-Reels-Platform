import React, { useEffect, useRef } from 'react'

const ReelVideo = ( { url, isActive, shouldLoad }) => {  
  

     const videoRef = useRef(null) ; 
      
      
      useEffect(  ()=>{

        if(!videoRef.current || !shouldLoad)return ; 

         if(isActive) {
             videoRef.current.load();
             videoRef.current.play().catch(()=>{})  ; 

         } 
         else{
            videoRef.current.pause() ; 
         }

      } , [isActive, shouldLoad])

      if (!shouldLoad) {
        return <div className="reelvideo reelvideo-placeholder" />;
      }


  return (
    
          
  <video

    ref={videoRef} 
    src={url}
    muted
    playsInline
    preload={isActive ? 'auto' : 'metadata'}
    loop 
    className="reelvideo"

/>
    

        
    
  )
}

export default ReelVideo
