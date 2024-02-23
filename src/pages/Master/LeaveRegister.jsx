import LeaveRow from "../../component/LeaveRow";
import BusyForm from "../../component/BusyForm";
import React, { useCallback, useEffect, useState } from "react";
import axios from "../../AxiosConfig";
import LeaveDisplay from "../../component/LeaveDisplay";
import TitalBar from "../../component/TitalBar";
import LeaveApplication from "./LeaveApplication";

function LeaveRegister() {
  const [data, setData] = useState([]);
  const [leave, setLeave] = useState([]);
  const [leaveapp, setLeaveApp] = useState([]);
  const [error, setError] = useState("");
  const [isBusyShow, setIsBusyShow] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [displayComponent, setdisplayComponent] = useState("all-leave");

  const fetchemployee = useCallback(async () => {
    setIsBusyShow(true);

    await axios
      .get("/leave-register/")

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
    fetchemployee();
  }, []);

  const get_leave = async (id) => {
    setIsBusyShow(true);

    await axios
      .get("/leave-register/" + id + "/get_leavebyid")

      .then((response) => {
        setLeave(response.data);
        setdisplayComponent("leave");
        console.log(leave.length);
        console.log(response.data);
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
      .get("/leave-register/" + id + "/get_leaveapplicationbyid")

      .then((response) => {
        setLeaveApp(response.data);
        setdisplayComponent("leaveapp");
        console.log(response.data);
        setTotalPages(Math.ceil(response.data.count / pageSize));
      })
      .catch(() => {
        setIsBusyShow(false);
        setError("Something went wrong. Please try again later.");
      });
    setIsBusyShow(false);
  };

  return (
    <div>
      <BusyForm isShow={isBusyShow} />

      {displayComponent === "all-leave" &&
        data &&
        data.map((emp) => (
          <LeaveRow
            key={emp.id}
            data={emp}
            getdetail={get_leave}
            getapp={get_leaveapp}
          />
        ))}

      {displayComponent === "leave" && (
        <>
          <LeaveDisplay data={leave} fetchdata={get_leave} />
          <button
            className="mbtn mbtn-edit"
            style={{ padding: "5px 50px", marginLeft: "5px" }}
            onClick={fetchemployee}
          >
            {" "}
            Back{" "}
          </button>
        </>
      )}
      {displayComponent === "leaveapp" && (
        <>
          <LeaveApplication leavedata={leaveapp} fetchdata={get_leaveapp} />
          <button
            className="mbtn mbtn-edit"
            style={{ padding: "5px 50px", marginLeft: "5px" }}
            onClick={fetchemployee}
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
