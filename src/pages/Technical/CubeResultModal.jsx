import React,{useCallback, useEffect,useState} from 'react'
import ConcreteTypeSelector from '../../component/ConcreteTypeSelector';
import { useGlobleInfoContext } from "../../GlobleInfoProvider";
import ModalLayout from '../ModalLauout';
import DateSelector from '../../component/DateSelector';
import { getCurrentDate } from '../Common';
import { toast,Bounce } from "react-toastify";
import axios from "../../AxiosConfig";
import TestTypeSelector from '../../component/TestTypeSelector';
import SampleCountSelector from '../../component/SampleCountSelector';


const CubeResultModal = ({ isShow, onHide, type, data, onUpdate }) => {
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

 useEffect(()=>{
  //console.log(data);
  if (type==='edit'){
    
  setFormdata(data)}
  else{
    setFormdata({
      ...data,
      "nosSample": "3",
      "ddate": getCurrentDate(),
      "resultOne": 0,
      "resultTwo": 0,
      "resultThree": 0,
      "testType": "seven",
      "wOne": 0,
      "wTwo": 0,
      "wThree": 0,
      
    
    });
 
    
  }
 },[data])

  
useEffect(()=>{
  //console.log(formdata);

},[formdata])

 const isValidData = () => {
    if (formdata.nosSample==1){
      if (formdata.ddate && formdata.nosSample >0  && formdata.nosSample!==null   && formdata.testType !=null && formdata.specialID !='' && formdata.wOne>0 && formdata.resultOne>0  ) {
        return true;
      }
    }
    if (formdata.nosSample==2){
      if (formdata.ddate && formdata.nosSample >0  && formdata.nosSample!==null   && formdata.testType !=null && formdata.specialID !='' && formdata.wOne>0 && formdata.resultOne>0 && formdata.wTwo>0 && formdata.resultTwo>0 ) {
        return true;
      }
    }
    if (formdata.nosSample==3){
      if (formdata.ddate && formdata.nosSample >0  && formdata.nosSample!==null   && formdata.testType !=null && formdata.specialID !='' && formdata.wOne>0 && formdata.resultOne>0 && formdata.wTwo>0 && formdata.resultTwo>0 && formdata.wThree>0 && formdata.resultThree>0) {
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
console.log(formdata)
    
    try {
      if (type === 'add') {
       //("add");
        await axios.post('/cube-list/', formdata);
        toast.success("sample added successfully", {
          closeOnClick: true,
          transition: Bounce,
          position: "bottom-right",
          zIndex: 1000,
        });
      } else if (type === 'edit') {
       // console.log(formdata);

        const { sampleList, ...otherFields } = formdata;  // Destructure site from the formData

          const dataToSend = {
            sampleList_id: sampleList,  // Extract and use the site_id
            ...otherFields          // Use the spread operator to copy the rest of the fields
          };
       // console.log(dataToSend);

        await axios.put(`/cube-list/${formdata.id}/`, dataToSend);
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
     // console.log(err.message)
      toast.error(`Error ${type === 'add' ? 'adding' : 'editing'} data: ${err.message}`, {
        closeOnClick: true,
        transition: Bounce,
        position: "top-right",
        y:100,
        zIndex: 1000,
      });
    }
  };
  const onClose=()=>{
    data=[]
    setFormdata([])
    onHide()
  }


  if (!isShow) return null;
  return (
    <div>
      <ModalLayout 
      onClose={onClose}
      isShow={isShow}
      title='Cube Sample'
      type={type}
      content={
        <form style={{ padding: '5px 20px 10px 20px' }} onSubmit={handleSave}>
       
          <div style={{ padding: '0 0 15px 0' }}>
          

            <TestTypeSelector initialvalue={formdata.testType|| 'seven'} name='testType' onddchange={handleChange}/>

             <label className='form-label' htmlFor='ddate'>Date<span style={{ color: 'red' }}>*</span></label>
            <DateSelector name="ddate" initialvalue={formdata.ddate||getCurrentDate()} onDateChange={handleChange} />
            <label className='form-label' htmlFor='nosSample'>Sample Count<span style={{ color: 'red' }}>*</span></label>
            
            <SampleCountSelector name='nosSample' initialvalue={formdata.nosSample||3} onddchange={handleChange} />
            <div style={{display:'flex',justifyContent:'flex-start'}}>
              <div style={{margin:'0 5px 0 0' }} >
            <label className='form-label' htmlFor='resultOne'>Brecking Load - 1<span style={{ color: 'red',}}  >*</span></label>
            <input
              className='form-input'
              type='number'
              step={0.01}
             min={0}

              name='resultOne'
              value={formdata.resultOne}
              placeholder='breacking load'
              onFocus={handleFocus}
              autoComplete='off'
              onChange={handleChange}
              width={'65%'}
              disabled={formdata.nosSample < 1 ? true : false}
            />
            </div>
            <div style={{margin:'0 0 0 5px'}}>
            <label className='form-label' htmlFor='wOne'>Weight - 1<span style={{ color: 'red' }}>*</span></label>
            
             <input
             type='number'
             step={0.01}
             min={0}

             className='form-input'
             name='wOne'
             value={formdata.wOne}
            placeholder='weight of sample'
             onFocus={handleFocus}
             autoComplete='off'
             onChange={handleChange}
             width={'35%'}
             disabled={formdata.nosSample < 1 ? true : false}
             />
             </div>
             </div>
             <div style={{display:'flex',justifyContent:'flex-start'}}>
              <div style={{margin:'0 5px 0 0'}}>
             <label className='form-label' htmlFor='resultTwo'>Brecking Load - 2<span style={{ color: 'red' }}>*</span></label>
            <input
              className='form-input'
              type='number'
              step={0.01}
             min={0}

              name='resultTwo'
              value={formdata.resultTwo}
              placeholder='breacking load'
              onFocus={handleFocus}
              autoComplete='off'
              onChange={handleChange}
              width={'65%'}
              disabled={formdata.nosSample < 2 ? true : false}
            />
            </div>
            <div style={{margin:'0 0 0 5px'}}>
            <label className='form-label' htmlFor='wTwo'>Weight - 2<span style={{ color: 'red' }}>*</span></label>
            
             <input
             type='number'
             step={0.01}
             min={0}

             className='form-input'
             name='wTwo'
             value={formdata.wTwo}
            placeholder='weight of sample'
             onFocus={handleFocus}
             autoComplete='off'
             onChange={handleChange}
             width={'35%'}
             disabled={formdata.nosSample < 2 ? true : false}
             />
             </div>
             </div>
            
             <div style={{display:'flex',justifyContent:'flex-start'}}>
              <div style={{margin:'0 5px 0 0'}}>
             <label className='form-label' htmlFor='resultThree'>Brecking Load - 3<span style={{ color: 'red' }}>*</span></label>
            <input
              className='form-input'
              type='number'
              step={0.01}
             min={0}

              name='resultThree'
              value={formdata.resultThree}
              placeholder='breacking load'
              onFocus={handleFocus}
              autoComplete='off'
              onChange={handleChange}
              width={'65%'}
              disabled={formdata.nosSample < 3 ? true : false}
            />
            </div>
            <div style={{margin:'0 0 0 5px'}}>
            <label className='form-label' htmlFor='wThree'>Weight - 3<span style={{ color: 'red' }}>*</span></label>
            
             <input
             type='number'
             step={0.01}
             min={0}
             className='form-input'
             name='wThree'
             value={formdata.wThree}
             placeholder='weight of sample'
             onFocus={handleFocus}
             autoComplete='off'
             onChange={handleChange}
             width={'35%'}
             disabled={formdata.nosSample < 3 ? true : false}
             />
             </div>
             </div>
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

export default CubeResultModal
