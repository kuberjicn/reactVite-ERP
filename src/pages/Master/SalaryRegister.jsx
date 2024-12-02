import React, { useState, useEffect } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import axios from "../../AxiosConfig";
import "../../component/component.css";
import { toast } from "react-toastify";
import SalaryModalForm from "./SalaryModalForm";
import ResignEmployeeForm from "../../component/ResignEmployeeForm";
import TitalBar from "../../component/TitalBar";
import BusyForm from "../../component/BusyForm";
import SalaryDetailModalForm from "./SalaryDetailModalForm";
import { TfiViewListAlt } from "react-icons/tfi";
import { FaUserGraduate } from "react-icons/fa6";
import { useGlobleInfoContext } from "../../GlobleInfoProvider";
import { FiUserCheck, FiUserX } from "react-icons/fi";
import { CenteredTextCell,RightTextCell,checkPermissions } from "../Common";
import ErpDataGrid from "../../component/ErpDataGrid";

function SalaryRegister() {
  const { myState, updateProperty } = useGlobleInfoContext();

  const [error, setError] = useState("");
  const [change, setChange] = useState(false);
  const [sal_id, setsalId] = useState(0);
  const [isBusyShow, setIsBusyShow] = useState(false);
  const [data, setData] = useState([]);
  const [type, settype] = useState("add");
  const [isShow, setIsShow] = useState(false);
  const [activeList, setActiveList] = useState("posted");
  const [isActive, setIsActive] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 20,
    total: 10,
  });
  const columns = [
    { name: <CenteredTextCell>ID</CenteredTextCell>,
      width: "5%", 
     selector: row => row.sal_id,
     cell: (row) =><CenteredTextCell> {row.sal_id}</CenteredTextCell>
       },
   
    {
      name: "DOJ",
      width: "7%",
      cell: (row) => {
        const date = new Date(row.supid.doj);
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
      name: "Employee Name",
      
      selector: (row) => row.supid.sup_name.toUpperCase(),
      sortable: true,
    },
    { name: "Post", width: "16%", selector: (row) => row.post, sortable: true },
    {
      name: <RightTextCell>Salary</RightTextCell>,
      width: "8%",
      sortable: true,
      cell: (row) => {
        const salary = parseFloat(row.slry_rate);
         return <RightTextCell>{isNaN(salary) ? '' : salary.toFixed(2)}</RightTextCell>},
    },
    {
      name: "TA",
      width: "6%",
      cell: (row) => <CenteredTextCell>{row.ta}</CenteredTextCell>,
    },
    {
      name: "DA",
      width: "6%",
      cell: (row) => <CenteredTextCell>{row.da}</CenteredTextCell>,
    },
    {
      name: "HRA",
      width: "6%",
      cell: (row) => <CenteredTextCell>{row.hra}</CenteredTextCell>,
    },
    {
      name: "Effe. Date",
      width: "7%",
      cell: (row) => {
        const date = new Date(row.effect_date);
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
      name: "Action",
      width: "150px",
      cell: (row) => (
        <>
        {checkPermissions("add_salaryregister") && (
          <button title='promotion $ salary'
            className="mbtn mbtn-edit "
            key={`edit-${row.sal_id}`}
            id={`edit-${row.sal_id}`}
            onClick={() => Edit(row.sal_id)}
          >
            {" "}
            <FaUserGraduate size={18} />
          </button>)}

          {checkPermissions("delete_salaryregister") && (
         
          <button title='resign'
            className="mbtn mbtn-delete"
            style={{ marginLeft: "10px" }}
            key={`delete-${row.sal_id}`}
            id={`delete-${row.sal_id}`}
            onClick={() => openModal(row.sal_id)}
          >
           
            {activeList == "posted" ? (
              <FiUserX size={18} />
            ) : (
              <FiUserCheck size={18} />
            )}
          </button>)}
          {checkPermissions("view_salaryregister") && (
          
          <button title='view history'
            className="mbtn mbtn-view"
            style={{ marginLeft: "10px" }}
            key={`view-${row.sal_id}`}
            id={`view-${row.sal_id}`}
            onClick={() => openDetailModal(row.sal_id)}
          >
            <TfiViewListAlt size={18} />
          </button>)}
        </>
      ),
    },
  ];

  //++++++++++++++++++++++++++++++fatchdata+++++++++++++++++++++++++++++++++++++++++++++++++

  const Edit = (id) => {
    setsalId(id);
    setIsShow(true);
  };

  const fetchdata = async (typ) => {
    setIsBusyShow(true);
    //console.log(isActive);
    await axios
      .get(`/salary-register/?supid__Isactive=${typ}&page=${pagination.page}&page_size=${pagination.perPage}`)
      .then((response) => {
        setData(response.data.results);
        setPagination(prev => ({
          ...prev,
          total: response.data.count,
        }));
       // console.log(response.data)
      })
      .catch((error) => {
        setError("Something went wrong. Please try again later.");
      });
    setIsBusyShow(false);
  };

  useEffect(() => {
    fetchdata(isActive);
  }, [change,pagination.page, pagination.perPage]);
  useEffect(() => {
    updateProperty("isSitedisable",true)
  }, []);
  //++++++++++++++++for detail forms+++++++++++++++++++++++++++++++++++

  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [detailData, setDetailData] = useState({});

  const closeDetailModal = (e) => {
    // e.preventDefault();
    setDetailModalOpen(false);
  };

  const openDetailModal = async (id) => {
    setIsBusyShow(true);
    //console.log('dd');
    await axios
      .get("/salary-register/" + id + "/history/")
      .then((response) => {
        setDetailData(response.data);
        //console.log(detailData)
        setDetailModalOpen(true);
        setIsBusyShow(false);
      })
      .catch((error) => {
        setIsBusyShow(false);
        setError("Something went wrong. Please try again later.");
      });
  };

  //++++++++++++++++for resign confirmation+++++++++++++++++++++++++++++++++++

  const [isResignModalOpen, setResignModalOpen] = useState(false);
  const closeResignModal = (e) => {
    e.preventDefault();
    setResignModalOpen(false);
  };

  let [ResignId, setResignId] = useState(0);
  const openModal = (id) => {
    setResignId(id);
    setResignModalOpen(true);
  };
  const handleConfirmResign = async (e) => {
    if (isActive == false) {
      await axios
        .post("/salary-register/" + ResignId + "/resign/")
        .then((response) => {
          toast.success(response.data.msg, {
            closeOnClick: true,
            transition: Bounce,
          });
          setChange(!change);
        })
        .catch((error) => {
          setError("Something went wrong. Please try again later.");
        });
    }
    if (isActive == true) {
      await axios
        .post("/salary-register/" + ResignId + "/rejoin/")
        .then((response) => {
          toast.success(response.data.msg, {
            closeOnClick: true,
            transition: Bounce,
          });
          setChange(!change);
        })
        .catch((error) => {
          setError("Something went wrong. Please try again later.");
        });
    }
  };
  //++++++++++++++++++++++++add edit Modal form+++++++++++++++++++++++++++++++++++++++

  const isModalShow = (type) => {
    settype(type);
    setsalId(0);
    setIsShow(true);
  };
  const isModalHide = () => {
    //setChange(false)
    setsalId(0);
    setIsShow(false);
    settype("");
  };

  const onUpdate = () => {
    setChange(!change);
    setsalId(0);
    setIsShow(false);
    settype("");
  };

  //++++++++++++++++++++++++++++style datatable++++++++++++++++++++++++++++++++++++

 

  const handleRefresh = (e) => {
    console.log("gg");
    setActiveList(e.target.value);
    setPagination(prev => ({ ...prev, page: 1 }));
    //fetchdata(e.target.value)
  };

  useEffect(() => {
    //console.log(activeList);
    setIsActive(activeList == "posted");
    setChange(!change);
  }, [activeList]);

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
          addvisible={checkPermissions("add_salaryregister") }
          onAdd={() => isModalShow("add")}
          displayvalue={activeList}
          onRefresh={() => setChange(!change)}
          title="Salary Register"
          isVisible="ResignSelector"
          onChangeCombo={(e) => handleRefresh(e)}
          buttonString={['refresh',checkPermissions("add_salaryregister") && 'pdf',]}
          subtitle={'Employee'}
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
      
      <ResignEmployeeForm
        isresign={activeList}
        content={"Resign Employee"}
        isOpen={isResignModalOpen}
        onClose={closeResignModal}
        onConfirm={(e) => handleConfirmResign(e)}
      />
      <SalaryModalForm
        isShow={isShow}
        onHide={isModalHide}
        onUpdate={onUpdate}
        sal_id={sal_id}
      />
      <SalaryDetailModalForm
        onClose={closeDetailModal}
        data={detailData}
        isShow={isDetailModalOpen}
      />
    </div>
  );
}

export default SalaryRegister;
