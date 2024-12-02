import React from 'react'

function ConcreteTypeSelector({initialvalue='m20',onddchange,name}) {
  return (
    <>
         <label className='form-label'>Concrete Type :<span style={{color:'red'}}>*</span></label>
        <select  name={name}  className="site-dropdown form-input combo-fontweight" value={initialvalue}  onChange={(e)=>onddchange(e)}>
              <option value={'m10'}  >M10</option>
              <option value={'m15'}  >M15</option>
              <option value={'m20'}  >M20</option>
              <option value={'m25'}  >M25</option>
              <option value={'m30'}  >M30</option>
              <option value={'m35'}  >M35</option>
            </select>
    </>
  )
}


export default ConcreteTypeSelector
