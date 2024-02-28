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
import { formattedDate,CenteredTextCell } from "../Common";
function LeaveApplication() {
  const [data, setData] = useState([]);
  const [isBusyShow, setIsBusyShow] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(true);
  const [approve,setApprove]=useState(false)
  const [error, setError] = useState("");
  const [showModal,setShowModal]=useState(false)
  const [modalData,setModalData]=useState([])
  const [showDeleteModal,setShowDeleteModal]=useState(false)
  const [showApproveModal,setShowApproveModal]=useState(false)
  const [appid,setappid]=useState(0)
  const [refresh,setRefresh]=useState(false)
  const columns = [
    { name: "ID", width: "5%", selector: (row) => row.app_id },
    {
      name: "Name",
      width: "18%",
      selector: (row) => row.supid.sup_name,
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
    { name: "Reason", width: "25%", selector: (row) => row.reason },
    { name: "Contact", width: "8%", selector: (row) => row.contact },

    {
      name: "Action",
      
      selector: (row) => 
     
      <div>
        {row.isapproved==false &&[
          <button
            title="edit"
            className="mbtn mbtn-edit "
            key={`edit-${row.app_id}`}
            id={row.app_id}
            onClick={() => Edit(row.app_id)}
          >
            {" "}
            <RiEditLine size={18} />
          </button>,
          <button
            title="delete"
            className="mbtn mbtn-delete "
            key={`delete-${row.app_id}`}
            id={row.app_id}
            onClick={() => Delete(row.app_id)}
          >
            {" "}
            <RiDeleteBin6Line size={18} />
          </button>,

          <button
            title="approve"
            className="mbtn mbtn-approve "
            key={`approve-${row.app_id}`}
            id={row.app_id}
            onClick={() => Approve(row.app_id)}
          >
            {" "}
            <FcApprove size={18} />
          </button>
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
      .get(`/leave-application/?page=${currentPage}&page_size=${pageSize}&isapproved=${approve}`)

      .then((response) => {
        setData(response.data.results);
        //console.log(response.data);
        setTotalPages(Math.ceil(response.data.count / pageSize));
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
  }, [currentPage, pageSize,approve,refresh]);
  const customStyles = {
    header: {
      style: {
        minHeight: "56px",
      },
    },
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: defaultThemes.default.divider.default,
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
        },
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
        },
      },
    },
  };

  const conditionalRowStyles = [
    {
      when: (row) => row.lvs_type === "casual" && row.isapproved==true, // Condition for the first row
      style: {
        backgroundColor: "#c8e4d4",
        color: "#333",
        fontWeight: "bold", // Change to your desired background color
      },
    },
    {
      when: (row) => row.lvs_type === "sick" && row.isapproved==true, // Condition for the first row
      style: {
        backgroundColor: "#ffe7c2",
        color: "#333",
        fontWeight: "bold", // Change to your desired background color
      },
    },
  ];

  const handlePageSizeChange = (page_size) => {
    //console.log(page_size);
    setCurrentPage(1);
    setPageSize(page_size);
    setTotalPages(Math.ceil(data.length / page_size));
  };
  const handlePageChange = (page) => {
    //console.log(page);
    setCurrentPage(page);
  };
  const handleRefresh = (e) => {
    setApprove(e.target.value);
    
  };

  const onModalClose=(e)=>{
    e.preventDefault();
    setModalData([])
    setShowDeleteModal(false)
    setShowModal(false)
    setShowApproveModal(false)
  }
  const onModalCloseWithAction=(e)=>{
    e.preventDefault();
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
  return (
    <div>
      <BusyForm isShow={isBusyShow}  />
      <DataTable
        title={
          <TitalBar
            onAdd={onShowModal}
            addvisible={true}
            onChangeCombo={(e)=>handleRefresh(e)}
            onRefresh={() => getData()}
            title={"Leave Applications"}
            isVisible={'StatusSelector'}
            buttonString={['refresh','pdf',]}
          />
        }
        columns={columns}
        data={data}
        pagination={true}
        paginationServer={true} // Enable server-side pagination
        paginationTotalRows={totalPages * pageSize}
        paginationPerPage={pageSize}
        onChangePage={(page)=>handlePageChange(page)}
        progressPending={loading}
        responsive
        striped
        dense
        onChangeRowsPerPage={(page_size)=>handlePageSizeChange(page_size)}
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}
        paginationRowsPerPageOptions={[20, 30, 50]}
      />

      {showModal && (<LeaveApplicationModalForm data={modalData}  onClose={onModalClose} onCloseWithAction={onModalCloseWithAction}/>)}

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
