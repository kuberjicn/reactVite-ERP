import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import "../../component/component.css";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import TitalBar from "../../component/TitalBar";
import BusyForm from "../../component/BusyForm";
import axios from "../../AxiosConfig";
import { FcApprove ,FcDisapprove } from "react-icons/fc";
import LeaveApplicationModalForm from "./LeaveApplicationModalForm";
import DeleteConform from "../DeleteConform";
import { Bounce, toast } from "react-toastify"; 
import ApproveModalForm from "../Master/ApproveModalForm";
import { CenteredTextCell,checkPermissions } from "../Common";
import ErpDataGrid from "../../component/ErpDataGrid";
import { useGlobleInfoContext } from "../../GlobleInfoProvider";



function LeaveApplication() {
  const { myState ,updateProperty} = useGlobleInfoContext();

  const [data, setData] = useState([]);
  const [isBusyShow, setIsBusyShow] = useState(false);
 
  const [loading, setLoading] = useState(true);
  const [approve,setApprove]=useState(false)
  const [error, setError] = useState("");
  const [showModal,setShowModal]=useState(false)
  const [modalData,setModalData]=useState([])
  const [showDeleteModal,setShowDeleteModal]=useState(false)
  const [showApproveModal,setShowApproveModal]=useState(false)
  const [appid,setappid]=useState(0)
  const [refresh,setRefresh]=useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 20,
    total: 10,
  });
  const columns = [
    { name: "ID", width: "5%", selector: (row) => row.app_id },
    {
      name: "Name",
      width: "18%",
      selector: (row) => row.supid.sup_name.toUpperCase(),
      sortable: true,
    },
    {
      name: "App Date",
      width: "8%",
      selector: (row) => row.app_date,
      cell: (row) => {
        const date = new Date(row.app_date);
        const formattedDate = date
          .toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "-");
        return <CenteredTextCell>{formattedDate}</CenteredTextCell>;
      },
      sortable: true,
    },
    {
      name: "Leave type",
      width: "7%",
      selector: (row) => row.lvs_type,
      sortable: true,
    },
    {
      name: "Start From",
      width: "8%",
      selector: (row) =>row.from_date,
      cell: (row) => {
        const date = new Date(row.from_date);
        const formattedDate = date
          .toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "-");
        return <CenteredTextCell>{formattedDate}</CenteredTextCell>;
      },
      sortable: true,
    },
    {
      name: "Days",
      width: "6%",
      sortable: true,
      selector: (row) => row.nosDays,
    },
    { name: "Reason", selector: (row) => row.reason .toUpperCase()},
    { name: "Contact", width: "8%", selector: (row) => row.contact },

    {
      name: "Action",
      width:'110px',
      selector: (row) => 
     
      <div>
        {row.isapproved==false &&[
          checkPermissions("change_leaveapplication") && (
          <button
            title="edit"
            className="mbtn mbtn-edit "
            key={`edit-${row.app_id}`}
            id={row.app_id}
            onClick={() => Edit(row.app_id)}
          >
            {" "}
            <RiEditLine size={18} />
          </button>)
          ,
          checkPermissions("delete_leaveapplication") && (

          <button
            title="delete"
            className="mbtn mbtn-delete "
            key={`delete-${row.app_id}`}
            id={row.app_id}
            onClick={() => Delete(row.app_id)}
          >
            {" "}
            <RiDeleteBin6Line size={18} />
          </button>),
checkPermissions("change_leaveapplication") && (
          <button
            title="approve"
            className="mbtn mbtn-approve "
            key={`approve-${row.app_id}`}
            id={row.app_id}
            onClick={() => Approve(row.app_id)}
          >
            {" "}
            <FcApprove size={18} />
          </button>)
  ]}
        </div>
      
    },
  ];

  const Delete=(id)=>{
    if (id!==0){
    setappid(id)
    setShowDeleteModal(true)
    }
  }

  const Approve=(id)=>{
    if (id!==0){
    setappid(id)
    setShowApproveModal(true)
    }
  }
  
  const handleDelete=async()=>{
    
    await axios
    .delete(`/leave-application/${appid}/`)
    .then((response) => {
     
      toast.success("data Deleted sucessfully", {
        closeOnClick: true,
        transition: Bounce,
        position: "bottom-right",
      });
      
    })
    .catch((err) => {
      
        setError("Something went wrong. Please try again later.");
      
      toast.error(error, {
        closeOnClick: true,
        transition: Bounce,
        position: "bottom-right",
      });
    });
  }

  const handleApprove=async()=>{
    
    await axios
    .patch(`/leave-application/${appid}/`,{isapproved:true})
    .then((response) => {
     setApprove(!approve)
      toast.success("data Approved sucessfully", {
        closeOnClick: true,
        transition: Bounce,
        position: "bottom-right",
      });
      
    })
    .catch((err) => {
      
        setError("Something went wrong. Please try again later.");
      
      toast.error(error, {
        closeOnClick: true,
        transition: Bounce,
        position: "bottom-right",
      });
    });
  }


  const Edit=async(id)=>{
    setIsBusyShow(true);
    await axios
      .get(`/leave-application/${id}/`)
      .then((response)=>{
        setModalData(response.data)
       // console.log(response.data)
        setShowModal(true)
        setIsBusyShow(false);
      })
      .catch(() => {
        setIsBusyShow(false);
        setError("Something went wrong. Please try again later.");
        setIsBusyShow(false);
      });
  }
  const getData = async () => {
    setIsBusyShow(true);
    setLoading(true);
    // `/entity/?page=${currentPage}&page_size=${pageSize}`
    await axios
      .get(`/leave-application/?page=${pagination.page}&page_size=${pagination.perPage}&isapproved=${approve}`)

      .then((response) => {
        setData(response.data.results);
       // console.log(response.data);
        setPagination(prev => ({
          ...prev,
          total: response.data.count,
        }));
      })
      .catch(() => {
        setIsBusyShow(false);
        setLoading(false);
        setError("Something went wrong. Please try again later.");
      });
    setIsBusyShow(false);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [ approve,refresh,pagination.page, pagination.perPage]);

  useEffect (()=>{
    updateProperty("isSitedisable", true)
 },[])

  
 

  
  const handleRefresh = (e) => {
    setApprove(e.target.value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  
  const onModalClose=(e)=>{
    // e.preventDefault();
    setModalData([])
    setShowDeleteModal(false)
    setShowModal(false)
    setShowApproveModal(false)
  }
  const onModalCloseWithAction=(e)=>{
    // e.preventDefault();
    setModalData([])
    setappid(0)
    setRefresh(!refresh)
    setShowModal(false)
    setShowDeleteModal(false)
    setShowApproveModal(false)
  }
  const onShowModal=()=>{
    setShowModal(true)
    //console.log(showModal);
  }



  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handlePerPageChange = (perPage) => {
    setPagination(prev => ({ ...prev,perPage: perPage, page: 1 }));
  };
  return (
    <div>
      <BusyForm isShow={isBusyShow}  />
      <ErpDataGrid
      title={
        <TitalBar
          onAdd={onShowModal}
          addvisible={checkPermissions("add_leaveapplication")}
          onChangeCombo={(e)=>handleRefresh(e)}
          onRefresh={() => getData()}
          title={"Leave Applications"}
          isVisible={'StatusSelector'}
          buttonString={['refresh','pdf',]}
        />
      }
      columns={columns}
      data={data}
      handlePageChange={handlePageChange}
      handlePageSizeChange={handlePerPageChange}
      totalRows={pagination.total}
      currentPage={pagination.page}
      perPage={pagination.perPage}
      />
      

      {showModal && (<LeaveApplicationModalForm data={modalData} isShow={showModal}  onClose={onModalClose} onCloseWithAction={onModalCloseWithAction}/>)}

      <DeleteConform
        content={"Leave Application"}
        isOpen={showDeleteModal}
        onClose={onModalClose}
        onConfirm={handleDelete}
        onModalCloseWithAction={onModalCloseWithAction}
      />

      <ApproveModalForm
        content={"Leave Application"}
        isOpen={showApproveModal}
        onClose={onModalClose}
        onConfirm={handleApprove}
        onCloseWithAction={onModalCloseWithAction}
      />
    </div>
  );
}

export default LeaveApplication;
