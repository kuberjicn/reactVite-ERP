import React from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import PropTypes from "prop-types";


const ErpDataGrid=({data,columns,perPage=20,minheight="345px",title="",handlePageChange,handlePageSizeChange,totalRows,currentPage,paginationIsRequired=true,ExpandedComponent=''})=>{

  const customStyles = {
    header: {
      style: {
        minHeight: "56px",
        
      },
     

    },

    rows: {
      style: {
        backgroundColor: '#fff',  // Background color for rows
      },
      highlightOnHoverStyle: {
        backgroundColor: '#f7c3a1', // Background on row hover
        fontWeight:'700'
      },
    },

    tableWrapper: {
      style: {
        minHeight: {minheight}, // Set your desired minimum height here
        

      },
    },
    table: {
      style: {
        minHeight: {minheight}, // Apply minimum height to the table element if needed
         backgroundColor: '',
         
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
        padding: '0px 5px',

      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
          
        },
        padding: '0px 3px',
      },
    },
  };

  
  
  return (
    <>
    
    <DataTable
            title={title}
            columns={columns}
            data={data} 
            customStyles={customStyles}
            dense
            pagination={paginationIsRequired}
            responsive
            striped
            paginationPerPage={perPage}
            paginationRowsPerPageOptions={[5,10,15,20, 30, 50]}
            highlightOnHover
            pointerOnHover
            noDataComponent={<div>No data available</div>} 
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handlePageSizeChange}
            paginationTotalRows={totalRows}
            paginationServer={paginationIsRequired}
            paginationDefaultPage={currentPage}
            expandableRowsComponent={ExpandedComponent}
            expandableRows={ExpandedComponent?true:false}
            expandOnRowClicked
          />
    </>
  )
}




ErpDataGrid.propTypes = {
  data: PropTypes.array.isRequired, // Data for the table
  columns: PropTypes.array.isRequired, // Column definitions
  title:PropTypes.node,
  perPage: PropTypes.number,
  minHeight: PropTypes.string,
  handlePageChange: PropTypes.func, // Function to handle page changes
  HandlePageSizeChange: PropTypes.func, // Function to handle page size changes
  totalRows: PropTypes.number, // Total number of rows for pagination
  currentPage: PropTypes.number, // Current page number
  paginationIsRequired: PropTypes.bool, // Current page number

};
export default ErpDataGrid;