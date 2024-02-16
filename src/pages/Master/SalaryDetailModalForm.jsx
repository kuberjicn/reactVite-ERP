
import React from 'react'
import  ReactDOM  from 'react-dom';
import { CgClose  } from "react-icons/cg";


function SalaryDetailModalForm({onClose,isShow,data}) {
  


  if (!isShow) return null;
  
    return ReactDOM.createPortal(
      <div className="modal">
        <div className="modal-content " >
            <div className='delete-header'>
            <h3 style={{color:'#fff',margin:'0',fontSize:'1.1rem'}}>Are you sure to Delete?  ......</h3>
          <button className='control-btn btn-edit' onClick={onClose}  ><CgClose size={29} /></button>
          </div>
          <form style={{padding:'20px'}} >
            {data.map((item )=>(
                <div key={item.sal_id}>{item.supid_sup_id} {item.supid__sup_name} {item.effect_date}   {item.slry_rate} {item.ta}  {item.hra} {item.da}   {item.post}</div>
            ))}
           


          <button style={{marginLeft:'10px'}} className='mbtn mbtn-close' onClick={onClose}>Close</button>
          </form>
        </div>
       
      </div>,
      document.getElementById('modal-root')
    );
}


export default SalaryDetailModalForm
