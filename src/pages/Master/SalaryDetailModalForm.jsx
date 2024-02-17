import React from 'react';
import ReactDOM from 'react-dom';
import { CgClose } from "react-icons/cg";
import '../Common.css'

import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { CenteredTextCell } from '../Common';
import DataTable, { defaultThemes } from 'react-data-table-component';

function SalaryDetailModalForm({ onClose, isShow, data }) {
    if (!isShow || !data || data.length === 0) return null;
//console.log(data)
    const columns = [
        { name: 'ID', width: '7%',  selector: row => row.sal_id,  },
        // { name: 'DOJ', width: '7%',cell: (row) =>{
        //   const date = new Date(row.supid.doj);
        //   const formattedDate = date.toLocaleDateString('en-IN', {
        //     day: '2-digit',
        //     month: '2-digit',
        //     year: 'numeric',
        //   }).replace(/\//g, '-');
        //   return <CenteredTextCell>{formattedDate}</CenteredTextCell>}, sortable: true },
        // { name: 'Employee Name', width: '20%', selector:(row) => row.supid.sup_name.toUpperCase(), sortable: true },
        { name: 'Post',  selector: row => row.post, sortable: true },
        { name: 'Salary', width: '10%', sortable: true, cell: (row) =><CenteredTextCell>{ row.slry_rate}</CenteredTextCell> },
        { name: 'TA', width: '8%', cell: (row) => <CenteredTextCell>{row.ta}</CenteredTextCell> },
        { name: 'DA', width: '8%', cell: (row) => <CenteredTextCell>{row.da}</CenteredTextCell> },
        { name: 'HRA', width: '8%', cell: (row)=> <CenteredTextCell>{row.hra }</CenteredTextCell>},
        { name: 'Effe. Date', width: '12%',cell:(row) =>{ 
          const date = new Date(row.effect_date);
          const formattedDate = date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }).replace(/\//g, '-');
        return <CenteredTextCell>{formattedDate}</CenteredTextCell>}, sortable: true },
        // { name: 'Action', width: '17%', cell: (row) => (<> <button className='mbtn mbtn-delete' style={{ marginLeft: '10px' }} key={`delete-${row.sal_id}`} id={`delete-${row.sal_id}`} onClick={() => openModal(row.sal_id)}><RiDeleteBin6Line size={18}  /></button></>) },
    
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

    return ReactDOM.createPortal(
        <div className="modal"  >
            <div className="modal-content" style={{width:'60%'}}>
                <div className='form-header'>
                    <h3 style={{ color: '#fff', marginTop:'5px', fontSize: '1.1rem' }}>History - {data[0].supid.sup_name}</h3>
                    <button className='control-btn btn-edit' onClick={onClose}><CgClose size={29} /></button>
                </div>
                <form style={{ padding: '20px',fontSize:'.8rem' }}>
                    <div style={{border:'1px solid #dadada'}}>

                   
                <DataTable  columns={columns} data={data} pagination responsive striped dense paginationPerPage={30} customStyles={customStyles}  />
                </div>
                    <button style={{ marginLeft: '10px',marginTop:'10px',float:'right' }} className='mbtn mbtn-close' onClick={onClose}>Close</button>
                </form>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
}

export default SalaryDetailModalForm;
