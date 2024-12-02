import React from "react";
import "./component.css";
import { FaPlus,FaMinus, FaRegFilePdf, FaFileExcel, FaPrint,FaWhatsapp } from "react-icons/fa6";
import { TbRefresh } from "react-icons/tb";
import EntitySelector from "./EntitySelector";
import ResignSelector from "./ResignSelector";
import YearCombo from "./YearCombo";
import StatusSelector from "./StatusSelector";
import DateSelector from "./DateSelector";
import { MdCoPresent } from "react-icons/md";
import RegisterCombo from "./RegisterCombo";
import { stubTrue } from "lodash";

function TitalBar(props) {
  return (
    <div
      className="tool-bar1"
      
    >
      <div >
        {props.addvisible && (
          <button className="mbtn mbtn-edit" title='add new data' onClick={props.onAdd}>
            <FaPlus size={18} />
          </button>
        )}
         {props.minusvisible && (
          <button className="mbtn mbtn-edit" title='add new data' onClick={props.onMinus}>
            <FaMinus size={18} />
          </button>
        )}
        <div
          style={{
            display: "inline-block",
            letterSpacing: "2px",
            fontFamily: "sans-serif",
          }}
        >
          <div
            style={{
              marginBottom: 0,
              fontSize: "1.3rem",
              paddingLeft: "25px",
              display: "inline-block",
              lineHeight: "40px",
            }}
          >
            {props.title}{" "}
          </div>
          <div
            style={{
              paddingLeft: "15px",
              display: "inline-block",
              
              marginBottom: 0,
            }}
          >
            {props.isVisible == "EntitySelector" && (
              <EntitySelector onddchange={props.onddchange} />
            )}
            {props.isVisible == "ResignSelector" && (
              <ResignSelector
                displayvalue={props.displayvalue}
                onddchange={props.onChangeCombo}
              />
            )}
            {props.isVisible == "DateSelector" && (
              <DateSelector
               initialvalue={props.initialvalue}
              onDateChange={props.onddchange}
              />
            )}
            {props.isVisible == "YearSelector" && (
              <YearCombo onddchange={props.onChangeCombo} initialvalue={props.initialvalue} />
            )}
            {props.isVisible == "StatusSelector" && (
              <StatusSelector onddchange={props.onChangeCombo} initialvalue={props.initialvalue} />
            )}
            {props.isVisible == "RegisterSelector" && (
              <RegisterCombo isall={true} islabel={false} onRegisterchange={props.onddchange} initialvalue={props.initialvalue} />
            )}
          </div>

          <div
            style={{
              marginBottom: 0,
              fontSize: ".9rem",
              paddingLeft: "25px",
              display: "inline-block",
              lineHeight: "40px",
              color:'#000'
            }}
          >
            {props.subtitle}{""}
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
        <button className="mbtn mbtn-edit" title='export to pdf' onClick={props.onpdf}>
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
        {props.buttonString.includes('whatsapp') &&
        <button className="mbtn mbtn-edit" title='whatsapp' onClick={props.onwhatsapp}>
          <FaWhatsapp size={18} />
        </button>}
      </div>
    </div>
  );
}

export default TitalBar;
