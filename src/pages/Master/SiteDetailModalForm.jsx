import React, { useEffect,useState } from 'react';
import ReactDOM from 'react-dom';
import { CgClose } from "react-icons/cg";
import '../Common.css'
import axios from "../../AxiosConfig";
import { Bounce, toast } from 'react-toastify';
import { MdVisibility } from 'react-icons/md';
import BusyForm from "../../component/BusyForm";
import ModalLayout from '../ModalLauout';




function SiteDetailModalForm({ onClose, isShow, siteid  }) {
    // if (!isShow || siteid  === 0){
    //   return null; 
    // } 
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [id, setId] = useState(siteid);
    const [change, setChangee] = useState(false);
    const [type, setType] = useState('view');
    const [ButtonDisabled, setButtonDisabled] = useState(false);
    const [isBusyShow, setIsBusyShow] = useState(false);
    const [olddp_link, setOlddp_link] = useState(null);
    const [oldrera_link, setOldrera_link] = useState(null);

    
//console.log(`site-profile/?siteid=${siteid}`)
    const fetchSitedetail = async () => {
      setIsBusyShow(true)
      try {
        const response = await axios.get(`site-profile/?siteid=${siteid}`);
        console.log(response.data);
        setChangee(!change)
        setOlddp_link(response.data[0].dp_link)
        response.data[0].dp_link=null
        setOldrera_link(response.data[0].rera_link)
        response.data[0].rera_link=null
        setData(response.data[0]||{});
        
    } catch (error) {
        setError("Something went wrong. Please try again later.");
    }
    setIsBusyShow(false)
    };

    useEffect(() => {
      if (isShow && siteid) {
          fetchSitedetail();
        
      }
  }, [isShow, siteid]);
  
  

  useEffect(() => {
      
      if (Object.keys(data).length > 0){
        setType('edit')
      }
      else{
        setType('add')
      }
      
    //  console.log(data)
    },[change])


    const handleFocus = (e) => {
      e.target.select(); // Select all text in the input field
    };
   
    function handleDataChange(e) {
      if (e.target.type === 'file') {
     
        setData({
          ...data,
          [e.target.name]: e.target.files[0], 
         });
           
     } 
     else{
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
     }
      
    }
   
    
      
    const Save = async (type, e) => {
      setButtonDisabled(true)
      e.preventDefault();
     
     
        if (data.short_name !='' ){

          const { site, ...otherFields } = data;  // Destructure site from the formData

          const dataToSend = {
            site_id: site.site_id,  // Extract and use the site_id
            ...otherFields          // Use the spread operator to copy the rest of the fields
          };

        console.log(dataToSend);
        
          await axios
  
          .post(`/site-profile/?siteid=${siteid}`, dataToSend,{headers: {
            'Content-Type': 'multipart/form-data',
          },})
          .then((response) => {
         
            toast.success("data Added sucessfully",{closeOnClick: true,transition: Bounce, position: "bottom-right",});
          })
          .catch((err) => {
            toast.error("Error in adding data: " + err.message,{closeOnClick: true,transition: Bounce, position: "bottom-right",});
          });
          setButtonDisabled(false)
        }
        else{
          setButtonDisabled(false)
          toast.warning("fill all red marked field ",{closeOnClick: true,transition: Bounce, position: "bottom-right",});
        }
      }
     
    
  
    return(
        <>
          <BusyForm isShow={isBusyShow} />

          <ModalLayout  
            isShow={isShow} 
            onClose={onClose}
            content={
              <form style={{ padding: '20px',fontSize:'.8rem' }}>
                    <label className='form-label' htmlFor='rate'>Short Name : <span style={{ color: 'red' }}>*</span></label>
                    <input
                      className='form-input'
                      style={{textTransform:'uppercase'}}
                      type='text'
                      name='short_name'
                      value={data.short_name||''}
                      placeholder='short name'
                      autoComplete='off'
                      onChange={handleDataChange}
                      onFocus={handleFocus}

                    />

                    <label className='form-label' htmlFor='rate'>Land Area : </label>
                    <input
                      className='form-input'
                      type='number'
                      name='land_area'
                      value={data.land_area||0}
                      placeholder='land area'
                      autoComplete='off'
                      onChange={handleDataChange}
                      onFocus={handleFocus}
                    />
                    <label className='form-label' htmlFor='rate'>Builtup Area : </label>
                    <input
                      className='form-input'
                      type='number'
                      name='builtup_area'
                      value={data.builtup_area||0}
                      placeholder='built area'
                      autoComplete='off'
                      onChange={handleDataChange}
                      onFocus={handleFocus}

                    />

                  <label className='form-label' htmlFor='rate'>Construction Area : </label>
                    <input
                      className='form-input'
                      type='number'
                      name='construction_area'
                      value={data.construction_area||0}
                      placeholder='construction area'
                      autoComplete='off'
                      onChange={handleDataChange}
                      onFocus={handleFocus}

                    />

                    <label className='form-label' htmlFor='rate'>Parking Area : </label>
                    <input
                      className='form-input'
                      type='number'
                      name='parking_construction_area'
                      value={data.parking_construction_area||0}
                      placeholder='paeking construction area'
                      autoComplete='off'
                      onChange={handleDataChange}
                      onFocus={handleFocus}

                    />

                    <label className='form-label' htmlFor='rate'>Development Permission Number : </label>
                    <input
                      className='form-input'
                      style={{textTransform:'uppercase'}}
                      type='text'
                      name='dp_id'
                      value={data.dp_id||''}
                      placeholder='dp number'
                      autoComplete='off'
                      onChange={handleDataChange}
                      onFocus={handleFocus}

                    />
                    <label className='form-label' htmlFor='rate'>RERA Number : </label>
                    <input
                      className='form-input'
                      style={{textTransform:'uppercase'}}
                      type='text'
                      name='rera_id'
                      value={data.rera_id||0}
                      placeholder='rera number'
                      autoComplete='off'
                      onChange={handleDataChange}
                      onFocus={handleFocus}

                    />
              <div>
                <label className="form-label" htmlFor="dpid">
                  Development Permission<span style={{color:'#b4b4b4',fontSize:'.7rem',paddingLeft:'10px',fontWeight:'300'}}>(file less then 300 kb)</span>
                </label>
                <input
                  className="form-input"
                  style={{paddingLeft:'3px ' }}
                  type="file"
                  name='dp_link'
                  placeholder="DP file"
                  autoComplete="off"
                  onChange={handleDataChange}
                  accept=".png, .jpg, .jpeg"
                />
                <p
                  style={{
                    color: "#2596be",
                    fontWeight: "400",
                    marginBottom: "0",
                    fontSize:'.8rem'
                  }}
                >
                  { olddp_link ?olddp_link:''}
                </p>
                </div>

                <div>
                <label className="form-label" htmlFor="reraid">
                  RERA Permission<span style={{color:'#b4b4b4',fontSize:'.7rem',paddingLeft:'10px',fontWeight:'300'}}>(file less then 300 kb)</span>
                </label>
                <input
                  className="form-input"
                  style={{paddingLeft:'3px ' }}
                  type="file"
                  name='rera_link'
                  placeholder="rera file"
                  autoComplete="off"
                  onChange={handleDataChange}
                  accept=".png, .jpg, .jpeg"
                />
                <p
                  style={{
                    color: "#2596be",
                    fontWeight: "400",
                    marginBottom: "0",
                    fontSize:'.8rem'
                  }}
                >
                  { oldrera_link?oldrera_link:''}
                </p>
                </div>
                </form>}
                 footerContent={ 
                  <div  style={{ display:'flex',justifyContent:'flex-end', paddingRight:'0' }}>
                   <div style={{visibility:type==='view'?'hidden':'visible' }}>
                    <button
                      className="mbtn mbtn-edit"
                      type="submit"
                      onClick={(e) => Save(type, e)}
                    >
                      {type === "add" ? "Save" : type==='view' ? "": "Update"}
                    </button>
                    </div>
                    
           </div>
                
                 }
            
            title='Site Information'
          />
        </>
       
    );
}

export default SiteDetailModalForm;
