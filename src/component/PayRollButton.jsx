import "../component/component.css";
import React from "react";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { formatDate } from "../pages/Common";

function PayRollButton({ data, onPyrollload }) {
  return (
    <>
      {data.map((item) => (
        <div
          className="payroll-list"
          style={{ display: "flex", justifyContent: "space-between" }}
          key={item.Pls_id}
        >
          <div
            className="mbtn mbtn-edit"
            style={{ cursor: "pointer" }}
            onClick={() => onPyrollload(item.Pls_id)}
          >
            {formatDate(item.st_date)} To {formatDate(item.ed_date)}
          </div>

          <div>
            <button
              className="mbtn mbtn-edit"
              title="refresh"
              onClick={() => alert(item.Pls_id)}
            >
              <RiDeleteBin6Line size={18} />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default PayRollButton;
