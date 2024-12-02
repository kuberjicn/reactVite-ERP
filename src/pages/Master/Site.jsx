import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import axios from "../../AxiosConfig";
import "../../component/component.css";
import { toast } from "react-toastify";
import SiteModalForm from "./SiteModalForm";
import DeleteConform from "../DeleteConform";
import TitalBar from "../../component/TitalBar";
import BusyForm from "../../component/BusyForm";

import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { CenteredTextCell,checkPermissions } from "../Common";
import ErpDataGrid from "../../component/ErpDataGrid";
import { useGlobleInfoContext } from "../../GlobleInfoProvider";
import { TfiViewListAlt } from "react-icons/tfi";
import SiteDetailModalForm from "./SiteDetailModalForm";
import {generatePDF} from "../../component/PdfGenerator";
function Site() {
  const { myState, updateProperty } = useGlobleInfoContext();

  const [error, setError] = useState(null);
  const [change, setChange] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);
  const [isBusyShow, setIsBusyShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cursiteid, setCurSiteid] = useState(0);


  const columns = [
    { name:<CenteredTextCell> ID</CenteredTextCell>,
       width: "5%", 
      selector: (row) => row.site_id ,
      cell: (row) =><CenteredTextCell> {row.site_id}</CenteredTextCell>
    },
    {
      name: "Site Name",
      
      selector: (row) => row.sitename.toUpperCase(),
      sortable: true,
    },
    {
      name: "Company Name",
      width: "20%",
      selector: (row) => row.compid.compname,
      sortable: true,
    },
    {
      name:<CenteredTextCell> City</CenteredTextCell>,
      width: "10%",
      sortable: true,
      selector: (row) => row.city,
      cell: (row) =><CenteredTextCell> {row.city}</CenteredTextCell>
    },
    { name:<CenteredTextCell> State</CenteredTextCell>,
       width: "7%", 
       selector: (row) => row.state,
        cell: (row) =><CenteredTextCell> {row.state}</CenteredTextCell>
    },
    { name: "email",
       width: "10%",
       selector: (row) => row.email 
    },
    { name:<CenteredTextCell> Phone</CenteredTextCell>,
      width: "8%", 
      selector: (row) => row.phone , 
      cell: (row) =><CenteredTextCell> {row.phone}</CenteredTextCell>
    },
    {
      name: "Action",
      width: "150px",
      selector: (row) => [
        checkPermissions("change_sites") && (
        <button
          className="mbtn mbtn-edit "
          key={`edit-${row.site_id}`}
          id={row.site_id}
          onClick={() => Edit(row.site_id)}
        >
          {" "}
          <RiEditLine size={18} />
        </button>),
checkPermissions("delete_sites") && (
        <button
          className="mbtn mbtn-delete"
          style={{ marginLeft: "10px" }}
          key={`delete-${row.site_id}`}
          id={row.site_id}
          onClick={() => openModal(row.site_id)}
        >
          <RiDeleteBin6Line size={18} />
        </button>),
        checkPermissions("view_sites") && (
        <button title='view history'
        className="mbtn mbtn-view"
        style={{ marginLeft: "10px" }}
        key={`view-${row.site_id}`}
        id={`view-${row.site_id}`}
        onClick={() => openDetailModal(row.site_id)}
      >
        <TfiViewListAlt size={18} />
      </button>)
      ],
    },
  ];
//--------------------for detailmodal form------------------------------------
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [detailData, setDetailData] = useState({});

  const closeDetailModal = (e) => {
    // e.preventDefault();
    setDetailModalOpen(false);
  };
  const openDetailModal = async (id) => {
   
    setCurSiteid(id);
    setDetailModalOpen(true)
  };
//-----------------------------------------------------------------------

  const fetchSite = async () => {
    setIsBusyShow(true);
    await axios
      .get("/site/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError("Something went wrong. Please try again later.");
      });
    setLoading(false);
    setIsBusyShow(false);
  };
  const [data, setData] = useState([]);

  const Delete = async (id) => {
    await axios
      .delete("/site/" + id + "/")
      .then((response) => {
        setChange(!change);
        toast.success("data deleted" ,{
          closeOnClick: true,
          transition: Bounce,
          position: "bottom-right",
        });
      })
      .catch((err) => {
        if (err.response.status === 501) {
          setError("data can not be delete ");
        } else {
          setError("Something went wrong. Please try again later.");
        }
        toast.error(error ,{
          closeOnClick: true,
          transition: Bounce,
          position: "bottom-right",
        });
      });
  };

  const Edit = (id) => {
    setIsBusyShow(true);
    axios
      .get("/site/" + id + "/")
      .then((response) => {
        console.log(response.data);

        setDataEdit(response.data);
        isModalShow("edit");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setError(err.response.data.message);
        } else setError("Something went wrong. Please try again later.");
        toast.error(error);
      });
    setIsBusyShow(false);
  };
  useEffect(() => {
    fetchSite();
  }, [change]);

  useEffect(() => {
    updateProperty("isSitedisable",true)
  }, [])

  const [isModalOpen, setModalOpen] = useState(false);
  let [delId, setDelId] = useState(0);
  const openModal = (id) => {
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
  const isModalHide = () => {
    //setChange(!change)
    setDataEdit([]);
    setIsShow(false);
    settype("");
  };

  const onUpdate = () => {
    setChange(!change);
    setDataEdit([]);
    setIsShow(false);
    settype("");
  };

  const isBusyHide = () => {
    setIsBusyShow(false);
  };
  
  const PdfMaker=()=>{
    const columnNames = ['sitename', 'city','state','email','phone'];
  const caption = ['Site Name', 'City','State','email','Phone'];
  const columnWidthsPercentage = [35, 10,  10, 25, 15];
   
    generatePDF(data, columnNames,caption, columnWidthsPercentage,'Site Information','site');
  }
  
  return (
    <div>
      <BusyForm isShow={isBusyShow} />
      
      <ErpDataGrid
        data={data}
        columns={columns}
        title={
          <TitalBar
          addvisible={checkPermissions("change_sites") }
          onAdd={() => isModalShow("add")}
          onRefresh={() => fetchSite()}
          onpdf={() => PdfMaker()}
          title="List of Site"
          buttonString={['refresh','pdf','print','excel']}
        />
        }
      />
      
      <DeleteConform
        content={"site"}
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={(e) => handleConfirmDelete()}
      />
      <SiteModalForm
        isShow={isShow}
        onHide={isModalHide}
        onUpdate={onUpdate}
        type={type}
        data={dataEdit}
      />
      <SiteDetailModalForm  
      siteid={cursiteid}
      onClose={closeDetailModal}
      isShow={isDetailModalOpen}

      />
    </div>
  );
}

export default Site;
