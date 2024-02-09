
import React from 'react'
import ReactDOM from 'react-dom';
import '../pages/Common.css'
import './component.css'
 function DeleteConform({ isOpen, onClose ,onConfirm,content}) {
    if (!isOpen) return null;
  
    return ReactDOM.createPortal(
      <div className="modal">
        <div className="modal-content " >
            <div className='delete-header'>
          <h3 style={{color:'#fff',margin:'0',fontSize:'1.1rem'}}>Are you sure to Delete?  ......</h3>
          </div>
          <form style={{padding:'20px'}} >
            <h5>Are you sure to delete  {content} !!!!</h5>
            <button className='mbtn mbtn-delete' onClick={onConfirm}>Delete</button>
          <button style={{marginLeft:'10px'}} className='mbtn mbtn-close' onClick={onClose}>Close</button>
          </form>
        </div>
       
      </div>,
      document.getElementById('modal-root')
    );
}


export default DeleteConform