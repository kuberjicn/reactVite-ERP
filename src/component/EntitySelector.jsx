
import React from 'react'
import "./component.css";

function EntitySelector({onddchange}) {
  return (
    <>
        <select className="site-dropdown form-input combo-fontweight" defaultValue={'employee'} onChange={(e)=>onddchange(e)}>
              <option value={"employee"}  >Employee</option>
              <option value={"supplier"}  >Supplier</option>
              <option value={"contractor"}>Contractor</option>
            </select>
    </>
  )
}

export default EntitySelector