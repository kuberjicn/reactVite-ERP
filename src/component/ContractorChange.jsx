
import React, { useState,useEffect } from 'react'
import axios from "../AxiosConfig";

import './component.css'
import { useGlobleInfoContext } from "../GlobleInfoProvider";

function ContractorChange({initialvalue,type,isread,handleContractorChange}) {
    const [data, setData] = useState([])
    const [sup_id,setSup_id]=useState(initialvalue||0)
    const [supType,setSupType]=useState(type||'contractor')
    const { myState, updateProperty } = useGlobleInfoContext();

   
    useEffect(() => {
      setSup_id(initialvalue);
      
    }, []);

    useEffect(() => {
      fetchsupplier(supType);
    }, [supType,initialvalue]);
   
   
      
    const fetchsupplier = async (typ) => {
      try {
        let response;
        
          response = await axios.get(`/entity/?types=${typ}`);
         console.log(response)
        const responseData =
          response && response.data ? response.data.results : [];
        setData(responseData);
        //console.log("query", responseData);
        // If initialvalue is defined and not 0, set the selected supplier
        if (initialvalue && initialvalue !== 0) {
          //console.log("Initial value:", initialvalue);
          setSup_id(initialvalue);
        } else {
          // If responseData is not empty, set the selected supplier to the first item in the data array
          if (responseData && responseData.length > 0) {
            let id = responseData[0].sup_id;
            
          
          }
        }
      } catch (error) {
        console.error("Error fetching supplier data:", error);
      }
    };

    const handleChange = (e) => {
      const newValue = e.target.value;

      setSup_id(newValue);
      //console.log(newValue,data)
      const selectedItem = data.find((item) => item.sup_id == newValue);
      handleContractorChange(e, selectedItem);
    };

    
  return (
    <div>
      
      <label htmlFor="supplier" className='form-label'>Contractor Name:<span style={{color:'red'}}>*</span></label>
            <select id="supplier" name="supplier" className="site-dropdown combo-fontweight form-input" onChange={(e)=>handleChange(e)} value={sup_id} disabled={isread}  >
            <option style={{fontWeight:'500',color:'#dadada',textTransform:'capitalize'}} value={0} disabled={true}>{type=='contractor'?'Select Contractor':'Select Employee'}</option>
                {data && data.length > 0 && data.map((item) =>
                    <option value={item.sup_id} key={item.sup_id} >{item.sup_name} </option>
                )};
            </select>
    </div>
  )
}

export default ContractorChange
