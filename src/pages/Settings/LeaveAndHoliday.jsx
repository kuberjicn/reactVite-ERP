import React, { useEffect, useState } from 'react'
import ErpDataGrid from '../../component/ErpDataGrid'
import TitalBar from '../../component/TitalBar'
import { CenteredTextCell,checkPermissions } from "../Common";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { FaPlus,FaMinus, FaRegFilePdf, FaFileExcel, FaPrint,FaWhatsapp } from "react-icons/fa6";
import axios from "../../AxiosConfig";
import "../../component/component.css";
import { toast,Bounce } from "react-toastify";
import BusyForm from '../../component/BusyForm';
import DeleteConform from "../DeleteConform";
import HolydayModalForm from './HolydayModalForm';
import LeaveModalForm from './LeaveModalForm';
import { useGlobleInfoContext } from "../../GlobleInfoProvider";


const LeaveAndHoliday = () => {
  const [holidayData,setHolydaydata]=useState([])
  const [leaveData,setLeavedata]=useState([])
  const [currentYear,setCurrentYear]=useState('2024')
  const [isBusyShow,setISBusyShow]=useState(false)
  const [change,setChange]=useState(false)
  const [isShow,setIsShow]=useState(false)
  const [selectedHodayId,setSelectedHolyday]=useState(0)
  const [delid,setdelid]=useState(0)
  const [lvdelid,setLvdelid]=useState(0)

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [lvisDeleteModalOpen, setLvDeleteModalOpen] = useState(false);

  const [isLeaveShow,setIsLeaveShow]=useState(false)
  const [selectedleaveId,setSelectedLeaveId]=useState(0)
  const { myState ,updateProperty } = useGlobleInfoContext();

  const holiday_columns = [
    {
      name: <CenteredTextCell>Date</CenteredTextCell>,
      width: "20%",
      cell: (row) => {
        const date = new Date(row.hd_date);
        const formattedDate = date
          .toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "-");
        return (
          <CenteredTextCell>
            {formattedDate}
          </CenteredTextCell>
        );
      },
    },
    
    {
      name: <CenteredTextCell>Discription</CenteredTextCell> ,
      width: "50%",
      cell: (row) => <CenteredTextCell> {row.name.toUpperCase()} </CenteredTextCell>,
      sortable: false,
    },
    
    {
      name: "Action",
      
      selector: (row) => [
        checkPermissions("change_declareholidays") && (
        <button
          className="mbtn mbtn-edit "
          id={row.hd_id}
          key={`edit-${row.hd_id}`}
          onClick={() => hd_Edit(row.hd_id)}
        >
          <RiEditLine size={18} />
        </button>),

checkPermissions("delete_declareholidays") && (
        <button
          className="mbtn mbtn-delete"
          style={{ marginLeft: "10px" }}
          id={row.hd_id}
          key={`delete-${row.hd_id}`}
          onClick={(e) => hd_openModal(row.hd_id)}
        >
          <RiDeleteBin6Line size={18} />
        </button>),
      ],
    },
    
   
  ];

  const leave_columns = [
    {
      name: <CenteredTextCell>Date</CenteredTextCell>,
      width: "20%",
      cell: (row) => {
        const date = new Date(row.effect_date);
        const formattedDate = date
          .toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "-");
        return (
          <CenteredTextCell>
            {formattedDate}
          </CenteredTextCell>
        );
      },
    },
    
    {
      name: <CenteredTextCell>Type Of Leave</CenteredTextCell> ,
      width: "40%",
      cell: (row) => <CenteredTextCell> {row.lvs_type.toUpperCase()} </CenteredTextCell>,
      sortable: false,
    },
    { name: <CenteredTextCell>Count</CenteredTextCell>, width: "15%",
      selector: (row) => row.value,
      cell:(row)=>  <CenteredTextCell>{row.value}</CenteredTextCell> },
   
    {
      name: "Action",
     
      selector: (row) => [
        checkPermissions("change_declareleaves") && (
        <button
          className="mbtn mbtn-edit "
          id={row.lvs_id}
          key={`edit-${row.lvs_id}`}
          onClick={() => lv_Edit(row.lvs_id)}
        >
          <RiEditLine size={18} />
        </button>),
        checkPermissions("delete_declareleaves") && (
        <button
          className="mbtn mbtn-delete"
          style={{ marginLeft: "10px" }}
          id={row.lvs_id}
          key={`delete-${row.lvs_id}`}
          onClick={() => lv_openModal(row.lvs_id)}
        >
          <RiDeleteBin6Line size={18} />
        </button>),
      ],
    },
    
   
  ];

  useEffect (()=>{
    updateProperty("isSitedisable", true)
 },[])

  const hd_openModal = (id) => {
    setdelid(id);
    setDeleteModalOpen(true);
  };

  const lv_openModal = (id) => {
    setLvdelid(id);
    setLvDeleteModalOpen(true);
  };

  const hd_closeModal = (e) => {
    e.preventDefault();
    setDeleteModalOpen(false);
  };

  const lv_closeModal = (e) => {
    e.preventDefault();
    setLvDeleteModalOpen(false);
  };

  const fetchHoliday=async()=>{
    setISBusyShow(true);
    await axios
      .get(`/declare-holyday/?year=${currentYear}`)
      .then((response) => {
        setHolydaydata(response.data);
      })
      .catch(() => {
        toast.error("Error fetching data");
      });
    setISBusyShow(false);
  }

  const fetchLeave=async()=>{
    setISBusyShow(true);
    await axios
      .get(`/declare-leave/?year=${currentYear}`)
      .then((response) => {
        setLeavedata(response.data);
      })
      .catch(() => {
        toast.error("Error fetching data");
      });
    setISBusyShow(false);
  }

  useEffect(()=>{
    fetchHoliday()
    fetchLeave()
  },[])

  useEffect(()=>{
    
    fetchHoliday()
    fetchLeave()
  },[change,currentYear])

  const handleRefresh=(e)=>{
    setCurrentYear(e.target.value)
  }

  const hd_Edit=(id)=>{
   
    setSelectedHolyday(id)
    setIsShow(true)
  }

  const lv_Edit=(id)=>{
   
    setSelectedLeaveId(id)
    setIsLeaveShow(true)
  }
  const hd_modelClose = (e) => {
    setSelectedHolyday(0)
    setIsShow(false);
  };

  const lv_modelClose = (e) => {
    setSelectedLeaveId(0)
    setIsLeaveShow(false);
  };

  const hd_onUpdate = (e) => {
    setSelectedHolyday(0)
    setIsShow(false);
    setChange(!change)
  };

  const lv_onUpdate = (e) => {
    setSelectedLeaveId(0)
    setIsLeaveShow(false);
    setChange(!change)
  };

  const handleConfirmDelete = (e) => {
    hd_Delete(delid);
    setDeleteModalOpen(false);
  };

  const lvhandleConfirmDelete = (e) => {
    lv_Delete(lvdelid);
    setLvDeleteModalOpen(false);
  };

  const hd_Delete = async (id) => {
    await axios
      .delete(`/declare-holyday/${id}/` )
      .then((response) => {
        setChange(!change);
        toast.success("data deleted" ,{
          closeOnClick: true,
          transition: Bounce,
          position: "bottom-right",
        });
      })
      .catch((err) => {
       
        toast.error("Something went wrong. Please try again later." ,{
          closeOnClick: true,
          transition: Bounce,
          position: "bottom-right",
        });
      });
  };


  const lv_Delete = async (id) => {
    await axios
      .delete(`/declare-leave/${id}/` )
      .then((response) => {
        setChange(!change);
        toast.success("data deleted" ,{
          closeOnClick: true,
          transition: Bounce,
          position: "bottom-right",
        });
      })
      .catch((err) => {
       
        toast.error("Something went wrong. Please try again later." ,{
          closeOnClick: true,
          transition: Bounce,
          position: "bottom-right",
        });
      });
  };

  return (
    <div >
      
      <TitalBar
        initialvalue={currentYear}
        addvisible={false}
        onChangeCombo={(e) => handleRefresh(e)}
        onRefresh={() => setChange(!change)}
        title="Year :"
        isVisible="YearSelector"
        buttonString={['refresh',]}
      />
      
      <BusyForm sShow={isBusyShow}/>
      <div style={{display:'flex',justifyContent:'flex-start'}}>
      <div style={{width:'50%',padding:'0 2px 0 8px'}}>
        <div style={{display:'flex',justifyContent:'space-between',padding:'5px 5px'}}>
          <h3>Declare Holydays of Year {currentYear}</h3>
          {checkPermissions("add_declareholidays") && (
         <button className='btn mbtn-edit' onClick={()=>setIsShow(true)}> <FaPlus size={16}  /></button>)}
         </div>
      <ErpDataGrid
      paginationIsRequired={false}
      data={holidayData}
      columns={holiday_columns}
      />
      </div>
      <div style={{width:'50%',padding:'0 8px 0 2px'}}>
      <div style={{display:'flex',justifyContent:'space-between',padding:'5px 5px'}}>
          <h3>Declare Leave of Year {currentYear}</h3>
          {checkPermissions("add_declareleaves") && (
         <button className='btn mbtn-edit' onClick={()=>setIsLeaveShow(true)}> <FaPlus size={16}  /></button>)}
         </div>
      <ErpDataGrid
     
      data={leaveData}
      columns={leave_columns}
      paginationIsRequired={false}
      
      />
      </div>
      </div>

    <HolydayModalForm
    isShow={isShow}
    onClose={hd_modelClose}
    type={selectedHodayId==0?'add':'edit'}
    hdid={selectedHodayId}
    onUpdate={hd_onUpdate}
    />

    <LeaveModalForm
    isShow={isLeaveShow}
    onClose={lv_modelClose}
    type={selectedleaveId==0?'add':'edit'}
    lvid={selectedleaveId}
    onUpdate={lv_onUpdate}
    />

    <DeleteConform
        content={"Holydays"}
        isOpen={isDeleteModalOpen}
        onClose={hd_closeModal}
        onConfirm={(e) => handleConfirmDelete(e)}
      />

      <DeleteConform
        content={"Leave"}
        isOpen={lvisDeleteModalOpen}
        onClose={lv_closeModal}
        onConfirm={(e) => lvhandleConfirmDelete(e)}
      />
    </div>
  )
}

export default LeaveAndHoliday
