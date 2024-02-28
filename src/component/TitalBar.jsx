import React from "react";
import "./component.css";
import { FaPlus, FaRegFilePdf, FaFileExcel, FaPrint } from "react-icons/fa6";
import { TbRefresh } from "react-icons/tb";
import EntitySelector from "./EntitySelector";
import ResignSelector from "./ResignSelector";
import YearCombo from "./YearCombo";
import StatusSelector from "./StatusSelector";
import DateSelector from "./DateSelector";
import { MdCoPresent } from "react-icons/md";

function TitalBar(props) {
  return (
    <div
      className="tool-bar1"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div>
        {props.addvisible && (
          <button className="mbtn mbtn-edit" title='add new data' onClick={props.onAdd}>
            <FaPlus size={18} />
          </button>
        )}
        <div
          style={{
            display: "inline-block",
            letterSpacing: "2px",
            fontFamily: "sans-serif",
          }}
        >
          <p
            style={{
              marginBottom: 0,
              fontSize: "1.4rem",
              paddingLeft: "25px",
              display: "inline-block",
              lineHeight: "40px",
            }}
          >
            {props.title}{" "}
          </p>
          <div
            style={{
              paddingLeft: "15px",
              display: "inline-block",
              width: "200px",
              marginBottom: 0,
            }}
          >
            {props.isVisible == "EntitySelector" && (
              <EntitySelector onddchange={props.onChangeCombo} />
            )}
            {props.isVisible == "ResignSelector" && (
              <ResignSelector
                displayvalue={props.displayvalue}
                onddchange={props.onChangeCombo}
              />
            )}
            {props.isVisible == "DateSelector" && (
              <DateSelector
               initialvalue={props.displayvalue}
              onDateChange={props.onddchange}
              />
            )}
            {props.isVisible == "YearSelector" && (
              <YearCombo onddchange={props.onChangeCombo} initialvalue={props.initialvalue} />
            )}
            {props.isVisible == "StatusSelector" && (
              <StatusSelector onddchange={props.onChangeCombo} initialvalue={props.initialvalue} />
            )}
          </div>
        </div>
      </div>
      <div >
      {props.buttonString.includes('present') &&
        <button className="mbtn mbtn-edit" title='make all present' onClick={props.makePresnt}>
          <MdCoPresent  size={18} />
        </button>}
       {props.buttonString.includes('refresh') &&
        <button className="mbtn mbtn-edit" title='refresh data' onClick={props.onRefresh}>
          <TbRefresh size={18} />
        </button>}
        {props.buttonString.includes('pdf') &&
        <button className="mbtn mbtn-edit" title='export to pdf'>
          <FaRegFilePdf size={18} />
        </button>}
        {props.buttonString.includes('excel') &&
        <button className="mbtn mbtn-edit" title='expoet to excel'>
          <FaFileExcel size={18} />
        </button>}
        {props.buttonString.includes('print') &&
        <button className="mbtn mbtn-edit" title='print'>
          <FaPrint size={18} />
        </button>}
      </div>
    </div>
  );
}

export default TitalBar;
