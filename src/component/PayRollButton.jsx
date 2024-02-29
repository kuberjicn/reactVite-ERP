import '../component/component.css'
import React from 'react'
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";

function PayRollButton({data}) {
  return (
    <>
    {data.map((item)=>(
    <div className='payroll-list' style={{display:'flex',justifyContent:'space-between'}}>
      
      <div className='mbtn mbtn-edit' style={{cursor:'pointer'}} key={item.Pls_id}>
       {item.st_date} To {item.ed_date}  
      </div>
      
      <div >
      <button className="mbtn mbtn-edit" title='refresh' >
      <RiDeleteBin6Line size={18} />
          </button>
          </div>
          
    </div>
    ))}
    </>
  )
}

export default PayRollButton
