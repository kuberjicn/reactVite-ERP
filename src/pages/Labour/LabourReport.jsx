import React, { useEffect, useState, useCallback } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import axios from "../../AxiosConfig";
import "../../component/component.css";
import { toast,Bounce } from "react-toastify";

import TitalBar from "../../component/TitalBar";
import BusyForm from "../../component/BusyForm";
import { RiEyeFill } from "react-icons/ri";

import { useGlobleInfoContext } from "../../GlobleInfoProvider";

import { CenteredTextCell, formatDateymd } from "../Common";
import LabourModalForm from "./LabourModalForm";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";

import ErpDataGrid from "../../component/ErpDataGrid";
import SupplierCombo from "../../component/SupplierCombo";
import ActivityChange from "../../component/ActivityChange";
import DayRangeSelector from "../../component/DayRangeSelector";
import LabourChart from "../../component/LabourChart";
import GroupDataTable from "../../component/GroupDataTable";
import { SendWhatsAppLabourReport } from "../../component/SendWhatsAppLabourReport";


function LabourReport() {
  const { myState ,updateProperty} = useGlobleInfoContext();
  const [data, setData] = useState([]);
  const [avgdata, setAvgData] = useState([]);
  const [totdata, setTotData] = useState([]);
  const [labourdata, setLabourata] = useState([]);
  const [rptdate, setRptdate] = useState('01-01-2024');


  const [isBusyShow, setIsBusyShow] = useState(false);
 
  const [sup, setSup] = useState(0);
  const [act, setAct] = useState(0);
  const [range, setRange] = useState(7);
  

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };


  
  const columns = [
    
    {
      name: "Date",
      width: "15%",
      selector: (row) => formatDate(row.ddate),
      sortable: true,
    },
    
    {
      name: <CenteredTextCell>Skill</CenteredTextCell> ,
      width: "15%",
      cell: (row) => <CenteredTextCell>{ row.total_skill}</CenteredTextCell>,
      sortable: true,
    },
    { name: <CenteredTextCell>Unskill</CenteredTextCell>  , width: "15%", cell: (row) =><CenteredTextCell>{row.total_unskill}</CenteredTextCell>  },
    { name: <CenteredTextCell>Total</CenteredTextCell>  , width: "15%", cell: (row) =><CenteredTextCell>{row.total_workers}</CenteredTextCell>  },
    
    {
      name: "Action",
      width: "20%",
      selector: (row) => (
        <>
          <button
            className="mbtn mbtn-edit"
            key={`edit-${row.ddate}`}
            
             onClick={() => FetchLabourData(row.ddate)}
          >
            <RiEyeFill size={18} />
          </button>
          
        </>
      ),
    },
  ];

  const FetchLabourData=  useCallback(async (ddate=null) => {
    try {
     // console.log(ddate);
      //console.log(data)
      if (ddate == null && data.length > 0) {
        ddate = data[0]['ddate'];
        console.log(ddate);
    }
      setRptdate(ddate)
      setIsBusyShow(true);
      const response = await axios.get(`/labour-data/?date=${ddate}&site=${myState.siteid}`);
      setLabourata(response.data);
      
      
    } catch (error) {
      //setError("Something went wrong. Please try again later.");
      toast.error("Error fetching data");
    } finally {
      setIsBusyShow(false);
    }
  }, [data, sup, act, range,myState.siteid]);

  useEffect(()=>{
    if (sortedData.length > 0) {
      // Fetch data for the first available date
      FetchLabourData(data[0]['ddate']);
    }
  },[data,])

  const columns2 = [
    { name: "ID", width: "10%", selector: (row) => row.lbr_id },
   
    {
      name: "Activity",
      width: "35%",
      selector: (row) => row.actid.actname.toUpperCase(),
      sortable: true,
    },
    {
      name: <CenteredTextCell>Skill</CenteredTextCell> ,
      width: "15%",
      cell: (row) => <CenteredTextCell>{ row.skill}</CenteredTextCell>,
      sortable: true,
    },
    { name: <CenteredTextCell>Unskill</CenteredTextCell>  , width: "15%", cell: (row) =><CenteredTextCell>{row.unskill}</CenteredTextCell>  },
    
    
  ];


  const constructQueryString = (sup, act, range) => {
    const queryParams = [];
    queryParams.push(`siteid=${encodeURIComponent(myState.siteid)}`);
    if (sup !== 0) {
        queryParams.push(`sup=${encodeURIComponent(sup)}`);
    }

    if ( act !== 0) {
        queryParams.push(`act=${encodeURIComponent(act)}`);
    }

    if (range !== 0) {
        queryParams.push(`range=${encodeURIComponent(range)}`);
    }

    return queryParams.length ? `?${queryParams.join('&')}` : '';
};
  const fetchLabour = useCallback(async () => {
   // console.log(range)
    const queryString = constructQueryString(sup, act, range);
    const url = `/labour-report/${queryString}`;
    
    try {
      
      setIsBusyShow(true);
      const response = await axios.get(url);
      setData(response.data.data);
      setAvgData(response.data.averages)
      setTotData(response.data.totals)
     
      
      
    } catch (error) {
      //setError("Something went wrong. Please try again later.");
      toast.error("Error fetching data");
    } finally {
      setIsBusyShow(false);
    }
  }, [sup, act, range,myState.siteid,]);

  useEffect(()=>{
    fetchLabour()
  },[fetchLabour])

  useEffect (()=>{
    updateProperty("isSitedisable", false)
 },[])
  const onsupchange = (e) => {
   
    if (e && e.target) {
      setSup(parseInt(e.target.value,10))
      

    }
  };
 
  const onactchange = (e) => {
    
    if (e && e.target) {
      setAct(parseInt(e.target.value,10))
     

    }
  };

  const onRangeChange = (e) => {
    if (e && e.target) {
      setRange(parseInt(e.target.value, 10));
      //console.log(range)
    }
  };

  const closeModalForm = () => {
    setDataEdit([]);
    setIsShow(false);
    setType("");
  };
 
  const totalSkills = labourdata.reduce(
    (acc, row) => acc + (row.skill || 0),
    0
  );
  const totalUnskills = labourdata.reduce(
    (acc, row) => acc + (row.unskill || 0),
    0
  );
  

  const handleWhatsapp=async()=>{
    
    const response = await axios.get(`/pdf-lbr/?siteid=${myState.siteid}&ddate=${rptdate}`);
    const msg = response.data.msg
    
    
      toast.success(msg, {
        closeOnClick: true,
        transition: Bounce,
        position: "bottom-right",
        zIndex: 1000,
      });
    
  }

  const sortedData = data.sort((a, b) => new Date(a.ddate) - new Date(b.ddate));

  return (

    <div>
      
      <BusyForm isShow={isBusyShow} />
      
      <TitalBar
            onRefresh={() => fetchLabour()}
            title={`Total:${totdata.total_workers} `}
            onwhatsapp={handleWhatsapp}
            buttonString={["refresh", "pdf","whatsapp"]}
          />
      <div style={{display:'flex' ,justifyContent:'space-between',height:'470px'}}>
        
      <div style={{width:'55%',backgroundColor:'#fff',overflowY:'auto'}}>
      
            <div style={{display:'flex',justifyContent:'flex-start',marginBottom:'5px',position:'fixed',top:'52px',left:'25%',backgroundColor:'transparent'}} >
              <div style={{padding:'0 15px'}}>
               <SupplierCombo type="contractor" isall={true} initialvalue={0} handleEmployeeChange={onsupchange} />
              </div>
              <div style={{padding:'0 15px'}}>
              <ActivityChange isall={true} initialvalue={0} handleActivityChange={onactchange}/>
              </div>
              <div style={{padding:'0 15px'}}>
              <DayRangeSelector initialvalue={7} handlerangechange={onRangeChange}/>
            </div>
          </div>
      <div>
          
        <ErpDataGrid 
        title=''
        columns={columns}
        data={data}
        paginationIsRequired={false}
        />
        </div>
        </div>
        <div style={{ width:'45%',backgroundColor:'#fff' }}>
            <div className="tool-bar1" style={{minHeight:'35px',fontWeight:"bold",backgroundColor:'#fff',padding:'4px 10px'}}> Date :  {formatDate(rptdate)}
              <div> Total Workers : {totalUnskills+totalSkills}   |   Total skill :  {totalSkills}  |   Total unskill : {totalUnskills} </div>
            </div>
            <div style={{overflowX:'auto',padding:'0 5px'}}>
              <GroupDataTable
              columns={columns2}
              data={labourdata}
              groupByField="supid.sup_name"></GroupDataTable>
            </div>
        </div>
     </div>
     <div style={{height:'350px'}}>
      <LabourChart data={sortedData}/>
     </div>
    </div>
  );
}

export default LabourReport;