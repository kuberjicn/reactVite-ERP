

import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import '../Common.css'

import axios from "../../AxiosConfig";
import { Bounce, toast } from 'react-toastify';
import { CgClose  } from "react-icons/cg";
import JobListCombo from '../../component/JobListCombo';
import SupplierCombo from '../../component/SupplierCombo';
import BusyForm from "../../component/BusyForm";
import NotInSalaryRegisterEmployee from '../../component/notInSalaryRegisterEmployee'
import { getCurrentDate } from "../Common";
import ModalLayout from '../ModalLauout';


function SalaryModalForm({isShow, onHide, sal_id,onUpdate}) {
  
  const [oldPostData,setOldPostData]=useState({})
  const [slry_rate,setSlry_rate]=useState(0)
  const [effect_date,setEffect_date]=useState(getCurrentDate())
  const [da,setDa]=useState(0)
  const [hra,setHra]=useState(0)
  const [ta,setTa]=useState(0)
  const [post,setPost]=useState("Site Supervisor")
  const [supid,setSupid]=useState()
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
    setPost(data.post)
    if (data.supid) {
      // If supid is available in the data, set it directly
      setSupid(data.supid);
      // Also, set the sup_id value for the dropdown
      setSup_id(data.supid.sup_id);
  } else {
      // If supid is not available, set default values
      setSupid(0);
      setSup_id(0);
  }
  //console.log(sup_id);
 }

 function areObjectsEqual(obj1, obj2) {
  // Get the keys of both objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if the number of keys is the same
  if (keys1.length !== keys2.length) {
      return false;
  }

  // Check if all keys and their values are the same
  for (let key of keys1) {
      // Check if the key exists in obj2 and if the values are the same
      if (!(key in obj2) || obj1[key] !== obj2[key]) {
          return false;
      }
  }

  // Objects are equal
  return true;
}


  useEffect(()=>{
    if (sal_id!=0){
      setIsBusyShow(true)
      axios.get("/salary-register/" + sal_id).then((response) => {
           setIsBusyShow(false)
           setOldPostData(response.data)
           initializeData(response.data)
           //console.log(response.data)
           
           setisReadOnly(true)
           setIsBusyShow(false)
          }).catch((e=>{
            setIsBusyShow(false)
          }))
        }
    else{
      setisReadOnly(false)
      initializeData({
        slry_rate: 0,
        effect_date: getCurrentDate(),
        da: 0,
        hra: 0,
        ta: 0,
        post: '',
        supid: []// Initialize supid as null or 0, depending on your data structure
    });
    }     
    
  },[sal_id,])

  useEffect(()=>{
    setSlry_rate(0)
    setEffect_date(getCurrentDate())
    setDa(0)
    setHra(0)
    setTa(0)
    setSupid({})
    setSup_id(0)
    setPost('')
  },[onHide])

 const handleJobChanged=(e)=>{
  if (e && e.target) {
    setPost(e.target.value)
   // console.log(e.target.value)
  }
 }

 const handleEmployeeChange = (e,selectedItem) => {
 // console.log('run')
  if (e && e.target) {
    setSup_id(e.target.value)
   // console.log(selectedItem)
   
    setSupid(selectedItem)
  }
};
 function checkdata(chkdata) {
   
   
   if (chkdata.slry_rate<=0 || chkdata.slry_rate==null){
    return false;
   }
   if (chkdata.post=='' || chkdata.post==null) {
    return false;

   }
   if (chkdata.supid_id==0 || chkdata.supid_id==null ||chkdata.supid_id==undefined) {
    return false;

   }
   if (chkdata.effect_date=='' || chkdata.effect_date==null ||chkdata.effect_date==undefined) {
    return false;

   }
   if ( chkdata.ta==null || chkdata.hra==null||chkdata.da==null){
    return false;

   }
  return true;

 }

 const Update = async (e) => {
   e.preventDefault();
   console.log('c');
   let postData = {
     sal_id: sal_id,
     slry_rate: slry_rate,
     effect_date: effect_date,
     supid: supid,
     supid_id: sup_id,
     da: da,
     ta: ta,
     hra: hra,
     post: post,
     deleted: false,
   };

   if (!checkdata(postData)) return;
   if (!sal_id) {
    // console.log("add data", postData);

     
       await axios
         .post("/salary-register/", postData)
         .then((response) => {
           postData = [];

           toast.success("data Added sucessfully", {
             closeOnClick: true,
             transition: Bounce,
             position: "bottom-right",
           });
         })
         .catch((err) => {
           toast.error("Error adding data: " + err.message, {
             closeOnClick: true,
             transition: Bounce,
             position: "bottom-right",
           });
         });
     
   } else {
    // console.log("update data", postData);
     
    // const kk={...oldPostData,supid_id:sup_id}
    // console.log("olddata data", kk);
     
       if (areObjectsEqual({...oldPostData,supid_id:sup_id}, postData) == false) {
         await axios
           .put("/salary-register/" + sal_id + "/", postData)
           .then((response) => {
             postData = [];
             toast.success(response.data.msg, {
               closeOnClick: true,
               transition: Bounce,
             });
           })
           .catch((err) => {
             toast.error("Error editing data: " + err.message, {
               closeOnClick: true,
               transition: Bounce,
               position: "bottom-right",
             });
           });
       } else {
         toast.warning("no need to change ,you do not make any changes", {
           closeOnClick: true,
           transition: Bounce,
           position: "bottom-right",
         });
       }
     
   }
   onUpdate();
 };
  if (!isShow) return null;

  return (
    <div >
       <BusyForm isShow={isBusyShow} />
      <ModalLayout
      onClose={onHide}
      title='Salary'
      isShow={isShow}
      type={sal_id==0?'Add':'Edit'}
      content={ 
        <form style={{ padding: '5px 20px 10px 20px' }} >
       
        <div style={{ padding: '0 0 15px 0' }}>
            {sal_id==0? <NotInSalaryRegisterEmployee initialvalue={0} handleEmployeeChange={handleEmployeeChange} /> :<SupplierCombo initialvalue={sup_id} type={'employee'}  isread={isReadOnly} handleEmployeeChange={handleEmployeeChange} />}
            
            <JobListCombo val={post} handleJobChanged={handleJobChanged}/>
            <label className='form-label' htmlFor='salary'>Salary <span style={{color:'red'}}>*</span></label>
            <input className='form-input' type='text' id='salary' value={slry_rate} placeholder='email' autoComplete='off' onChange={(e) => setSlry_rate(e.target.value)} />
            <label className='form-label' htmlFor='ddate'>Effect On<span style={{color:'red'}}>*</span></label>

            <input className='form-input' type='date' id='ddate' value={effect_date||getCurrentDate()} placeholder='phone' autoComplete='off' onChange={(e) => setEffect_date(e.target.value)} />
            <label className='form-label' htmlFor='ta'>TA<span style={{color:'red'}}>*</span></label>
            <input className='form-input' type='number' id='ta' placeholder='Contact Person' autoComplete='off' value={ta} onChange={(e) => setTa(e.target.value)} />
            <label className='form-label' htmlFor='da'>DA<span style={{color:'red'}}>*</span></label>
            <input className='form-input' type='number' id='da' value={da} placeholder='pan' autoComplete='off' onChange={(e) => setDa(e.target.value)} />
            <label className='form-label' htmlFor='hra'>HRA<span style={{color:'red'}}>*</span></label>
            <input className='form-input' type='number' id='hra' value={hra} placeholder='gst' autoComplete='off' onChange={(e) => setHra(e.target.value)} />
          </div>

         
        </form>}
    footerContent={
        <div >
          <button className='mbtn mbtn-edit' type="submit" onClick={(e) => Update(e)} >{sal_id==0? 'Save':'Update'}</button>
          {/* <button style={{ marginLeft: '10px' }} className='mbtn mbtn-close' onClick={onHide}>Close</button> */}
          </div>}
     
      />

    </div>
   
  );
}

export default SalaryModalForm
