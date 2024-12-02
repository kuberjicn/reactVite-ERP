import React, { useEffect, useState } from "react";
import AttandanceCard from "../../component/AttandanceCard";
import BusyForm from "../../component/BusyForm";
import axios from "../../AxiosConfig";
import TitalBar from "../../component/TitalBar";
import { getCurrentDate } from "../../pages/Common";
import { Bounce, toast } from "react-toastify"; 
import { useGlobleInfoContext } from "../../GlobleInfoProvider";
import {checkPermissions} from '../Common'
function AttandanceRegister() {
  const { myState ,updateProperty} = useGlobleInfoContext();

  const [data, setData] = useState([]);
  const [isBusyShow, setIsBusyShow] = useState(false);
  const [error,setError]=useState('')
  const [curdate,setcurDate]=useState(getCurrentDate())
  const [refresh,setRefresh]=useState(false)

  

  const getData = async (dte) => {
    setIsBusyShow(true);

    await axios
      .get(`/attendance/?att_date=${dte}`)

      .then((response) => {
        setData(response.data.results);
       
      })
      .catch(() => {
        setIsBusyShow(false);

        setError("Something went wrong. Please try again later.");
      });
    setIsBusyShow(false);
  };
  useEffect(() => {
    getData(curdate);
  }, [curdate,refresh]);

  useEffect (()=>{
    updateProperty("isSitedisable", true)
 },[])

 
  const toggleShtype = async(attid, atttype) => {
    //console.log("shtype", attid, atttype);
    
    if (atttype===3)
    {atttype=2
    } 
    else if (atttype===2){atttype=3 }
   
    else{
      toast.warning("leave cannot be updated directly from attandance"), {
        closeOnClick: true,
        transition: Bounce,
        position: "bottom-right",
      };
    }
    if (atttype===2 || atttype===3){
      setIsBusyShow(true);
    await axios
      .patch(`/attendance/${attid}/`, {shType_id:atttype})
      .then((response) => {
        
        setRefresh(!refresh)
        toast.success("attandance toggled "), {
          closeOnClick: true,
          transition: Bounce,
          position: "bottom-right",
        };
        setIsBusyShow(false);
       
      })
      .catch(() => {
        setError("Something went wrong. Please try again later.");
        setIsBusyShow(false);
      });
    }
  };

  const toggleFhtype = async(attid, atttype) => {
    //console.log("fhtype", attid, atttype);
    
    if (atttype===3)
    {atttype=2} 
    else if (atttype===2){atttype=3} 
    else{
      toast.warning("leave cannot be updated directly from attandance"), {
        closeOnClick: true,
        transition: Bounce,
        position: "bottom-right",
      };
    }
    if (atttype===2 || atttype===3){
      setIsBusyShow(true);
    await axios
      .patch(`/attendance/${attid}/`, {fhType_id:atttype})
      .then((response) => {
        
        setRefresh(!refresh)
        toast.success("Attandance toggled "), {
          closeOnClick: true,
          transition: Bounce,
          position: "bottom-right",
        };
        setIsBusyShow(false);
      })
      .catch(() => {
        setError("Something went wrong. Please try again later.");
        setIsBusyShow(false);
      });
    }
  };

  const handleDateChange=(e)=>{
    // getData(e.target.value)
    setcurDate(e.target.value)

  }

  const makePresnt=async(dte)=>{
    // makeAllpresent
    setIsBusyShow(true);

    await axios
      .put(`/attendance/makeAllpresent/?att_date=${dte}`)

      .then((response) => {
        
        setRefresh(!refresh)
        setIsBusyShow(false);
      })
      .catch(() => {
        setIsBusyShow(false);

        setError("Something went wrong. Please try again later.");
      });
    setIsBusyShow(false);
  }
  return (
    <>
      <BusyForm isShow={isBusyShow} />
      <TitalBar
        addvisible={false}
        isVisible="DateSelector"
        title="Attandance on Date :"
        initialvalue={curdate}
        onddchange={handleDateChange}
        onRefresh={() => getData(curdate)}
        makePresnt={()=> checkPermissions("change_attandance") && makePresnt(curdate)}
        buttonString={['refresh',checkPermissions("change_attandance") && 'present']}
      />
      <div className="grid-attandance">
        {data.map((item) => (
          <AttandanceCard
            key={item.att_id}
            fhtype={item.fhType.typ_id}
            shtype={item.shType.typ_id}
            supname={`[${item.supid.sup_id}] - ${item.supid.sup_name} `}
            intime={item.intime}
            outtime={item.outtime}
            
              togglefhtype={() => checkPermissions("change_attandance") && toggleFhtype(item.att_id, item.fhType.typ_id)}
              toggleshtype={() => checkPermissions("change_attandance") && toggleShtype(item.att_id, item.shType.typ_id)}
         
          />
        ))}
      </div>
    </>
  );
}

export default AttandanceRegister;
