import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import "../../component/component.css";
import { RiDeleteBin6Line,RiEditLine } from "react-icons/ri";
import TitalBar from "../../component/TitalBar";
import BusyForm from "../../component/BusyForm";
import axios from "../../AxiosConfig";
function LeaveApplication() {
  const [data ,setData]=useState([])
  const [isBusyShow, setIsBusyShow] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const columns = [
    { name: "ID", width: "5%", selector: (row) => row.app_id },
    {
      name: "App Date",
      width: "10%",
      selector: (row) => row.app_date,
      sortable: true,
    },
    {
      name: "Leave type",
      width: "7%",
      selector: (row) => row.lvs_type,
      sortable: true,
    },
    {
      name: "Start From",
      width: "10%",
      selector: (row) => row.from_date,
      sortable: true,
    },
    {
      name: "Days",
      width: "10%",
      sortable: true,
      selector: (row) => row.nosDays,
    },
    { name: "Reason", width: "25%", selector: (row) => row.reason },
    { name: "Contact", width: "10%", selector: (row) => row.contact },

    {
      name: "Action",
      width: "20%",
      selector: (row) => [
        <button
          title='edit'
          className="mbtn mbtn-edit "
          key={`edit-${row.app_id}`}
          id={row.app_id}
          onClick={() => Edit(row.app_id)}
        >
          {" "}
          <RiEditLine size={18} />
        </button>,
        <button
        title='delete'
        className="mbtn mbtn-delete "
        key={`edit-${row.app_id}`}
        id={row.app_id}
        onClick={() => Edit(row.app_id)}
      >
        {" "}
        <RiDeleteBin6Line size={18} />
      </button>,

        <button
        title='approve'
        className="mbtn mbtn-view "
        key={`edit-${row.app_id}`}
        id={row.app_id}
        onClick={() => Edit(row.app_id)}
        >
        {" "}
        <RiEditLine size={18} />
        </button>,
      ],
    },
  ];

   const getData=async()=>{
    setIsBusyShow(true);

    await axios
      .get("/leave-application/" )

      .then((response) => {
        setData(response.data);
        console.log(response.data);
        setTotalPages(Math.ceil(response.data.count / pageSize));
      })
      .catch(() => {
        setIsBusyShow(false);
        setError("Something went wrong. Please try again later.");
      });
    setIsBusyShow(false);
   }

   useEffect(() => {
    
    getData();
  }, []);
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
      when: (row) => row.lvs_type === "casual", // Condition for the first row
      style: {
        backgroundColor: "#c8e4d4",
        color: "#333",
        fontWeight: "bold", // Change to your desired background color
      },
    },
    {
      when: (row) => row.lvs_type === "sick", // Condition for the first row
      style: {
        backgroundColor: "#ffe7c2",
        color: "#333",
        fontWeight: "bold", // Change to your desired background color
      },
    },
  ];

  return (
    <div>
      <BusyForm isShow={isBusyShow}  />
      <DataTable
        title={<TitalBar
          onAdd={() => isModalShow("add")}
          onRefresh={() => getData()}
          title={'Leave Applications'}
        />}
        columns={columns}
        data={data}
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

export default LeaveApplication;
