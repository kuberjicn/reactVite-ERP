import React, { useEffect, useState } from 'react';

import '../Common.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../../AxiosConfig";
import { Bounce, toast } from 'react-toastify';
import { useGlobleInfoContext } from "../../GlobleInfoProvider";

import ModalLayout from '../ModalLauout';
import BlockSizeSelector from '../../component/BlockSizeSelector';
import SampleCountSelector from '../../component/SampleCountSelector';
import { getCurrentDate,checkPermissions } from '../Common';

function AACBlockModalForm({ isShow, onHide, type, data, onUpdate }) {
  const [formdata,setFormdata]=useState([])
  const { myState } = useGlobleInfoContext();

  const handleFocus = (e) => {
    e.target.select(); 
  };
  const handleChange=(e)=>{
  
    
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  }

const InitialData=()=>{
  if (type==='edit'){
    
    setFormdata(data)}
    else{
      setFormdata({
        ...data,
        "lotID": "",
        "ddate": getCurrentDate(),
        "blocksize":100,
        "nosSample":3,
        "rOne": 0,
        "rTwo": 0,
        "rThree": 0,
        "wOne": 0,
        "wTwo": 0,
        "wThree": 0,
        "shortDisp":"",
        "site_id":myState.siteid
        });
     }
}
 useEffect(()=>{
 InitialData()
 },[isShow,data])

 const onClosing=()=>{
  onHide()
 }
  // Function to reset form fields
  

  // Function to validate form data
  const isValidData = () => {
    

    if (formdata.nosSample==1){
      if (formdata.ddate && formdata.nosSample >0  && formdata.nosSample!==null    && formdata.lotID !='' && formdata.wOne>0 && formdata.rOne>0  ) {
        return true;
      }
    }
    if (formdata.nosSample==2){
      if (formdata.ddate && formdata.nosSample >0  && formdata.nosSample!==null   && formdata.lotID !='' && formdata.wOne>0 && formdata.rOne>0 && formdata.wTwo>0 && formdata.rTwo>0 ) {
        return true;
      }
    }
    if (formdata.nosSample==3){
      if (formdata.ddate && formdata.nosSample >0  && formdata.nosSample!==null   && formdata.lotID !='' && formdata.wOne>0 && formdata.rOne>0 && formdata.wTwo>0 && formdata.rTwo>0 && formdata.wThree>0 && formdata.rThree>0) {
        return true;
      }
    }

    
    
      toast.warning(`Please fill out all required fields `, {
        closeOnClick: true,
        transition: Bounce,
        position: "bottom-right",
      })
      return false;
    
  };


  // Function to save or update material data
  const handleSave = async (e) => {
    e.preventDefault();
    if (!isValidData()) return; // Validate form data

   

    try {
      if (type === 'add') {
        await axios.post('/aacblock-list/', formdata);
        toast.success("Data added successfully", {
          closeOnClick: true,
          transition: Bounce,
          position: "bottom-right",
          zIndex: 1000,
        });
      } else if (type === 'edit') {
        console.log(formdata,data.id)
        await axios.put(`/aacblock-list/${data.id}/`, formdata);
        toast.success("Material updated successfully", {
          closeOnClick: true,
          transition: Bounce,
          position: "bottom-right",
          zIndex: 1000,
        });
      }
      onUpdate(); // Notify parent component of update
      
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
      title='AAC Block'
      type={type}
      content={
        <form style={{ padding: '5px 20px 10px 20px' }} onSubmit={handleSave}>
          <div style={{ padding: '0 0 15px 0' }}>
            <label className='form-label' htmlFor='matname'>Lot ID<span style={{ color: 'red' }}>*</span></label>
            <input
              className='form-input'
              type='text'
              name='lotID'
              value={formdata.lotID}
              placeholder='unique id of lot or truck no'
              autoComplete='off'
              onChange={handleChange}
              onFocus={handleFocus}
            />
            <label className='form-label' htmlFor='matname'>Size<span style={{ color: 'red' }}>*</span></label>
            <BlockSizeSelector name="blocksize" onddchange={handleChange} initialvalue={formdata.blocksize||125}/>
                <label className='form-label' htmlFor='rate'>Date<span style={{ color: 'red' }}>*</span></label>
                <input
                  className='form-input'
                  type='date'
                  name='ddate'
                  value={formdata.ddate}
                  placeholder=''
                  autoComplete='off'
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
              
                <label className="form-label"  htmlFor="isgstinclubing">Sample Count<span style={{ color: 'red' }}>*</span></label>
                <SampleCountSelector initialvalue={formdata.nosSample||3} onddchange={handleChange} name="nosSample"/>
                

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "45%" }}>
                  <label className='form-label' htmlFor='gstr'>Breaking Load - 1<span style={{ color: 'red' }}>*</span></label>
                  <input
                    className='form-input'
                    type='number'
                    step={0.01}
             min={0}

                    name='rOne'
                    value={formdata.rOne}
                    placeholder='Breaking load'
                    autoComplete='off'
                    onChange={handleChange}
                    onFocus={handleFocus}
                    disabled={formdata.nosSample < 1 ? true : false}
                  />
                </div>

                <div style={{ width: "45%" }}>
                  <label className='form-label' htmlFor='gstr'>Weight - 1<span style={{ color: 'red' }}>*</span></label>
                  <input
                    className='form-input'
                    type='number'
                    step={0.01}
             min={0}

                    name='wOne'
                    value={formdata.wOne}
                    placeholder='Weigth of sample'
                    autoComplete='off'
                    onChange={handleChange}
                    onFocus={handleFocus}
                    disabled={formdata.nosSample < 1 ? true : false}
                  />
                </div>

            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "45%" }}>
                  <label className='form-label' htmlFor='gstr'>Breaking Load - 2<span style={{ color: 'red' }}>*</span></label>
                  <input
                    className='form-input'
                    type='number'
                    step={0.01}
             min={0}

                    name='rTwo'
                    value={formdata.rTwo}
                    placeholder='Breaking load'
                    autoComplete='off'
                    onChange={handleChange}
                    onFocus={handleFocus}
                    disabled={formdata.nosSample < 2 ? true : false}
                  />
                </div>

                <div style={{ width: "45%" }}>
                  <label className='form-label' htmlFor='gstr'>Weight - 2<span style={{ color: 'red' }}>*</span></label>
                  <input
                    className='form-input'
                    type='number'
                    step={0.01}
             min={0}

                    name='wTwo'
                    value={formdata.wTwo}
                    placeholder='Weigth of sample'
                    autoComplete='off'
                    onChange={handleChange}
                    onFocus={handleFocus}
                    disabled={formdata.nosSample < 2 ? true : false}
                  />
                </div>

            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "45%" }}>
                  <label className='form-label' htmlFor='gstr'>Breaking Load - 3<span style={{ color: 'red' }}>*</span></label>
                  <input
                    className='form-input'
                    type='number'
                    step={0.01}
             min={0}

                    name='rThree'
                    value={formdata.rThree}
                    placeholder='Breaking load'
                    autoComplete='off'
                    onFocus={handleFocus}
                    onChange={handleChange}
                    disabled={formdata.nosSample < 3 ? true : false}
                  />
                </div>

                <div style={{ width: "45%" }}>
                  <label className='form-label' htmlFor='gstr'>Weight - 3<span style={{ color: 'red' }}>*</span></label>
                  <input
                    className='form-input'
                    type='number'
                    step={0.01}
             min={0}

                    name='wThree'
                    onFocus={handleFocus}

                    value={formdata.wThree}
                    placeholder='Weigth of sample'
                    autoComplete='off'
                    onChange={handleChange}
                    disabled={formdata.nosSample < 3 ? true : false}
                  />
                </div>

            </div>
            
            
            <label className='form-label' htmlFor='disp'>Dispcription<span style={{ color: 'red' }}>*</span></label>
            <textarea
              className='form-input'
              type='text'
              name='shortDisp'
              value={formdata.shortDisp}
              placeholder='discriptions'
              autoComplete='off'
              onChange={handleChange}
              onFocus={handleFocus}
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

export default AACBlockModalForm;

