import React from 'react'
import "./component.css";
function ResignSelector({onddchange}) {
  return (
   
    <>
    <div className='d-flex '>
    
    
        <select className="site-dropdown form-input" defaultValue={'posted'} onChange={(e)=>onddchange(e)}>
                
                <option value={'resign'}>Resigned</option>
                <option value={'posted'}>Active</option>
            </select>
            <h3 style={{marginLeft:'10px',fontSize:'.9rem',marginTop:'5px'}} >Employee</h3>
            </div>  
    </>
     
  )
}

export default ResignSelector
