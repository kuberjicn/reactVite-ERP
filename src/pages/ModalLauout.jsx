import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import { CgClose } from "react-icons/cg";
import './Common.css';

function ModalLayout({ onClose, isShow,type='',title='', content,footerContent,nwidth='400px' }) {

    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (!isShow) {
            setIsClosing(true);
            setTimeout(() => {
                setIsClosing(false);
            }, 500); // Duration of the slideOut animation
        }
    }, [isShow]);

    const onModalCloseing=(e)=>{
       
        
        setIsClosing(false)
        onClose()
    }
    
    if (!isShow) return null;

    return ReactDOM.createPortal(
        <div className={`modal ${isShow ? 'active' : ''}`}  >
            <div className={`modal-content ${isShow ? 'active' :isClosing ? 'modal-closing': ''}` } style={{width:nwidth }}>
            <div className='form-header'>
                <h3 style={{ marginBottom: '0', textTransform: 'capitalize', fontSize: '1.3rem', lineHeight: '1.5' }}>
                  {type} {title}
              </h3>
          <button className='btn control-btn ' onClick={onModalCloseing}>
            <CgClose size={22} />
          </button>
        </div>
                <div className="form-body">
                    {content}
                </div>
                <div className="form-footer" style={{display:'flex', justifyContent:'flex-end'}}>
                    {footerContent}
                    <button style={{ marginLeft: '10px', }} className='mbtn mbtn-close' onClick={onModalCloseing}>Close</button>

                </div>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
}

export default ModalLayout;
