import React, { useState, useEffect } from "react";
import axios from "../AxiosConfig";

import "./component.css";

function NotInSalaryRegisterEmployee({
  initialvalue = 0,
  handleEmployeeChange,
}) {
  const [data, setData] = useState([]);
  const [sup_id, setSup_id] = useState(0);
  const [isDropdownLoading, setIsDropdownLoading] = useState(true);

 

  useEffect(() => {
    fetchsupplier("employee");
    
  }, []);

  const fetchsupplier = async () => {
    try {
      let response;

      response = await axios.get("/no-employee/");

      setData(response.data);
      setIsDropdownLoading(false);
      if (initialvalue && initialvalue !== 0) {
        setSup_id(initialvalue);
      }
    } catch (error) {
      console.error("Error fetching supplier data:", error);
    }
  };
  const handleChange = (e) => {
    const newValue = e.target.value;

    setSup_id(newValue);
    
    const selectedItem = data.find((item) => item.sup_id == newValue);
    handleEmployeeChange(e, selectedItem);
  };

  return (
    <div>
      <label htmlFor="supplier" className="form-label">
        Supplier Name:<span style={{ color: "red" }}>*</span>
      </label>
      <select
        id="supplier"
        name="supplier"
        className="site-dropdown combo-fontweight form-input"
        onChange={(e) => handleChange(e)}
        value={sup_id}
        disabled={isDropdownLoading}
      >
        <option
          style={{
            fontWeight: "500",
            color: "#000",
            textTransform: "capitalize",
            backgroundColor: "#dadada",
            fontSize: "1rem",
          }}
          value={0}
          disabled={true}
        >
          Select Employee
        </option>
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <option value={item.sup_id} key={item.sup_id}>
              {item.sup_name}{" "}
            </option>
          ))}
        ;
      </select>
    </div>
  );
}

export default NotInSalaryRegisterEmployee;
