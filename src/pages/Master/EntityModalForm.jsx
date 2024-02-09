import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "../Common.css";

import BusyForm from "../../component/BusyForm";
import axios from "../../AxiosConfig";
import { Bounce, toast } from "react-toastify";
import { CgClose } from "react-icons/cg";
import { getCurrentDate } from "../Common";

function EntityModalForm({ isShow, onHide, type, supid, entityType,onUpdate }) {
  
  // console.log(entityType,type)
  const [isBusyShow, setIsBusyShow] = useState(false);

  function initializeData(){
    return{
    sup_name:'',
    types:entityType,
    add1 : '',
    add2 : '',
    city : 'surat',
    state : 'gujarat',
    email : '',
    phone : '',
    companyname : '',
    gstno:'',
    bloodgroup : 'o+',
    adharid: '',
    pan : '',
    adharphoto : '',
    photo: '',
    Isactive : true,
    doj:'' ,
    sup_id:'',
    };
  }
const [fromData,setFormdata]=useState(initializeData())
const [isButtonDisabled,setButtonDisabled]=useState(false)
const [oldadhar,setoldadhar]=useState('')
const [oldphoto,setoldphoto]=useState('')
//console.log(fromData)
  useEffect(()=>{
    if (type=='edit'){
      setIsBusyShow(true)
      if (supid){
      axios.get("/entity/" + supid+'/').then((response) => {
           setIsBusyShow(false)
           setFormdata(response.data);
           //console.log(response.data)
           setoldadhar(response.data.adharphoto)
           setoldphoto(response.data.photo)
          }).catch((e=>{
            setIsBusyShow(false)
          }))
        }   
    }
    
      
  },[supid])

  useEffect(()=>{
    setFormdata(initializeData())
    setoldadhar('')
    setoldphoto('')
    //console.log(fromData)
  },[onHide])
 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function checkEmail(val){
    if (emailRegex.test(val)){
      return true
    }
    
  }
  

  const handleInputChange = (e) => {
    
    if (e.target.type === 'file') {
     
       setFormdata({
         ...fromData,
         [e.target.name]: e.target.files[0], 
        });
          
    } 
    else if (e.target.type === 'number') {
      const { name, value } = e.target;

      // Remove non-numeric characters
      const numericValue = value.replace(/\D/g, '');
    
      // Limit to 10 digits
      const limitedValue = numericValue.slice(0, 10);
      setFormdata({
        ...fromData,
        [name]: limitedValue, 
       });
       if (numericValue.length > 10) {
        // You can set an error state or display a message as needed
        toast.warning("phone exceed more then 10 digit ",{closeOnClick: true,transition: Bounce,});
      }
         
   }
    else {
      setFormdata({
        ...fromData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const hangleEntry=(e)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(e.target.value);

  // Display an error if the email is not valid
    if (!isValidEmail && e.target.value!='') {
    // You can set an error state or display a message as needed
  
    toast.warning("please write email in email format ",{closeOnClick: true,transition: Bounce,});
    }
  }
  const Save = async (type, e) => {
    setButtonDisabled(true)
    e.preventDefault();
    
    if (type === "add") {
      if (fromData.sup_name !='' && fromData.city!='' && fromData.state!='' && fromData.email!='' && fromData.phone!='' && fromData.doj!=''&& fromData.adharid!=''){
        
        console.log(fromData);

        await axios

        .post("/entity/", fromData,{headers: {
          'Content-Type': 'multipart/form-data',
        },})
        .then((response) => {
          //postData = [];
          
          onUpdate();
          
          toast.success("data Added sucessfully",{closeOnClick: true,transition: Bounce,});
        })
        .catch((err) => {
          toast.error("Error in adding data: " + err.message,{closeOnClick: true,transition: Bounce,});
        });
        setButtonDisabled(false)
      }
      else{
        setButtonDisabled(false)
        toast.warning("fill all red marked field ",{closeOnClick: true,transition: Bounce,});

      }
    }

    if (type === "edit") {
      console.log(fromData,supid);
      const formData = new FormData();
      formData.append('adharphoto', fromData.adharphoto);
      await axios
        .put("/entity/" + supid+'/', fromData,{
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          
          onUpdate();
          toast.success(`data Edited sucessfully` ,{closeOnClick: true,transition: Bounce,});
        })
        .catch((err) => {
          toast.error(`Error editing data:  ` + err.message,{closeOnClick:true, transition: Bounce,});
        });
        setButtonDisabled(false)
    }
   
  };

  
  if (!isShow) return null;

  return ReactDOM.createPortal(

    <div className="modal">
      <BusyForm isShow={isBusyShow} />
      <div className="modal-content">
        <div className="form-header">
          <h3
            style={{
              marginBottom: "0",
              textTransform: "capitalize",
              fontSize: "1.3rem",
              lineHeight: "1.5",
            }}
          >
            {" "}
            {entityType === "employee"
              ? type + " Employee"
              : type + " Supplier/Contractor"}
          </h3>
          <button className="control-btn btn-edit" onClick={onHide} disabled={isButtonDisabled}>
            <CgClose size={29} />
          </button>
        </div>

        <form style={{ padding: "5px 20px 10px 20px" }}>
          <div style={{ padding: "0 0 15px 0" }}>
            <label className="form-label" htmlFor="supname">
              {entityType == "employee" ? "Employee Name" : "Supplier Name"}
              <span style={{color:'red'}}>*</span>
            </label>
            <input
              className="form-input"
              type="text"
              name ="sup_name"
              value={fromData.sup_name}
              placeholder="Supplier Name"
              autoComplete="off"
              required
              onChange={(e) => handleInputChange(e)}
            />
            <label className="form-label" htmlFor="add1">
              Street
            </label>
            <input
              className="form-input"
              type="text"
              name="add1"
              value={fromData.add1}
              placeholder="street"
              autoComplete="off"
              onChange={(e) => handleInputChange(e)}
            />
            <label className="form-label" htmlFor="add2">
              Location
            </label>
            <input
              className="form-input"
              type="text"
              name="add2"
              value={fromData.add2}
              placeholder="location"
              autoComplete="off"
              onChange={(e) => handleInputChange(e)}
            />
            <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
             <div style={{ width: "45%" }}>
            <label className="form-label" htmlFor="city">
              City<span style={{color:'red'}}>*</span>
            </label>
            <input
              className="form-input"
              type="text"
              name="city"
              value={fromData.city}
              placeholder="city"
              autoComplete="off"
              required
              onChange={(e) => handleInputChange(e)}
            />
            </div>
            <div style={{ width: "45%" }}>
            <label className="form-label" htmlFor="state">
              State<span style={{color:'red'}}>*</span>
            </label>
            <input
              className="form-input"
              type="text"
              name="state"
              value={fromData.state}
              placeholder="state"
              autoComplete="off"
              required
              onChange={(e) => handleInputChange(e)}
            />
            </div>
</div>
            <label className="form-label" htmlFor="email">
              email<span style={{color:'red'}}>*</span>
            </label>
            <input
              className="form-input"
              type="email"
              name="email"
              value={fromData.email}
              placeholder="email"
              autoComplete="off"
              required
              onChange={(e) => handleInputChange(e)}
              onBlur={(e)=>hangleEntry(e)}
            />
            <label className="form-label" htmlFor="phone">
              Phone<span style={{color:'red'}}>*</span>
            </label>
            <input
              className="form-input"
              type="number"
              name="phone"
              maxLength={10}
              value={fromData.phone}
              placeholder="phone"
              autoComplete="off"
              required
              onChange={(e) => handleInputChange(e)}
            />

            {entityType === "employee" ? (
              <>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ width: "45%" }}>
                    <label className="form-label" htmlFor="doj">
                      Date Of joining<span style={{color:'red'}}>*</span>
                    </label>
                    <input
                      className="form-input"
                      type="date"
                      name="doj"
                      value={fromData.doj}
                      placeholder="Date of Joining"
                      autoComplete="off"
                      required
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                  <div style={{ width: "45%" }}>
                    <label className="form-label" htmlFor="bloodgroup">
                      Blood Group
                    </label>
                    <input
                      className="form-input"
                      type="text"
                      name="bloodgroup"
                      value={fromData.bloodgroup===null?'O+':fromData.bloodgroup}
                      placeholder="Blood Group"
                      autoComplete="off"
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                </div>
                <label className="form-label" htmlFor="adharid">
                  Adhar No<span style={{color:'red'}}>*</span>
                </label>
                <input
                  className="form-input"
                  type="text"
                  name="adharid"
                  value={fromData.adharid}
                  placeholder="Adhar No"
                  autoComplete="off"
                  required
                  onChange={(e) => handleInputChange(e)}
                />

                <label className="form-label" htmlFor="adharphoto">
                  Adhar Image<span style={{color:'#b4b4b4',fontSize:'.7rem',paddingLeft:'10px',fontWeight:'300'}}>(file less then 300 kb)</span>
                </label>
                <input
                  className="form-input"
                  type="file"
                  
                  name='adharphoto'
                  placeholder="Adhar Image"
                  autoComplete="off"
                  
                  onChange={handleInputChange}
                />
                <p
                  style={{
                    color: "#2596be",
                    fontWeight: "400",
                    marginBottom: "0",
                    fontSize:'.8rem'
                  }}
                >
                  { oldadhar?oldadhar.split('/')[3]:''}
                </p>
                <label className="form-label" htmlFor="photo">
                  Photo<span style={{color:'#b4b4b4',fontSize:'.7rem',paddingLeft:'10px',fontWeight:'300'}}>(file less then 300 kb)</span>
                </label>
                <input
                  className="form-input"
                  type="file"
                  
                  name="photo"
                  placeholder="Photo"
                  autoComplete="off"
                  
                  onChange={handleInputChange}
                />
                <p
                  style={{
                    color: "#2596be",
                    fontWeight: "400",
                    marginBottom: "0",
                    fontSize:'.8rem'
                  }}
                >
                  {oldphoto?oldphoto.split('/')[3]:''}
                </p>
              </>
            ) : (
              <>
                <label className="form-label" htmlFor="companyname">
                  Company Name
                </label>
                <input
                  className="form-input"
                  type="text"
                  name="companyname"
                  placeholder="company name"
                  autoComplete="off"
                  value={fromData.companyname}
                  onChange={(e) => handleInputChange(e)}
                />

                <label className="form-label" htmlFor="gst">
                  GST
                </label>
                <input
                  className="form-input"
                  type="text"
                  name="gstno"
                  value={fromData.gstno}
                  placeholder="GST"
                  autoComplete="off"
                  onChange={(e) => handleInputChange(e)}
                />
              </>
            )}
            <label className="form-label" htmlFor="pan">
              PAN
            </label>
            <input
              className="form-input"
              type="text"
              name="pan"
              value={fromData.pan}
              placeholder="PAN"
              autoComplete="off"
              onChange={(e) => handleInputChange(e)}
            />
            <input
              type="checkbox"
              name="Isactive"
              checked={fromData.Isactive}
              onChange={(e) => handleInputChange(e)}
            />
            <label
              className="form-label"
              style={{ marginLeft: "15px" }}
              htmlFor="active"
            >
              Is Active
            </label>
          </div>
        </form>
        <div className="form-footer">
          <button
            className="mbtn mbtn-edit"
            type="submit"
            onClick={(e) => Save(type, e)}
            disabled={isButtonDisabled}
          >
            {type === "add" ? "Save" : "Update"}
          </button>
          <button
            style={{ marginLeft: "10px" }}
            className="mbtn mbtn-close"
            onClick={onHide}
            disabled={isButtonDisabled}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default EntityModalForm;
