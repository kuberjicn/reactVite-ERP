

import React from 'react'
import "./component.css";

function StatusSelector({onddchange}) {
  return (
    <>
        <select className="site-dropdown form-input" defaultValue={false} onChange={(e)=>onddchange(e)}>
              <option value={false}  >Un-Approved</option>
              <option value={true}  >Approved</option>
             
            </select>
    </>
  )
}

export default StatusSelector