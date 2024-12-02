import React, { useEffect, useState } from 'react';

import '../Common.css';
import MaterialGroupCombo from '../../component/MaterialGroupCombo';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../../AxiosConfig";
import { Bounce, toast } from 'react-toastify';

import UnitCombo from '../../component/UnitCombo';
import ModalLayout from '../ModalLauout';

function MaterialModalForm({ isShow, onHide, type, data, onUpdate }) {
  // Define state variables for form fields
  const [matname, setMatname] = useState('');
  const [unit, setUnit] = useState('cum');
  const [rate, setRate] = useState(0);
  const [gst, setGst] = useState(0);
  const [groupValue, setGroup] = useState(0);
  const [gstinclde, setGstincluding] = useState(false);
  const [disp, setDisp] = useState('');
  const [hsn, setHsn] = useState('');
  
  // Effect to initialize form fields based on the type
  useEffect(() => {
    if (type === "edit" && data) {
      // Initialize fields for editing

    //  console.log(data)
      setMatname(data.mat_name || '');
      setUnit(data.mat_unit || '');
      setGst(data.GSTR || 0);
      setRate(data.rate || 0);
      setGroup(data.groupid.mg_id || 0);
      setGstincluding(data.gstincluding || false);
      setDisp(data.disp || '');
      setHsn(data.HSN || '');
      //console.log(unit)
    } else {
      // Reset fields for adding new material
      resetForm();
    }
  }, [type, data]);

 const onClosing=()=>{
  resetForm()
  onHide()
 }
  // Function to reset form fields
  const resetForm = () => {
    setMatname("");
    setUnit("cum");
    setGst(0);
    setRate(0);
    setGroup(0);
    setGstincluding(false);
    setDisp('');
    setHsn('');
  };

  // Function to validate form data
  const isValidData = () => {
    if (matname && unit && rate && gst !== null) {
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
      mat_name: matname,
      rate: rate,
      GSTR: gst,
      groupid_id: groupValue,
      mat_unit: unit,
      gstincluding: gstinclde,
      disp: disp,
      HSN: hsn,
    };

    try {
      if (type === 'add') {
        await axios.post('/material/', postData);
        toast.success("Data added successfully", {
          closeOnClick: true,
          transition: Bounce,
          position: "bottom-right",
          zIndex: 1000,
        });
      } else if (type === 'edit') {
        //console.log(postData)
        await axios.put(`/material/${data.mat_id}/`, postData);
        toast.success("Material updated successfully", {
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
  const handleGroupChange = (e, selectedGroup) => {
    setGroup(selectedGroup.mg_id);
  };

  const handleUnitChange = (e) => {
    const newUnit = e.target.value;
    setUnit(newUnit);

  };

 
  if (!isShow) return null;
  
  return (
    <div >
      <ModalLayout
      onClose={onHide}
      isShow={isShow}
      title='Material'
      type={type}
      content={
        <form style={{ padding: '5px 20px 10px 20px' }} onSubmit={handleSave}>
          <div style={{ padding: '0 0 15px 0' }}>
            <label className='form-label' htmlFor='matname'>Material Name<span style={{ color: 'red' }}>*</span></label>
            <input
              className='form-input'
              type='text'
              id='matname'
              value={matname.toUpperCase()}
              placeholder='Material name'
              autoComplete='off'
              onChange={e => setMatname(e.target.value)}
            />
           
            <UnitCombo onddChange={handleUnitChange} displayvalue={unit}/>
          
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "60%" }}>
                <label className='form-label' htmlFor='rate'>Rate<span style={{ color: 'red' }}>*</span></label>
                <input
                  className='form-input'
                  type='number'
                  id='rate'
                  value={rate}
                  placeholder='Rate'
                  autoComplete='off'
                  onChange={(e) => setRate(e.target.value)}
                />
              </div>
              <div style={{ width: "35%", marginTop: '25px' }}>
                <input
                  className=''
                  type="checkbox"
                  name="isgstinclubing"
                  checked={gstinclde}
                  onChange={() => setGstincluding(!gstinclde)}
                />
                <label className="form-label" style={{ marginLeft: "10px" }} htmlFor="isgstinclubing">Is GST Including</label>
              </div>
            </div>
            <label className='form-label' htmlFor='gstr'>GSTR</label>
            <input
              className='form-input'
              type='number'
              id='gstr'
              value={gst}
              placeholder='GSTR'
              autoComplete='off'
              onChange={(e) => setGst(e.target.value)}
            />
            
            <MaterialGroupCombo initialValue={groupValue} GroupChange={handleGroupChange} />
            <label className='form-label' htmlFor='disp'>Disp</label>
            <input
              className='form-input'
              type='text'
              id='disp'
              value={disp}
              placeholder='Disp'
              autoComplete='off'
              onChange={(e) => setDisp(e.target.value)}
            />
          </div>
          
        </form>}
        footerContent={
        <div style={{display:'flex',justifyContent:'flex-end'}} >
            <button className='mbtn mbtn-edit' type="submit" onClick={handleSave}>{type === "add" ? 'Save' : 'Update'}</button>
            {/* <button style={{ marginLeft: '10px' }} className='mbtn mbtn-close' onClick={onClosing}>Close</button> */}
          </div>
        }
     
      />
    
    </div>
  );
}

export default MaterialModalForm;
