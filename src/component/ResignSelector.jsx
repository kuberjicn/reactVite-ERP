import React from 'react'
import "./component.css";
function ResignSelector({onddchange,displayvalue}) {
  //console.log(displayvalue);
  return (
   
    <>
    <div className='d-flex '>
    
    
        <select className="site-dropdown form-input" value={displayvalue}  onChange={(e)=>onddchange(e)}>
        <option value={'posted'}>Active</option>
                <option value={'resign'}>Resigned</option>
                
            </select>
            {/* <h3 style={{marginLeft:'10px',fontSize:'.9rem',marginTop:'5px'}} >Employee</h3> */}
            </div>  
    </>
     
  )
}

export default ResignSelector
