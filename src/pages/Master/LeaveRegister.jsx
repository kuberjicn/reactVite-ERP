import LeaveRow from "../../component/LeaveRow";
import BusyForm from "../../component/BusyForm";
import React, { useCallback, useEffect, useState } from "react";
import axios from "../../AxiosConfig";
import LeaveDisplay from "../../component/LeaveDisplay";
import TitalBar from "../../component/TitalBar";
import LeaveApplicationByEmployee from "./LeaveApplicationByEmployee";

import { BiChevronsLeft,BiChevronsRight  } from "react-icons/bi";

function LeaveRegister() {
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
  
  
  const fetchemployee = useCallback(async (yr) => {
    setIsBusyShow(true);

    await axios
      .get(`/leave-register/?year=${yr}&page=${currentPage}&page_size=${pageSize}`)


      .then((response) => {
        setData(response.data);
        setdisplayComponent("all-leave");
        console.log(response.data);
        setTotalPages(Math.ceil(response.data.count / pageSize));
      })
      .catch(() => {
        setIsBusyShow(false);
        setError("Something went wrong. Please try again later.");
      });
    setIsBusyShow(false);
  }, []);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    if (selectedYear=='' || selectedYear==null){
      setSelectedyear(currentYear)
    }
    fetchemployee(currentYear);
  }, [selectedYear]);

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
    console.log(newSelectedValue);
    setSelectedyear(newSelectedValue);
    if (displayComponent=="all-leave"){
      console.log(newSelectedValue);
      fetchemployee(newSelectedValue)
    }
    if (displayComponent=="leave"){
      get_leave()
    }
    if (displayComponent=="leaveapp"){
      get_leaveapp()
    }
  };

  const handleRefresh = (e) => {
    setSelectedyear(e.target.value);
    
  };
  return (
    <div>
      <BusyForm isShow={isBusyShow} />
      {displayComponent === "all-leave" &&
      <>
      <TitalBar
            addvisible={false}
            isVisible='YearSelector'
            title="Employee LIst of Year :"
            onChangeCombo={(e) => handleDropdownChange(e)}
            initialvalue={selectedYear}
            onRefresh={()=>fetchemployee(selectedYear)}
            buttonString={['refresh','pdf',]}
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
        <div style={{display:'flex', justifyContent:'flex-end',marginTop:'5px', marginRight:'15px'}}>
        <button
            className="mbtn mbtn-edit"
            style={{ padding: "5px 15px", marginLeft: "5px" }}
            
          >
            {" "}
            <BiChevronsLeft size={18} />
          </button>
        
        <button
            className="mbtn mbtn-edit"
            style={{ padding: "5px 15px", marginLeft: "5px" }}
            
          >
            {" "}
            <BiChevronsRight size={18} />
          </button>
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
