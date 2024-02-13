
import React, { useEffect, useState } from 'react'
import axios from "../AxiosConfig";

import './component.css'
import { useGlobleInfoContext } from "../GlobleInfoProvider";
function CompanyChange({ initialvalue=0 ,CompanyChange}) {

    const [data, setData] = useState([])
    const [comp_id,setcomp_id]=useState(initialvalue?initialvalue:0)
    const { myState, updateProperty } = useGlobleInfoContext();

    
   
   
    const handleCompanyChanged = (e) => {
        if (e && e.target) {
        const newValue =parseInt(e.target.value);
        setcomp_id(newValue)
        const selectedCompany = data.find(item => item.comp_id === newValue);
        //console.log(selectedCompany);
        
        CompanyChange(e,selectedCompany)
         }
    };


    useEffect(() => {
        setcomp_id(initialvalue);
      }, [initialvalue]);

    useEffect(() => {
       fetchComp()
        console.log(data);
    }, []);


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
        if (initialvalue && initialvalue !== 0) {
            //console.log("Initial value:", initialvalue);
            setcomp_id(initialvalue);}

    }

    return (
        <div>
            <label htmlFor="company" className='form-label'>Company Name:<span style={{color:'red'}}>*</span></label>
            <select id="company" name="company" className="site-dropdown company form-input" onChange={(e)=>handleCompanyChanged(e)} value={comp_id}  >
            <option style={{fontWeight:'500',color:'#dadada',textTransform:'capitalize'}} value={0} disabled={true}>Select Company</option>
                {data.map((item) =>
                    <option value={item.comp_id} key={item.comp_id} >{item.compname} </option>
                )};
            </select>
        </div>
    )
}

export default CompanyChange
