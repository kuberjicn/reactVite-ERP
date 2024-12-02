import React from 'react'

function SampleCountSelector({initialvalue,onddchange,name}) {
  return (
    <>
        
        <select  name={name} className="site-dropdown form-input combo-fontweight" value={initialvalue}  onChange={(e)=>onddchange(e)}>
              <option value={1}  >One</option>
              <option value={2}  >Two</option>
              <option value={3}  >Three</option>
              
            </select>
    </>
  )
}


export default SampleCountSelector
