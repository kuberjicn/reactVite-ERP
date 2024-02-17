import React from "react";
import "./component.css";
import { FaPlus ,FaRegFilePdf,FaFileExcel ,FaPrint   } from "react-icons/fa6";
import { TbRefresh } from "react-icons/tb";
import EntitySelector from "./EntitySelector";
import ResignSelector from "./ResignSelector";

function TitalBar(props) {
  

  return (
    <div className="tool-bar1" style={{display:'flex',justifyContent:"space-between"}}>
      <div>
      <button className="mbtn mbtn-edit"  onClick={props.onAdd}>
        <FaPlus size={18} />
      </button>
      <div style={{ display:'inline-block',letterSpacing:'2px' ,fontFamily:"sans-serif" }}>
        <p style={{marginBottom:0,fontSize:'1.4rem', paddingLeft: "25px" ,display:'inline-block'}}>{props.title} </p>
        <div style={{ paddingLeft: "15px" ,display:'inline-block',width:"200px",marginBottom:0 }}>
          {props.isVisible =='EntitySelector' &&  <EntitySelector onddchange={props.onChangeCombo}/>   }
          {props.isVisible =='ResignSelector' &&  <ResignSelector displayvalue={props.displayvalue} onddchange={props.onChangeCombo}/>   }
        </div>
      </div>
      </div>
      <div style={{}}>
      <button className="mbtn mbtn-edit" onClick={props.onRefresh}>
        <TbRefresh  size={18}  />
      </button>
      <button className="mbtn mbtn-edit" >
        <FaRegFilePdf size={18}  />
      </button>
      <button className="mbtn mbtn-edit" >
        <FaFileExcel size={18}/>
      </button>
      <button className="mbtn mbtn-edit" >
        <FaPrint size={18} />
      </button>
      </div>
    </div>
  );
}

export default TitalBar;
