
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import '../Common.css'
import CompanyChange from '../../component/CompanyChange';

import axios from "../../AxiosConfig";
import { Bounce, toast } from 'react-toastify';
import { CgClose  } from "react-icons/cg";
function CompanyModalForm({ isShow, onHide, type, data  }) {


  // console.log( data)
  
  const [companyname, setCompanyname] = useState('')
  const [contactperson, setcontactperson] = useState('')
  const [pan, setpan] = useState('surat')
  const [gst, setgst] = useState('gujarat')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
 
  useEffect(() => {
    if (type === "edit") {
      setCompanyname(data.compname);
      setpan(data.PAN);
      setgst(data.GST);
      setEmail(data.email);
      setPhone(data.phone);
      setcontactperson(data.contactperson);
    } else {
      setCompanyname("");
      setpan("");
      setgst("");
      setEmail("");
      setPhone("");
      setcontactperson("");
    }
  }, [type]);


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    function checkEmail(val){
      if (emailRegex.test(val)){
        return true
      }
      
    }

function checkdata(data){
if (data.compname!=''  && data.email!='' && data.phone!='' && data.contactperson!=''){
  if (checkEmail(data.email))
    return true
  else{
    toast.warning("email in wrong format",{closeOnClick: true,transition:Bounce,})
  }
}
else{
  toast.warning("fill form data",{closeOnClick: true,transition:Bounce,})
}
}
  
  
  const Save = async (type,e) => {
     e.preventDefault()
    
     
   let postData= {
      "compname": companyname,
      "PAN": pan,
      "GST": gst,
      "email": email,
      "phone": phone,
      "contactperson": contactperson,
      
    }

    console.log(postData)
    if (type === 'add') {
      if (checkdata(postData)){
      await axios.post('/company/', postData).then(response => {
        postData=[]
        onHide()
        toast.success("data Added sucessfully",{closeOnClick: true,transition: Bounce,})
      }).catch(err => {
        toast.error("Error adding data: " + err.message,{closeOnClick: true,transition: Bounce,})
      })
    }
  }
    if (type === 'edit') {
      console.log(postData)
      if (checkdata(postData)){
      await axios.put('/company/' + data.comp_id+'/', postData).then(response => {
       
        onHide()
        if (response.data.data)
        toast.success(response.data.data,{closeOnClick: true,transition: Bounce,})
        else 
        toast.error(response.data.error,{closeOnClick: true,transition: Bounce,})
      }).catch(err => {
        toast.error("Error editing data: " + err.message,{closeOnClick: true,transition: Bounce,})
      })
    }
    }
  }


 

 
  if (!isShow) return null;




  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content" >
        <div className='form-header'>
          <h3 style={{ marginBottom: '0', textTransform: 'capitalize',fontSize:'1.3rem',lineHeight:'1.5' }}>{type} Comapny</h3>
          <button className='control-btn btn-edit' onClick={onHide}  ><CgClose size={29} /></button>
        </div>
        <form style={{ padding: '5px 20px 10px 20px' }} >
          <div style={{ padding: '0 0 15px 0' }}>
            <label className='form-label' htmlFor='compname'>Company Name<span style={{color:'red'}}>*</span></label>
            <input className='form-input' type='text' id='compname'  value={companyname.toUpperCase()} placeholder='comapany name' autoComplete='off' onChange={e => setCompanyname(e.target.value)} />
            <label className='form-label' htmlFor='email'>email<span style={{color:'red'}}>*</span></label>
            <input className='form-input' type='text' id='email' value={email} placeholder='email' autoComplete='off' onChange={(e) => setEmail(e.target.value)} />
            <label className='form-label' htmlFor='phone'>Phone<span style={{color:'red'}}>*</span></label>
            <input className='form-input' type='text' id='phone' value={phone} placeholder='phone' autoComplete='off' onChange={(e) => setPhone(e.target.value)} />

            <label className='form-label' htmlFor='contactperson'>Contact Person<span style={{color:'red'}}>*</span></label>
            <input className='form-input' type='text' id='contactperson' placeholder='Contact Person' autoComplete='off' value={contactperson} onChange={(e) => setcontactperson(e.target.value)} />
            <label className='form-label' htmlFor='city'>PAN</label>
            <input className='form-input' type='text' id='city' value={pan.toUpperCase()} placeholder='pan' autoComplete='off' onChange={(e) => setpan(e.target.value)} />
            <label className='form-label' htmlFor='state'>GST</label>
            <input className='form-input' type='text' id='state' value={gst.toUpperCase()} placeholder='gst' autoComplete='off' onChange={(e) => setgst(e.target.value)} />
           
            
          </div>
          

         
        </form>
        <div className='form-footer'>
          <button className='mbtn mbtn-edit' type="submit" onClick={(e) => Save(type,e)}>{type==="add" ? 'Save':'Update'}</button>
          <button style={{ marginLeft: '10px' }} className='mbtn mbtn-close' onClick={onHide}>Close</button>
          </div>
      </div>

    </div>,
    document.getElementById('modal-root')
  );
}


export default CompanyModalForm