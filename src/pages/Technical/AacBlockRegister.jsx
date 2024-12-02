




import React, { useEffect, useState, useCallback } from "react";
import axios from "../../AxiosConfig";
import "../../component/component.css";
import { toast ,Bounce} from "react-toastify";
import DeleteConform from "../DeleteConform";
import TitalBar from "../../component/TitalBar";
import BusyForm from "../../component/BusyForm";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import {useGlobleInfoContext} from "../../GlobleInfoProvider";
import { CenteredTextCell, formatDate ,checkPermissions} from "../Common";
import ErpDataGrid from "../../component/ErpDataGrid";
import { FaArrowDown, FaArrowUp,  FaPrint,  } from 'react-icons/fa6';
import AACBlockModalForm from "./AACblockModal";


const AacBlockRegister = () => {
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
    { name: <CenteredTextCell>ID</CenteredTextCell>, width: "5%", selector: (row) => row.id ,
      cell: (row) => <CenteredTextCell>{ row.id}</CenteredTextCell>,

    },
    {
      name: <CenteredTextCell>Nos</CenteredTextCell>,
      width: "5%",
      selector: (row) => row.nosSample,
      cell: (row) => <CenteredTextCell>{row.nosSample}</CenteredTextCell>,
      sortable: false,
    },
    {
      name: <CenteredTextCell>Date</CenteredTextCell> ,
      width: "8%",
      cell: (row) => <CenteredTextCell>{formatDate( row.ddate)}</CenteredTextCell>,
      sortable: true,
    },
    { name: <CenteredTextCell>Size</CenteredTextCell>  , width: "5%", cell: (row) =><CenteredTextCell>{row.blocksize}</CenteredTextCell>  },
    { name: <CenteredTextCell>Avg Weight</CenteredTextCell> , width: "8%", cell: (row) =><CenteredTextCell>{ row.weightAvg}</CenteredTextCell> },
    {
      name: <CenteredTextCell>L1[Kg]/FCK1[mpa]</CenteredTextCell> ,
      width: "12%",
      sortable: true,
      cell: (row) => <CenteredTextCell  ><div> {row.rOne} 
      {parseFloat(row.defaultStrength) > parseFloat(row.rOneMpa) ? (
       <FaArrowDown style={{ color: 'red',width:'20px' }} />
     ) : (
       <FaArrowUp style={{ color: 'green',width:'20px' }} />
     )} 
       {row.rOneMpa}</div>  </CenteredTextCell>,
    },
    {
      name: <CenteredTextCell>L2[Kg]/FCK2[mpa]</CenteredTextCell> ,
      width: "12%",
      sortable: true,
      cell: (row) => <CenteredTextCell  ><div> {row.rTwo} 
      {parseFloat(row.defaultStrength) > parseFloat(row.rTwoMpa) ? (
       <FaArrowDown style={{ color: 'red',width:'20px' }} />
     ) : (
       <FaArrowUp style={{ color: 'green',width:'20px' }} />
     )} 
       {row.rTwoMpa}</div>  </CenteredTextCell>,
    },
    {
      name: <CenteredTextCell>L3[Kg]/FCK[mpa]</CenteredTextCell> ,
      width: "12%",
      sortable: true,
      cell: (row) => <CenteredTextCell  ><div> {row.rThree} 
      {parseFloat(row.defaultStrength) > parseFloat(row.rThreeMpa) ? (
       <FaArrowDown style={{ color: 'red',width:'20px' }} />
     ) : (
       <FaArrowUp style={{ color: 'green',width:'20px' }} />
     )} 
       {row.rThreeMpa}</div>  </CenteredTextCell>,
    },

    { name: <CenteredTextCell>Obtained/Reqd[FCK Mpa] </CenteredTextCell> ,
       width: "12%",
        cell: (row) =><CenteredTextCell>
          <div> {row.rAvg} 
      {parseFloat(row.defaultStrength) > parseFloat(row.rAvg) ? (
       <FaArrowDown style={{ color: 'red',width:'20px' }} />
     ) : (
       <FaArrowUp style={{ color: 'green',width:'20px' }} />
     )} 
       {row.defaultStrength}</div>
        </CenteredTextCell> },

    { name: <CenteredTextCell>Obatained/Reqd SP Gravity[Mpa]</CenteredTextCell> ,
       
        cell: (row) =><CenteredTextCell>
           <div> {row.spGravity} 
      {parseFloat(row.defaultSpg) < parseFloat(row.spGravity) ? (
       <FaArrowDown style={{ color: 'red',width:'20px' }} />
     ) : (
       <FaArrowUp style={{ color: 'green',width:'20px' }} />
     )} 
       {row.defaultSpg}</div>
          </CenteredTextCell> },

    {
      name: "Action",
      width: "150px",
      selector: (row) => (
        <>
        {checkPermissions("change_aacblocklist") && (

          <button
            className="mbtn mbtn-edit"
            key={`edit-${row.id}`}
            onClick={() => handleEdit(row.id)}
          >
            <RiEditLine size={18} />
          </button>)}
          {checkPermissions("delete_aacblocklist") && (
          <button
            className="mbtn mbtn-delete"
            style={{ marginLeft: "10px" }}
            key={`delete-${row.id}`}
            onClick={() => openModal(row.id)}
          >
            <RiDeleteBin6Line size={18} />
          </button>)}
          {checkPermissions("add_aacblocklist") && (
          <button
            className="mbtn mbtn-edit"
            style={{ marginLeft: "10px" }}
            key={`print-${row.id}`}
            // onClick={() => openModal(row.id)}
          >
            <FaPrint size={18} />
          </button>)}

        </>
      ),
    },
  ];

  const fetchaacblock = useCallback(async () => {
    try {
      setIsBusyShow(true);
      const response = await axios.get(`/aacblock-list/?siteid=${myState.siteid}&page=${pagination.page}&page_size=${pagination.perPage}`);
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
    fetchaacblock();
  }, [fetchaacblock, change]);


  useEffect(() => {
    updateProperty("isSitedisable",false)
  }, []);


  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handlePerPageChange = (perPage) => {
    setPagination(prev => ({ ...prev,perPage: perPage, page: 1 }));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/aacblock-list/${id}`);
      setChange(!change);
      toast.success("Data deleted",{
        closeOnClick: true,
        transition: Bounce,
        position: "bottom-right",
      });
    } catch (err) {
      const errorMessage =
      err.response &&  err.response.status === 501 ? "Data cannot be deleted": "Something went wrong. Please try again later.";
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
      const response = await axios.get(`/aacblock-list/${id}/`);
      setDataEdit(response.data);
     
      openModalForm("edit");
    } catch (err) {
      const errorMessage =
      err.response && err.response.status === 401
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
          addvisible={checkPermissions("add_aacblocklist")}
          onAdd={() => openModalForm("add")}
          onRefresh={() => fetchaacblock()}
          title="List of AAC block"
          buttonString={["refresh", "pdf", ]}
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
        content={"AAC Block"}
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmDelete}
      />
      <AACBlockModalForm
        isShow={isShow}
        onHide={closeModalForm}
        onUpdate={onUpdate}
        type={type}
        data={dataEdit}
      />
    </div>
  );
}



export default AacBlockRegister
