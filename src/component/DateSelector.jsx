import React, {useState,useEffect} from 'react'


function DateSelector({initialvalue,onDateChange,name}) {

  

  const handleFocus = (e) => {
    e.target.select(); // Select all text in the input field
  };

  const handleChange=(e)=>{
    const newValue = e.target.value;
    
    onDateChange(e)
    
  }
  return (
    <div>
      <input name={name} className='form-control form-input combo-fontweight' type="date" onFocus={handleFocus} value={initialvalue}  onChange={handleChange} />
    </div>
  )
}

export default DateSelector
