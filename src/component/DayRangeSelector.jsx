import { useState,useEffect } from "react";
import React  from 'react'

function DayRangeSelector({initialvalue=0,handlerangechange}) {
  const [selectedValue, setSelectedValue] = useState(initialvalue);
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value,10);
    setSelectedValue(newValue);
    handlerangechange(e);
  };

  useEffect(() => {
    setSelectedValue(initialvalue);
  }, [initialvalue]);
  return (
    <>
         <label className='form-label'>Day Range:<span style={{color:'red'}}>*</span></label>
        <select className="site-dropdown form-input combo-fontweight" value={selectedValue}  onChange={(e)=>handleChange(e)}>
              <option value={0}  >All</option>
              <option value={7}  >Last Week</option>
              <option value={14}  >Last Two Week</option>
              <option value={30}  >Last Month</option>
              <option value={90}  >Last Three Month</option>
              <option value={180}  >Last Six Month</option>
              <option value={360}  >Last Year</option>
             
            </select>
    </>
  )
}


export default DayRangeSelector
