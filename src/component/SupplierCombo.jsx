
import React, { useState,useEffect } from 'react'
import axios from "../AxiosConfig";

import './component.css'
import { useGlobleInfoContext } from "../GlobleInfoProvider";

function SupplierCombo({initialvalue,type,isread}) {
    const [data, setData] = useState([])
    const [sup_id,setSup_id]=useState(0)
    const [supType,setSupType]=useState('employee')
    const { myState, updateProperty } = useGlobleInfoContext();

    // useEffect(() => {
    //   fetchsupplier(supType)
      
    // }, []);

    const handleEmployeeChanged = (e) => {
      if (e && e.target) {
      const newValue =parseInt(e.target.value);
      //const selectedEmployee = data.find(item => item.sup_id === newValue);
      //console.log(selectedEmployee);
      setSup_id(newValue)
       }
    };

    useEffect(() => {
      console.log(initialvalue);

      fetchsupplier(supType)
      setSup_id(sup_id)
      handleEmployeeChanged(initialvalue)
    }, [data,type,handleEmployeeChanged]);
   
    
      

    const fetchsupplier = (typ) => {
     
      if (!myState.employeeObject){
            axios.get(`/entity/?types=${typ}`).then(response => {
            setData(response.data.results)
            updateProperty('employeeObject',response.data.results)}
        ).catch(err => {
            setError("Something went wrong. Please try again later.");
      })
        }else{
           setData(myState.employeeObject)
        }
      }

    
  return (
    <div>
      
      <label htmlFor="supplier" className='form-label'>Supplier Name:<span style={{color:'red'}}>*</span></label>
            <select id="supplier" name="supplier" className="site-dropdown company form-input" onChange={(e)=>handleEmployeeChanged(e)} value={sup_id} disabled={isread}  >
                {data.map((item) =>
                    <option value={item.sup_id} key={item.sup_id} >{item.sup_name} </option>
                )};
            </select>
    </div>
  )
}

export default SupplierCombo
