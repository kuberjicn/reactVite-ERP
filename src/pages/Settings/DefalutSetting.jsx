import React,{useState,useEffect} from 'react'
import { useGlobleInfoContext } from "../../GlobleInfoProvider";
import axios from "../../AxiosConfig";
import { Bounce, toast } from "react-toastify";
import { keyBy } from 'lodash';


const DefalutSetting = () => {
  const [formdata,setFormdata]=useState({})
  const { myState ,updateProperty } = useGlobleInfoContext();
 

   

  useEffect (()=>{
    updateProperty("isSitedisable", false)
 },[])
 
  const handleChange=(e)=>{
    
    setFormdata({
      ...formdata,
      [e.target.name]: {
        ...formdata[e.target.name],
        value: e.target.value,
      },
    });
  }


  const getData = async (siteid) => {
    try {
      if (siteid) {
        const response = await axios.get(`/setting/?siteid=${siteid}`);
        const data = keyBy(response.data, "key");
        setFormdata(data);
      }
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  useEffect(() => {
    if (myState.siteid) {
      getData(myState.siteid);
      
    }
    
  }, [myState.siteid]);


  const handleFocus = (e) => {
    e.target.select(); 
  };


  const Save = async (e) => {
    e.preventDefault();
    const keyToSave = e.target.name;
    const dataToSave = formdata[keyToSave]?.value;

    if (typeof dataToSave !== 'string') {
      console.error("Expected a string, but got:", dataToSave);
      return;
    }

    try {
      await axios.post(`/setting/update_or_create_setting/?key=${keyToSave}&site_id=${myState.siteid}`, { value: dataToSave });
      toast.success("Data saved successfully", {
        closeOnClick: true,
        transition: Bounce,
        position: "bottom-right",
      });
    } catch (err) {
      toast.error("Error saving data: " + err.message, {
        closeOnClick: true,
        transition: Bounce,
        position: "bottom-right",
      });
    }
    }

    
   
 

  return (
    <div>
      <div style={{padding:'5px 10px'}}>
      
          {/* {console.log(formdata)} */}
          <label className="form-label" htmlFor="sitename">
           WhatsApp, Labour Report to (Phone Number) :
          </label>
          <input
          style={{width:'500px',marginLeft:'10px'}}
            className="form-input"
            type="text"
            name="lbrwa"
            value={formdata['lbrwa']?.value || ''}
            onFocus={handleFocus}
            placeholder="list of phone seperated by comma e.g. 1111111111,1236323359,"
            autoComplete="off"
            onChange={(e) =>handleChange(e)}
          />
       <button className='btn mbtn-edit' name='lbrwa' style={{padding:'0 5px',marginLeft:'10px'}} onClick={(e)=>Save(e)}>Save</button>
        
      </div>

      {/* <div style={{padding:'5px 10px'}}>
      
          
          <label className="form-label" htmlFor="sitename">
           WhatsApp, Labour Report to (Phone Number) :
          </label>
          <input
          style={{width:'500px',marginLeft:'10px'}}
            className="form-input"
            type="text"
            name="value"
            value={formdata['abc']?.value || ''}
            onFocus={handleFocus}
            placeholder="list of phone seperated by comma e.g. 1111111111,1236323359,"
            autoComplete="off"
            onChange={(e) =>handleChange(e)}
          />
       <button className='btn mbtn-edit' name='lbrwa' style={{padding:'0 5px',marginLeft:'10px'}} onClick={(e)=>Save(e)}>Save</button>
        
      </div> */}

    </div>
  )
}

export default DefalutSetting
