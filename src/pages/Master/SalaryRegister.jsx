
import React,{useState,useEffect} from 'react'
import DataTable, { defaultThemes } from 'react-data-table-component';
import axios from "../../AxiosConfig";
import '../../component/component.css'
import { toast } from 'react-toastify';
import SalaryModalForm from './SalaryModalForm'
import ResignEmployeeForm from '../../component/ResignEmployeeForm'
import TitalBar from '../../component/TitalBar';
import BusyForm from '../../component/BusyForm';
import SalaryDetailModalForm from './SalaryDetailModalForm'
import { TfiViewListAlt } from "react-icons/tfi";
import { FaUserGraduate } from "react-icons/fa6";
import { FaUserTimes } from "react-icons/fa";
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
    { name: 'Effe. Date', width: '7%',cell:(row) =>{ 
      const date = new Date(row.effect_date);
      const formattedDate = date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).replace(/\//g, '-');
    return <CenteredTextCell>{formattedDate}</CenteredTextCell>}, sortable: true },
    { name: 'Action', width: '17%', cell: (row) => (<><button className='mbtn mbtn-edit ' key={`edit-${row.sal_id}`} id={`edit-${row.sal_id}`} onClick={() => Edit(row.sal_id)}> <FaUserGraduate  size={18}/></button> <button className='mbtn mbtn-delete' style={{ marginLeft: '10px' }} key={`delete-${row.sal_id}`} id={`delete-${row.sal_id}`} onClick={() => openModal(row.sal_id)}><FaUserTimes  size={18}/></button> <button className='mbtn mbtn-delete' style={{ marginLeft: '10px' }} key={`view-${row.sal_id}`} id={`view-${row.sal_id}`} onClick={() => openDetailModal(row.sal_id)}><TfiViewListAlt size={18}/></button></>)},

];


//++++++++++++++++++++++++++++++fatchdata+++++++++++++++++++++++++++++++++++++++++++++++++

const Edit=(id)=>{
setsalId(id)
setIsShow(true)
}

const fetchdata = async () => {
  setIsBusyShow(true);
  await axios
    .get("/salary-register/")
    .then((response) => {
      setData(response.data);
      //console.log(response.data)
    })
    .catch((error) => {
      setError("Something went wrong. Please try again later.");
    });
  setIsBusyShow(false);
};

useEffect(() => {
  fetchdata()
}, [change,]);



  //++++++++++++++++for detail forms+++++++++++++++++++++++++++++++++++

  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [detailData,setDetailData]=useState({})

  const closeDetailModal = () => setDetailModalOpen(false);
 
  const openDetailModal = async(id) => {
   
       await axios.get('/salary-register/'+id+'/history/')
      .then(response => {
        setDetailData(response.data)
        console.log(detailData)
        setDetailModalOpen(true);
        
    }).catch(error => {
      setError("Something went wrong. Please try again later.");
    });
     
  };

  //++++++++++++++++for resign confirmation+++++++++++++++++++++++++++++++++++

  const [isdeleteModalOpen, setdeleteModalOpen] = useState(false);
  const closeDeleteModal = () => setdeleteModalOpen(false);

  let [delId, setDelId] = useState(0)
  const openModal = (id) => {
      setDelId(id)
      setdeleteModalOpen(true);
  }
  const handleConfirmResign = async(e) => {
    
    await axios.post('/salary-register/'+delId+'/resign/')
      .then(response => {
        setChange(!change);
        toast.success(response.data.msg, {
         closeOnClick: true,
         transition: Bounce,});
        
    }).catch(error => {
      setError("Something went wrong. Please try again later.");
    });
     
  };
//++++++++++++++++++++++++add edit Modal form+++++++++++++++++++++++++++++++++++++++



const isModalShow = (type) => {
    settype(type)
    setsalId(0)
    setIsShow(true)

    
}
const isModalHide = () => { 
    //setChange(false)
    setsalId(0)
    setIsShow(false)
    settype('')
 }

 const onUpdate = () => { 
  setChange(!change)
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
      <DataTable title={<TitalBar onAdd={() => isModalShow('add')} onRefresh={() => setChange(!change)} title="Salary Register" />} columns={columns} data={data} pagination responsive striped dense paginationPerPage={30} customStyles={customStyles}  />
      <ResignEmployeeForm content={"Resign Employee"} isOpen={isdeleteModalOpen} onClose={closeDeleteModal} onConfirm={(e)=>handleConfirmResign(e)} />
      <SalaryModalForm isShow={isShow} onHide={isModalHide} onUpdate={onUpdate} sal_id={sal_id}  />
      <SalaryDetailModalForm onClose={closeDetailModal} data={detailData}  isShow={isDetailModalOpen}/>
    </div>
  )
}

export default SalaryRegister
