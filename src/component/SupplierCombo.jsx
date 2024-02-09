
import React, { useState,useEffect } from 'react'
import axios from "../AxiosConfig";

import './component.css'
import { useGlobleInfoContext } from "../GlobleInfoProvider";

function SupplierCombo({initialvalue,type,handleEmployeeChanged,isread}) {
    const [data, setData] = useState([])
    const [sup_id,setSup_id]=useState(initialvalue?initialvalue:-1)
    const [supType,setSupType]=useState('employee')
    const { myState, updateProperty } = useGlobleInfoContext();

    useEffect(() => {
      fetchsupplier(supType)
      
    }, []);

    useEffect(() => {
      setSup_id(initialvalue)
      }, [initialvalue,type]);
   
     
    const fetchsupplier = async(typ) => {
      if (!myState.employeeObject){
            axios.get("/entity/", { params: { filter2: typ }}).then(response => {
            setData(response.data)
            updateProperty('employeeObject',response.data)}
              
        ).catch(err => {
            setError("Something went wrong. Please try again later.");
      })
        }else{
          //console.log(myState.employeeObject)
          setData(myState.employeeObject)
        }
        ;


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
