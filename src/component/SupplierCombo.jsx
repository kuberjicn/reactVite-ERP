
import React, { useState,useEffect } from 'react'
import axios from "../AxiosConfig";

import './component.css'
import { useGlobleInfoContext } from "../GlobleInfoProvider";

function SupplierCombo({initialvalue,type,isread,handleEmployeeChange,isall=false}) {
    const [data, setData] = useState([])
    const [sup_id,setSup_id]=useState(initialvalue)
    const [supType,setSupType]=useState(type||'employee')
    
    const { myState, updateProperty } = useGlobleInfoContext();

   
    useEffect(() => {
      setSup_id(initialvalue);
     
    }, [initialvalue]);

    useEffect(() => {
      fetchsupplier(type);
    },[]);
   
    
      
    const fetchsupplier = async (typ) => {
      try {
        
        let response;
        
        
       if (supType=='supplier'){
          if (!myState.supplierObject) {
            response = await axios.get(`/entity/?types=supplier`);
            updateProperty("supplierObject", response.data.results);
          } else {
          response = { data: { results: myState.supplierObject } };
          }
        }
        else if (supType=='contractor'){
          if (!myState.contractorObject) {
            response = await axios.get(`/entity/?types=contractor`);
            updateProperty("contractorObject", response.data.results);
          } else {
          response = { data: { results: myState.contractorObject } };
          }
        }
        else if (supType=='employee'){
          if (!myState.employeeObject) {
            response = await axios.get(`/entity/?types=employee`);
            updateProperty("employeeObject", response.data.results);
          } else {
          response = { data: { results: myState.employeeObject } };
          }
        }
        else{
          response = { data: { results: [] } };
        }

        const responseData = response && response.data ? response.data.results : [];
        setData(responseData);
      
        if (initialvalue && initialvalue !== 0) {
          setSup_id(initialvalue);
        } else {
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
      handleEmployeeChange(e, selectedItem);
    };

    
  return (
    <div>
      
      <label htmlFor="supplier" className='form-label'>{supType=="employee" ? "Enployee Name:":"Supplier Name:"  }<span style={{color:'red'}}>*</span></label>
            
            <select id="supplier" name="supplier" className="site-dropdown combo-fontweight form-input"  onChange={(e)=>handleChange(e)} value={sup_id} disabled={isread}  >
            {isall?
            <option style={{textTransform:'capitalize'}} value={0} >All</option>:
            <option style={{fontWeight:'500',color:'#dadada',textTransform:'capitalize'}} value={0} disabled={true}>{supType=='employee'?'Select Employee':'Select Supplier'}</option>}
                {data && data.length > 0 && data.map((item) =>
                    <option value={item.sup_id} key={item.sup_id} >{item.sup_name} </option>
                )};
            </select>
    </div>
  )
}

export default SupplierCombo
