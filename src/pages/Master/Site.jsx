import React, { useEffect, useState } from 'react'
import DataTable, { defaultThemes } from 'react-data-table-component';
import axios from "../../AxiosConfig";
import '../../component/component.css'
import { toast } from 'react-toastify';
import SiteModalForm from './SiteModalForm'
import DeleteConform from '../../component/DeleteConform'
import TitalBar from '../../component/TitalBar';
import BusyForm from '../../component/BusyForm';


import { RiDeleteBin6Line ,RiEditLine } from "react-icons/ri";
import { CenteredTextCell } from '../Common';


function Site() {


    
    
    const [error, setError] = useState(null);
    const [change, setChange] = useState(false)
    const [dataEdit, setDataEdit] = useState([])
    const [isBusyShow,setIsBusyShow]=useState(false)
    // const [compid, setCompid] = useState(1)
    const columns = [
        { name: 'ID', width: '5%',  selector: row => row.site_id,  },
        { name: 'Site Name', width: '20%', selector: row => row.sitename.toUpperCase(), sortable: true },
        { name: 'Company Name', width: '20%', selector: row => row.compid.compname, sortable: true },
        { name: 'City', width: '10%', sortable: true, selector: row => <CenteredTextCell>{row.city}</CenteredTextCell> },
        { name: 'State', width: '7%', selector: row => row.state },
        { name: 'email', width: '10%', selector: row => row.email },
        { name: 'Phone', width: '8%', selector: row => row.phone },
        { name: 'Action', width: '20%', selector: row => [<button className='mbtn mbtn-edit ' key={`edit-${row.site_id}`} id={row.site_id} onClick={() => Edit(row.site_id)}> <RiEditLine size={18}/></button>, <button className='mbtn mbtn-delete' style={{ marginLeft: '10px' }} key={`delete-${row.site_id}`} id={row.site_id} onClick={() => openModal(row.site_id)}><RiDeleteBin6Line size={18}/></button>] },

    ];
    
    const fetchSite = async () => {
         //console.log(response.data)
       setIsBusyShow(true)
        await axios.get('/site/').then(response => {
            setData(response.data)
            //console.log(response.data)
            
        }).catch(error => {
            setError("Something went wrong. Please try again later.");
        });
        setIsBusyShow(false)

    }

     const [data, setData] = useState([])

    const Delete = async (id) => {
        await axios.delete('/site/' + id+'/').then(response => {
            setChange(!change)
            toast.success("data deleted")

        }).catch(err => {
            if (err.response.status === 501) {
                setError("data can not be delete ")
            }
            else {
                setError("Something went wrong. Please try again later.");
            }
            toast.error(error)
        });
    }

    const Edit = (id) => {
        //alert('edit '+id)
        setIsBusyShow(true)
        axios.get('/site/' + id+'/').then(response => {
           // console.log(response.data)
            //toast.success("data")
            setDataEdit(response.data)
            isModalShow('edit')
        }).catch(err => {
            if (err.response.status === 401) {
                setError(err.response.data.message)
            }
            else
                setError("Something went wrong. Please try again later.");
            toast.error(error)
        });
        setIsBusyShow(false)
    }
    useEffect(() => {
        fetchSite()
    }, [change]);



    const [isModalOpen, setModalOpen] = useState(false);
    let [delId, setDelId] = useState(0)
    const openModal = (id) => {
       
        setDelId(id)
        setModalOpen(true);

    }

    const closeModal = () => setModalOpen(false);

    const handleConfirmDelete = (e) => {

        Delete(delId)
        setModalOpen(false);
    };
    const [type, settype] = useState('')
    const [isShow, setIsShow] = useState(false)
    const isModalShow = (type) => {
        settype(type)
       
        setIsShow(true)
    }
    const isModalHide = () => { 
        setChange(!change)
        setDataEdit([])
        setIsShow(false)
        settype('')
     }

     const isBusyHide = () => { 
        setIsBusyShow(false)
     }
     


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
        <div>
            <BusyForm isShow={isBusyShow}  />
            
            <DataTable title={<TitalBar onAdd={() => isModalShow('add')} onRefresh={() => fetchSite()} title="List of Site" />} columns={columns} data={data} pagination responsive striped dense paginationPerPage={30} customStyles={customStyles}  />
            <DeleteConform content={"site"} isOpen={isModalOpen} onClose={closeModal} onConfirm={(e) => handleConfirmDelete()} />
            <SiteModalForm isShow={isShow} onHide={isModalHide} type={type} data={dataEdit}  />
        </div>
    )
}

export default Site
