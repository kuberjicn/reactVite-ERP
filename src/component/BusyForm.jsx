import React from 'react'
import ReactDOM from 'react-dom';
import '../pages/Common.css'
function BusyForm({isShow}) {

    if (!isShow) return null;

    

  return ReactDOM.createPortal (
    <div className='modal'>
        <div className='modal-img '>
            <img className='rotate' src="../images/7948.png" alt="" width='64px' />
           
        </div>
      
    </div>,
     document.getElementById('modal-root')
  )
}

export default BusyForm
