import React,{useEffect,useState,useCallback} from 'react'
import { useGlobleInfoContext } from "../../GlobleInfoProvider";
import ErpDataGrid from '../../component/ErpDataGrid';
import TitalBar from '../../component/TitalBar';
import MaterialChange from '../../component/MaterialChange';
import SupplierCombo from '../../component/SupplierCombo';
import DayRangeSelector from '../../component/DayRangeSelector';
import RegisterCombo from '../../component/RegisterCombo';
import { formatDate, getCurrentDate } from "../../pages/Common";
import { toast,Bounce } from "react-toastify";
import { CenteredTextCell,RightTextCell } from "../Common";
import axios from "../../AxiosConfig";
import BusyForm from "../../component/BusyForm";
import QtyBarChart from '../../component/BarChart';
import { BarChart } from 'recharts';


function StoreReport() {
  const { myState ,updateProperty} = useGlobleInfoContext();
  const [data, setData] = useState([]);
  const [change, setChange] = useState(false);
  const [curdate,setcurDate]=useState(getCurrentDate())
  const [isBusyShow, setIsBusyShow] = useState(false);
  const [error, setError] = useState(null);
  const [matid, setMatid] = useState(0);
  const [supid, setSupid] = useState(0);
  const [range, setRange] = useState(7);
  const [regtype, setRegtype] = useState('all');



  const columns = [
    {
      name: "Material Name",
      width: "50%",
      selector: (row) => <div style={{display:'flex',justifyContent:'flex-start'}}> <div style={{padding:'0 15px 0 5px'}}>{ row.reg_type.toUpperCase()}</div> -<div style={{padding:'0 15px 0 5px',textTransform:'lowercase'}}>[{ row.discription}]</div></div>,
      sortable: true,
    },
    
    {
      name: <CenteredTextCell>Unit</CenteredTextCell> ,
      width: "10%",
      cell: (row) => <CenteredTextCell> {row.unit.toUpperCase()} </CenteredTextCell>,
      sortable: false,
    },
    {
      name: <RightTextCell>Total Qty</RightTextCell> ,
      width: "16%",
      cell: (row) => <RightTextCell>{ row.total_qty}</RightTextCell>,
      sortable: false,
    },
    {
      name: <RightTextCell>% Qty</RightTextCell> ,
      width: "16%",
      cell: (row) => <RightTextCell>{ row.p_qty}</RightTextCell>,
      sortable: false,
    },
    
   
  ];

  const columns2 = [
    
    
    {
      name: "Material Name",
      width: "50%",
      selector: (row) => row.mat_name.toUpperCase(),
      sortable: true,
    },
    
    {
      name: <CenteredTextCell>Unit</CenteredTextCell> ,
      width: "10%",
      cell: (row) => <CenteredTextCell> {row.mat_unit.toUpperCase()} </CenteredTextCell>,
      sortable: false,
    },
    {
      name: <RightTextCell>Total Qty</RightTextCell> ,
      width: "16%",
      cell: (row) => <RightTextCell>{ row.total_qty}</RightTextCell>,
      sortable: false,
    },
    {
      name: <RightTextCell>% Qty</RightTextCell> ,
      width: "16%",
      cell: (row) => <RightTextCell>{ row.p_qty}</RightTextCell>,
      sortable: false,
    },
   
  ];

  const fetchInventory = useCallback(async () => {
    try {
     // console.log("link:",supid,matid,range,myState.siteid,regtype)
      setIsBusyShow(true);
      const response = await axios.get(`/inventory-report?siteid=${myState.siteid}&range=${range}&supid=${supid}&matid=${matid}&regtype=${regtype}`);
      setData(response.data);
      console.log(response.data)
      
    } catch (error) {
      setError("Something went wrong. Please try again later.");
      toast.error("Error fetching data");
    } finally {
      setIsBusyShow(false);
    }
  }, [myState.siteid,supid,matid,range,regtype]);

  useEffect(() => {
    fetchInventory();
    
  }, [fetchInventory,change]);

  useEffect (()=>{
    updateProperty("isSitedisable", false)
 },[])
 
 const handleSupplierChange = (event) => {
  setSupid(event.target.value);
  //console.log(supid)
};

 const handleMaterialChange = (event) => {
  setMatid(event.target.value);
  //console.log(matid)

};
const handledayChange = (event) => {
  setRange(event.target.value);
 // console.log(range)

};
const handleregtypeChange = (event) => {
  setRegtype(event.target.value);
//  console.log(range)

};
  return (
    <>
      <BusyForm isShow={isBusyShow} />

    
    <div style={{display:'flex',justifyContent:'space-between',}}>
     <div style={{width:'50%',padding:'0 2px' }}>
     
        <h3 style={{fontWeight:'bold',letterSpacing:'3px',padding:'2px 5px',marginBottom:'2px', fontSize:'20px',borderBottom:'1px solid #dadada'}}>Inventory</h3>
     
      
      {<div style={{display:'flex', justifyContent:'space-between',padding:'0 10px',backgroundColor:'#fff'}}> 
      <div style={{width:'33%'}}><SupplierCombo type="supplier" isall={true} initialvalue={supid}   handleEmployeeChange={handleSupplierChange} /></div>
      <div style={{width:'33%'}}> <MaterialChange isall={true} handleMatyerialChange={handleMaterialChange} initialvalue={matid}/></div>
      <div style={{width:'33%'}}> <DayRangeSelector handlerangechange={handledayChange} initialvalue={range}/></div>
      </div>}
        
     
      <div style={{overflow:'auto',padding:'0 10px',height:'425px',backgroundColor:'#fff',}}>
      <ErpDataGrid 
      title={<div><h3 style={{fontWeight:'bold',letterSpacing:'3px',padding:'2px 5px',marginBottom:'2px', fontSize:'20px'}}>Material Wise Qty</h3></div>}
      data={data.inv_summary||[]}
      columns={columns2}
      paginationIsRequired={false}
      
         />

         </div>
         <div style={{marginTop:'10px'}}>
         <QtyBarChart data={data.inv_summary} xname={"mat_name"} yname={"total_qty"} />
         </div>
     </div>

     <div style={{width:'50%',padding:'0 2px'}}>
     <h3 style={{fontWeight:'bold',letterSpacing:'3px',padding:'2px 5px',marginBottom:'2px',borderBottom:'1px solid #dadada', fontSize:'20px'}}>In-Out Register</h3>
     {<div style={{display:'flex', justifyContent:'flex-start',padding:'0 10px',backgroundColor:'#fff'}}> 
      <div style={{width:'33%',padding:'0 2px'}}><RegisterCombo isall={true} onRegisterchange={handleregtypeChange} initialvalue={regtype||'all'} /></div>
      <div style={{padding:'0 20px'}}> Total Construction Area : <span style={{fontWeight:'bold'}}>{data.const_area} sft </span></div>
      </div>}
      <div style={{overflow:'auto',padding:'0 10px',height:'425px',backgroundColor:'#fff'}}>
     <ErpDataGrid 
      title=''
      data={data.ward_summary||[]}
      columns={columns}
      paginationIsRequired={false}

         />
         </div>
         <QtyBarChart data={data.ward_summary} xname={'reg_type'}  yname={'total_qty'} />
     </div>
    </div>
    </>
  )
}

export default StoreReport
