import React from 'react';
import ReactDOM from 'react-dom';
import { CgClose } from "react-icons/cg";
import '../Common.css'

import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { CenteredTextCell } from '../Common';
import DataTable, { defaultThemes } from 'react-data-table-component';
import ModalLayout from '../ModalLauout';

function SalaryDetailModalForm({ onClose, isShow, data }) {
    if (!isShow || !data || data.length === 0) return null;

    const columns = [
        { name: 'ID', width: '7%',  selector: row => row.sal_id,  },
       
        { name: 'Post',  selector: row => row.post, sortable: true },
        { name: 'Salary', width: '10%', sortable: true, cell: (row) =><CenteredTextCell>{ row.slry_rate}</CenteredTextCell> },
        { name: 'TA', width: '8%', cell: (row) => <CenteredTextCell>{row.ta}</CenteredTextCell> },
        { name: 'DA', width: '8%', cell: (row) => <CenteredTextCell>{row.da}</CenteredTextCell> },
        { name: 'HRA', width: '8%', cell: (row)=> <CenteredTextCell>{row.hra }</CenteredTextCell>},
        { name: 'Effe. Date', width: '15%',cell:(row) =>{ 
          const date = new Date(row.effect_date);
          const formattedDate = date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }).replace(/\//g, '-');
        return <CenteredTextCell>{formattedDate}</CenteredTextCell>}, sortable: true },
        
    ];
    

    const customStyles = {
        header: {
            style: {
                minHeight: '56px',
                
    
            },
        },
        headRow: {
            style: {
    
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                borderTopColor: defaultThemes.default.divider.default,
            },
        },
        headCells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: defaultThemes.default.divider.default,
                },
            },
    
        },
        cells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: defaultThemes.default.divider.default,
                },
            },
        },
    }
    

    return (
        <div  >
            <ModalLayout
            onClose={onClose}
            isShow={isShow}
            title={`History - ${data[0].supid.sup_name}`}
            nwidth='800px'
            content={
                <form style={{ padding: '20px',fontSize:'.8rem' }}>
                    <div style={{border:'1px solid #dadada'}}>
                   
                <DataTable  columns={columns} data={data} pagination responsive striped dense paginationPerPage={30} customStyles={customStyles}  />
                </div>
                    {/* <button style={{ marginLeft: '10px',marginTop:'10px',float:'right' }} className='mbtn mbtn-close' onClick={onClose}>Close</button> */}
                </form>}
            />

            </div>
       
       
    );
}

export default SalaryDetailModalForm;
