import React, { useEffect, useState, useCallback } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import axios from "../../AxiosConfig";
import "../../component/component.css";
import { toast,Bounce } from "react-toastify";
import DeleteConform from "../DeleteConform";
import TitalBar from "../../component/TitalBar";
import BusyForm from "../../component/BusyForm";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { formatDate, getCurrentDate } from "../../pages/Common";
import { useGlobleInfoContext } from "../../GlobleInfoProvider";
import { CenteredTextCell ,checkPermissions} from "../Common";
import GroupDataTable from "../../component/GroupDataTable";
import InventoryModalForm from "./InventoryModalForm";
function Inventory() {
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
    { name: "ID", width: "5%", selector: (row) => row.inv_id },
    {
      name: <CenteredTextCell>Date</CenteredTextCell> ,
      width: "9%",
      cell: (row) => <CenteredTextCell> {formatDate(row.ddate)} </CenteredTextCell>,
      sortable: false,
    },
    {
      name: "Material Name",
      width: "20%",
      selector: (row) => row.matid.mat_name.toUpperCase(),
      sortable: true,
    },
    {
      name: <CenteredTextCell>Unit</CenteredTextCell> ,
      width: "6%",
      cell: (row) => <CenteredTextCell> {row.matid.mat_unit.toUpperCase()} </CenteredTextCell>,
      sortable: false,
    },
    {
      name: <CenteredTextCell>Qty</CenteredTextCell> ,
      width: "7%",
      cell: (row) => <CenteredTextCell>{ row.qty}</CenteredTextCell>,
      sortable: false,
    },
    
    {
      name: "Action",
      
      selector: (row) => (
        <>
         {checkPermissions("add_inventory") && (
          <button
            className="mbtn mbtn-edit"
            key={`edit-${row.inv_id}`}
            onClick={() => handleEdit(row.inv_id)}
          >
            <RiEditLine size={18} />
          </button>)}
          {checkPermissions("delete_inventory") && (
          <button
            className="mbtn mbtn-delete"
            style={{ marginLeft: "10px" }}
            key={`delete-${row.inv_id}`}
            onClick={() => openModal(row.inv_id)}
          >
            <RiDeleteBin6Line size={18} />
          </button>)}
        </>
      ),
    },
  ];

  const fetchInventory = useCallback(async () => {
    try {
      //console.log("link:",curdate,myState.siteid)
      setIsBusyShow(true);
      const response = await axios.get(`/inventory/?ddate=${curdate}&siteid=${myState.siteid}`);
      setData(response.data);
      
     // console.log(response.data)
      
    } catch (error) {
      setError("Something went wrong. Please try again later.");
      toast.error("Error fetching data");
    } finally {
      setIsBusyShow(false);
    }
  }, [myState.siteid,curdate]);

  useEffect(() => {
    fetchInventory();
    
  }, [fetchInventory,change,]);

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
      await axios.delete(`/inventory/${id}`);
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
      const response = await axios.get(`/inventory/${id}/`);
      setDataEdit(response.data);
     // console.log(response.data)
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

  const handleDateChange = (event) => {
    
    const newSelectedValue = event.target.value;
    setcurDate(event.target.value);
    
    //console.log("change made",newSelectedValue, curdate);
    
    
    };

  
  
 
  return (
    <div>
      <BusyForm isShow={isBusyShow} />
      <TitalBar
            isVisible={"DateSelector"}
           
            initialvalue={curdate}
            addvisible={checkPermissions("add_inventory")}
            onAdd={() => openModalForm("add")}
            onRefresh={() => fetchInventory()}
            onddchange={(e) => handleDateChange(e)}
            title="Inventory :"
            buttonString={["refresh", checkPermissions("add_inventory") && "pdf", checkPermissions("add_inventory") && "whatsapp"]}
          />
      
      
      <div id="grouptable" style={{overflowY:'auto',height: 'calc(100vh - 110px)'}}>
        <GroupDataTable
        columns={columns}
        data={data}
        groupByField="supid.sup_name"
        
      />
     </div>
      <DeleteConform
        content={"Inventory"}
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmDelete}
      />
      <InventoryModalForm
        isShow={isShow}
        onHide={closeModalForm}
        onUpdate={onUpdate}
        type={type}
        data={dataEdit}
      />
    </div>
  );
}

export default Inventory;