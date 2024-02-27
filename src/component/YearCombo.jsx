
import { useState,useEffect } from "react"
import React from 'react'
import axios from "../AxiosConfig";

import './component.css'

function YearCombo({initialvalue,onddchange,isread=false}) {

  const [data, setData] = useState([])
  const [year_id,setYearid]=useState(initialvalue)
  

 
  useEffect(() => {
    setYearid(initialvalue);
  }, [initialvalue]);

  useEffect(() => {
    fetchyear();
  }, []);
 
 
    
  const fetchyear = async () => {
    try {
      let response;
        response = await axios.get('years/');
        //console.log(response);
      const responseData =
        response && response.data ? response.data.years : [];
      setData(responseData);
      if (initialvalue && initialvalue !== '') {
        setYearid(initialvalue);
      } else {
        if (responseData && responseData.length > 0) {
          let id = responseData[0].year;
        }
      }
    } catch (error) {
      console.error("Error fetching year data:", error);
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setYearid(newValue);
    onddchange(e);
  };


  return (
    <div>
      
            <select id="fyyear" name="fyyear" className="site-dropdown company form-input" onChange={(e)=>handleChange(e)} value={year_id} disabled={isread}  >
            <option style={{fontWeight:'500',color:'#dadada',textTransform:'capitalize'}} value={'0000'} disabled={true}>Select Year</option>
                {data && data.length > 0 && data.map((item) =>
                    <option value={item} key={item} >{item} </option>
                )};
            </select>

    </div>
  )
}

export default YearCombo
