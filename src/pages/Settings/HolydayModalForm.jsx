import React, { useEffect, useState } from 'react'
import ModalLayout from '../ModalLauout'
import { getCurrentDate } from '../Common';
import DateSelector from '../../component/DateSelector';
import axios from "../../AxiosConfig";
import { Bounce, toast } from "react-toastify";
import "../Common.css";


const HolydayModalForm = ({onClose, isShow, type='add', hdid=0,onUpdate} ) => {
  const [formdata,setFormdata]=useState([])


  const handleChange=(e)=>{
    console.log(e.target.name);
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
    .get(`/declare-holyday/${hdid}`)
    .then((response) => {
      setFormdata(response.data);
      
    })
    .catch(() => {
      toast.error("Error fetching data");
    });
  }
  useEffect(()=>{
    if (hdid!=0){
      getData()
      }
      else{
        formdata.name='',
        formdata.hd_date=getCurrentDate()
      }
  },[hdid])

  const isValidData = () => {
    
    if (formdata.hd_date && formdata.name  !== null && formdata.name !='') {
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
        .post("/declare-holyday/", formdata)
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
        .put(`/declare-holyday/${hdid}/` , formdata)
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
          <DateSelector name="hd_date" initialvalue={formdata.hd_date||getCurrentDate()} onDateChange={(e)=>handleChange(e)} />
          <label className="form-label" htmlFor="sitename">
            Detail<span style={{ color: "red" }}>*</span>
          </label>
          <input
            className="form-input"
            type="text"
            name="name"
            value={formdata.name||''}
            onFocus={handleFocus}
            placeholder="Discription"
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
      title={"Schedule Holyday"}
      />
    </div>
  )
}

export default HolydayModalForm
