import React, { useEffect, useState } from 'react';

import '../Common.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../../AxiosConfig";
import { Bounce, toast } from 'react-toastify';


import { getCurrentDate } from "../../pages/Common";
import DateSelector from '../../component/DateSelector';
import { useGlobleInfoContext } from "../../GlobleInfoProvider";

import RegisterCombo from '../../component/RegisterCombo';
import UnitCombo from '../../component/UnitCombo';
import ModalLayout from '../ModalLauout';

function InwardOutwardModalForm({ isShow, onHide, type, data, onUpdate ,entrytype='in' }) {
  // Define state variables for form fields
  const { myState } = useGlobleInfoContext();


  const [id, setId] = useState(0);
  const [reg_id, setReg_id] = useState('');
  const [ddate, setDdate] = useState(0);
  const [inqty, setInQty] = useState(0);
  const [outqty, setOutQty] = useState(0);
  const [unit, setUnit] = useState('cum');
  const [disc, setDisc] = useState('');
  const [received, setReceived] = useState('');
  const [issue, setIssue] = useState('');
  const [entry_type, setEntry_type] = useState(entrytype);
  const [reg_type, setReg_type] = useState('diesel');
  const [isdeleted, setIsdeleted] = useState(false);
  
  const [siteid, setSiteid] = useState(myState.siteid);

  
  
  // Effect to initialize form fields based on the type
  useEffect(() => {
    if (type === "edit" && data) {
      // Initialize fields for editing
      setReg_id(data.reg_id|| '');
      setId(data.id || 0);
      setDdate(data.inward_date || getCurrentDate());
      setUnit(data.unit || 'cum');
      setInQty(data.in_qty || 0);
      setOutQty(data.out_qty || 0);
      setDisc(data.discription || '');
      setReceived(data.received_from || '');
      setIssue(data.issue_to || '');
      setReg_type(data.reg_type || 'diesel');
      setEntry_type(data.entry_type || entrytype);
      setIsdeleted(data.isdeleted || false);
      
    } else {
      // Reset fields for adding new material
      resetForm();
    }
  }, [type, data]);

  // Function to reset form fields
  const resetForm = () => {
      setReg_id( '');
      setId( 0);
      setDdate( getCurrentDate());
      setUnit( 'cum');
      setInQty( 0);
      setOutQty( 0);
      setDisc( '');
      setReceived( '');
      setIssue( '');
      setReg_type( 'diesel');
      setEntry_type(entrytype);
      setIsdeleted( false);
      
    
  };

  // Function to validate form data
  const isValidData = () => {
  //  console.log(reg_id,ddate,myState.siteid,inqty,outqty,unit)

    if (reg_id  && ddate && (outqty >0  || inqty>0) && outqty!==null && inqty!==null  && unit !=null && myState.siteid ) {
    return true;

    } else {
      toast.warning(`Please fill out all required fields `, {
        closeOnClick: true,
        transition: Bounce,
        position: "bottom-right",
      });
      return false;
    }
  };

  // Function to save or update material data
  const handleSave = async (e) => {
    e.preventDefault();
    if (!isValidData()) return; // Validate form data

    const postData = {
      
        reg_id: reg_id,
        inward_date: ddate,
        discription: disc,
        in_qty: inqty,
        unit: unit,
        received_from: entry_type=='in'? received:'',
        out_qty: outqty,
        issue_to: entry_type=='out'? issue:'',
        reg_type: reg_type,
        entry_type: entry_type,
        isdeleted: isdeleted,
        siteid: siteid
       
     
    };
//console.log(type ,postData)
    try {
      if (type === 'add') {
        console.log(postData)
        await axios.post('/inward-outward/', postData);
        toast.success("register added successfully", {
          closeOnClick: true,
          transition: Bounce,
          position: "bottom-right",
          zIndex: 1000,
        });
      } else if (type === 'edit') {
      //  console.log(postData)
        await axios.put(`/inward-outward/${data.id}/`, postData);
        toast.success("register updated successfully", {
          closeOnClick: true,
          transition: Bounce,
          position: "bottom-right",
          zIndex: 1000,
        });
      }
      onUpdate(); // Notify parent component of update
      resetForm(); // Reset form fields
      onHide(); // Close modal
    } catch (err) {
      toast.error(`Error ${type === 'add' ? 'adding' : 'editing'} data: ${err.message}`, {
        closeOnClick: true,
        transition: Bounce,
      });
    }
  };

  // Function to handle group change
  const handleUnitChange = (e) => {
    const newUnit = e.target.value;
    setUnit(newUnit);
   // console.log('Selected Unit:', newUnit);
  };

  const handleRegisterChange = (e) => {
    const newreg = e.target.value;
    setReg_type(newreg);
  //  console.log('Selected Unit:', newreg);
  };

  const handleFocus = (e) => {
    e.target.select(); 
  };

  function revertToOriginal(formattedNumber) {
    // Remove the prefix "K-" if it exists
    const withoutPrefix = formattedNumber.startsWith('K-') ? formattedNumber.slice(2) : formattedNumber;
    
    // Remove leading zeros by converting to a number
    const originalNumber = parseInt(withoutPrefix, 10);
    
    // Convert back to string if you need the original as a string
    return originalNumber.toString();
}
  function getRegisterNo(e) {
    // Ensure the event target is defined and has a value
    if (!e || !e.target || !e.target.value) {
        alert('Invalid input');
        return;
    }

    const newvalue = e.target.value;
    //alert(num); // Alert the input value for debugging or user feedback
    const num= revertToOriginal(newvalue)
    const totalLength = 6; // Define the total number length you want
    const prefix = 'K-'; // Define your prefix

    // Ensure num is a number and pad it
    const paddedNum = num.padStart(totalLength, '0');
    const formattedNumber = prefix + paddedNum;

    // Assuming setReg_id is a function to set the registration number
    setReg_id(formattedNumber);
}
const handleDateChange = (e) => {
  // console.log('run')
   if (e && e.target) {
     setDdate(e.target.value)
    
   }
 };
  // Render null if modal should not be shown
  if (!isShow) return null;
 
  // Render the modal
  return (
    <div >
      <ModalLayout
      onClose={onHide}
      isShow={isShow}
      type={type}
      title={`${entrytype} ward`}

            content={
        <form style={{ padding: '5px 20px 10px 20px' }} onSubmit={handleSave}>
        
        <RegisterCombo displayvalue={reg_type} onRegisterchange={handleRegisterChange} />
       <div style={{display:'flex',justifyContent:'space-between',marginTop:'7px'}} >
        <div style={{width:'180px'}}>
        <label  className='form-label' htmlFor='regid' >Reg ID :<span style={{ color: 'red' }}>*</span></label>
            <input 
              className='form-input'
              type='text'
              id='regid'
              value={reg_id}
              placeholder='input number'
              
              rows="7"
              cols="50"
              autoComplete='off'
              onChange={getRegisterNo}
              
            /> 
           
           </div>
           <div>
            <label className='form-label' htmlFor='ddate'>Date :<span style={{ color: 'red' }}>*</span></label>
            <DateSelector id='ddate'  initialvalue={ddate} onDateChange={handleDateChange} />
            </div>
            </div>
          <div style={{ display:'flex',justifyContent:'space-between',marginTop:'7px'}}>
          
          <UnitCombo displayvalue={unit} onddChange={handleUnitChange} />
            
            {entry_type=='in'?
            <div>
            <label className='form-label' htmlFor='inqty'>In Qty<span style={{ color: 'red' }}>*</span></label>
            <input
              className='form-input'
              type='number'
              id='inqty'
              value={inqty}
              onFocus={handleFocus}
              placeholder='qty'
              autoComplete='off'
              onChange={(e) => setInQty(e.target.value)}
            /></div>
            :<div>
            <label className='form-label' htmlFor='outqty'>Out Qty<span style={{ color: 'red' }}>*</span></label>
            <input
              className='form-input'
              type='number'
              id='outqty'
              value={outqty}
              onFocus={handleFocus}
              placeholder='qty'
              autoComplete='off'
              onChange={(e) => setOutQty(e.target.value)}
            /></div>}
            </div>

            <div>
            <label className='form-label' htmlFor='disc'>Discription :</label>
            <textarea
              className='form-input'
              type='number'
              id='disc'
              value={disc}
              onFocus={handleFocus}
              placeholder='discription'
              autoComplete='off'
              onChange={(e) => setDisc(e.target.value)}
            /></div>

             {entry_type=='in'?
            <div>
            <label className='form-label' htmlFor='matname1'>Received from :<span style={{ color: 'red' }}>*</span></label>
            <textarea
              className='form-input'
              type='text'
              id='matname1'
              value={received}
              onFocus={handleFocus}
              placeholder='sender deatil'
              rows="7"
              cols="50"
              autoComplete='off'
              onChange={e => setReceived(e.target.value)}
            /></div>:
            <div>
            <label className='form-label' htmlFor='matname2'>Issue To :<span style={{ color: 'red' }}>*</span></label>
            <textarea
              className='form-input'
              type='text'
              id='matname2'
              value={issue}
              onFocus={handleFocus}
              placeholder='reciver deatil'
              rows="7"
              cols="50"
              autoComplete='off'
              onChange={e => setIssue(e.target.value)}
            />
            </div>}
             
            </form>}
          
           footerContent={
            
            
          <div style={{display:'flex',justifyContent:'flex-end'}} >
            <button className='mbtn mbtn-edit' type="submit" onClick={handleSave}>{type === "add" ? 'Save' : 'Update'}</button>
            {/* <button style={{ marginLeft: '10px' }} className='mbtn mbtn-close' onClick={onHide}>Close</button> */}
          </div>
        
      }
      />

      </div>
    
  );
}

export default InwardOutwardModalForm;
