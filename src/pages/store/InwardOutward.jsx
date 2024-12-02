import React,{useEffect,useState,useCallback} from 'react'
import DataTable, { defaultThemes } from "react-data-table-component";
import axios from "../../AxiosConfig";
import "../../component/component.css";
import { toast,Bounce } from "react-toastify";
import DeleteConform from "../DeleteConform";
import TitalBar from "../../component/TitalBar";
import BusyForm from "../../component/BusyForm";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { formatDate, getCurrentDate } from "../../pages/Common";
import { useGlobleInfoContext } from "../../GlobleInfoProvider";
import { CenteredTextCell,checkPermissions } from "../Common";
import ErpDataGrid from '../../component/ErpDataGrid';
import InwardOutwarModalForm from './InwardOutwarModalForm';



function InwardOutward({formtype='inoutward'}) {

  const { myState ,updateProperty} = useGlobleInfoContext();
  const [curdate,setcurDate]=useState(getCurrentDate())
  const [error, setError] = useState(null);
  const [change, setChange] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);
  const [isBusyShow, setIsBusyShow] = useState(false);
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [delId, setDelId] = useState(0);
  const [type, setType] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [entrytype, setEntrytype] = useState('in');
  const [regtype, setRegtype] = useState("diesel");
  const [formtyp, setFromtyp] = useState(formtype );
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 15,
    total: 10,
  });
  const [totalInqty, setTotalInQty] = useState(0);
  const [totalOutqty, setTotalOutQty] = useState(0);


  const columns = [
    { name: "ID", 
      width: "5%",
       selector: (row) => row.reg_id ,
       cell: row => <CenteredTextCell> { <div style={getStatusStyles(row.entry_type)}>{row.reg_id}</div>}</CenteredTextCell>,
      },
    {
      name: <CenteredTextCell>Date</CenteredTextCell> ,
      width: "6%",
      cell: (row) => <CenteredTextCell> {formatDate(row.inward_date)} </CenteredTextCell>,
      sortable: false,
    },
    {
      name: "Material Discription",
      width: "20%",
      selector: (row) => row.discription.toUpperCase(),
      cell: row => <div style={{ whiteSpace: 'normal',width:'100%'}}>
        <div style={{backgroundColor:'#e5f0ed' ,letterSpacing:'3px' ,fontWeight:'bold', padding:'0 2px',marginBottom:'2px',borderBottom:'1px solid #dadada'}}> 
          {row.reg_type.toUpperCase()}
          </div>
          <div style={{fontSize:'10px',lineHeight:'18px'}}>{row.discription.toUpperCase() }</div>
          </div>,
        //row:row=><div style={getStatusStyles(row.entry_type)}> acb</div>,
      sortable: false,
      style: {
        whiteSpace: 'normal', 
      },
    },
    {
      name: <CenteredTextCell>Unit</CenteredTextCell> ,
      width: "5%",
      cell: (row) => <CenteredTextCell> {row.unit.toUpperCase()} </CenteredTextCell>,
      sortable: false,
    },
    {
      name: <CenteredTextCell>In-Qty</CenteredTextCell> ,
      width: "6%",
      cell: (row) => <CenteredTextCell>{ row.in_qty}</CenteredTextCell>,
      sortable: false,
    },
    {
      name: <CenteredTextCell>In-Qty</CenteredTextCell> ,
      width: "6%",
      cell: (row) => <CenteredTextCell>{ row.out_qty}</CenteredTextCell>,
      sortable: false,
    },
    {
      name: "Received From",
      width: "15%",
      selector: (row) => row.received_from.toUpperCase(),
      sortable: true,
    },
    {
      name: "Issue To",
      width: "15%",
      selector: (row) => row.issue_to.toUpperCase(),
      sortable: true,
    },

    {
      name: "Action",
     
      selector: (row) => (
        <>
        {checkPermissions("add_inwardoutward") && (
          <button
            className="mbtn mbtn-edit"
            key={`edit-${row.id}`}
            onClick={() => handleEdit(row.id)}
          >
            <RiEditLine size={18} />
          </button>)}
          {checkPermissions("delete_inwardoutward") && (
          <button
            className="mbtn mbtn-delete"
            style={{ marginLeft: "10px" }}
            key={`delete-${row.id}`}
            onClick={() => openModal(row.id)}
          >
            <RiDeleteBin6Line size={18} />
          </button>)}
        </>
      ),
    },
  ];

  const fetchInventory = useCallback(async () => {
    // strurl=(formtype=='inoutward'?`inward-outward/?ddate=${curdate}&siteid=${myState.siteid}&isdeleted={false}`:`inward-outward/?ddate=${curdate}&siteid=${myState.siteid}&isdeleted={false}`)

    try {
      //console.log("link:",curdate)
      //setData([])
      setIsBusyShow(true);
      let response={}
      if (formtyp==='inoutward'){
       response = await axios.get(`inward-outward/?ddate=${curdate}&siteid=${myState.siteid}&isdeleted=0&regtype=`);
       //console.log(response.data);
       setTotalInQty(response.data.total_inqty)
       setTotalOutQty(response.data.total_outqty)
      }
      if (formtyp==='register'){
        response = await axios.get(`inward-outward/?siteid=${myState.siteid}&isdeleted=${0}&regtype=${regtype}&page=${pagination.page}&page_size=${pagination.perPage}`);
        //console.log(response.data);
        setTotalInQty(response.data.total_inqty)
        setTotalOutQty(response.data.total_outqty)
       }
      setData(response.data.results);
      

      setPagination(prev => ({
        ...prev,
        total: response.data.count,
      }));
      //console.log(response.data)
      
    } catch (error) {
      setError("Something went wrong. Please try again later.");
      toast.error("Error fetching data");
    } finally {
      setIsBusyShow(false);
    }
  }, [myState.siteid,curdate,regtype,formtyp,pagination.page, pagination.perPage]);

  useEffect(() => {
   if (formtyp)
    fetchInventory();
  }, [fetchInventory,change,formtyp]);
  useEffect(() => {
    setFromtyp(formtype);
    
  }, [formtype]);
 
  useEffect (()=>{
    updateProperty("isSitedisable", false)
 },[])

 
 

 

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/inward-outward/${id}`);
      setChange(!change);
      toast.success("Data deleted",{ closeOnClick: true,
        transition: Bounce,
        position: "bottom-right",
        zIndex: 1000,});
    } catch (err) {
      
      const errorMessage =
        err.response.status === 301 
          ? "Data cannot be deleted"
          : "Something went wrong. Please try again later.";
      setError(errorMessage);
      toast.error(errorMessage,{closeOnClick: true,
        transition: Bounce,
        position: "bottom-right",
        zIndex: 1000,});
    }
  };

  const handleEdit = async (id) => {
    try {
      setIsBusyShow(true);
      const response = await axios.get(`/inward-outward/${id}/`);
      setDataEdit(response.data);
      //console.log(response.data)
      openModalForm("edit");
    } catch (err) {
      const errorMessage =
        err.response.status === 401
          ? err.response.data.message
          : "Something went wrong. Please try again later.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsBusyShow(false);
    }
  };

  const openModal = (id) => {
    setDelId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    handleDelete(delId);
    setModalOpen(false);
  };

  const closeModal = () => setModalOpen(false);

  const openModalForm = (formType,entrytype) => {
    setType(formType);
    setEntrytype(entrytype)
    setIsShow(true);
  };

  const closeModalForm = () => {
    setDataEdit([]);
    setIsShow(false);
    setType("");
  };

  const onUpdate = () => {
    setChange(!change);
    closeModalForm();
  };

  const handleDateChange = (event) => {
   // const newSelectedValue = event.target.value;
    setcurDate(event.target.value);
   //console.log('ddate',event.target.value)
    };

    const handleRegtypeChange = (event) => {
      //const newSelectedValue = event.target.value;
        setRegtype(event.target.value);
      setPagination(prev => ({ ...prev, page: 1 }));

   //console.log('reg',event.target.value)
     
      }; 

    const getStatusStyles = (status) => {
      switch (status) {
        case 'in':
          return { backgroundColor: '#bfedce', color: 'black', margin:'0',padding:'2px 5px',  };
        case 'out':
          return { backgroundColor: '#f4668f', color: 'white',margin:'0',padding:'2px 5px',  };
       
        default:
          return {};
      }
    };
  

    const handlePageChange = (newPage) => {
      setPagination(prev => ({ ...prev, page: newPage }));
    };
  
    const handlePerPageChange = (perPage) => {
      setPagination(prev => ({ ...prev,perPage: perPage, page: 1 }));
    };

 
  return (
    <div>
      <BusyForm isShow={isBusyShow} />
     
      
      
      <div id="grouptable" style={{overflowY:'auto',height: 'calc(100vh - 110px)'}}>
        <ErpDataGrid
        title= {<TitalBar
            isVisible={formtyp=='inoutward'? "DateSelector":"RegisterSelector"}
            initialvalue={formtyp=='inoutward'? curdate:regtype}
            addvisible={(formtyp=='inoutward' && checkPermissions("add_inwardoutward"))? true:false}
            minusvisible={(formtyp=='inoutward' && checkPermissions("add_inwardoutward"))? true:false}
            onMinus={() => openModalForm("add",'out')}
            onAdd={() => openModalForm("add",'in')}
            onRefresh={() => fetchInventory()}
            onddchange={ (e)=> formtyp==='inoutward'?handleDateChange(e):handleRegtypeChange(e)}
            title={formtyp=='inoutward'? "Inward-Outward :":"Register Type :"}
            buttonString={["refresh", "pdf", "whatsapp"]}
            subtitle={`Total In ward= ${totalInqty || 0}, Total Outward= ${totalOutqty || 0} `}
          />}
        columns={columns}
        data={data}
       
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePerPageChange}
        totalRows={pagination.total}
        currentPage={pagination.page}
        perPage={pagination.perPage}
        
        />
     </div>
      <DeleteConform
        content={"inward-outward"}
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmDelete}
      />
      <InwardOutwarModalForm
        isShow={isShow}
        onHide={closeModalForm}
        onUpdate={onUpdate}
        type={type}
        entrytype={entrytype}
        data={dataEdit}
      />
    </div>
  );
}




export default InwardOutward
