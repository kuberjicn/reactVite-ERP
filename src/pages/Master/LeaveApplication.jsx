import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import "../../component/component.css";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import TitalBar from "../../component/TitalBar";
import BusyForm from "../../component/BusyForm";
import axios from "../../AxiosConfig";
function LeaveApplication() {
  const [data, setData] = useState([]);
  const [isBusyShow, setIsBusyShow] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(true);

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
          title="edit"
          className="mbtn mbtn-edit "
          key={`edit-${row.app_id}`}
          id={row.app_id}
          onClick={() => Edit(row.app_id)}
        >
          {" "}
          <RiEditLine size={18} />
        </button>,
        <button
          title="delete"
          className="mbtn mbtn-delete "
          key={`delete-${row.app_id}`}
          id={row.app_id}
          onClick={() => Edit(row.app_id)}
        >
          {" "}
          <RiDeleteBin6Line size={18} />
        </button>,

        <button
          title="approve"
          className="mbtn mbtn-view "
          key={`approve-${row.app_id}`}
          id={row.app_id}
          onClick={() => Edit(row.app_id)}
        >
          {" "}
          <RiEditLine size={18} />
        </button>,
      ],
    },
  ];

  const getData = async () => {
    setIsBusyShow(true);
    setLoading(true);
    // `/entity/?page=${currentPage}&page_size=${pageSize}`
    await axios
      .get(`/leave-application/?page=${currentPage}&page_size=${pageSize}`)

      .then((response) => {
        setData(response.data.results);
        console.log(response.data.results);
        setTotalPages(Math.ceil(response.data.count / pageSize));
      })
      .catch(() => {
        setIsBusyShow(false);
        setLoading(false);
        setError("Something went wrong. Please try again later.");
      });
    setIsBusyShow(false);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [currentPage, pageSize]);
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

  const handlePageSizeChange = (page_size) => {
    console.log(page_size);
    setCurrentPage(1);
    setPageSize(page_size);
    setTotalPages(Math.ceil(data.length / page_size));
  };
  const handlePageChange = (page) => {
    console.log(page);
    setCurrentPage(page);
  };
  return (
    <div>
      <BusyForm isShow={isBusyShow} />
      <DataTable
        title={
          <TitalBar
            onAdd={() => isModalShow("add")}
            onRefresh={() => getData()}
            title={"Leave Applications"}
          />
        }
        columns={columns}
        data={data}
        pagination={true}
        paginationServer={true} // Enable server-side pagination
        paginationTotalRows={totalPages * pageSize}
        paginationPerPage={pageSize}
        onChangePage={handlePageChange}
        progressPending={loading}
        responsive
        striped
        dense
        onChangeRowsPerPage={handlePageSizeChange}
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}
        paginationRowsPerPageOptions={[20, 30, 50]}
      />
    </div>
  );
}

export default LeaveApplication;
