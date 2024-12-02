import React, { useEffect, useState } from "react";
import TitalBar from "../../component/TitalBar";
import PayRollButton from "../../component/PayRollButton";
import axios from "../../AxiosConfig";
import DataTable, { defaultThemes } from "react-data-table-component";
import { getCurrentDate } from "../Common";
import { CenteredTextCell,RightTextCell } from "../Common";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import ErpDataGrid from "../../component/ErpDataGrid";
import { useGlobleInfoContext } from "../../GlobleInfoProvider";

function PayRoll() {
  const { myState ,updateProperty} = useGlobleInfoContext();

  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [yr, setYr] = useState("");
  const [Detailpayroll, setDetailpayroll] = useState([]);

  const currentDate = new Date();
  const curyear = currentDate.getFullYear();
  if (yr === "") {
    setYr(curyear);
  }

  const columns = [
    { name: "ID", width: "5%", selector: (row,index) => <CenteredTextCell>{index + 1}</CenteredTextCell> ,},
    {
      name: "Emoloyee Name",
      width: "20%",
      cell: (row) => row.supid.sup_name.toUpperCase(),
      sortable: true,
    },
    
    {
      name: <CenteredTextCell>PR</CenteredTextCell>,
      width: "7%",
      sortable: true,
      cell: (row) => <CenteredTextCell>{row.pr_days}</CenteredTextCell>,
    },
    {
      name: <CenteredTextCell>AB</CenteredTextCell>,
      width: "7%",
      sortable: true,
      cell: (row) => <CenteredTextCell>{row.ab_days}</CenteredTextCell>,
    },
    {
      name: <CenteredTextCell>CL</CenteredTextCell>,
      width: "7%",
      sortable: true,
      cell: (row) => <CenteredTextCell>{row.cl_days}</CenteredTextCell>,
    },
    {
      name: <CenteredTextCell>SL</CenteredTextCell>,
      width: "7%",
      sortable: true,
      cell: (row) => <CenteredTextCell>{row.sl_days}</CenteredTextCell>,
    },
    {
      name: <CenteredTextCell>Days</CenteredTextCell>,
      width: "7%",
      sortable: true,
      cell: (row) => <CenteredTextCell>{row.payable_days}</CenteredTextCell>,
    },
    {
      name: <CenteredTextCell>Salary</CenteredTextCell>,
      width: "11%",
      sortable: true,
      cell: (row) => {
        const salary = parseFloat(row.slry_rate);
         return <RightTextCell>{isNaN(salary) ? '' : salary.toFixed(2)}</RightTextCell>},
    },
    {
      name: <CenteredTextCell>Net-Salary</CenteredTextCell>,
      width: "11%",
      sortable: true,
      cell: (row) => {
        const netSalary = parseFloat(row.net_slry); 
      return <RightTextCell>{isNaN(netSalary) ? '' : netSalary.toFixed(2)}</RightTextCell>},
    },
    {
      name: <CenteredTextCell>Bal-CL</CenteredTextCell>,
      width: "9%",
      sortable: true,
      cell: (row) => <CenteredTextCell>{row.bal_cl}</CenteredTextCell>,
    },
    {
      name: <CenteredTextCell>Bal-SL</CenteredTextCell>,
      width: "9%",
      sortable: true,
      cell: (row) => <CenteredTextCell>{row.bal_sl}</CenteredTextCell>,
    },
    
  ];

  const onShowModal = () => {};

  const getData = async () => {
    await axios
      .get(`/pay-roll/?year=${yr}`)

      .then((response) => {
        setData(response.data);
       
      })
      .catch(() => {
        setError("Something went wrong. Please try again later.");
      });
  };
  useEffect(() => {
    getData();
  }, [yr]);
  const handleRefresh = (e) => {
    let yr = e.target.value;
    setYr(yr);
  };
  useEffect (()=>{
    updateProperty("isSitedisable", true)
 },[])
  const getDetailpayroll = async (plsid) => {
    console.log(plsid);
    await axios
      .get(`/detail-pay-roll/?plsid=${plsid}`)

      .then((response) => {
        setDetailpayroll(response.data);
        console.log(response.data);
      })
      .catch(() => {
        setError("Something went wrong. Please try again later.");
      });
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
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <div
        style={{
          minWidth: "80%",
          borderRight: "1px solid #fff",
          height: "94vh",
        }}
      >
        <ErpDataGrid
        title={
          <TitalBar
            title={"Pay Roll"}
            buttonString={["pdf", "print", "excel"]}
          />
        }
        columns={columns}
        data={Detailpayroll}
        />
       
      </div>

      <div style={{ minWidth: "20%", backgroundColor: "#dadada" }}>
        <TitalBar
          onAdd={onShowModal}
          addvisible={true}
          onChangeCombo={(e) => handleRefresh(e)}
          onRefresh={() => getData()}
          isVisible={"YearSelector"}
          buttonString={["refresh"]}
        />
        <PayRollButton data={data} onPyrollload={getDetailpayroll} />
        <div></div>
      </div>
    </div>
  );
}

export default PayRoll;
