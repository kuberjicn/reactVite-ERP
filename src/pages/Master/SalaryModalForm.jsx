

import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import '../Common.css'

import axios from "../../AxiosConfig";
import { Bounce, toast } from 'react-toastify';
import { CgClose  } from "react-icons/cg";
import JobListCombo from '../../component/JobListCombo';
import SupplierCombo from '../../component/SupplierCombo';
import BusyForm from "../../component/BusyForm";
function SalaryModalForm({isShow, onHide, sal_id}) {
  
  
  const [slry_rate,setSlry_rate]=useState(0)
  const [effect_date,setEffect_date]=useState('2023-01-01')
  const [da,setDa]=useState(0)
  const [hra,setHra]=useState(0)
  const [ta,setTa]=useState(0)
  const [post,setPost]=useState("Site Supervisor")
  const [supid,setSupid]=useState(0)
  const [isBusyShow, setIsBusyShow] = useState(false);
  const [isReadOnly,setisReadOnly]=useState(false)
  const [sup_id,setSup_id]=useState(0)


 const initializeData=(data)=>{
    setSlry_rate(data.slry_rate)
    setEffect_date(data.effect_date)
    setDa(data.da)
    setHra(data.hra)
    setTa(data.ta)
    setSupid(data.supid)
    setSup_id(data.supid['sup_id'])
    setPost(data.post)
 }

 

  useEffect(()=>{
    if (sal_id!=0){
      setIsBusyShow(true)
      axios.get("/salary-register/" + sal_id).then((response) => {
           setIsBusyShow(false)
           initializeData(response.data)
           console.log(response.data)
           setisReadOnly(true)
           setIsBusyShow(false)
          }).catch((e=>{
            setIsBusyShow(false)
          }))
        }
    else{
      setisReadOnly(false)
      console.log("response.data")
    }     
    
  },[sal_id])

  useEffect(()=>{
    setSlry_rate(0)
    setEffect_date('2023-01-01')
    setDa(0)
    setHra(0)
    setTa(0)
    setSupid(0)
    setSup_id(0)
    setPost('')
  },[onHide])

 const handleJobChanged=(e)=>{
  if (e && e.target) {
    setPost(e.target.value)
    console.log(e.target.value)
  }
 }

//  const handleEmployeeChange = (entity) => {
//   setSupid(entity);
//   //setcomp_id(company.comp_id);
//   console.log("sdfsfd");
// };

//  const handleEmployeeChanged=(e)=>{
//   if (e && e.target) {
//   setSupid(e.target.value)
//   console.log(JSON.stringify(e.target.value))
//   }
// }
 const  Update=async(e)=>{
  
    e.preventDefault();
    let postData={
      'oldsal_id':sal_id,
      'slry_rate':slry_rate,
      'effect_date':effect_date,
      'supid':supid,
      'da':da,
      'ta':ta,
      'hra':hra,
      'post':post,
      'deleted':false
 }
 if (!sal_id){
    console.log("add data",postData)
    
      //if (checkdata(postData)){
      await axios.post('/salary-register/', postData).then(response => {
        postData=[]
        onHide()
        toast.success("data Added sucessfully",{closeOnClick: true,transition:Bounce,})
   
      }).catch(err => {
        toast.error("Error adding data: " + err.message,{closeOnClick: true,transition: Bounce,})
      })
 
 }
  else{
    console.log("update data",postData);
  }
 }
  if (!isShow) return null;

  return ReactDOM.createPortal(
    <div className="modal">
       <BusyForm isShow={isBusyShow} />
      <div className="modal-content" >
        <div className='form-header'>
          <h3 style={{ marginBottom: '0', textTransform: 'capitalize',fontSize:'1.3rem',lineHeight:'1.5' }}>{sal_id==0?"Add Salary ":"Change Pay And Promotion "} </h3>
          <button className='control-btn btn-edit' onClick={onHide}  ><CgClose size={29} /></button>
        </div>
        <form style={{ padding: '5px 20px 10px 20px' }} >
         
        <div style={{ padding: '0 0 15px 0' }}>
           
            <SupplierCombo initialvalue={sup_id} type={'employee'}  isread={isReadOnly} />
            <JobListCombo val={post} handleJobChanged={handleJobChanged}/>
            <label className='form-label' htmlFor='salary'>Salary <span style={{color:'red'}}>*</span></label>
            <input className='form-input' type='text' id='salary' value={slry_rate} placeholder='email' autoComplete='off' onChange={(e) => setSlry_rate(e.target.value)} />
            <label className='form-label' htmlFor='ddate'>Effect On<span style={{color:'red'}}>*</span></label>
            <input className='form-input' type='date' id='ddate' value={effect_date} placeholder='phone' autoComplete='off' onChange={(e) => setEffect_date(e.target.value)} />
            <label className='form-label' htmlFor='ta'>TA<span style={{color:'red'}}>*</span></label>
            <input className='form-input' type='number' id='ta' placeholder='Contact Person' autoComplete='off' value={ta} onChange={(e) => setTa(e.target.value)} />
            <label className='form-label' htmlFor='da'>DA<span style={{color:'red'}}>*</span></label>
            <input className='form-input' type='number' id='da' value={da} placeholder='pan' autoComplete='off' onChange={(e) => setDa(e.target.value)} />
            <label className='form-label' htmlFor='hra'>HRA<span style={{color:'red'}}>*</span></label>
            <input className='form-input' type='number' id='hra' value={hra} placeholder='gst' autoComplete='off' onChange={(e) => setHra(e.target.value)} />
          </div>

         
        </form>
        <div className='form-footer'>
          <button className='mbtn mbtn-edit' type="submit" onClick={(e) => Update(e)} >{sal_id==0? 'Save':'Update'}</button>
          <button style={{ marginLeft: '10px' }} className='mbtn mbtn-close' onClick={onHide}>Close</button>
          </div>
      </div>

    </div>,
    document.getElementById('modal-root')
  );
}

export default SalaryModalForm
