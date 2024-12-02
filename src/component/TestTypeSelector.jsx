import React from 'react'

function TestTypeSelector({initialvalue='seven',onddchange,name}) {
  return (
    <>
         <label className='form-label'>Test Type :<span style={{color:'red'}}>*</span></label>
        <select  name={name}   className="site-dropdown form-input combo-fontweight" value={initialvalue}  onChange={(e)=>onddchange(e)}>
        <option value={'three'}  >Three Days</option>
          
              <option value={'seven'}  >Seven Days</option>
              <option value={'twentyeight'}  >Twenty-Eight Days</option>
              
            </select>
    </>
  )
}


export default TestTypeSelector
