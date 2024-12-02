import React, { useEffect, useState } from 'react'
import DataTable, { defaultThemes } from 'react-data-table-component';
import axios from "../../AxiosConfig";
import '../../component/component.css'
import { toast } from 'react-toastify';

import DeleteConform from '../DeleteConform'
import TitalBar from '../../component/TitalBar';
import BusyForm from '../../component/BusyForm';
import { useGlobleInfoContext } from "../../GlobleInfoProvider";

import { RiDeleteBin6Line ,RiEditLine } from "react-icons/ri";
import CompanyModalForm from './CompanyModalForm';
import ErpDataGrid from '../../component/ErpDataGrid';
import { CenteredTextCell,checkPermissions } from "../Common";

function Company() {


    
    const { myState, updateProperty } = useGlobleInfoContext();
    const [error, setError] = useState(null);
    const [change, setChange] = useState(false)
    const [dataEdit, setDataEdit] = useState([])
    const [isBusyShow,setIsBusyShow]=useState(false)
    // const [compid, setCompid] = useState(1)
    const columns = [
        { name: <CenteredTextCell>ID</CenteredTextCell>,
             width: "5%", 
            selector: row => row.comp_id,
            cell: (row) =><CenteredTextCell> {row.comp_id}</CenteredTextCell>
              },
        
        { name: 'Company Name',  selector: row => row.compname.toUpperCase(), sortable: true },
        { name: 'Contact Person', width: '15%', selector: row => row.contactperson.toUpperCase(), sortable: true },
        { name: 'email', width: '15%', selector: row => row.email },
        { name: <CenteredTextCell>Phone</CenteredTextCell>, width: '10%', selector: row => row.phone ,
            cell: (row) =><CenteredTextCell> {row.phone}</CenteredTextCell>

        },
        { name: 'PAN', width: '12%', sortable: true, selector: row => row.PAN.toUpperCase() },
        { name: 'GST', width: '15%', selector: row => row.GST.toUpperCase() },
        { name: 'Action', width: '110px', selector: row => 
            [
                checkPermissions("add_company") && (
            <button className='mbtn mbtn-edit ' key={`edit-${row.comp_id}`} id={row.comp_id} onClick={() => Edit(row.comp_id)}> <RiEditLine size={18}/></button>
            ),
            checkPermissions("delete_company") && (
                 <button className='mbtn mbtn-delete' style={{ marginLeft: '10px' }} key={`delete-${row.comp_id}`} id={row.comp_id} onClick={() => openModal(row.comp_id)}><RiDeleteBin6Line size={18}/></button>
            ),]}
    ];
    
    const fetchSite = async () => {
         //console.log(response.data)
       setIsBusyShow(true)
        await axios.get('/company/').then(response => {
            setData(response.data)
            //console.log(response.data)
            
        }).catch(error => {
            setError("Something went wrong. Please try again later.");
        });
        setIsBusyShow(false)

    }

     const [data, setData] = useState([])

    const Delete = async (id) => {
        await axios.delete('/company/' + id).then(response => {
            setChange(!change)
            toast.success("data deleted", {
                closeOnClick: true,
                transition: Bounce,
                position: "bottom-right",
              })

        }).catch(err => {
            if (err.response.status === 501) {
                setError("data can not be delete ")
            }
            else {
                setError("Something went wrong. Please try again later.");
            }
            toast.error(error, {
                closeOnClick: true,
                transition: Bounce,
                position: "bottom-right",
              })
        });
    }

    const Edit = (id) => {
        //alert('edit '+id)
        setIsBusyShow(true)
        axios.get('/company/' + id +'/').then(response => {
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

    useEffect(() => {
        updateProperty("isSitedisable",true)
      }, []);

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
        //setChange(!change)
        setDataEdit([])
        setIsShow(false)
        settype('')
     }

     const onUpdate = () => {
        setChange(!change)
        setDataEdit([]);
        setIsShow(false);
        settype("");
      };

     const isBusyHide = () => { 
        setIsBusyShow(false)
     }
     


   
    return (
        <div>
            <BusyForm isShow={isBusyShow}  />
            <ErpDataGrid
            title={<TitalBar addvisible={ checkPermissions("add_company") } 
            onAdd={() => isModalShow('add')} 
            onRefresh={() => fetchSite()} title="List of Company" 
            buttonString={['refresh',checkPermissions("add_company") && 'pdf', checkPermissions("add_company") && 'print']} />} 
            columns={columns} 
            data={data}
            />
            
            <DeleteConform content={"company"} isOpen={isModalOpen} onClose={closeModal} onConfirm={(e) => handleConfirmDelete()} />
            <CompanyModalForm isShow={isShow} onHide={isModalHide} onUpdate={onUpdate} type={type} data={dataEdit}  />
        </div>
    )
}

export default Company;                       
