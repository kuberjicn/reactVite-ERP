import React, { useEffect, useState } from 'react';
import '../Common.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../../AxiosConfig";
import { Bounce, toast } from 'react-toastify';
import UnitCombo from '../../component/UnitCombo';
import ModalLayout from '../ModalLauout';

function ActivityModalForm({ isShow, onHide, type, data, onUpdate }) {
  // Define state variables for form fields
  const [actname, setActname] = useState('');
  const [skillname, setSkillname] = useState('');
   const [unskillname, setUnskillname] = useState('');
   const [unit, setUnit] = useState('cum');

  
  // Effect to initialize form fields based on the type
  useEffect(() => {
    if (type === "edit" && data) {
      // Initialize fields for editing
      setActname(data.actname || '');
      setSkillname(data.skillname || '');
      setUnskillname(data.unskillname || '');
      setUnit(data.act_unit || 'cum');

      
    } else {
      // Reset fields for adding new material
      resetForm();
    }
  }, [type, data]);

  // Function to reset form fields
  const resetForm = () => {
    setActname("");
    setSkillname("");
    setUnskillname("");
    setUnit("cum")
  };

  // Function to validate form data
  const isValidData = () => {
    if (actname && skillname && unskillname && unit !== null && unit!=='') {
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
      actname: actname,
      skillname: skillname,
      unskillname: unskillname,
      act_unit:unit
     
    };

    try {
      if (type === 'add') {
        await axios.post('/activity/', postData);
        toast.success("Activity added successfully", {
          closeOnClick: true,
          transition: Bounce,
          position: "bottom-right",
          zIndex: 1000,
        });
      } else if (type === 'edit') {
      //  console.log(postData)
        await axios.put(`/activity/${data.actid}/`, postData);
        toast.success("Activity updated successfully", {
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

  // Function to handle group change
  const handleUnitChange = (e) => {
    const newUnit = e.target.value;
    setUnit(newUnit);
   
  };

  // Render null if modal should not be shown
  if (!isShow) return null;
 
  // Render the modal
  return (
    <div >
      <ModalLayout
      isShow={isShow}
      onClose={onHide}
      type={type}
      title='Activity'
            content={
        <form style={{ padding: '5px 20px 10px 20px' }} onSubmit={handleSave}>
          <div style={{ padding: '0 0 15px 0' }}>
            <label className='form-label' htmlFor='matname'>Activity Name<span style={{ color: 'red' }}>*</span></label>
            <input
              className='form-input'
              type='text'
              id='matname'
              value={actname.toUpperCase()}
              placeholder='Activity name'
              autoComplete='off'
              onChange={e => setActname(e.target.value)}
            />
            <UnitCombo onddChange={handleUnitChange} displayvalue={unit}/>
            <label className='form-label' htmlFor='matunit'>Skill Name<span style={{ color: 'red' }}>*</span></label>
            <input
              className='form-input'
              type='text'
              id='skill'
              value={skillname.toUpperCase()}
              placeholder='Skill Name'
              autoComplete='off'
              onChange={(e) => setSkillname(e.target.value)}
            />
            
              <label className='form-label' htmlFor='rate'>Unskaill Name<span style={{ color: 'red' }}>*</span></label>
              <input
                  className='form-input'
                  type='text'
                  id='unskill'
                  value={unskillname.toUpperCase()}
                  placeholder='unskill name'
                  autoComplete='off'
                  onChange={(e) => setUnskillname(e.target.value)}
                />
              </div>
              </form>}
          
             
            
           footerContent={
         
          <div style={{display:'flex',justifyContent:'flex-end'}}  >
            <button className='mbtn mbtn-edit' type="submit" onClick={handleSave}>{type === "add" ? 'Save' : 'Update'}</button>
            {/* <button style={{ marginLeft: '10px' }} className='mbtn mbtn-close' onClick={onHide}>Close</button> */}
          </div>
           }
           
           />
           
            </div>
  );
}

export default ActivityModalForm;
