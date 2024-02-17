import React from 'react';
import ReactDOM from 'react-dom';
import { CgClose } from "react-icons/cg";
import '../Common.css'

function SalaryDetailModalForm({ onClose, isShow, data }) {
    if (!isShow || !data || data.length === 0) return null;

    return ReactDOM.createPortal(
        <div className="modal"  >
            <div className="modal-content" style={{width:'50%'}}>
                <div className='form-header'>
                    <h3 style={{ color: '#fff', marginTop:'5px', fontSize: '1.1rem' }}>History</h3>
                    <button className='control-btn btn-edit' onClick={onClose}><CgClose size={29} /></button>
                </div>
                <form style={{ padding: '20px',fontSize:'.8rem' }}>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Post</th>
                                <th>Effect Date</th>
                                <th>Salary</th>
                                <th>TA</th>
                                <th>DA</th>
                                <th>HRA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item.sal_id}>
                                    <td>{item.supid.sup_id}</td>
                                    <td>{item.supid.sup_name}</td>
                                    <td>{item.post}</td>
                                    <td>{item.effect_date}</td>
                                    <td>{item.slry_rate}</td>
                                    <td>{item.ta}</td>
                                    <td>{item.da}</td>
                                    <td>{item.hra}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button style={{ marginLeft: '10px',marginTop:'10px',float:'right' }} className='mbtn mbtn-close' onClick={onClose}>Close</button>
                </form>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
}

export default SalaryDetailModalForm;
