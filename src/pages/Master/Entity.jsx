import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import axios from "../../AxiosConfig";
import "../../component/component.css";
import { toast } from "react-toastify";

import EntityModalForm from "./EntityModalForm";
import DeleteConform from "../../component/DeleteConform";
import TitalBar from "../../component/TitalBar";
import BusyForm from "../../component/BusyForm";

import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { CenteredTextCell } from "../Common";
function Entity() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [change, setChange] = useState(false);
  //const [dataEdit, setDataEdit] = useState([]);
  const [isBusyShow, setIsBusyShow] = useState(false);
  const [selectedValue, setSelectedValue] = useState("employee");
  const [supid,setsupid]=useState('')
  // const [compid, setCompid] = useState(1)
  
  const columns = [
    { name: "ID", width: "5%", selector: (row) => row.sup_id },
    {
      name: "Supplier Name",
      width: "20%",
      selector: (row) => row.sup_name.toUpperCase(),
      sortable: true,
      
    },
    {
      name: "City",
      width: "10%",
      sortable: true,
      selector: (row) => row.city.toUpperCase(),
    },
    { name: "State", width: "10%", selector: (row) => row.state.toUpperCase()},
    { name: "email", width: "15%", selector: (row) => row.email.toUpperCase() },
    { name: "Phone", width: "10%", selector: (row) => row.phone},
    
    {
      name: "Date Of Joining",
      width: "10%",
      cell: (row) =>{ 
        const date = new Date(row.doj);
        const formattedDate = date.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
         
        }).replace(/\//g, '-');
      return <CenteredTextCell>{(selectedValue === "employee" ? formattedDate : "- NA -")}</CenteredTextCell>},
    },
    {
      name: "Action",
      width: "15%",
      selector: (row) => [
        <button
          className="mbtn mbtn-edit "
          id={row.sup_id}
          key={`edit-${row.sup_id}`}
          onClick={() => Edit(row.sup_id)}
        >
         
          <RiEditLine size={18} />
        </button>,
        <button
          className="mbtn mbtn-delete"
          style={{ marginLeft: "10px" }}
          id={row.sup_id}
          key={`delete-${row.sup_id}`}
          onClick={(e) => openModal(e,row.sup_id)}
        >
          <RiDeleteBin6Line size={18} />
        </button>,
      ],
    },
  ];

  const fetchEntity = async (typ) => {
    //console.log(typ)
    setIsBusyShow(true);
    await axios
      .get("/entity/", { params: { filter2: typ } })
      .then((response) => {
        setData(response.data);
         //console.log(response.data)
      })
      .catch((error) => {
        setError("Something went wrong. Please try again later.");
      });
    setIsBusyShow(false);
  };

  const handleDropdownChange = (event) => {
    const newSelectedValue = event.target.value;
    setSelectedValue(newSelectedValue);
    fetchEntity(newSelectedValue);
  };

  const Delete = async (id) => {
    
    await axios
      .delete("/entity/" + id)
      .then((response) => {
        setChange(!change);
        toast.success("data deleted");
      })
      .catch((err) => {
        if (err.response.status === 501) {
          setError("data can not be delete ");
        } else {
          setError("Something went wrong. Please try again later.");
        }
        toast.error(error);
      });
  };

  const Edit = (id) => {
    
    setIsBusyShow(true);
    setsupid(id)
    isModalShow("edit");
    setIsBusyShow(false);
   };
  useEffect(() => {
    
    fetchEntity(selectedValue);
    
  }, [change]);
  
  const [isModalOpen, setModalOpen] = useState(false);
  let [delId, setDelId] = useState(0);
  const openModal = (e,id) => {
    e.preventDefault();
    setDelId(id);
    setModalOpen(true);
  };

  const closeModal = (e) =>{
    e.preventDefault();
     setModalOpen(false);
    }

  const handleConfirmDelete = (e) => {
    Delete(delId);
    //console.log('Item deleted!' + delId);
    setModalOpen(false);
  };
  const [type, settype] = useState("");
  const [isShow, setIsShow] = useState(false);
  const isModalShow = (type) => {
    settype(type);
    setIsShow(true);
  };
  const isModalHide = (e) => {
   
    setsupid('')
    //setChange(!change);
    
    setIsShow(false);
  };

  const isModalUpdate = (e) => {
   
    setsupid('')
    setChange(!change);
    
    setIsShow(false);
  };


  const isBusyHide = () => {
    setIsBusyShow(false);
  };

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
  return (
    <div>
      <BusyForm isShow={isBusyShow} />
      <TitalBar
        onAdd={() => isModalShow("add")}
        onRefresh={() => fetchEntity(selectedValue)}
        title="List of"
        isVisible="true"
        onddchange={() => handleDropdownChange}
      />
      <DataTable
        columns={columns}
        data={data}
        pagination
        responsive
        striped
        dense
        paginationPerPage={30}
        customStyles={customStyles}
        paginationServer={false}
        paginationRowsPerPageOptions={[10, 20, 30]}
      />
      <DeleteConform
        content={"Entity"}
        isOpen={isModalOpen}
        onClose={(e)=>closeModal(e)}
        onConfirm={(e) => handleConfirmDelete()}
      />
      <EntityModalForm
        isShow={isShow}
        onHide={(e)=>isModalHide(e)}
        onUpdate={isModalUpdate}
        type={type}
        supid={supid}
        entityType={selectedValue}
      />
    </div>
  );
}

export default Entity;
