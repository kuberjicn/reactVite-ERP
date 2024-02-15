
import React, { useState,useEffect } from 'react'
import axios from "../AxiosConfig";

import './component.css'
import { useGlobleInfoContext } from "../GlobleInfoProvider";

function SupplierCombo({initialvalue,type,isread,handleEmployeeChange}) {
    const [data, setData] = useState([])
    const [sup_id,setSup_id]=useState(initialvalue)
    const [supType,setSupType]=useState('employee')
    const { myState, updateProperty } = useGlobleInfoContext();

   
    useEffect(() => {
      setSup_id(initialvalue);
    }, [initialvalue]);

    useEffect(() => {
      fetchsupplier(supType);
    }, [supType]);
   
   
      
    const fetchsupplier = async (typ) => {
      try {
        let response;
        if (!myState.employeeObject) {
          response = await axios.get(`/entity/?types=${typ}`);
          updateProperty("employeeObject", response.data.results);
        } else {
          response = { data: { results: myState.employeeObject } };
        }
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
            
            //setSup_id(id);
            //console.log("length:", sup_id, id);
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
      handleEmployeeChange(e, selectedItem);
    };

    
  return (
    <div>
      
      <label htmlFor="supplier" className='form-label'>Supplier Name:<span style={{color:'red'}}>*</span></label>
            <select id="supplier" name="supplier" className="site-dropdown company form-input" onChange={(e)=>handleChange(e)} value={sup_id} disabled={isread}  >
            <option style={{fontWeight:'500',color:'#dadada',textTransform:'capitalize'}} value={0} disabled={true}>Select Employee</option>
                {data && data.length > 0 && data.map((item) =>
                    <option value={item.sup_id} key={item.sup_id} >{item.sup_name} </option>
                )};
            </select>
    </div>
  )
}

export default SupplierCombo
