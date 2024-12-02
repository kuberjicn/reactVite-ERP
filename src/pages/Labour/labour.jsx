import React, { useEffect, useState, useCallback } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import axios from "../../AxiosConfig";
import "../../component/component.css";
import { toast,Bounce } from "react-toastify";
import DeleteConform from "../DeleteConform";
import TitalBar from "../../component/TitalBar";
import BusyForm from "../../component/BusyForm";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { getCurrentDate, } from "../../pages/Common";

import { useGlobleInfoContext } from "../../GlobleInfoProvider";

import { CenteredTextCell } from "../Common";
import LabourModalForm from "./LabourModalForm";
import GroupDataTable from "../../component/GroupDataTable";

import { checkPermissions } from "../../pages/Common";

function Labour() {
  const { myState ,updateProperty} = useGlobleInfoContext();
  const [curdate,setcurDate]=useState(getCurrentDate())
  const [error, setError] = useState(null);
  const [change, setChange] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);
  const [isBusyShow, setIsBusyShow] = useState(false);
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [delId, setDelId] = useState(0);
  const [type, setType] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [lbr, setLbr] = useState(0);
  const columns = [
    { name: "ID", width: "5%", selector: (row) => row.lbr_id },
    {
      name: "Contractor Name",
      width: "15%",
      selector: (row) => row.supid.sup_name.toUpperCase(),
      sortable: true,
    },
    {
      name: "Activity",
      width: "12%",
      selector: (row) => row.actid.actname.toUpperCase(),
      sortable: true,
    },
    {
      name: <CenteredTextCell>Skill</CenteredTextCell> ,
      width: "7%",
      cell: (row) => <CenteredTextCell>{ row.skill}</CenteredTextCell>,
      sortable: false,
    },
    { name: <CenteredTextCell>Unskill</CenteredTextCell>  ,
      sortable: false,

       width: "7%",
        cell: (row) =><CenteredTextCell>{row.unskill}</CenteredTextCell>  },
    {
      name: "Work Detail",
      width: "30%",
      selector: (row) => row.workdetail,
      cell: row => <div style={{fontSize:'.65rem', whiteSpace: 'normal' }}>{row.workdetail.toUpperCase()}</div>,
      sortable: false,
      style: {
        whiteSpace: 'normal', // Ensure wrapping
      },
    },
    {
      name: "Action",
      width: "10%",
      selector: (row) => (
        <>
        {checkPermissions("change_labourdata") && (
          <button
            className="mbtn mbtn-edit"
            key={`edit-${row.lbr_id}`}
            onClick={() => handleEdit(row.lbr_id)}
          >
            <RiEditLine size={18} />
          </button>)}
          {checkPermissions("delete_labourdata") && (
     
          <button
            className="mbtn mbtn-delete"
            style={{ marginLeft: "10px" }}
            key={`delete-${row.lbr_id}`}
            onClick={() => openModal(row.lbr_id)}
          >
            <RiDeleteBin6Line size={18} />
          </button>)}
        </>
      ),
    },
  ];


  

  const handleWhatsapp=async()=>{
    
    const response = await axios.get(`/pdf-lbr/?siteid=${myState.siteid}&ddate=${curdate}`);
    // const msg = response.data
    // const st=response.data.status
    console.log(response.data);
    const cell_no= response.data.cellnos
    const file_url=response.data.fileurl
    const text_msg=response.data.msg

    
    
    cell_no.forEach(async(cell)=>{

      const data = {
        token: "cltfj09np4da2kpwyjsdhmtey",
        phone: cell,
        link: file_url,
        message: text_msg,
      };
console.log(data);
      //"https://enotify.app/api/sendFileWithCaption?token={{instance_id}}&phone={{Whatsapp_Number}}&link={{File_Url}}&message={{Text_Message}}"
     const url =`https://enotify.app/api/sendFileWithCaption?token=${data.token}&phone=${data.phone}&link=${data.link}&message=${data.message}`;
    console.log(url);
    
     try {
      const response = await axios.post('https://enotify.app/api/sendFileWithCaption', data);
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
       
   })
   
   
  }
  
  const fetchLabour = useCallback(async () => {
    try {
      //console.log("link:",curdate,myState.siteid)
      setIsBusyShow(true);
      const response = await axios.get(`/labour-data/?date=${curdate}&site=${myState.siteid}`);
      setData(response.data);
      
      //console.log(response.data)
      
    } catch (error) {
      setError("Something went wrong. Please try again later.");
      toast.error("Error fetching data",{ closeOnClick: true,
        transition: Bounce,
        position: "bottom-right",
        zIndex: 1000,});
    } finally {
      setIsBusyShow(false);
    }
  }, [myState.siteid,curdate]);

  useEffect(() => {
    fetchLabour();
    
  }, [fetchLabour,change,]);

  useEffect(() => {
    calculateTotal();
  }, [data]);

  useEffect (()=>{
    updateProperty("isSitedisable", false)
 },[])

  const calculateTotal = () => {
  let lbr=data.reduce((acc, row) => acc + row.skill, 0)+ data.reduce((acc, row) => acc + row.unskill, 0)
   setLbr(lbr)
  };
  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

 

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/labour-data/${id}`);
      setChange(!change);
      toast.success("Data deleted",{ closeOnClick: true,
        transition: Bounce,
        position: "bottom-right",
        zIndex: 1000,});
    } catch (err) {
      
      const errorMessage =
        err.response.status === 301 
          ? "Data cannot be deleted"
          : "Something went wrong. Please try again later.";
      setError(errorMessage);
      toast.error(errorMessage,{closeOnClick: true,
        transition: Bounce,
        position: "bottom-right",
        zIndex: 1000,});
    }
  };

  const handleEdit = async (id) => {
    try {
      setIsBusyShow(true);
      const response = await axios.get(`/labour-data/${id}/`);
      setDataEdit(response.data);
     // console.log(response.data)
      openModalForm("edit");
    } catch (err) {
      const errorMessage =
        err.response.status === 401
          ? err.response.data.message
          : "Something went wrong. Please try again later.";
      setError(errorMessage);
      toast.error(errorMessage,{ closeOnClick: true,
        transition: Bounce,
        position: "bottom-right",
        zIndex: 1000,});
    } finally {
      setIsBusyShow(false);
    }
  };

  const openModal = (id) => {
    setDelId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    handleDelete(delId);
    setModalOpen(false);
  };

  const closeModal = () => setModalOpen(false);

  const openModalForm = (formType) => {
    setType(formType);
    setIsShow(true);
  };

  const closeModalForm = () => {
    setDataEdit([]);
    setIsShow(false);
    setType("");
  };

  const onUpdate = () => {
    setChange(!change);
    closeModalForm();
  };

  const handleDateChange = (event) => {
    
    const newSelectedValue = event.target.value;
    setcurDate(event.target.value);
    
   // console.log("change made",newSelectedValue, curdate);
    
    
    };

  
 
  
 
  return (
    <div>
      <BusyForm isShow={isBusyShow} />
      <TitalBar
            isVisible={"DateSelector"}
           
            initialvalue={curdate}
            addvisible={checkPermissions("add_labourdata") }
            onAdd={() => openModalForm("add")}
            onRefresh={() => fetchLabour()}
            onddchange={(e) => handleDateChange(e)}
            onwhatsapp={handleWhatsapp}
            title="Labour On :"
            subtitle={`Total Labour : ${lbr}`}
            buttonString={["refresh" ,checkPermissions("add_labourdata") && "pdf", checkPermissions("add_labourdata") && "whatsapp"]}
          />
      
      
      <div id="grouptable" style={{overflowY:'auto',height: 'calc(100vh - 110px)'}}>
        <GroupDataTable
        columns={columns}
        data={data}
        groupByField="supid.sup_name"
        type={'labour'}
        
      />
     </div>
      <DeleteConform
        content={"Labour"}
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmDelete}
      />
      <LabourModalForm
        isShow={isShow}
        onHide={closeModalForm}
        onUpdate={onUpdate}
        type={type}
        data={dataEdit}
      />
    </div>
  );
}

export default Labour;