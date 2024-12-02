import LeaveRow from "../../component/LeaveRow";
import BusyForm from "../../component/BusyForm";
import React, { useCallback, useEffect, useState } from "react";
import axios from "../../AxiosConfig";
import LeaveDisplay from "../../component/LeaveDisplay";
import TitalBar from "../../component/TitalBar";
import LeaveApplicationByEmployee from "./LeaveApplicationByEmployee";
import CustomPagination from '../../component/CustomPaginationComponent';
import {checkPermissions} from '../Common'
import { useGlobleInfoContext } from "../../GlobleInfoProvider";
function LeaveRegister() {
  const { myState, updateProperty } = useGlobleInfoContext();
  const [data, setData] = useState([]);
  const [leave, setLeave] = useState([]);
  const [leaveapp, setLeaveApp] = useState([]);
  const [error, setError] = useState("");
  const [isBusyShow, setIsBusyShow] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [displayComponent, setdisplayComponent] = useState("all-leave");
  const [selectedYear,setSelectedyear]=useState('')
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 7,
    total_pages: 0,
    total_items:0,
  });
  
  const fetchemployee = useCallback(async () => {
    setIsBusyShow(true);
     /// console.log(pagination.total_pages)

    await axios
      .get(`/leave-register/?year=${selectedYear}&page=${pagination.page}&page_size=${pagination.perPage}`)


      .then((response) => {
        setData(response.data.data);
        //console.log(response);
        setdisplayComponent("all-leave");
        
        setPagination(prev => ({
          ...prev,
          page:response.data.current_page,
          total_items:response.data.total_items,
          total_pages: Math.ceil(response.data.total_items / pagination.perPage),
        }));
        //console.log(pagination.total_pages)
        // setTotalPages(Math.ceil(response.data.count / pageSize));
      })
      .catch(() => {
        setIsBusyShow(false);
        setError("Something went wrong. Please try again later.");
      });
    setIsBusyShow(false);
  }, [pagination.page, pagination.perPage]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    if (selectedYear=='' || selectedYear==null){
      setSelectedyear(currentYear)
    }
    fetchemployee(currentYear);
  }, [selectedYear, pagination.page, fetchemployee]);

  useEffect(() => {
    updateProperty("isSitedisable",true)
  }, []);
  const get_leave = async (id) => {
    setIsBusyShow(true);

    await axios
      .get("/leave-register/" + id + "/get_leavebyid?year="+selectedYear)

      .then((response) => {
        setLeave(response.data);
        setdisplayComponent("leave");
        //console.log(leave.length);
       // console.log(response.data);
        setTotalPages(Math.ceil(response.data.count / pageSize));
      })
      .catch(() => {
        setIsBusyShow(false);
        setError("Something went wrong. Please try again later.");
      });
    setIsBusyShow(false);
  };

  const get_leaveapp = async (id) => {
    setIsBusyShow(true);

    await axios
      .get("/leave-register/" + id + "/get_leaveapplicationbyid?year="+selectedYear)

      .then((response) => {
        setLeaveApp(response.data);
       // console.log(response.data.count)
        
        setdisplayComponent("leaveapp");
       // console.log(response.data);
        setTotalPages(Math.ceil(response.data.count / pageSize));
      })
      .catch(() => {
        setIsBusyShow(false);
        setError("Something went wrong. Please try again later.");
      });
    setIsBusyShow(false);
  };

  const handleDropdownChange = (event) => {
    
    const newSelectedValue = event.target.value;
   // console.log(newSelectedValue);
    setSelectedyear(newSelectedValue);
    setPagination((prev) => ({
      ...prev,
      page: 1, // Reset to first page when the year changes
    }));
    
  };

  const handleRefresh = (e) => {
    setSelectedyear(e.target.value);
    
  };

  const handlePageChange = (newPage) => {
   
    setPagination(prev => ({ ...prev, page: newPage }));
   // console.log(pagination)
   
  };

  const handleRowsPerPageChange = (newPerPage) => {
    setPagination((prev) => ({
      ...prev,
      perPage: Number(newPerPage),
      page: 1, // Reset to first page on rows per page change
    }));
    const currentYear = new Date().getFullYear();
    const yearToFetch = selectedYear || currentYear;
    // fetchemployee(yearToFetch);
  };

  return (
    <div>
      <BusyForm isShow={isBusyShow} />
      {displayComponent === "all-leave" &&
      <>
      <TitalBar
            addvisible={checkPermissions("add_leaveregister")}
            isVisible='YearSelector'
            title="Employee List By Year :"
            onChangeCombo={(e) => handleDropdownChange(e)}
            initialvalue={selectedYear}
            onRefresh={()=>fetchemployee(selectedYear)}
            buttonString={['refresh',checkPermissions("add_leaveregister") && 'pdf',]}
          />
     
       {data &&
        data.map((emp) => (
          <LeaveRow
            key={emp.id}
            data={emp}
            getdetail={get_leave}
            getapp={get_leaveapp}
          />
        ))}
        <div style={{display:'flex', justifyContent:'flex-end',marginTop:'5px',margin:'0 0', backgroundColor:'var(--light-header)'}}>
        
        <div className="pagination" >
          <label style={{lineHeight:'48px',color:'#333'}} htmlFor="rowsPerPage">Rows Per Page: </label>
          <select style={{margin:'8px 8px',border:'1px solid var(--light-header)',width:'75px',borderRadius:'5px'}}
            id="rowsPerPage"
            value={pagination.perPage}
            onChange={(e) => handleRowsPerPageChange(e.target.value)}
          >
            <option value="5">5</option>
            <option value="7">7</option>
            <option value="10">10</option>
            <option value="12">12</option>
          </select>
        </div>
          <CustomPagination
            page={ pagination.page}
            totalPages={pagination.total_pages}
            onPageChange={handlePageChange}
          />
          </div>
        </>
        }

      {displayComponent === "leave" && (
        <>
          <LeaveDisplay data={leave} fetchdata={get_leave} />
          <button
            className="mbtn mbtn-edit"
            style={{ padding: "5px 50px", marginLeft: "5px" }}
            onClick={()=>fetchemployee(selectedYear)}
          >
            {" "}
            Back{" "}
          </button>
        </>
      )}
      {displayComponent === "leaveapp" && (
        <>
          <LeaveApplicationByEmployee leavedata={leaveapp} fetchdata={get_leaveapp} />
          <button
            className="mbtn mbtn-edit"
            style={{ padding: "5px 50px", marginLeft: "5px" }}
            onClick={()=>fetchemployee(selectedYear)}
          >
            {" "}
            Back{" "}
          </button>
        </>
      )}
    </div>
  );
}

export default LeaveRegister;
