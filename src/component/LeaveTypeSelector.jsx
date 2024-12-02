import React from 'react'

function LeaveTypeSelector({initialvalue='casual',onddchange,name}) {
  return (
    <>
        <label className='form-label'>Leave Type:<span style={{color:'red'}}>*</span></label>
        <select className="site-dropdown form-input combo-fontweight" name={name} value={initialvalue}  onChange={(e)=>onddchange(e)}>
              <option value={'casual'}  >Casual Leave</option>
              <option value={'sick'}  >Sick Leave</option>
             
            </select>
    </>
  )
}

export default LeaveTypeSelector
