
import React, { useEffect, useState } from 'react'
import axios from "../AxiosConfig";

import './component.css'
import { useGlobleInfoContext } from "../GlobleInfoProvider";
import CompanyModalForm from '../pages/Master/CompanyModalForm';
import { FaPlus} from "react-icons/fa6";

function CompanyChange({ initialvalue=0 ,CompanyChange ,isaddVisible=false}) {

    const [data, setData] = useState([])
    const [comp_id,setcomp_id]=useState(initialvalue?initialvalue:0)
    const { myState, updateProperty } = useGlobleInfoContext();
    const [isShow, setIsShow] = useState(false);
    const [change, setChange] = useState(false);
    const [isdisable,setIsdisable]=useState(false)
    const [type, settype] = useState("");
    const [dataEdit, setDataEdit] = useState([]);


    
   
   
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

    const isModalShow = (type) => {
        settype(type);
    
        setIsShow(true);
      };
      const isModalHide = () => {
        //setChange(!change)
        setDataEdit([]);
        setIsShow(false);
        settype("");
      };
    
      const onUpdate = () => {
        setChange(!change);
        setDataEdit([]);
        setIsShow(false);
        settype("");
      };

    return (
        <div style={isdisable?{visibility:"hidden"}:{visibility:'visible'}}>
            <label htmlFor="company" className='form-label'>Company Name:<span style={{color:'red'}}>*</span></label>
            <div style={{display:'flex',justifyContent:'space-between',}}>
            <div style={{width:'100%'}}>
                
                <select id="company" name="company" className="site-dropdown combo-fontweight form-input" onChange={(e)=>handleCompanyChanged(e)} value={comp_id}  >
                <option style={{fontWeight:'500',color:'#dadada',textTransform:'capitalize'}} value={0} disabled={true}>Select Company</option>
                    {data.map((item) =>
                        <option value={item.comp_id} key={item.comp_id} >{item.compname} </option>
                    )};
                </select>
            </div>
            
            {isaddVisible?
                <button className="mbtn mbtn-edit"  style={{ marginLeft:'3px',width:'25px',padding:'2px 2px',height:'100%'}} title='add new data'  onClick={() => isModalShow("add")} >                <FaPlus  size={16} />
                </button>:''}
           
          </div>
          <CompanyModalForm 
          isShow={isShow}
          onHide={isModalHide}
          onUpdate={onUpdate}
          type={type}
          data={dataEdit}
          />
        </div>
    )
}

export default CompanyChange
