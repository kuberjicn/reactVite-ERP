import React, { useEffect, useState } from 'react';

import '../Common.css';

import 'react-toastify/dist/ReactToastify.css';
import axios from "../../AxiosConfig";
import { Bounce, toast } from 'react-toastify';

import { getCurrentDate } from "../../pages/Common";
import DateSelector from '../../component/DateSelector';
import ContractorChange from '../../component/ContractorChange';
import ActivityChange from '../../component/ActivityChange';
import { useGlobleInfoContext } from "../../GlobleInfoProvider";
import ModalLayout from '../ModalLauout';

function LabourModalForm({ isShow, onHide, type, data, onUpdate }) {
  // Define state variables for form fields
  const { myState } = useGlobleInfoContext();


  const [actid, setActid] = useState(0);
  const [supid, setSupid] = useState(0);
  const [ddate, setDdate] = useState(getCurrentDate());
  const [skill, setSkill] = useState(0);
  const [unskill, setUnskill] = useState(0);
  const [workdetail, setWorkdetail] = useState('');
  const [siteid, setSiteid] = useState(0);

  
  
  // Effect to initialize form fields based on the type
  useEffect(() => {
    if (type === "edit" && data) {
      // Initialize fields for editing
     
      setActid(data.actid.actid || 0);
      setSupid(data.supid.sup_id || 0);
      setSiteid(data.siteid.site_id || 0);
      setDdate(data.ddate || getCurrentDate());
      setWorkdetail(data.workdetail || '');
      setSkill(data.skill || 0);
      setUnskill(data.unskill || 0);
      console.log(data.ddate)
    } else {
      // Reset fields for adding new material
      resetForm();
    }
  }, [type, data]);

  // Function to reset form fields
  const resetForm = () => {
    setActid( 0);
      setSupid( 0);
      setSiteid( 0);
      setDdate( getCurrentDate());
      setWorkdetail( '');
      setSkill( 0);
      setUnskill( 0);
    
  };

  // Function to validate form data
  const isValidData = () => {
   // console.log(actid,supid,myState.siteid,ddate,skill,unskill)
    if (actid && supid && ddate && skill>=0 && skill!==null && unskill!==null && unskill>=0 && myState.siteid ) {
      return true;
    } else {
      toast.warning("Please fill out all required fields", {
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
      actid_id: actid,
      supid_id:supid,
      siteid_id:myState.siteid,
      skill: skill,
      unskill: unskill,
      ddate:ddate,
      workdetail:workdetail
    };

    try {
      if (type === 'add') {
       // console.log(postData)
        await axios.post('/labour-data/', postData);
        toast.success("labour added successfully", {
          closeOnClick: true,
          transition: Bounce,
          position: "bottom-right",
          zIndex: 1000,
        });
      } else if (type === 'edit') {
      //  console.log(postData)
        await axios.put(`/labour-data/${data.lbr_id}/`, postData);
        toast.success("labour updated successfully", {
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
        position: "bottom-right",
      });
    }
  };


  const handleFocus = (e) => {
    e.target.select(); // Select all text in the input field
  };

  // Function to handle group change
  const handleContractorChange = (e,selectedItem) => {
   // console.log('run')
    if (e && e.target) {
      setSupid(e.target.value)
     
    }
  };
const handleActivityChange = (e,selectedItem) => {
   // console.log('run')
    if (e && e.target) {
      setActid(e.target.value)
    //  console.log(selectedItem)
     
      //setSupid(selectedItem)
    }
  };
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
      title='Labour'

      content={
        <form style={{ padding: '5px 20px 10px 20px' }} onSubmit={handleSave}>
        <label className='form-label' htmlFor='ddate'>Date<span style={{ color: 'red' }}>*</span></label>
        <DateSelector name="ddate"initialvalue={ddate} onDateChange={handleDateChange} />
        <ContractorChange initialvalue={supid} type={'contractor'} handleContractorChange={handleContractorChange}/>
       <ActivityChange initialvalue={actid} handleActivityChange={handleActivityChange}/>
          <div style={{ padding: '0 0 0 0' }}>
            
            <label className='form-label' htmlFor='matunit'>Skill<span style={{ color: 'red' }}>*</span></label>
            <input
              className='form-input'
              type='number'
              id='skill'
              value={skill}
              placeholder='Skill'
              autoComplete='off'
              onFocus={handleFocus}
              onChange={(e) => setSkill(e.target.value)}
            />
            
              <label className='form-label' htmlFor='rate'>Unskaill<span style={{ color: 'red' }}>*</span></label>
              <input
                  className='form-input'
                  type='number'
                  id='unskill'
                  value={unskill}
                  placeholder='unskill'
                  autoComplete='off'
                  onFocus={handleFocus}
                  onChange={(e) => setUnskill(e.target.value)}
                />
             
             <label className='form-label' htmlFor='matname'>Work Detail<span style={{ color: 'red' }}>*</span></label>
            <textarea
              className='form-input'
              type='text'
              id='matname'
              value={workdetail}
              placeholder='work deatil'
              rows="7"
              cols="50"
              autoComplete='off'
              onFocus={handleFocus}
              onChange={e => setWorkdetail(e.target.value)}
            />
          
           
            
            
          </div>
          
        </form>
      }

      footerContent={
          <div  style={{display:'flex',justifyContent:'flex-end',paddingRight:'0'}}>
            <button className='mbtn mbtn-edit' type="submit" onClick={handleSave}>{type === "add" ? 'Save' : 'Update'}</button>
            {/* <button style={{ marginLeft: '10px' }} className='mbtn mbtn-close' onClick={onHide}>Close</button> */}
          </div>
      }
      />
      
      </div>
   
  );
}

export default LabourModalForm;
