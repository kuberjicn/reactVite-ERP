import React, { useEffect, useState } from "react";
import TitalBar from "../../component/TitalBar";
import PayRollButton from "../../component/PayRollButton";
import axios from "../../AxiosConfig";
import DataTable, { defaultThemes } from "react-data-table-component";
import { getCurrentDate } from "../Common";
function PayRoll() {
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
    { name: "ID", width: "5%", selector: (row) => row.site_id },
    {
      name: "Site Name",
      width: "20%",
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
      name: "City",
      width: "10%",
      sortable: true,
      selector: (row) => <CenteredTextCell>{row.city}</CenteredTextCell>,
    },
    { name: "State", width: "7%", selector: (row) => row.state },
    { name: "email", width: "10%", selector: (row) => row.email },
    { name: "Phone", width: "8%", selector: (row) => row.phone },
    {
      name: "Action",
      width: "20%",
      selector: (row) => [
        <button
          className="mbtn mbtn-edit "
          key={`edit-${row.site_id}`}
          id={row.site_id}
          onClick={() => Edit(row.site_id)}
        >
          {" "}
          <RiEditLine size={18} />
        </button>,
        <button
          className="mbtn mbtn-delete"
          style={{ marginLeft: "10px" }}
          key={`delete-${row.site_id}`}
          id={row.site_id}
          onClick={() => openModal(row.site_id)}
        >
          <RiDeleteBin6Line size={18} />
        </button>,
      ],
    },
  ];

  const onShowModal = () => {};

  const getData = async () => {
    await axios
      .get(`/pay-roll/?year=${yr}`)

      .then((response) => {
        setData(response.data);
        console.log(response.data);
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
          minWidth: "75%",
          borderRight: "1px solid #fff",
          height: "94vh",
        }}
      >
        <DataTable
          title={
            <TitalBar
              title={"Pay Roll"}
              buttonString={["pdf", "print", "excel"]}
            />
          }
          columns={columns}
          data={Detailpayroll}
          pagination
          responsive
          striped
          dense
          paginationPerPage={30}
          customStyles={customStyles}
        />
      </div>

      <div style={{ minWidth: "25%", backgroundColor: "#dadada" }}>
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
