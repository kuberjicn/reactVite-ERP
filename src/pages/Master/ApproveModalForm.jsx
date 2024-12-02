
import React from 'react'
import ReactDOM from 'react-dom';
import '../Common.css'
import '../../component/component.css'

function ApproveModalForm({isOpen, onClose ,onConfirm,content,onCloseWithAction}) {
  const handleConfirm = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    onConfirm(); // Call the onConfirm callback passed as a prop
    onCloseWithAction(e)
  };
    if (!isOpen) return null;
  
    return ReactDOM.createPortal(
      <div className={`modal ${isOpen ? 'active' : ''}`}>
        <div className={`modal-content ${isOpen ? 'active' : ''}`} style={{width:'400px'}} >
            <div className='approve-header'>
          <h3 style={{color:'#fff',margin:'0',fontSize:'1.1rem'}}>Are you sure to Approve?  ......</h3>
          </div>
          <form style={{padding:'20px'}} >
            <h5>Are you sure to Approve  {content} !!!!</h5>
            <button className='mbtn mbtn-approve' onClick={handleConfirm}>Approve</button>
          <button style={{marginLeft:'10px'}} className='mbtn mbtn-close' onClick={onClose}>Close</button>
          </form>
        </div>
       
      </div> ,
      document.getElementById('modal-root')
    )
}

export default ApproveModalForm
