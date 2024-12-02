import React, { useEffect, useState } from 'react'
import "./component.css";



const UnitCombo = ({displayvalue,onddChange}) => {

  
  const [unit, setUnit]=useState(displayvalue||'mt')
  useEffect(()=>{
    setUnit(displayvalue)
  },[displayvalue])
  const handleChange=(e)=>{
    const newValue = e.target.value;
    setUnit(newValue);
    onddChange(e)
  }
  //console.log(unit);
  return (
    
    <div >
    <label htmlFor="unit" className='form-label'>Unit<span style={{color:'red'}}>*</span></label>
    
        <select name='unit' className="site-dropdown form-input combo-fontweight" value={unit}  onChange={handleChange}>
          <option value={'cum'}>CUM</option>
          <option value={'sqm'}>SQM</option>
          <option value={'rmt'}>RMT</option>
          <option value={'cft'}>CFT</option>
          <option value={'sft'}>SFT</option>
          <option value={'rft'}>RFT</option>
          <option value={'kg'}>KG</option>
          <option value={'mt'}>MT</option>
          <option value={'lit'}>LIT</option>
          <option value={'bag'}>BAG</option>
          <option value={'nos'}>NOS</option>
          <option value={'box'}>BOX</option>
          <option value={'ls'}>LS</option>
          <option value={'hr'}>Hr</option>



        </select>
            
            </div>  
    
  )
}

export default UnitCombo
