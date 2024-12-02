import React from 'react'

function BlockSizeSelector({initialvalue,onddchange,name}) {
  return (
    <>
       
        <select  name={name} className="site-dropdown form-input combo-fontweight" value={initialvalue}  onChange={(e)=>onddchange(e)}>
              <option value={75}  >75 MM</option>
              <option value={100}  >100 MM</option>
              <option value={125}  >125 MM</option>
              <option value={150}  >150 MM</option>
              <option value={200}  >200 MM</option>
              <option value={230}  >230 MM</option>
              <option value={250}  >250 MM</option>
            </select>
    </>
  )
}


export default BlockSizeSelector
