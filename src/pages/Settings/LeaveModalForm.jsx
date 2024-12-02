import React, { useEffect, useState } from 'react'
import ModalLayout from '../ModalLauout'
import { getCurrentDate } from '../Common';
import DateSelector from '../../component/DateSelector';
import axios from "../../AxiosConfig";
import { Bounce, toast } from "react-toastify";
import "../Common.css";
import LeaveTypeSelector from '../../component/LeaveTypeSelector';


const LeaveModalForm = ({onClose, isShow, type='add', lvid=0,onUpdate} ) => {
  const [formdata,setFormdata]=useState([])


 
  const handleChange=(e)=>{
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  }

  const handletypeChange=(e)=>{
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  }

  
  const handleFocus = (e) => {
    e.target.select(); 
  };

  const getData=async()=>{
    await axios
    .get(`/declare-leave/${lvid}`)
    .then((response) => {
      setFormdata(response.data);
      
    })
    .catch(() => {
      toast.error("Error fetching data");
    });
  }
  useEffect(()=>{
    if (lvid!=0){
     
      getData()
      }
      else{
        formdata.lvs_type='casual',
        formdata.effect_date=getCurrentDate()
        formdata.value=30
      }
  },[lvid])

  

  const isValidData = () => {
    
    if (formdata.effect_date && formdata.lvs_type  !== null && formdata.value !=null) {
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

  const Save = async (type, e) => {
    e.preventDefault();
    if (!isValidData()) return;
    console.log(formdata);
    if (type === "add") {
      await axios
        .post("/declare-leave/", formdata)
        .then((response) => {
          setFormdata([]);
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
    }

    if (type === "edit") {
      //console.log(postData)

      await axios
        .put(`/declare-leave/${lvid}/` , formdata)
        .then((response) => {
    
         
          if (response)
            toast.success("data updated", {
              closeOnClick: true,
              transition: Bounce,
              position: "bottom-right",
            });
          else
            toast.error(response.data.error, {
              closeOnClick: true,
              transition: Bounce,
              position: "bottom-right",
            });
        })
        .catch((err) => {
          toast.error("Error editing data: " + err.message, {
            closeOnClick: true,
            transition: Bounce,
            position: "bottom-right",
          });
        });
    }
    onUpdate();
  };

  if (!isShow) return null;
 
  return (
    <div>
      <ModalLayout
      isShow={isShow}
      onClose={onClose}
      content={
        <form style={{ padding: "5px 20px 10px 20px" }}>
          <label className='form-label' htmlFor='ddate'>Date<span style={{ color: 'red' }}>*</span></label>
          <DateSelector name="effect_date" initialvalue={formdata.effect_date||getCurrentDate()} onDateChange={handleChange} />
          <LeaveTypeSelector name="lvs_type" initialvalue={formdata.lvs_type} onddchange={handletypeChange} />
          <label className="form-label" htmlFor="sitename">
            Detail<span style={{ color: "red" }}>*</span>
          </label>
          <input
            className="form-input"
            type="number"
            name="value"
            value={formdata.value}
            onFocus={handleFocus}
            placeholder="assign number"
            autoComplete="off"
            onChange={(e) =>handleChange(e)}
          />
    
        </form>
        
      }
      footerContent={
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            className="mbtn mbtn-edit"
            type="submit"
            onClick={(e) => Save(type, e)}
          >
            {type === "add" ? "Save" : "Update"}
          </button>
          
        </div>
      }
      type={type}
      title={"schedule Leave"}
      />
    </div>
  )
}

export default LeaveModalForm
