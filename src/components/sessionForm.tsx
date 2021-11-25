import React from 'react'
const SessionForm: React.FC=()=>{
    const [show , setShow] = React.useState(false)
  return (
      show 
      ?  
      <form>
         <h2>signup</h2>
       </form>
     : 
     <h2 id='intro'
     onClick={(ev):void=>{
         setShow(true)
     }}
    >welcome player ??
    </h2>
    
     
         
      
  )
}
export default SessionForm;