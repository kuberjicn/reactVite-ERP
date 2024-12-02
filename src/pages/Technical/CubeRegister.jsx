import React, { useEffect, useState, useCallback } from "react";
import { useGlobleInfoContext } from "../../GlobleInfoProvider";
import ErpDataGrid from "../../component/ErpDataGrid";
import BusyForm from "../../component/BusyForm";
import { CenteredTextCell, checkPermissions } from "../Common";
import TitalBar from "../../component/TitalBar";
import { toast, Bounce } from "react-toastify";
import axios from "../../AxiosConfig";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { formatDate, getCurrentDate } from "../../pages/Common";
import { TfiViewListAlt } from "react-icons/tfi";
import {
  FaArrowDown,
  FaArrowUp,
  FaCirclePlus,
  FaDAndDBeyond,
  FaDiamond,
  FaEye,
  FaPlus,
  FaPrint,
  FaTrash,
  FaTrashCan,
} from "react-icons/fa6";

import DataTable, { defaultThemes } from "react-data-table-component";
import CubeRegisterModal from "./CubeRegisterModal";
import CubeResultModal from "./CubeResultModal";
import DeleteConform from "../DeleteConform";

const CubeRegister = () => {
  const { myState, updateProperty } = useGlobleInfoContext();
  const [data, setData] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [isShowResult, setIsShowResult] = useState(false);
  const [isBusyShow, setIsBusyShow] = useState(false);
  const [change, setChange] = useState(false);
  const [error, setError] = useState(null);
  const [type, setType] = useState("");
  const [dataEdit, setDataEdit] = useState([]);
  const [resultDataEdit, setResultDataEdit] = useState([]);
  const [sampleListId, setSampleListId] = useState(0);
  const [isDelSample, setIsDelSample] = useState(false);

  const [cubeResultListId, setCubeResultListId] = useState(0);
  const [isDelCubeResult, setIsDelCubeResult] = useState(false);



  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 20,
    total: 10,
  });

  const columns = [
    {
      name: <CenteredTextCell>ID</CenteredTextCell>,
      width: "5%",
      selector: (row) => row.id,
      cell: (row) => <CenteredTextCell> {row.id} </CenteredTextCell>,
    },
    {
      name: <CenteredTextCell>Sp. ID </CenteredTextCell>,
      width: "60px",
      cell: (row) => <CenteredTextCell> {row.specialID} </CenteredTextCell>,
      sortable: false,
    },
    {
      name: <CenteredTextCell>Concrete</CenteredTextCell>,
      width: "60px",
      cell: (row) => (
        <CenteredTextCell> {row.concrete.toUpperCase()} </CenteredTextCell>
      ),
      sortable: false,
    },
    {
      name: <CenteredTextCell>Date</CenteredTextCell>,
      width: "100px",
      cell: (row) => (
        <CenteredTextCell> {formatDate(row.ddate)} </CenteredTextCell>
      ),
      sortable: false,
    },

    {
      name: <CenteredTextCell>Sample Count</CenteredTextCell>,
      width: "60px",
      cell: (row) => <CenteredTextCell> {row.nosSample} </CenteredTextCell>,
      sortable: false,
    },
    {
      name: "Discription",

      cell: (row) => (
        <div style={{ fontSize: ".7rem" }}> {row.shortDisp.toUpperCase()}</div>
      ),
      sortable: false,
    },

    {
      name: "Action",
      width: "110px",
      selector: (row) => (
        <>
          {checkPermissions("change_samplelist") && (
            <button
              className="mbtn mbtn-edit"
              key={`edit-${row.id}`}
              onClick={() => handleEdit(row.id)}
            >
              <RiEditLine size={18} />
            </button>
          )}
          {row.cuberesults.length == 0 &&
          checkPermissions("delete_samplelist") ? (
            <button
              className="mbtn mbtn-delete"
              key={`delete-${row.id}`}
              onClick={() => openDeleteSampleModal(row.id)}
            >
              <FaTrashCan size={18} />
            </button>
          ) : (
            ""
          )}
        </>
      ),
    },

    {
      name: "Add / View Result",
      width: "110px",

      selector: (row) => (
        <>
          {checkPermissions("add_cuberesult") && (
            <button
              className="mbtn mbtn-edit"
              key={`resultEdit-${row.id}`}
              onClick={() => openResultModalForm("add", row.id)}
            >
              <FaCirclePlus size={18} />
            </button>
          )}
        </>
      ),
    },
  ];

  const columnsResults = [
    {
      name: <CenteredTextCell>ID</CenteredTextCell>,
      width: "4%",
      selector: (row) => row.id,
      cell: (row) => <CenteredTextCell> {row.id}</CenteredTextCell>,
    },
    {
      name: <CenteredTextCell>Test Type</CenteredTextCell>,
      width: "10%",
      cell: (row) => (
        <CenteredTextCell> {row.testType.toUpperCase()} DAY </CenteredTextCell>
      ),
      sortable: false,
    },
    {
      name: <CenteredTextCell>NOS</CenteredTextCell>,
      width: "3%",
      cell: (row) => <CenteredTextCell> {row.nosSample} </CenteredTextCell>,
      sortable: false,
    },
    {
      name: <CenteredTextCell>Date</CenteredTextCell>,
      width: "6%",
      cell: (row) => (
        <CenteredTextCell> {formatDate(row.ddate)} </CenteredTextCell>
      ),
      sortable: false,
    },

    {
      name: <CenteredTextCell>Avg Wt[Kg]</CenteredTextCell>,
      width: "6%",
      cell: (row) => <CenteredTextCell> {row.weightAvg} </CenteredTextCell>,
      sortable: false,
    },
    {
      name: <CenteredTextCell>L1[kg]/FCK1[mpa]</CenteredTextCell>,
      width: "10%",
      cell: (row) => (
        <CenteredTextCell>
          <div>
            {" "}
            {row.resultOne}
            {parseFloat(row.defaultStrength) > parseFloat(row.resultOneMpa) ? (
              <FaArrowDown style={{ color: "red", width: "20px" }} />
            ) : (
              <FaArrowUp style={{ color: "green", width: "20px" }} />
            )}
            {row.resultOneMpa}
          </div>{" "}
        </CenteredTextCell>
      ),
      sortable: false,
    },
    {
      name: <CenteredTextCell>L2[kg]/FCK2[mpa]</CenteredTextCell>,
      width: "10%",
      cell: (row) => (
        <CenteredTextCell>
          {" "}
          <div>
            {" "}
            {row.resultTwo}
            {parseFloat(row.defaultStrength) > parseFloat(row.resultTwoMpa) ? (
              <FaArrowDown style={{ color: "red", width: "20px" }} />
            ) : (
              <FaArrowUp style={{ color: "green", width: "20px" }} />
            )}
            {row.resultTwoMpa}
          </div>{" "}
        </CenteredTextCell>
      ),
      sortable: false,
    },
    {
      name: <CenteredTextCell>L3[kg]/FCK3[mpa]</CenteredTextCell>,
      width: "10%",
      cell: (row) => (
        <CenteredTextCell>
          {" "}
          <div>
            {" "}
            {row.resultThree}
            {parseFloat(row.defaultStrength) >
            parseFloat(row.resultThreeMpa) ? (
              <FaArrowDown style={{ color: "red", width: "20px" }} />
            ) : (
              <FaArrowUp style={{ color: "green", width: "20px" }} />
            )}
            {row.resultThreeMpa}
          </div>{" "}
        </CenteredTextCell>
      ),
      sortable: false,
    },
    {
      name: <CenteredTextCell>FCK[mpa]</CenteredTextCell>,
      width: "6%",
      cell: (row) => (
        <CenteredTextCell
          style={{
            fontWeight: "bold",
            color: row.defaultStrength > row.resultAvg ? "red" : "green",
          }}
        >
          {parseFloat(row.defaultStrength) > parseFloat(row.resultAvg) ? (
            <FaArrowDown style={{ color: "red", width: "20px" }} />
          ) : (
            <FaArrowUp style={{ color: "green", width: "20px" }} />
          )}
          {row.resultAvg}{" "}
        </CenteredTextCell>
      ),
      sortable: false,
    },

    {
      name: "Action",

      selector: (row) => (
        <>
          {checkPermissions("change_cuberesult") && (
            <button
              className="mbtn mbtn-edit"
              key={`resultedit-${row.id}`}
              onClick={() => handleResultEdit(row.id)}
            >
              <RiEditLine size={18} />
            </button>
          )}
          {checkPermissions("delete_cuberesult") && (
            <button
              className="mbtn mbtn-delete"
              style={{ marginLeft: "2px" }}
              key={`delete-${row.id}`}
              onClick={() => openDeleteCubeModal(row.id)}
            >
              <RiDeleteBin6Line size={18} />
            </button>
          )}
          {checkPermissions("add_cuberesult") && (
            <button
              className="mbtn mbtn-edit"
              style={{ marginLeft: "2px" }}
              key={`print-${row.id}`}
              onClick={() => openModal(row.id)}
            >
              <FaPrint size={18} />
            </button>
          )}
        </>
      ),
    },
  ];

  const openDeleteSampleModal = (id) => {
    setSampleListId(id);
    setIsDelSample(true);
  };
  const openDeleteCubeModal = (id) => {
    setCubeResultListId(id);
    setIsDelCubeResult(true);
  };

  const handleEdit = async (id) => {
    try {
      setIsBusyShow(true);
      const response = await axios.get(`/sample-list/${id}/`);
      setDataEdit(response.data);
      //console.log(response.data);
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

  const handleResultEdit = useCallback(
    async (id) => {
      try {
       // console.log(id);
        setIsBusyShow(true);
        const response = await axios.get(`/cube-list/${id}/`);
        setResultDataEdit(response.data);
       // console.log(response.data);

        openResultModalForm("edit");
      } catch (err) {
        const errorMessage = "Something went wrong. Please try again later.";
        setError(errorMessage, err.message);
        toast.error(errorMessage + err.message, {
          closeOnClick: true,
          transition: Bounce,
          position: "bottom-right",
        });
      } finally {
        setIsBusyShow(false);
      }
    },
    [resultDataEdit]
  );

  useEffect(() => {
    updateProperty("isSitedisable", false);
  }, []);

  const fetchCubeSample = useCallback(async () => {
    try {
      //console.log("link:",curdate,myState.siteid)
      setIsBusyShow(true);
      const response = await axios.get(
        `/sample-list/?siteid=${myState.siteid}&page=${pagination.page}&page_size=${pagination.perPage}`
      );
      setData(response.data.results);

      setPagination((prev) => ({
        ...prev,
        total: response.data.count,
      }));
    } catch (error) {
      setError("Something went wrong. Please try again later.");
      toast.error("Error fetching data");
    } finally {
      setIsBusyShow(false);
    }
  }, [myState.siteid, pagination.page, pagination.perPage]);

  useEffect(() => {
    fetchCubeSample();
  }, [change, pagination.page, pagination.perPage, myState.siteid]);

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handlePerPageChange = (perPage) => {
    setPagination((prev) => ({ ...prev, perPage: perPage, page: 1 }));
  };

  const customStyles = {
    header: {
      style: {
        minHeight: "56px",
      },
    },

    rows: {
      style: {
        backgroundColor: "#fce7d9", // Background color for rows
      },
      highlightOnHoverStyle: {
        backgroundColor: "#f7c3a1", // Background on row hover
        fontWeight: "700",
      },
    },

    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: defaultThemes.default.divider.default,
        backgroundColor: "#f3a068",
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
        },
        padding: "0px 5px",
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
          // Background color for cells
        },
        padding: "0px 3px",
      },
    },
  };

  const closeModalForm = () => {
    setDataEdit([]);
    setIsShow(false);
    setType("");
  };

  const closeResultModalForm = () => {
    setResultDataEdit([]);
    setIsShowResult(false);
    setType("");
  };

  const onUpdate = () => {
    setChange(!change);
    closeModalForm();
  };

  const onResultUpdate = () => {
    setResultDataEdit([]);
    setChange(!change);
    closeResultModalForm();
  };

  const openModalForm = (formType) => {
    setType(formType);
    setIsShow(true);
  };

  const openResultModalForm = (typ, id = 0) => {
    setType(typ);
    setSampleListId(id);
    if (id != 0) {
      setResultDataEdit({ sampleList_id: id });
    }
    setIsShowResult(true);
  };

  const ExpandedComponent = ({ data }) => (
    <div style={{ marginLeft: "40px" }}>
      <DataTable
        columns={columnsResults}
        data={data.cuberesults}
        customStyles={customStyles}
        dense
        responsive
        highlightOnHover
        pointerOnHover
      />
    </div>
  );

  const closeDelSampleModal = () => setIsDelSample(false);
  //const closeModal = () => setModalOpen(false);

  const handleConfirmDeleteSample = () => {
    handleDeleteSample(sampleListId);
    setIsDelSample(false);
  };

  const handleDeleteSample = async (id) => {
    try {
      await axios.delete(`/sample-list/${id}`);
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


  const closeDelCubeModal = () => setIsDelCubeResult(false);

  const handleConfirmDeleteCube = () => {
    handleDeleteCube(cubeResultListId);
    setIsDelCubeResult(false);
  };

  const handleDeleteCube = async (id) => {
    try {
      await axios.delete(`/cube-list/${id}`);
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

  return (
    <div style={{ overflowY: "auto", overflowX: "hidden" }}>
      <BusyForm isShow={isBusyShow} />

      <ErpDataGrid
        title={
          <TitalBar
            addvisible={checkPermissions("add_samplelist")}
            onAdd={() => openModalForm("add")}
            onRefresh={() => setChange(!change)}
            title="Cube Sample List "
            buttonString={["refresh"]}
          />
        }
        columns={columns}
        data={data}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePerPageChange}
        totalRows={pagination.total}
        currentPage={pagination.page}
        perPage={pagination.perPage}
        ExpandedComponent={ExpandedComponent}
      />

      <CubeRegisterModal
        isShow={isShow}
        onHide={closeModalForm}
        onUpdate={onUpdate}
        type={type}
        data={dataEdit}
      />

      <CubeResultModal
        isShow={isShowResult}
        onHide={closeResultModalForm}
        onUpdate={onResultUpdate}
        type={type}
        data={resultDataEdit}
      />

      <DeleteConform
        content={"Sample-List"}
        isOpen={isDelSample}
        onClose={closeDelSampleModal}
        onConfirm={handleConfirmDeleteSample}
      />

      <DeleteConform
        content={"Cube-List"}
        isOpen={isDelCubeResult}
        onClose={closeDelCubeModal}
        onConfirm={handleConfirmDeleteCube}
      />
    </div>
  );
};

export default CubeRegister;
