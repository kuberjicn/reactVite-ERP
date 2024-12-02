import React, { useEffect, useState, useCallback } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import axios from "../../AxiosConfig";
import "../../component/component.css";
import { toast } from "react-toastify";
import DeleteConform from "../DeleteConform";
import TitalBar from "../../component/TitalBar";
import BusyForm from "../../component/BusyForm";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import MaterialModalForm from "./MaterialModalForm";
import {useGlobleInfoContext} from "../../GlobleInfoProvider";
import { CenteredTextCell ,checkPermissions} from "../Common";
import ErpDataGrid from "../../component/ErpDataGrid";
function Material() {
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
    { name: <CenteredTextCell>ID</CenteredTextCell>, width: "5%", selector: (row) => row.mat_id ,
      cell: (row) => <CenteredTextCell>{ row.mat_id}</CenteredTextCell>,

    },
    {
      name: "Name",
      width: "30%",
      selector: (row) => row.mat_name.toUpperCase(),
      sortable: true,
    },
    {
      name: <CenteredTextCell>Unit</CenteredTextCell> ,
      width: "6%",
      cell: (row) => <CenteredTextCell>{ row.mat_unit.toUpperCase()}</CenteredTextCell>,
      sortable: true,
    },
    { name: <CenteredTextCell>Rate</CenteredTextCell>  , width: "10%", cell: (row) =><CenteredTextCell>{row.rate}</CenteredTextCell>  },
    { name: <CenteredTextCell>GSTR</CenteredTextCell> , width: "5%", cell: (row) =><CenteredTextCell>{ row.GSTR}</CenteredTextCell> },
    {
      name: "Group In",
      width: "18%",
      sortable: true,
      selector: (row) => row.groupid.name.toUpperCase(),
    },
    {
      name: "Action",
      width: "110px",
      selector: (row) => (
        <>
       { checkPermissions("add_material") && (
          <button
            className="mbtn mbtn-edit"
            key={`edit-${row.mat_id}`}
            onClick={() => handleEdit(row.mat_id)}
          >
            <RiEditLine size={18} />
          </button>)}
          {checkPermissions("delete_material") && (
          <button
            className="mbtn mbtn-delete"
            style={{ marginLeft: "10px" }}
            key={`delete-${row.mat_id}`}
            onClick={() => openModal(row.mat_id)}
          >
            <RiDeleteBin6Line size={18} />
          </button>)}
        </>
      ),
    },
  ];

  const fetchMaterial = useCallback(async () => {
    try {
      setIsBusyShow(true);
      const response = await axios.get(`/material/?page=${pagination.page}&page_size=${pagination.perPage}`);
      setData(response.data.results);
      
     //console.log(response.data.results,response.data.count)
      setPagination(prev => ({
        ...prev,
        total: response.data.count,
      }));
    } catch (error) {
      setError("Something went wrong. Please try again later.");
      toast.error("Error fetching data");
    } finally {
      setIsBusyShow(false);
    }
  }, [pagination.page, pagination.perPage]);

  useEffect(() => {
    fetchMaterial();
  }, [fetchMaterial, change]);


  useEffect(() => {
    updateProperty("isSitedisable",true)
  }, []);


  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handlePerPageChange = (perPage) => {
    setPagination(prev => ({ ...prev,perPage: perPage, page: 1 }));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/material/${id}`);
      setChange(!change);
      toast.success("Data deleted",{
        closeOnClick: true,
        transition: Bounce,
        position: "bottom-right",
      });
    } catch (err) {
      const errorMessage =
        err.response.status === 501
          ? "Data cannot be deleted"
          : "Something went wrong. Please try again later.";
      setError(errorMessage);
      toast.error(errorMessage,{
        closeOnClick: true,
        transition: Bounce,
        position: "bottom-right",
      });
    }
  };

  const handleEdit = async (id) => {
    try {
      setIsBusyShow(true);
      const response = await axios.get(`/material/${id}/`);
      setDataEdit(response.data);
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

  

  return (
    <div>
      <BusyForm isShow={isBusyShow} />
      <ErpDataGrid
      title={
        <TitalBar
          addvisible={checkPermissions("add_material") }
          onAdd={() => openModalForm("add")}
          onRefresh={() => fetchMaterial()}
          title="List of Material"
          buttonString={["refresh", checkPermissions("add_material") && "pdf", checkPermissions("add_material") && "print"]}
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
        content={"Material"}
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmDelete}
      />
      <MaterialModalForm
        isShow={isShow}
        onHide={closeModalForm}
        onUpdate={onUpdate}
        type={type}
        data={dataEdit}
      />
    </div>
  );
}

export default Material;