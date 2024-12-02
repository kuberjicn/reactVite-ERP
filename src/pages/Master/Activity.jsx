import React, { useEffect, useState, useCallback } from "react";

import axios from "../../AxiosConfig";
import "../../component/component.css";
import { toast,Bounce } from "react-toastify";
import DeleteConform from "../DeleteConform";
import TitalBar from "../../component/TitalBar";
import BusyForm from "../../component/BusyForm";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { useGlobleInfoContext } from "../../GlobleInfoProvider";
import { CenteredTextCell,checkPermissions } from "../Common";
import ActivityModalForm from "./ActivityModalForm";
import ErpDataGrid from "../../component/ErpDataGrid";
function Activity() {
  const { myState, updateProperty } = useGlobleInfoContext();
  const [error, setError] = useState(null);
  const [change, setChange] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);
  const [isBusyShow, setIsBusyShow] = useState(false);
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [delId, setDelId] = useState(0);
  const [type, setType] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 20,
    total: 10,
  });

  const columns = [
    { name: <CenteredTextCell>ID</CenteredTextCell>, width: "5%", selector: (row) => row.actid ,
      cell: (row) => <CenteredTextCell>{ row.actid}</CenteredTextCell>,

    },
    
    {
      name: "Activity Name",
      width: "20%",
      selector: (row) => row.actname.toUpperCase(),
      sortable: true,
    },
    {
      name: <CenteredTextCell>Unit</CenteredTextCell> ,
      width: "8%",
      cell: (row) =><CenteredTextCell> {row.act_unit.toUpperCase()}</CenteredTextCell>,
      sortable: true,
    },
    {
      name: <CenteredTextCell>Skill</CenteredTextCell> ,
      width: "15%",
      cell: (row) => <CenteredTextCell>{ row.skillname.toUpperCase()}</CenteredTextCell>,
      sortable: true,
    },
    { name: <CenteredTextCell>Unskill</CenteredTextCell>  , width: "15%", cell: (row) =><CenteredTextCell>{row.unskillname.toUpperCase()}</CenteredTextCell>  },
    
    {
      name: "Action",
      width: "20%",
      selector: (row) => (
        <>
        {checkPermissions("add_activity") && (
          <button
            className="mbtn mbtn-edit"
            key={`edit-${row.actid}`}
            onClick={() => handleEdit(row.actid)}
          >
            <RiEditLine size={18} />
          </button>)}
          {checkPermissions("delete_activity") && (
          <button
            className="mbtn mbtn-delete"
            style={{ marginLeft: "10px" }}
            key={`delete-${row.actid}`}
            onClick={() => openModal(row.actid)}
          >
            <RiDeleteBin6Line size={18} />
          </button>
          )}
        </>
      ),
    },
  ];

  const fetchActivity = useCallback(async () => {
    try {
      setIsBusyShow(true);
      const response = await axios.get(`/activity/?page=${pagination.page}&page_size=${pagination.perPage}`);
      setData(response.data.results);
      //console.log(response.data.results);
      setPagination(prev => ({
        ...prev,
        total: response.data.count,
      }));
     // console.log(response)
      
    } catch (error) {
      setError("Something went wrong. Please try again later.");
      toast.error("Error fetching data");
    } finally {
      setIsBusyShow(false);
    }
  }, [pagination.page, pagination.perPage]);

  useEffect(() => {
    fetchActivity();
  }, [fetchActivity, change]);

  useEffect(() => {
    updateProperty("isSitedisable",true)
  }, []);

  

 

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/activity/${id}`);
      setChange(!change);
      toast.success("Data deleted",{ closeOnClick: true,
        transition: Bounce,
        position: "bottom-right",
        zIndex: 1000,});
    } catch (err) {
      const errorMessage =
        err.response.status === 501
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
      const response = await axios.get(`/activity/${id}/`);
      setDataEdit(response.data);
     // console.log(dataEdit)
      openModalForm("edit");
    } catch (err) {
      const errorMessage =
        err.response.status === 401
          ? err.response.data.message
          : "Something went wrong. Please try again later.";
      setError(errorMessage);
      toast.error(errorMessage);
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

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handlePerPageChange = (perPage) => {
    setPagination(prev => ({ ...prev,perPage: perPage, page: 1 }));
  };

  return (
    <div>
      <BusyForm isShow={isBusyShow} />
      <ErpDataGrid
      title={
        <TitalBar
          addvisible={ checkPermissions("add_activity") }
          onAdd={() => openModalForm("add")}
          onRefresh={() => fetchActivity()}
          title="List of Activity"
          buttonString={["refresh",  checkPermissions("add_activity") && "pdf", checkPermissions("add_activity") && "print"]}
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
      
      <DeleteConform
        content={"Activity"}
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmDelete}
      />
      <ActivityModalForm
        isShow={isShow}
        onHide={closeModalForm}
        onUpdate={onUpdate}
        type={type}
        data={dataEdit}
      />
    </div>
  );
}

export default Activity;