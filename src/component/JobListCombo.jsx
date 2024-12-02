

import React, {useState,useEffect} from 'react'

function JobListCombo({val,handleJobChanged}) {
  const [jobid,setjobid]=useState(val?val:'')

  useEffect(() => {
    setjobid(val)
    }, [val,]);

  return (
    <div>
      <label className='form-label' htmlFor='job'>Job Title :<span style={{color:'red'}}>*</span></label>
      <select id="job" name="job" className="form-input site-dropdown combo-fontweight"  onChange={(e)=>handleJobChanged(e)}  value={jobid}   >
                    <option style={{fontWeight:'500',color:'#000', backgroundColor:'#dadada',textTransform:'capitalize',fontSize:'1.0rem'}} value='' key='Select Post' disabled >Select Post</option>
                    <option value='Sr. Accountant' key='Sr. Accountant'  >Sr. Accountant</option>
                    <option value='Clark' key='Clark' >Clark</option>
                    <option value='Store Incharge' key='Store Incharge' >Store Incharge</option>
                    <option value='Sr. Supervisor' key='Sr. Supervisor' >Sr. Supervisor</option>
                    <option value='Jr. Engineer' key='Jr. Engineer' >Jr. Engineer</option>
                    <option value='Peon' key='Peon' >Peon</option>
                    <option value='Supervisor' key='Supervisor' >Supervisor</option>
                    <option value='Driver' key='Driver' >Driver</option>
                    <option value='Purchase Manager' key='Purchase Manager' >Purchase Manager</option>
                    <option value='Site Incharge' key='Site Incharge' >Site Incharge</option>
                    <option value='Sr. Engineer' key='Sr. Engineer' >Sr. Engineer</option>


                    
            </select>
    </div>
  )
}

export default JobListCombo
