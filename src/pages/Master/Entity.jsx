import React, { useEffect, useState ,useCallback} from "react";

import axios from "../../AxiosConfig";
import "../../component/component.css";
import { toast } from "react-toastify";
import EntityModalForm from "./EntityModalForm";
import DeleteConform from "../DeleteConform";
import TitalBar from "../../component/TitalBar";
import BusyForm from "../../component/BusyForm";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { CenteredTextCell,checkPermissions } from "../Common";
import ErpDataGrid from "../../component/ErpDataGrid";
import { useGlobleInfoContext } from "../../GlobleInfoProvider";
import {generatePDF} from "../../component/PdfGenerator";

function Entity() {
  const { myState, updateProperty } = useGlobleInfoContext();

  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [change, setChange] = useState(false);
  const [isBusyShow, setIsBusyShow] = useState(false);
  const [selectedValue, setSelectedValue] = useState("employee");
  const [supid, setsupid] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalRow, setTotalRow] = useState(0);


  const columns = [
    { name: <CenteredTextCell>ID</CenteredTextCell>, width: "5%",
       selector: (row) => row.sup_id,
       cell:(row)=>  <CenteredTextCell>{row.sup_id}</CenteredTextCell> },
    {
      name: "Supplier Name",
      
      selector: (row) => row.sup_name.toUpperCase(),
      sortable: true,
    },
    {
      name:<CenteredTextCell>City</CenteredTextCell>,
      width: "10%",
      sortable: true,
      selector: (row) => row.city.toUpperCase(),
      
      cell:(row)=>  <CenteredTextCell>{row.city.toUpperCase()}</CenteredTextCell> ,
    },
    { name: <CenteredTextCell>State</CenteredTextCell>, width: "10%",
       selector: (row) => row.state.toUpperCase(),
      cell:(row)=>  <CenteredTextCell>{row.state.toUpperCase()}</CenteredTextCell> ,

     },
    { name: "email", width: "15%", selector: (row) => row.email.toUpperCase() },
    { name:<CenteredTextCell>Phone</CenteredTextCell>, width: "10%", selector: (row) => row.phone  ,cell:(row)=>  <CenteredTextCell>{row.phone}</CenteredTextCell> ,},

    {
      name: <CenteredTextCell>Date Of Joining</CenteredTextCell>,
      width: "10%",
      cell: (row) => {
        const date = new Date(row.doj);
        const formattedDate = date
          .toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "-");
        return (
          <CenteredTextCell>
            {selectedValue === "employee" ? formattedDate : "- NA -"}
          </CenteredTextCell>
        );
      },
    },
    {
      name: "Action",
      width: "110px",
      selector: (row) => [
        checkPermissions("add_supplier") && (
        <button
          className="mbtn mbtn-edit "
          id={row.sup_id}
          key={`edit-${row.sup_id}`}
          onClick={() => Edit(row.sup_id)}
        >
          <RiEditLine size={18} />
        </button>),
        checkPermissions("delete_supplier") &&(
        <button
          className="mbtn mbtn-delete"
          style={{ marginLeft: "10px" }}
          id={row.sup_id}
          key={`delete-${row.sup_id}`}
          onClick={(e) => openModal(e, row.sup_id)}
        >
          <RiDeleteBin6Line size={18} />
        </button>),
      ],
    },
  ];

  const fetchEntity = async (typ) => {
     setIsBusyShow(true);
    // setLoading(true);
    await axios
      .get(`/entity/?types=${typ}&page=${currentPage}&page_size=${pageSize}`)
      .then((response) => {
        setData(response.data.results);
        //console.log(response.data);
        // console.log(response.data.results.length);
        setTotalRow(response.data.count)
        setTotalPages(Math.ceil(response.data.count / pageSize));
        setLoading(false);
        // console.log(response.data.results)
      })
      .catch((error) => {
        setError("Something went wrong. Please try again later.");
        toast.error("Error fetching data");

      });
    setIsBusyShow(false);
    // setLoading(false);

  }

  const handleDropdownChange = (event) => {
    //console.log(currentPage,"page");
    setCurrentPage(1);
    const newSelectedValue = event.target.value;
    setSelectedValue(newSelectedValue);

    
  };

  const Delete =  async (id) => {
    await axios
      .delete(`/entity/${id}`)
      .then((response) => {
        setChange(!change);
        toast.success("data deleted",{
        closeOnClick: true,
        transition: Bounce,
        position: "bottom-right",
        zIndex: 1000,})
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
    setsupid(id);
    isModalShow("edit");
    setIsBusyShow(false);
  };
  useEffect(() => {
    //console.log(currentPage,selectedValue)
    fetchEntity(selectedValue);
  }, [ pageSize, selectedValue, totalPages]);

  useEffect(() => {
    //console.log(currentPage,"current page")
    fetchEntity(selectedValue);
  }, [currentPage,change]);


  useEffect(() => {
    updateProperty("isSitedisable",true)
  }, []);


  const [isModalOpen, setModalOpen] = useState(false);
  let [delId, setDelId] = useState(0);
  const openModal = (e, id) => {
    e.preventDefault();
    setDelId(id);
    setModalOpen(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setModalOpen(false);
  };

  const handleConfirmDelete = (e) => {
    Delete(delId);
    setModalOpen(false);
  };

  const [type, settype] = useState("");
  const [isShow, setIsShow] = useState(false);
  const isModalShow = (type) => {
    settype(type);
    setIsShow(true);
  };

  const isModalHide = (e) => {
    setsupid("");
    setIsShow(false);
  };

  const isModalUpdate = (e) => {
    setsupid("");
    setChange(!change);
    setIsShow(false);
  };

  const isBusyHide = () => {
    setIsBusyShow(false);
  };

  const handlePageChange = (page) => {
   // console.log(page)
    setCurrentPage(page);
    //fetchData(selectedValue,page, pageSize);

   
  };
  const handlePageSizeChange = (page_size) => {
    //console.log(page_size,'pagesize')
    setCurrentPage(1);
    setPageSize(page_size);
    setTotalPages(Math.ceil(data.length / page_size));
    
  };

  
  const handleRefresh = (e) => {
    setSelectedValue(e.target.value);
    setChange(!change);
  };

  const PdfMaker=()=>{
    const columnNames = ['sup_name', 'email','phone'];
  const caption = ['Name', 'email','Phone'];
  const columnWidthsPercentage = [50, 30,  20];
   
    generatePDF(data, columnNames,caption, columnWidthsPercentage,`${selectedValue.toUpperCase()} Information`, `${selectedValue}` );
  }

  return (
    <div>
      <BusyForm isShow={isBusyShow} />
      <ErpDataGrid 
      title={
        <TitalBar
          addvisible={checkPermissions("add_supplier")}
          onAdd={() => isModalShow("add")}
          onChangeCombo={(e) => handleRefresh(e)}
          onRefresh={() => setChange(!change)}
          onpdf={PdfMaker}
          title="List of :"
          isVisible="EntitySelector"
          onddchange={handleDropdownChange}
          buttonString={['refresh',checkPermissions("add_supplier") && 'pdf', checkPermissions("add_supplier") && 'print']}
        />
      }
      columns={columns}
      data={data}
      handlePageChange={handlePageChange}
      handlePageSizeChange={handlePageSizeChange}
      totalRows={totalRow}
      currentPage={currentPage}
      perPage={pageSize}
      />
      
      <DeleteConform
        content={"Entity"}
        isOpen={isModalOpen}
        onClose={(e) => closeModal(e)}
        onConfirm={(e) => handleConfirmDelete()}
      />
      <EntityModalForm
        isShow={isShow}
        onHide={(e) => isModalHide(e)}
        onUpdate={isModalUpdate}
        type={type}
        supid={supid}
        entityType={selectedValue}
      />
    </div>
  );
}

export default Entity;
