
import React, { useEffect, useState } from 'react'
import axios from "../AxiosConfig";

import './component.css'
import { useGlobleInfoContext } from "../GlobleInfoProvider";
function CompanyChange({ initialvalue=0 }) {

    const [data, setData] = useState([])
    const [comp_id,setcomp_id]=useState(initialvalue?initialvalue:-1)
    const { myState, updateProperty } = useGlobleInfoContext();

    // useEffect(() => {
    //     console.log("first");
    //    fetchComp()
    // }, []);

   
   
    const handleCompanyChanged = (e) => {
        if (e && e.target) {
        const newValue =parseInt(e.target.value);
        const selectedCompany = data.find(item => item.comp_id === newValue);
        //console.log(selectedCompany);
        setcomp_id(newValue)
         }
    };


    useEffect(() => {
       fetchComp()
        console.log(data);
        setcomp_id(initialvalue)
        handleCompanyChanged(initialvalue)
      
      
    }, [data,]);


    const fetchComp = () => {
        if (!myState.companyObject){
         axios.get('/company').then(response => {
            setData(response.data)
            //console.log(response.data);
            updateProperty('companyObject',response.data)
        }).catch(err => {
            setError("Something went wrong. Please try again later.");
        });
        }
        else{
        setData(myState.companyObject)
        //console.log(myState.companyObject);
        }

    }

    return (
        <div>
            <label htmlFor="company" className='form-label'>Company Name:<span style={{color:'red'}}>*</span></label>
            <select id="company" name="company" className="site-dropdown company form-input" onChange={(e)=>handleCompanyChanged(e)} value={comp_id}  >
                {data.map((item) =>
                    <option value={item.comp_id} key={item.comp_id} >{item.compname} </option>
                )};
            </select>
        </div>
    )
}

export default CompanyChange
