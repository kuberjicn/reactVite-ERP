import React from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import TitalBar from "../component/TitalBar";
import "../component/component.css";
import { RiEditLine } from "react-icons/ri";
import { FcApprove ,FcDisapprove } from "react-icons/fc";
function LeaveDisplay({ data = [], fetchdata }) {
  const casual = data.casualdata;
  const sick = data.sickdata;

  const columns = [
    { name: "ID", width: "5%", selector: (row) => row.lvr_id },
    {
      name: "Date",
      width: "10%",
      selector: (row) => row.ddate,
      sortable: false,
    },
    {
      name: "Leave",
      width: "10%",
      selector: (row) => row.leave,
      sortable: false,
    },
    { name: "Type", width: "7%", selector: (row) => row.lvs_type },
    // { name: 'application ID', width: '10%', selector: row => row.la_app_id },
    { name: "disp", width: "30%", selector: (row) => row.disp },
  ];

  const renderActions = (row) => [
    <button
      className="mbtn mbtn-delete "
      key={`edit-${row.lvr_id}`}
      id={row.lvr_id}
      onClick={() => Edit(row.lvr_id)}
    >
      {" "}
      <FcDisapprove size={18} />
    </button>,
  ];

  // Add the action column to the columns array
  columns.push({
    name: "Action",
    width: "20%",
    selector: (row) =>
      row.la_app_id !== 0 && row.la_app_id !== "" ? renderActions(row) : null,
  });

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

  const conditionalRowStyles = [
    {
      when: (row) => row.la_app_id === "", // Condition for the first row
      style: {
        backgroundColor: "#dadada",
        color: "red",
        fontWeight: "bold", // Change to your desired background color
      },
    },
    {
      when: (row) => row.la_app_id === 0, // Condition for the first row
      style: {
        backgroundColor: "#dadada",
        color: "green",
        fontWeight: "bold", // Change to your desired background color
      },
    },
  ];
  function Edit(id) {
    alert(id);
  }
  return (
    <div>
      <TitalBar onRefresh={() => fetchdata(data.empid)} title={data.supname} />
      <DataTable
        title={<h2 className="custom-title">Casual Leave</h2>}
        columns={columns}
        data={casual}
        pagination
        responsive
        striped
        dense
        paginationPerPage={30}
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}
      />
      <DataTable
        title={<h2 className="custom-title">Sick Leave</h2>}
        columns={columns}
        data={sick}
        pagination
        responsive
        striped
        dense
        paginationPerPage={30}
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}
      />
    </div>
  );
}

export default LeaveDisplay;
