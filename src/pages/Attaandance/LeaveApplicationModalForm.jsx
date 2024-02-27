import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CgClose } from "react-icons/cg";
import { getCurrentDate, addDaysToDate } from "../Common";
import SupplierCombo from "../../component/SupplierCombo";
import LeaveTypeSelector from "../../component/LeaveTypeSelector";
import DayPartSelector from "../../component/DayPartSelector";
import axios from "../../AxiosConfig";
import { Bounce, toast } from "react-toastify";

function LeaveApplicationModalForm({
  data = [],
  onClose,
  onCloseWithAction,
}) {
  const [supObj, setSupObj] = useState([]);
  const [supid, setSupid] = useState(0);
  const [appDate, setAppDate] = useState("");
  const [leaveType, setLeaveType] = useState("casual");
  const [stDate, setStDate] = useState("");
  const [days, setDays] = useState(1);
  const [dayPart, setDayPart] = useState("sh");
  const [reason, setreason] = useState("");
  const [contact, setcontact] = useState("");
  const [formType, setFormType] = useState("add");
  const [dayType, setDayType] = useState("fd");
  const [appid, setAppid] = useState(0);

  useEffect(() => {
    if (data.length !== 0) {
     // console.log(data);
      setFormType("edit");
      setAppid(data.app_id);
      setSupObj(data.supid);
      setSupid(data.supid.sup_id);
      setAppDate(data.app_date);
      setLeaveType(data.lvs_type);
      setStDate(data.from_date);
      setDays(data.nosDays);
      setreason(data.reason);
      setcontact(data.contact);
      setDayPart(data.section);
      if (data.section == "both") setDayType("fd");
      else {
        setDayType("hd");
      }
    } else {
      setFormType("add");
      let date = getCurrentDate();
      let sdate = addDaysToDate(date, 1);
      //console.log('add');
      setAppDate(date);
      setStDate(sdate);
    }
  }, []);

  
  
  function checkPostData(data) {
    let isPassed = true;

    if (data.nosDays <= 0 || data.nosDays == null) {
      isPassed = false;
    }
    if (
      data.app_date == "" ||
      data.app_date == null ||
      data.app_date == undefined
    ) {
      isPassed = false;
    }
    if (
      data.supid_id == 0 ||
      data.supid_id == null ||
      data.supid_id == undefined
    ) {
      isPassed = false;
    }
    if (
      data.lvs_type == "" ||
      data.lvs_type == null ||
      data.lvs_type == undefined
    ) {
      isPassed = false;
    }
    if (
      data.from_date == "" ||
      data.from_date == null ||
      data.from_date == undefined
    ) {
      isPassed = false;
    }
    if (data.reason == "" || data.reason == null) {
      isPassed = false;
    }
    if (data.contact == "" || data.contact == null) {
      isPassed = false;
    }
    return isPassed;
  }

  const handleEmployeeChange = (e, selectedItem) => {
    if (e && e.target) {
      setSupid(e.target.value);
      setSupObj(selectedItem);
     // console.log(dayPart);
    }
  };

  const handleLeaveChange = (e) => {
    if (e && e.target) {
      setLeaveType(e.target.value);
      //console.log(dayPart);
    }
  };

  const handleDayPartChange = (e) => {
    if (e && e.target) {
      setDayPart(e.target.value);
     // console.log(leaveType);
    }
  };

  const save = async (e) => {
    e.preventDefault();
    let postData = {
      supid: supObj,
      supid_id: supid,
      app_date: appDate,
      from_date: stDate,
      nosDays: days,
      reason: reason,
      contact: contact,
      isapproved: false,
      lvs_type: leaveType,
      section: dayPart,
    };
    if (formType == "add") {
     // console.log(postData);
      if (checkPostData(postData)) {
        await axios
          .post("/leave-application/", postData)
          .then((response) => {
            

            //onUpdate();
            toast.success("data Added sucessfully", {
              closeOnClick: true,
              transition: Bounce,
              position: "bottom-right",
            });
            
            onCloseWithAction(e)
          })
          .catch((err) => {
            toast.error("Error adding data: " + err.message, {
              closeOnClick: true,
              transition: Bounce,
              position: "bottom-right",
            });
          });
      } else {
        toast.warning("please fill all red marked fields", {
          closeOnClick: true,
          transition: Bounce,
          position: "bottom-right",
        });
      }
    } else {
      //console.log("edit");
      if (checkPostData(postData)) {
        await axios
          .put("/leave-application/" + appid + "/", postData)
          .then((response) => {
            if (response.data){
              
              toast.success("data updated sucessfully", {
                closeOnClick: true,
                transition: Bounce,
                position: "bottom-right",
              })
              
              onCloseWithAction(e);
            }
            else
              toast.error(response.data.error, {
                closeOnClick: true,
                transition: Bounce,
                position: "bottom-right",
              });
          })
          .catch((err) => {
            toast.error("Error editing data: " + err.message, {
              closeOnClick: true,
              transition: Bounce,
              position: "bottom-right",
            });
          });
      } else {
        toast.warning("please fill all red marked fields", {
          closeOnClick: true,
          transition: Bounce,
        });
      }
    }
  };

  const handleDayChange = (e) => {
    setDayType(e.target.value);
  };
  return ReactDOM.createPortal(
    <>
      <div className="modal">
        <div className="modal-content">
          <div className="form-header">
            <h3
              style={{
                marginBottom: "0",
                textTransform: "capitalize",
                fontSize: "1.3rem",
                lineHeight: "1.5",
              }}
            >
              {data.length == 0 ? "New Application " : "Update Application "}{" "}
            </h3>
            <button className="control-btn btn-edit" onClick={onClose}>
              <CgClose size={29} />
            </button>
          </div>
          <form style={{ padding: "5px 20px 10px 20px" }}>
            <div style={{ padding: "0 0 15px 0" }}>
              <div>
                <label className="form-label me-2 mb-2" htmlFor="daypart">
                  Leave Application For :{" "}
                </label>
                <label style={{ marginRight: "25px" }}>
                  {" "}
                  <input
                    type="radio"
                    name="daypart"
                    value={dayType}
                    checked={dayType === "fd"}
                    onChange={handleDayChange}
                  />{" "}
                  Full Day
                </label>
                <label>
                  {" "}
                  <input
                    type="radio"
                    name="daypart"
                    value={dayType}
                    checked={dayType === "hd"}
                    onChange={handleDayChange}
                  />{" "}
                  Half Day
                </label>
              </div>
              <SupplierCombo
                initialvalue={data.length == 0 ? 0 : supid}
                type={"employee"}
                handleEmployeeChange={handleEmployeeChange}
              />

              <label className="form-label" htmlFor="appdate">
                Application Date <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="form-input"
                type="date"
                id="appdate"
                value={appDate}
                readOnly={true}
                placeholder="date"
                autoComplete="off"
                onChange={(e) => setAppDate(e.target.value)}
              />
              <LeaveTypeSelector
                initialvalue={leaveType}
                onddchange={handleLeaveChange}
              />
              <label className="form-label" htmlFor="stdate">
                Start Date<span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="form-input"
                type="date"
                id="stdate"
                value={stDate}
                min={appDate}
                placeholder="date"
                autoComplete="off"
                onChange={(e) => setStDate(e.target.value)}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <label className="form-label" htmlFor="day">
                    Days<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    className="form-input"
                    type="number"
                    step={dayType == "hd" ? 0.5 : 1}
                    id="day"
                    placeholder=" days"
                    min={dayType == "hd" ? 0.5 : 1}
                    max={dayType == "hd" ? 0.5 : 10}
                    autoComplete="off"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                  />
                </div>
                <div>
                  {dayType == "hd" && (
                    <DayPartSelector
                      initialvalue={dayPart}
                      onddchange={handleDayPartChange}
                    />
                  )}
                </div>
              </div>
              <label className="form-label" htmlFor="reason">
                Reson For Leave<span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="form-input"
                type="text"
                id="reason"
                value={reason}
                placeholder="reason"
                autoComplete="off"
                onChange={(e) => setreason(e.target.value)}
              />
              <label className="form-label" htmlFor="contact">
                Alternate contact While on Leave
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="form-input"
                type="text"
                id="contact"
                value={contact}
                placeholder="contact"
                autoComplete="off"
                onChange={(e) => setcontact(e.target.value)}
              />
            </div>
          </form>
          <div className="form-footer">
            <button
              className="mbtn mbtn-edit"
              type="submit"
              onClick={(e) => save(e)}
            >
              {data.length == 0 ? "Save" : "Update"}
            </button>
            <button
              style={{ marginLeft: "10px" }}
              className="mbtn mbtn-close"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal-root")
  );
}

export default LeaveApplicationModalForm;
