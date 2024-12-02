import React, { useEffect, useState } from 'react';

import '../Common.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../../AxiosConfig";
import { Bounce, toast } from 'react-toastify';

import SupplierCombo from '../../component/SupplierCombo';
import { getCurrentDate } from "../../pages/Common";
import DateSelector from '../../component/DateSelector';
import { useGlobleInfoContext } from "../../GlobleInfoProvider";
import MaterialChange from '../../component/MaterialChange';
import ModalLayout from '../ModalLauout';
import SearchableMaterialChange from '../../component/SearchableMaterialChange';

function InventoryModalForm({ isShow, onHide, type, data, onUpdate }) {
  // Define state variables for form fields
  const { myState } = useGlobleInfoContext();


  const [matid, setMatid] = useState(0);
  const [supid, setSupid] = useState(0);
  const [ddate, setDdate] = useState(0);
  const [qty, setQty] = useState(0);
  const [unit, setUnit] = useState('');
  
  const [siteid, setSiteid] = useState(0);

  const handleFocus = (e) => {
    e.target.select(); 
  };

  
  // Effect to initialize form fields based on the type
  useEffect(() => {
    if (type === "edit" && data) {
      // Initialize fields for editing
     
      setMatid(data.matid.mat_id || 0);
      setSupid(data.supid.sup_id || 0);
      setSiteid(data.siteid.site_id || 0);
      setDdate(data.ddate || getCurrentDate());
      setUnit(data.matid.mat_unit || '');
      setQty(data.qty || 0);
      
      
    } else {
      // Reset fields for adding new material
      resetForm();
    }
  }, [type, data]);

  // Function to reset form fields
  const resetForm = () => {
    setMatid( 0);
      setSupid( 0);
      setSiteid( 0);
      setDdate( getCurrentDate());
      setUnit( '');
      setQty( 0);
      
    
  };

  // Function to validate form data
  const isValidData = () => {
    //console.log(matid,supid,myState.siteid,ddate,skill,unskill)
    if (matid && supid && ddate && qty >0 && qty!==null && unit !=null && myState.siteid ) {
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
      matid_id: matid,
      supid_id:supid,
      siteid_id:myState.siteid,
      qty: qty,
      mat_unit: unit,
      ddate:ddate,
     
    };

    try {
      if (type === 'add') {
       // console.log(postData)
        await axios.post('/inventory/', postData);
        toast.success("material added successfully", {
          closeOnClick: true,
          transition: Bounce,
          position: "bottom-right",
          zIndex: 1000,
        });
      } else if (type === 'edit') {
       // console.log(postData)
        await axios.put(`/inventory/${data.inv_id}/`, postData);
        toast.success("material updated successfully", {
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
  const handleContractorChange = (e,selectedItem) => {
    //console.log('run')
    if (e && e.target) {
      setSupid(e.target.value)
      //console.log(selectedItem)
     
      //setSupid(selectedItem)
    }
  };
const handleMaterialChange = (selectedItem) => {
    //console.log('run')
    
      setMatid(selectedItem.mat_id)
      console.log(selectedItem)
     setUnit(selectedItem.mat_unit)
     
    
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
      title='Inventory'
      type={type}
      content={
        <form style={{ padding: '5px 20px 10px 20px' }} onSubmit={handleSave}>
        <label className='form-label' htmlFor='ddate'>Date<span style={{ color: 'red' }}>*</span></label>
        <DateSelector name="ddate" initialvalue={ddate} onDateChange={handleDateChange} />
        <SupplierCombo initialvalue={supid} type={'supplier'} handleEmployeeChange={handleContractorChange}/>
        <SearchableMaterialChange initialvalue={matid} handleMaterialChange={handleMaterialChange}/>
          <div style={{ padding: '0 0 15px 0' }}>
          <label className='form-label' htmlFor='matname'>Unit</label>
            <input
              className='form-input'
              type='text'
              disabled
              id='matname'
              value={unit}
              placeholder='unit'
              rows="7"
              cols="50"
              autoComplete='off'
              onChange={e => setWorkdetail(e.target.value)}
            /> 
            <label className='form-label' htmlFor='matunit'>Qty<span style={{ color: 'red' }}>*</span></label>
            <input
              className='form-input'
              type='number'
              id='skill'
              value={qty}
              placeholder='qty'
              onFocus={handleFocus}
              autoComplete='off'
              onChange={(e) => setQty(e.target.value)}
            />
            
             
             
             
          
           
            
            
          </div>
          
        </form>
      }
      footerContent={
          <div style={{display:'flex',justifyContent:'flex-end'}}>
            <button className='mbtn mbtn-edit' type="submit" onClick={handleSave}>{type === "add" ? 'Save' : 'Update'}  </button>
          </div>
      }
      />

      </div>
    
  );
}

export default InventoryModalForm;
