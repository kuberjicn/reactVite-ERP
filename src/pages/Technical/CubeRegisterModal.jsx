import React,{useEffect,useState} from 'react'
import ConcreteTypeSelector from '../../component/ConcreteTypeSelector';
import { useGlobleInfoContext } from "../../GlobleInfoProvider";
import ModalLayout from '../ModalLauout';
import DateSelector from '../../component/DateSelector';
import { getCurrentDate } from '../Common';
import { toast,Bounce } from "react-toastify";
import axios from "../../AxiosConfig";


const CubeRegisterModal = ({ isShow, onHide, type, data, onUpdate }) => {
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
   // console.log(formdata);

  }


 useEffect(()=>{
  if (type=='edit'){
  setFormdata(data)}
  else{
    setFormdata({
      ...formdata,
      "concrete": "m20",
      "ddate": getCurrentDate(),
      "nosSample": 6,
      "shortDisp": "",
      "specialID": "",
      "site_id":myState.siteid,
    });
  }
 },[data])



 const isValidData = () => {
  //  console.log(reg_id,ddate,myState.siteid,inqty,outqty,unit)

    if (formdata.concrete  && formdata.ddate && (formdata.nosSample >0 ) && formdata.nosSample!==null   && formdata.specialID !=null && formdata.specialID !='' && myState.siteid ) {
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
console.log(formdata)
    
    try {
      if (type === 'add') {
        
        await axios.post('/sample-list/', formdata);
        toast.success("sample added successfully", {
          closeOnClick: true,
          transition: Bounce,
          position: "bottom-right",
          zIndex: 1000,
        });
       // console.log(formdata);
      } else if (type === 'edit') {
     
        const { site, ...otherFields } = formdata;  // Destructure site from the formData

          const dataToSend = {
            site_id: site.site_id,  // Extract and use the site_id
            ...otherFields          // Use the spread operator to copy the rest of the fields
          };
      //  console.log(dataToSend);
        await axios.put(`/sample-list/${formdata.id}/`, dataToSend);
        toast.success("sample updated successfully", {
          closeOnClick: true,
          transition: Bounce,
          position: "bottom-right",
          zIndex: 1000,
        });
      }
      onUpdate(); 
      setFormdata([])
      
    } catch (err) {
      onHide(); 
      setFormdata([])
    //  console.log(err.message)
      toast.error(`Error ${type === 'add' ? 'adding' : 'editing'} data: ${err.message}`, {
        closeOnClick: true,
        transition: Bounce,
        position: "top-right",
        y:100,
        zIndex: 1000,
      });
    }
  };



  if (!isShow) return null;
  return (
    <div>
      <ModalLayout 
      onClose={onHide}
      isShow={isShow}
      title='Cube Sample'
      type={type}
      content={
        <form style={{ padding: '5px 20px 10px 20px' }} onSubmit={handleSave}>
       
        
       
          <div style={{ padding: '0 0 15px 0' }}>
          <label className='form-label' htmlFor='specialID'>Unique ID</label>
            <input
              className='form-input'
              type='text'
              
              name='specialID'
              value={formdata.specialID}
              placeholder='unique id'
              
              autoComplete='off'
              onChange={handleChange}
            /> 
             <label className='form-label' htmlFor='ddate'>Date<span style={{ color: 'red' }}>*</span></label>
            <DateSelector name="ddate" initialvalue={formdata.ddate||getCurrentDate()} onDateChange={handleChange} />
            <ConcreteTypeSelector name="concrete" initialvalue={formdata.concrete} onddchange={handleChange}/>
            <label className='form-label' htmlFor='nosSample'>Sample Count<span style={{ color: 'red' }}>*</span></label>
            <input
              className='form-input'
              type='number'
              name='nosSample'
              value={formdata.nosSample}
              placeholder='count'
              onFocus={handleFocus}
              autoComplete='off'
              onChange={handleChange}
            />
            <label className='form-label' htmlFor='shortDisp'>Discription<span style={{ color: 'red' }}>*</span></label>
            
             <textarea
             style={{fontSize:'.7em',height:'150px'}}
             className='form-input'
             name='shortDisp'
             value={formdata.shortDisp}
             placeholder='discription'
             onFocus={handleFocus}
             autoComplete='off'
             onChange={handleChange}
             
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

export default CubeRegisterModal
