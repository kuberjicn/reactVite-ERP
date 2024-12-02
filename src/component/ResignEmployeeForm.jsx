
import React from 'react'
import ReactDOM from 'react-dom';
import '../pages/Common.css'
import './component.css'
 function ResignEmployeeForm({ isOpen, onClose ,onConfirm,content,isresign}) {
  //console.log(isresign)
    if (!isOpen) return null;
  
    return ReactDOM.createPortal(
      <div className={`modal ${isOpen ? 'active' : ''}`}>
        <div className={`modal-content ${isOpen ? 'active' : ''}`} style={{width:'350px'}} >
            <div className='delete-header'>
          <h3 style={{color:'#fff',margin:'0',fontSize:'1.1rem'}}>Are you sure to {isresign ==='posted'? 'Resign': 'Re-join'} this Employee?  ......</h3>
          </div>
          <form style={{padding:'20px'}} >
            <h5>Are you sure to {isresign ==='posted'? content: 'Re-join'} !!!!</h5>
            <button className='mbtn mbtn-delete' onClick={onConfirm}>{isresign ==='posted'? 'Make Resigned': 'Re-join'}</button>
          <button style={{marginLeft:'10px'}} className='mbtn mbtn-close' onClick={onClose}>Close</button>
          </form>
        </div>
       
      </div>,
      document.getElementById('modal-root')
    );
}


export default ResignEmployeeForm