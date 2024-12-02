import React, { useState, useEffect } from "react";
import "./Sidenav.css";
import { Link } from "react-router-dom";
import SiteChange from "./SiteChange";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { MdStore } from "react-icons/md";

import { TbSettings, TbBook } from "react-icons/tb";
import { MdOutlineCoPresent } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { checkPermissions } from "../pages/Common";


function Sidenav({isSiteDisable=false}) {
  const [store, setStore] = useState(false);
  const [labour, setLabour] = useState(false);
  const [attandance, setAttandance] = useState(false);
  const [techanical, setTechanical] = useState(false);
  const [master, setMaster] = useState(false);
  const [setting, setSetting] = useState(false);
  


  const handleSiteChange = (selectedValue) => {
   
    setcompid(selectedValue);
  };
 
  return (
    <div>
      <div style={{  marginbottom: "5px" }}>
        <SiteChange isaddVisible={false} />
      </div>

      <ul className="sm">
       
      {(checkPermissions("view_inventory") ||
        checkPermissions("view_inwardoutward") )? (
          <>
            <li
              onClick={() => {
                setStore(!store);
                setLabour(false);
                setAttandance(false);
                setTechanical(false);
                setMaster(false);
                setSetting(false);
              }}
            >
              
              <Link>
                <span style={{ marginRight: "12px" }}>
                  <MdStore size="21" />
                </span>
                Store
                {store ? (
                  <span style={{ float: "right", fontWeight: "bold" }}>
                    <FaMinus />
                  </span>
                ) : (
                  <span style={{ float: "right", fontWeight: "bold" }}>
                    <FaPlus />
                  </span>
                )}
              </Link>
             
            </li>
            <div className={`menu-button ${store ? "active" : ""}`}>
              {store ? (
                <ul>
                  {checkPermissions("view_inventory") && (
                    <li className="sub-menu">
                      <Link to={"./inventory"}>Material Entry</Link>
                    </li>
                  )}
                  {checkPermissions("view_inwardoutward") && (
                    <li className="sub-menu">
                      {" "}
                      <Link to={"./inward-outward"}>Inward-Outward</Link>
                    </li>
                  )}
                  {checkPermissions("view_inwardoutward") && (
                    <li className="sub-menu">
                      {" "}
                      <Link to={"./register"}>Registers</Link>
                    </li>
                  )}
                  {checkPermissions("view_inventory") && (
                    <li className="sub-menu">
                      {" "}
                      <Link to={"./store-report"}>Report</Link>
                    </li>
                  )}
                </ul>
              ) : null}
            </div>
            </>
          ):''}

           {checkPermissions("view_labourdata")  ? ( 
            <>
        <li
          onClick={() => {
            setStore(false);
            setLabour(!labour);
            setAttandance(false);
            setTechanical(false);
            setMaster(false);
            setSetting(false);
          }}
        >
          <Link>
            <span style={{ marginRight: "12px" }}>
              <GrUserWorker size="21" />
            </span>
            Labour
            {labour ? (
              <span style={{ float: "right", fontWeight: "bold" }}>
                <FaMinus />
              </span>
            ) : (
              <span style={{ float: "right", fontWeight: "bold" }}>
                <FaPlus />
              </span>
            )}
          </Link>
        </li>
        <div className={`menu-button ${labour ? "active" : ""}`}>
          {labour ? (
            <ul>
              <li className="sub-menu">
                {" "}
                <Link to={"./labour"}>Labour Entry</Link>
              </li>
              <li className="sub-menu">
                {" "}
                <Link to={"./labour-report"}>Report</Link>
              </li>
            </ul>
          ) : null}
        </div>
        </>):''}
        
        {(checkPermissions("view_attandance") || checkPermissions("view_leaveapplication"))  ? ( 
        <>
        <li
          onClick={() => {
            setStore(false);
            setLabour(false);
            setAttandance(!attandance);
            setTechanical(false);
            setMaster(false);
            setSetting(false);
          }}
        >
          <Link>
            <span style={{ marginRight: "12px" }}>
              <MdOutlineCoPresent size="21"  />
            </span>
            Attandance
            {attandance ? (
              <span style={{ float: "right", fontWeight: "bold" }}>
                <FaMinus />
              </span>
            ) : (
              <span style={{ float: "right", fontWeight: "bold" }}>
                <FaPlus />
              </span>
            )}
          </Link>
        </li>
        <div className={`menu-button ${attandance ? "active" : ""}`}>
          {attandance ? (
            <ul>
              {checkPermissions("view_attandance") && (
              <li className="sub-menu">
                {" "}
                <Link to={"./attandance"}>Attandance Entry</Link>
              </li>)}
              {checkPermissions("view_leaveapplication") && (

              <li className="sub-menu">
                {" "}
                <Link to={"./leave-application"}>Leave application</Link>
              </li>)}
              {checkPermissions("view_attandance") && (
              <li className="sub-menu">
                {" "}
                <Link to={"./payroll"}>Pay Roll</Link>
              </li>)}
              {checkPermissions("change_attandance") && (
              <li className="sub-menu">
                {" "}
                <Link to={"./about"}>Editing Attandance</Link>
              </li>)}
            </ul>
          ) : null}
        </div>
        </>
        ):''}

{(checkPermissions("view_samplelist") || checkPermissions("view_aacblocklist"))  && ( 
  <>
          <li
            onClick={() => {
            setStore(false);
            setLabour(false);
            setAttandance(false);
            setTechanical(!techanical);
            setMaster(false);
            setSetting(false);
          }}
        >
          <Link>
            <span style={{ marginRight: "12px" }}>
              <MdOutlineCoPresent size="21" />
            </span>
            Techanical
            {techanical ? (
              <span style={{ float: "right", fontWeight: "bold" }}>
                <FaMinus />
              </span>
            ) : (
              <span style={{ float: "right", fontWeight: "bold" }}>
                <FaPlus />
              </span>
            )}
          </Link>
        </li>
        <div className={`menu-button ${techanical ? "active" : ""}`}>
          {techanical ? (
            <ul>
              {checkPermissions("view_samplelist") && (
              <li className="sub-menu">
                {" "}
                <Link to={"./cube-register"}>Cube Testing Register</Link>
              </li>)}
              {checkPermissions("view_aacblocklist") && (
              <li className="sub-menu">
                {" "}
                <Link to={"./aacblock-register"}>AAC Block Testing Register</Link>
              </li>)}
              {checkPermissions("view_abstaract") && (
              <li className="sub-menu">
              
                {" "}
                <Link to={"./under-construction"}>Estimated Quantities.</Link>
              </li>)}
              {checkPermissions("view_siteprofile") && (

              <li className="sub-menu">
                {" "}
                <Link to={"./site-inforamtion"}>Site Information</Link>
              </li>)}
            </ul>
          ) : null}
        </div>
        </>
)}

{(checkPermissions("view_supplier") || checkPermissions("view_site") || checkPermissions("view_company") || checkPermissions("view_activity") || checkPermissions("view_register") || checkPermissions("view_material") || checkPermissions("view_salaryregister")) && ( 
<>
        <li
          onClick={() => {
            setStore(false);
            setLabour(false);
            setAttandance(false);
            setTechanical(false);
            setMaster(!master);
            setSetting(false);
          }}
        >
          <Link>
            <span style={{ marginRight: "12px" }}>
              <TbBook size="21" />
            </span>
            Master
            {master ? (
              <span style={{ float: "right", fontWeight: "bold" }}>
                <FaMinus />
              </span>
            ) : (
              <span style={{ float: "right", fontWeight: "bold" }}>
                <FaPlus />
              </span>
            )}
          </Link>
        </li>
        <div className={`menu-button ${master ? "active" : ""}`}>
          {master ? (
            <ul>
              {checkPermissions("view_supplier") && (

              <li className="sub-menu">
                <Link to={"./entity"}>Entity</Link>
              </li>)}
              {checkPermissions("view_material") && (

              <li className="sub-menu">
                {" "}
                <Link to={"./material"}>Material</Link>
              </li>)}
              {checkPermissions("view_activity") && (

              <li className="sub-menu">
                {" "}
                <Link to={"./activity"}>Activity</Link>
              </li>)}
              {checkPermissions("view_company") && (

              <li className="sub-menu">
                {" "}
                <Link to={"./company"}>Company</Link>
              </li>)}
              {checkPermissions("view_sites") && (

              <li className="sub-menu">
                {" "}
                <Link to={"./site/"}>Site</Link>
              </li>)}
              {checkPermissions("view_salaryregister") && (

              <li className="sub-menu">
                {" "}
                <Link to={"./salary-register"}>Salary Register</Link>
              </li>)}
              {checkPermissions("view_leaveregister") && (

              <li className="sub-menu">
                {" "}
                <Link to={"./leave-register"}>Leave Register</Link>
              </li>)}
              
            </ul>
          ) : null}
        </div>
        </>
)}

{(checkPermissions("view_declareholidays") || checkPermissions("view_declareleaves") || checkPermissions("view_setting"))  && ( 
<>
        <li
          onClick={() => {
            setStore(false);
            setLabour(false);
            setAttandance(false);
            setTechanical(false);
            setMaster(false);
            setSetting(!setting);
          }}
        >
          <Link>
            <span style={{ marginRight: "12px" }}>
              <TbSettings size="21" />
            </span>
            Setting
            {setting ? (
              <span style={{ float: "right", fontWeight: "bold" }}>
                <FaMinus />
              </span>
            ) : (
              <span style={{ float: "right", fontWeight: "bold" }}>
                <FaPlus />
              </span>
            )}
          </Link>
        </li>
        <div className={`menu-button ${setting ? "active" : ""}`}>
          {setting ? (
            <ul>
              {(checkPermissions("view_declareleaves") || checkPermissions("view_declareholidays")) && (

              <li className="sub-menu">
                <Link to={"./holyday-leave"}>Leave & Holidays</Link>
              </li>
              )}
              {checkPermissions("view_setting") && (

              <li className="sub-menu">
                {" "}
                <Link to={"./default-setting"}>Default Settings</Link>
              </li>
              )}
            </ul>
          ) : null}
        </div>
        </>)}
      </ul>
    </div>
  );
}

export default Sidenav;
