import React from 'react'

function DayPartSelector({initialvalue='sh',onddchange}) {
  return (
    <>
         <label className='form-label'>Day Part:<span style={{color:'red'}}>*</span></label>
        <select className="site-dropdown form-input" value={initialvalue}  onChange={(e)=>onddchange(e)}>
              <option value={'fh'}  >First Half</option>
              <option value={'sh'}  >Second Half</option>
             
            </select>
    </>
  )
}


export default DayPartSelector
