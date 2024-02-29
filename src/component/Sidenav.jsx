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

function Sidenav() {
  const [store, setStore] = useState(false);
  const [labour, setLabour] = useState(false);
  const [attandance, setAttandance] = useState(false);
  const [master, setMaster] = useState(false);
  const [setting, setSetting] = useState(false);

  const handleSiteChange = (selectedValue) => {
    // Do something with the selected value in the parent component
    console.log("Selected value in parent component:", selectedValue);
    setcompid(selectedValue);
  };

  return (
    <div>
      <div style={{ padding: "5px 15px", marginbottom: "5px" }}>
        <SiteChange />
      </div>

      <ul className="sm">
        {checkPermissions("view_inventory") ||
        checkPermissions("view_inwardoutward") ? (
          <>
            <li
              onClick={() => {
                setStore(!store);
                setLabour(false);
                setAttandance(false);
                setMaster(false);
                setSetting(false);
              }}
            >
              <Link>
                <span style={{ marginRight: "5px" }}>
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
                      <Link to={"./contact"}>Material Entry</Link>
                    </li>
                  )}
                  {checkPermissions("view_inwardoutward") && (
                    <li className="sub-menu">
                      {" "}
                      <Link to={"./about"}>Inward-Outward</Link>
                    </li>
                  )}
                  {checkPermissions("view_inventory") && (
                    <li className="sub-menu">
                      {" "}
                      <Link to={"./about"}>Report</Link>
                    </li>
                  )}
                </ul>
              ) : null}
            </div>
          </>
        ) : null}

        <li
          onClick={() => {
            setStore(false);
            setLabour(!labour);
            setAttandance(false);
            setMaster(false);
            setSetting(false);
          }}
        >
          <Link>
            <span style={{ marginRight: "5px" }}>
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
                <Link to={"./about"}>Labour Entry</Link>
              </li>
              <li className="sub-menu">
                {" "}
                <Link to={"./about"}>Report</Link>
              </li>
            </ul>
          ) : null}
        </div>
        <li
          onClick={() => {
            setStore(false);
            setLabour(false);
            setAttandance(!attandance);
            setMaster(false);
            setSetting(false);
          }}
        >
          <Link>
            <span style={{ marginRight: "5px" }}>
              <MdOutlineCoPresent size="21" />
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
              <li className="sub-menu">
                {" "}
                <Link to={"./attandance"}>Attandance Entry</Link>
              </li>
              <li className="sub-menu">
                {" "}
                <Link to={"./leave-application"}>Leave application</Link>
              </li>
              <li className="sub-menu">
                {" "}
                <Link to={"./payroll"}>Pay Roll</Link>
              </li>
            </ul>
          ) : null}
        </div>
        <li
          onClick={() => {
            setStore(false);
            setLabour(false);
            setAttandance(false);
            setMaster(!master);
            setSetting(false);
          }}
        >
          <Link>
            <span style={{ marginRight: "5px" }}>
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
              <li className="sub-menu">
                <Link to={"./entity"}>Entity</Link>
              </li>
              <li className="sub-menu">
                {" "}
                <Link to={"./about"}>Material</Link>
              </li>
              <li className="sub-menu">
                {" "}
                <Link to={"./about"}>Activity</Link>
              </li>
              <li className="sub-menu">
                {" "}
                <Link to={"./company"}>Company</Link>
              </li>
              <li className="sub-menu">
                {" "}
                <Link to={"./site/"}>Site</Link>
              </li>
              <li className="sub-menu">
                {" "}
                <Link to={"./salary-register"}>Salary Register</Link>
              </li>
              <li className="sub-menu">
                {" "}
                <Link to={"./leave-register"}>Leave Register</Link>
              </li>
            </ul>
          ) : null}
        </div>
        <li
          onClick={() => {
            setStore(false);
            setLabour(false);
            setAttandance(false);
            setMaster(false);
            setSetting(!setting);
          }}
        >
          <Link>
            <span style={{ marginRight: "5px" }}>
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
              <li className="sub-menu">
                <Link to={"./contact"}>Leave & Holidays</Link>
              </li>
              <li className="sub-menu">
                {" "}
                <Link to={"./about"}>Editing Attandance</Link>
              </li>
            </ul>
          ) : null}
        </div>
      </ul>
    </div>
  );
}

export default Sidenav;
