

import LeaveRow from '../../component/LeaveRow'
import BusyForm from '../../component/BusyForm';
import React, { useEffect, useState } from "react";
import axios from "../../AxiosConfig";

function LeaveRegister() {
  

  const [data,setData]=useState([])
  const [leave,setLeave]=useState([])
  const [leaveapp,setLeaveApp]=useState([])
  const [error,setError]=useState('')
  const [isBusyShow,setIsBusyShow]=useState(false)

  const fetchemployee = async () => {
    setIsBusyShow(true)
    const employees= await axios.get('/leave-register/')
   
      .then((response) => {
        setData(response.data)
        setLeaveApp(null)
        setLeave(null)
       console.log(response.data);
        setTotalPages(Math.ceil(response.data.count / pageSize));
      })
      .catch(() => {
        setIsBusyShow(false)
        setError("Something went wrong. Please try again later.");

      });
      setIsBusyShow(false)
  };

  useEffect(() => {
    
    fetchemployee();
    
  }, []);

  const get_leave=async(id)=>{
    setIsBusyShow(true)
      
      await axios.get('/leave-register/'+id +'/get_leavebyid')
     
        .then((response) => {
        setLeave(response.data)
        setData(null)
        setLeaveApp(null)
         console.log(response.data);
          setTotalPages(Math.ceil(response.data.count / pageSize));
        })
        .catch(() => {
          setIsBusyShow(false)
          setError("Something went wrong. Please try again later.");
  
        });
        setIsBusyShow(false)
    
  }


  const get_leaveapp=async(id)=>{
    setIsBusyShow(true)
      
      await axios.get('/leave-register/'+id +'/get_leaveapplicationbyid')
     
        .then((response) => {
        setLeaveApp(response.data)
        setData(null)
        setLeave(null)
         console.log(response.data);
          setTotalPages(Math.ceil(response.data.count / pageSize));
        })
        .catch(() => {
          setIsBusyShow(false)
          setError("Something went wrong. Please try again later.");
  
        });
        setIsBusyShow(false)
    
  }


  return (
    <div>
      <BusyForm isShow={isBusyShow} />
      {data && data.map(emp=>(
        <LeaveRow key={emp.id} data={emp} getdetail={get_leave} getapp={get_leaveapp}/>
      ))}

      {leaveapp && 
     
        <button className='mbtn mbtn-view'   onClick={fetchemployee} > back </button>
      }
      {leave && 
     
     <button className='mbtn mbtn-view'   onClick={fetchemployee} > back </button>
   }
      
    </div>
  )
}

export default LeaveRegister
