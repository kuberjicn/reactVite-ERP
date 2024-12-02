import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "../Common.css";
import CompanyChange from "../../component/CompanyChange";
import BusyForm from "../../component/BusyForm";
import axios from "../../AxiosConfig";
import { Bounce, toast } from "react-toastify";

import ModalLayout from "../../pages/ModalLauout";

function SiteModalForm({ isShow, onHide, type, data, onUpdate }) {
  // console.log( data)
  const [isBusyShow, setIsBusyShow] = useState(false);
  const [sitename, setSitename] = useState("");
  const [add1, setadd1] = useState("");
  const [contactperson, setcontactperson] = useState("");
  const [add2, setadd2] = useState("");
  const [city, setcity] = useState("surat");
  const [state, setstate] = useState("gujarat");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setcompany] = useState();
  const [isactive, setisactive] = useState(false);
  const [comp_id, setcomp_id] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    if (type === "edit") {
      const compIdValue = data.compid.comp_id;
      setcomp_id(compIdValue);
      setcompany(data.compid);
      setisactive(data.Isactive);
      setSitename(data.sitename);
      setadd1(data.add1);
      setadd2(data.add2);
      setcity(data.city);
      setstate(data.state);
      setEmail(data.email);
      setPhone(data.phone);
      setcontactperson(data.contactperson);
    } else {
      //setcompany(company[0]);
      setisactive(true);
      setSitename("");
      setadd1("");
      setadd2("");
      setcity("");
      setstate("");
      setEmail("");
      setPhone("");
      setcontactperson("");
    }
  }, [data, type]);

  const getCompany = async (id) => {
    setIsBusyShow(true);
    axios
      .get("/company/" + id + "/")
      .then((response) => {
        // console.log('get comp',response.data);
        setcompany(response.data);
        setcomp_id(response.data.comp_id);
        setIsBusyShow(false);
      })
      .catch((err) => {
        setIsBusyShow(false);
        setError("Something went wrong. Please try again later.");
      });
  };
  const handleFocus = (e) => {
    e.target.select(); // Select all text in the input field
  };

  useEffect(() => {
    //console.log(comp_id);
    if (comp_id) {
      getCompany(comp_id);
    }
  }, []);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function checkEmail(val) {
    if (emailRegex.test(val)) {
      return true;
    }
  }

  const isValidData = () => {
    if (company && sitename && city && state && email && phone !== null) {
      return true;
    } else {
      toast.warning("Please fill out all required fields", {
        closeOnClick: true,
        transition: Bounce,
        position: "bottom-right",
      });
      return false;
    }
  };

  

  const Save = async (type, e) => {
    e.preventDefault();
    if (!isValidData()) return;
    
    let postData = {
      sitename: sitename,
      add1: add1,
      add2: add2,
      city: city,
      state: state,
      email: email,
      phone: phone,
      contactperson: contactperson,
      Isactive: isactive,
      compid: company,
    };

    
    if (type === "add") {
      await axios
        .post("/site/", postData)
        .then((response) => {
          postData = [];
          //onUpdate();
          toast.success("data Added sucessfully", {
            closeOnClick: true,
            transition: Bounce,
            position: "bottom-right",
          });
        })
        .catch((err) => {
          toast.error("Error adding data: " + err.message, {
            closeOnClick: true,
            transition: Bounce,
            position: "bottom-right",
          });
        });
    }

    if (type === "edit") {
      //console.log(postData)

      await axios
        .put("/site/" + data.site_id + "/", postData)
        .then((response) => {
          // onUpdate();
          if (response.data.data)
            toast.success(response.data.data, {
              closeOnClick: true,
              transition: Bounce,
              position: "bottom-right",
            });
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
    }
    onUpdate();
  };

  const handleCompanyChange = (e, selectedCompany) => {
    if (e && e.target) {
      setcomp_id(e.target.value);
      //console.log(selectedCompany)

      let dd = selectedCompany;
      setcompany(dd);
      // console.log(company)
    }
  };

  if (!isShow) return null;

  return (
    <div>
      <BusyForm isShow={isBusyShow} />

      <ModalLayout
        isShow={isShow}
        onClose={onHide}
        content={
          <form style={{ padding: "5px 20px 10px 20px" }}>
            <CompanyChange
              initialvalue={comp_id}
              CompanyChange={handleCompanyChange}
              isaddVisible={false}
            />
            <label className="form-label" htmlFor="sitename">
              Site Name<span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="form-input"
              type="text"
              id="sitename"
              value={sitename.toUpperCase()}
              onFocus={handleFocus}
              placeholder="Site Name"
              autoComplete="off"
              onChange={(e) => setSitename(e.target.value)}
            />
            <label className="form-label" htmlFor="add1">
              Street
            </label>
            <input
              className="form-input"
              type="text"
              id="add1"
              value={add1}
              placeholder="street"
              autoComplete="off"
              onFocus={handleFocus}
              onChange={(e) => setadd1(e.target.value)}
            />
            <label className="form-label" htmlFor="add2">
              Location
            </label>
            <input
              className="form-input"
              type="text"
              id="add2"
              value={add2}
              placeholder="location"
              onFocus={handleFocus}
              autoComplete="off"
              onChange={(e) => setadd2(e.target.value)}
            />
            <label className="form-label" htmlFor="city">
              City<span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="form-input"
              type="text"
              id="city"
              value={city.toUpperCase()}
              onFocus={handleFocus}
              placeholder="city"
              autoComplete="off"
              onChange={(e) => setcity(e.target.value)}
            />
            <label className="form-label" htmlFor="state">
              State<span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="form-input"
              type="text"
              id="state"
              value={state.toUpperCase()}
              onFocus={handleFocus}
              placeholder="state"
              autoComplete="off"
              onChange={(e) => setstate(e.target.value)}
            />
            <label className="form-label" htmlFor="email">
              email<span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="form-input"
              type="text"
              id="email"
              value={email}
              placeholder="email"
              onFocus={handleFocus}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="form-label" htmlFor="phone">
              Phone<span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="form-input"
              type="text"
              id="phone"
              value={phone}
              placeholder="phone"
              onFocus={handleFocus}
              autoComplete="off"
              onChange={(e) => setPhone(e.target.value)}
            />
            <label className="form-label" htmlFor="contactperson">
              Contact Person<span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="form-input"
              type="text"
              id="contactperson"
              placeholder="Contact Person"
              onFocus={handleFocus}
              autoComplete="off"
              value={contactperson.toUpperCase()}
              onChange={(e) => setcontactperson(e.target.value)}
            />
            <input
              type="checkbox"
              name="active"
              checked={isactive}
              onChange={(e) => setisactive(!isactive)}
            />
            <label
              className="form-label"
              style={{ marginLeft: "15px" }}
              htmlFor="active"
            >
              Is Active
            </label>
          </form>
        }
        footerContent={
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              className="mbtn mbtn-edit"
              type="submit"
              onClick={(e) => Save(type, e)}
            >
              {type === "add" ? "Save" : "Update"}
            </button>
            {/* <button style={{ marginLeft: '10px' }} className='mbtn mbtn-close' onClick={()=>{setcomp_id(0);  onHide()}}>Close</button> */}
          </div>
        }
        type={type}
        title={"Site"}
      />
    </div>
  );
}

export default SiteModalForm;
