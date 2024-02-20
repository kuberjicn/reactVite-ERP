

import LeaveRow from '../../component/LeaveRow'
import React, { useEffect, useState } from "react";
import axios from "../../AxiosConfig";

function LeaveRegister() {
  // const employees=[{"name":"bhavesh vanecha","id":"10","year":"2024",'leave':[{"leavetype":"casual","opbal":"25","consumed":"10"},{"leavetype":"sick","opbal":"12","consumed":"4"}]},{"name":"sagar markana","id":"11","year":"2024",'leave':[{"leavetype":"casual","opbal":"25","consumed":"10"},{"leavetype":"sick","opbal":"12","consumed":"4"}]},,{"name":"sagar markana","id":"11","year":"2024",'leave':[{"leavetype":"casual","opbal":"25","consumed":"10"},{"leavetype":"sick","opbal":"12","consumed":"4"}]},,{"name":"sagar markana","id":"11","year":"2024",'leave':[{"leavetype":"casual","opbal":"25","consumed":"10"},{"leavetype":"sick","opbal":"12","consumed":"4"}]},,{"name":"sagar markana","id":"11","year":"2024",'leave':[{"leavetype":"casual","opbal":"25","consumed":"10"},{"leavetype":"sick","opbal":"12","consumed":"4"}]},,{"name":"sagar markana","id":"11","year":"2024",'leave':[{"leavetype":"casual","opbal":"25","consumed":"10"},{"leavetype":"sick","opbal":"12","consumed":"4"}]},,{"name":"sagar markana","id":"11","year":"2024",'leave':[{"leavetype":"casual","opbal":"25","consumed":"10"},{"leavetype":"sick","opbal":"12","consumed":"4"}]},,{"name":"sagar markana","id":"11","year":"2024",'leave':[{"leavetype":"casual","opbal":"25","consumed":"10"},{"leavetype":"sick","opbal":"12","consumed":"4"}]},,{"name":"sagar markana","id":"11","year":"2024",'leave':[{"leavetype":"casual","opbal":"25","consumed":"10"},{"leavetype":"sick","opbal":"12","consumed":"4"}]}]

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
