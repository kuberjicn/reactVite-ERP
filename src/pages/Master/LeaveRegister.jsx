

import LeaveRow from '../../component/LeaveRow'
import React, { useEffect, useState } from "react";
import axios from "../../AxiosConfig";

function LeaveRegister() {
  

  const [data,setData]=useState([])
  const [error,setError]=useState('')

  const fetchemployee = async () => {
    
    const employees= await axios.get('/leave-register/')
      .then((response) => {
        setData(response.data)
        setTotalPages(Math.ceil(response.data.count / pageSize));
      })
      .catch(() => {
        setError("Something went wrong. Please try again later.");
      });
    
  };

  useEffect(() => {
    
    fetchemployee();
    
  }, []);

  return (
    <div>
      {data.map((emp)=>
        <LeaveRow data={emp}/>
      )}
      
      
    </div>
  )
}

export default LeaveRegister
