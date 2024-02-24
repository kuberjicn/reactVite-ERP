import React from "react";
import "./component.css";
function LeaveRow({ data, getdetail, getapp }) {
  return (
    <div
      className="d-flex justify-content-between"
      style={{
        background: "#f5f5f5",
        minHeight: "30px",
        borderBottom: "1px solid #dadada",
        marginBottom: "1px",
      }}
    >
      <div
        style={{
          width: "20%",
          padding: "5px ",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          
          color:'#333'
        }}
      >
        <div
          style={{
            margin: "0",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {data.name} <span>[{data.id}]</span>
        </div>
        <div>Year : {data.year}</div>
      </div>
      <div style={{ width: "70%", padding: "0px" }}>
        <table className="text-center  ">
          <thead >
            <tr>
              <th>Leave Type</th>
              <th>Opening Balance</th>
              <th>Consume</th>
              <th>Closing Balance</th>
            </tr>
          </thead>
          <tbody>
            {data.leave.map((lv) => (
              <tr key={lv.leavetype}>
                <td>{lv.leavetype}</td>
                <td>{lv.opbal}</td>
                <td>{lv.consumed}</td>
                <td>{lv.opbal + lv.consumed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        style={{
          width: "10%",
          padding: "5px 15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          justifyItems: "center",
          
        }}
      >
        <button
          title='get ledger of leave'
          className="mbtn mbtn-view" style={{marginBottom:'5px'}}
          id={`view-${data.id}`}
          onClick={() => getdetail(data.id)}
        >
          Detail
        </button>
        <button
          title='get application'
          className="mbtn mbtn-view"  
          id={`app-${data.id}`}
          onClick={() => getapp(data.id)}
        >
          Applications
        </button>
      </div>
    </div>
  );
}

export default LeaveRow;
