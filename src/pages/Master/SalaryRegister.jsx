
import React,{useState,useEffect} from 'react'
import DataTable, { defaultThemes } from 'react-data-table-component';
import axios from "../../AxiosConfig";
import '../../component/component.css'
import { toast } from 'react-toastify';
import SalaryModalForm from './SalaryModalForm'
import DeleteConform from '../../component/DeleteConform'
import TitalBar from '../../component/TitalBar';
import BusyForm from '../../component/BusyForm';
import { RiDeleteBin6Line ,RiEditLine, } from "react-icons/ri";
import { TfiViewListAlt } from "react-icons/tfi";
import { CenteredTextCell } from '../Common';

  

function SalaryRegister() {

const [error, setError] = useState('');
const [change, setChange] = useState(false)
const [sal_id, setsalId] = useState(0)
const [isBusyShow,setIsBusyShow]=useState(false)
const [data, setData] = useState([])
const [type, settype] = useState('add')
const [isShow, setIsShow] = useState(false)

const columns = [
    { name: 'ID', width: '4%',  selector: row => row.sal_id,  },
    { name: 'DOJ', width: '7%',cell: (row) =>{
      const date = new Date(row.supid.doj);
      const formattedDate = date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).replace(/\//g, '-');
      return <CenteredTextCell>{formattedDate}</CenteredTextCell>}, sortable: true },
    { name: 'Employee Name', width: '20%', selector:(row) => row.supid.sup_name.toUpperCase(), sortable: true },
    { name: 'Post', width: '16%', selector: row => row.post, sortable: true },
    { name: 'Salary', width: '8%', sortable: true, cell: (row) =><CenteredTextCell>{ row.slry_rate}</CenteredTextCell> },
    { name: 'TA', width: '6%', cell: (row) => <CenteredTextCell>{row.ta}</CenteredTextCell> },
    { name: 'DA', width: '6%', cell: (row) => <CenteredTextCell>{row.da}</CenteredTextCell> },
    { name: 'HRA', width: '6%', cell: (row)=> <CenteredTextCell>{row.hra }</CenteredTextCell>},
    { name: 'Effective Date', width: '7%',cell:(row) =>{ 
      const date = new Date(row.supid.doj);
      const formattedDate = date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).replace(/\//g, '-');
    return <CenteredTextCell>{formattedDate}</CenteredTextCell>}, sortable: true },
    { name: 'Action', width: '17%', cell: (row) => (<><button className='mbtn mbtn-edit ' key={`edit-${row.sal_id}`} id={`edit-${row.sal_id}`} onClick={() => Edit(row.sal_id)}> <RiEditLine size={18}/></button> <button className='mbtn mbtn-delete' style={{ marginLeft: '10px' }} key={`delete-${row.sal_id}`} id={`delete-${row.sal_id}`} onClick={() => openModal(row.sal_id)}><RiDeleteBin6Line size={18}/></button> <button className='mbtn mbtn-delete' style={{ marginLeft: '10px' }} key={`view-${row.sal_id}`} id={`view-${row.sal_id}`} onClick={() => openModal(row.sal_id)}><TfiViewListAlt size={18}/></button></>)},

];


//++++++++++++++++++++++++++++++fatchdata+++++++++++++++++++++++++++++++++++++++++++++++++

const Edit=(id)=>{
setsalId(id)
//settype('edit')
setIsShow(true)

}
const fetchdata = async () => {
     setIsBusyShow(true)
      await axios.get('/salary-register/').then(response => {
          setData(response.data)
          //console.log(response.data)
          
      }).catch(error => {
          setError("Something went wrong. Please try again later.");
      });
      setIsBusyShow(false)

}

  useEffect(() => {
      fetchdata()
    }, [change]);

  //++++++++++++++++for delete confirmation+++++++++++++++++++++++++++++++++++

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  let [delId, setDelId] = useState(0)
    const openModal = (id) => {
        setDelId(id)
        setDeleteModalOpen(true);
    }
    const handleConfirmDelete = (e) => {
        Delete(delId)
        setModalOpen(false);
    };
//++++++++++++++++++++++++add edit Modal form+++++++++++++++++++++++++++++++++++++++



const isModalShow = (type) => {
    settype(type)
    setsalId(0)
    setIsShow(true)

    
}
const isModalHide = () => { 
    setChange(false)
    setsalId(0)
    setIsShow(false)
    settype('')
 }

 

//++++++++++++++++++++++++++++style datatable++++++++++++++++++++++++++++++++++++

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
      <DataTable title={<TitalBar onAdd={() => isModalShow('add')} onRefresh={() => fetchdata()} title="Salary Register" />} columns={columns} data={data} pagination responsive striped dense paginationPerPage={30} customStyles={customStyles}  />
      <DeleteConform content={"salary Register"} isOpen={isDeleteModalOpen} onClose={closeDeleteModal} onConfirm={(e) => handleConfirmDelete()} />
      <SalaryModalForm isShow={isShow} onHide={isModalHide} sal_id={sal_id}  />
    </div>
  )
}

export default SalaryRegister
