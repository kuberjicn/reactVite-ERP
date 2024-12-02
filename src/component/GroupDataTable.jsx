// src/components/GroupedDataTable.js

import React from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import PropTypes from "prop-types";
import { groupBy } from "lodash";

// Define the component
const GroupDataTable = ({ data, columns, groupByField ,type=''}) => {
  // Group data by the specified field
  const groupedData = groupBy(data, groupByField);

  // Custom styles for the DataTable
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
 

  const calculateTotals = (group) => {
    const groupSkills = group.reduce((acc, row) => acc + row.skill, 0);
    const groupUnskills = group.reduce((acc, row) => acc + row.unskill, 0);
    return { groupSkills, groupUnskills };
  };

  
  return (
    <div>
      {Object.keys(groupedData).map((groupKey) => {
        const group = groupedData[groupKey];
        const { groupSkills, groupUnskills } = calculateTotals(group);
        return(
        <div key={groupKey} style={{ marginBottom: "3px",padding:'0',  }}>
          <div style={{ display: "flex", justifyContent: "flex-start ", }}>
          
          <h3 style={{marginBottom:'2px',fontSize:'1.25rem',fontWeight:'bold',padding:'3px 5px'}}>{groupKey.toUpperCase()}</h3>
          {type=='labour'?
          <div style={{color:'var(--magenda-Font',fontWeight:"bold",fontSize:"1rem",display: "flex", justifyContent: "flex-start "}}>
            <div style={{padding:'3px 3px 3px  15px'}}>Total: {groupUnskills+groupSkills} <span style={{color:'#000', fontWeight:'100'}}>|</span></div>
            <div style={{padding:'3px 3px 3px  5px'}}>Skill: {groupSkills} <span style={{color:'#000', fontWeight:'100'}}>|</span></div>
            <div style={{padding:'3px 3px 3px  5px'}}>Unskill: {groupUnskills} <span style={{color:'#000', fontWeight:'100'}}>|</span></div>
          </div>
          :''}
          </div>
          <DataTable
            columns={columns}
            data={groupedData[groupKey]} 
            customStyles={customStyles}
            dense
            pagination
            responsive
            striped
            paginationPerPage={3}
            highlightOnHover
            pointerOnHover
            paginationRowsPerPageOptions={[3,6,9,12,18,24]}
            noDataComponent={<div>No data available</div>} 
          />
         
        </div>
      )
    })}
    </div>
  )
};

// Define PropTypes for type checking
GroupDataTable.propTypes = {
  data: PropTypes.array.isRequired, // Data for the table
  columns: PropTypes.array.isRequired, // Column definitions
  groupByField: PropTypes.string.isRequired, // Field to group by
};

export default GroupDataTable;
