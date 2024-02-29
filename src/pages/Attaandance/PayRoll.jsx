import React, { useEffect, useState } from 'react'
import TitalBar from '../../component/TitalBar'
import PayRollButton from '../../component/PayRollButton'
import axios from "../../AxiosConfig";
function PayRoll() {
 const [data,setData]=useState([])
const onShowModal=()=>{

}
 const getData=async()=>{
  await axios
  .get(`/pay-roll`)

  .then((response) => {
    setData(response.data);
    console.log(response.data);
    
  })
  .catch(() => {
    
    setError("Something went wrong. Please try again later.");
  });
  }
const handleRefresh=()=>{

}
  return (
    <div style={{display:'flex',justifyContent:'flex-start'}}>
      <div style={{minWidth:'75%',borderRight:'1px solid #fff',height:'94vh'}}>
      <TitalBar
            title={'Pay Roll'}
            buttonString={['pdf','print','excel']}
          />
          <div>

          </div>
      </div>
      <div style={{minWidth:'25%',backgroundColor:'#dadada'}}>
      <TitalBar
            onAdd={onShowModal}
            addvisible={true}
            
            onChangeCombo={(e)=>handleRefresh(e)}
            onRefresh={() => getData()}
            isVisible={'YearSelector'}
            buttonString={['refresh',]}
          />
          <PayRollButton data={data}/>
      <div>

      </div>

      </div>
    </div>
  )
}

export default PayRoll
