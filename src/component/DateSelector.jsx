import React from 'react'


function DateSelector({initialvalue,onDateChange}) {


  return (
    <div>
      <input className='form-control form-input' type="date" value={initialvalue}  onChange={(e)=>onDateChange(e)} />
    </div>
  )
}

export default DateSelector
