
import React, { useState,useEffect } from 'react'
import axios from "../AxiosConfig";
import './component.css'
import { useGlobleInfoContext } from "../GlobleInfoProvider";

function MaterialChange({initialvalue,isread,handleMatyerialChange,isall=false}) {
    const [data, setData] = useState([])
    const [mat_id,setMat_id]=useState(initialvalue||0)
    
    const { myState, updateProperty } = useGlobleInfoContext();

   
    useEffect(() => {
      setMat_id(initialvalue);
      
    }, []);

    useEffect(() => {
      fetchsupplier();
    }, [initialvalue]);
   
   
      
    const fetchsupplier = async () => {
      try {
        let response;
        
          response = await axios.get("/material/");
        // console.log(response)
        const responseData =
          response && response.data ? response.data.results : [];
        setData(responseData);
        //console.log("query", responseData);
        // If initialvalue is defined and not 0, set the selected supplier
        if (initialvalue && initialvalue !== 0) {
          //console.log("Initial value:", initialvalue);
          setMat_id(initialvalue);
        } else {
          // If responseData is not empty, set the selected supplier to the first item in the data array
          if (responseData && responseData.length > 0) {
            let id = responseData[0].sup_id;
            
          
          }
        }
      } catch (error) {
        console.error("Error fetching supplier data:", error);
      }
    };

    const handleChange = (e) => {
      const newValue = e.target.value;

      setMat_id(newValue);
      //console.log(newValue,data)
      const selectedItem = data.find((item) => item.mat_id == newValue);
      handleMatyerialChange(e, selectedItem);
    };

    
  return (
    <div>
      
      <label htmlFor="supplier" className='form-label'>Material:<span style={{color:'red'}}>*</span></label>
            <select id="supplier" name="supplier" className="site-dropdown combo-fontweight form-input" onChange={(e)=>handleChange(e)} value={mat_id} disabled={isread}  >
              {isall?
            <option style={{textTransform:'capitalize'}} value={0} >ALL</option>:

            <option style={{fontWeight:'500',color:'#dadada',textTransform:'capitalize'}} value={0} disabled={true}>Select Material</option>}
                {data && data.length > 0 && data.map((item) =>
                    <option value={item.mat_id} key={item.mat_id} >{item.mat_name} </option>
                )};
            </select>
    </div>
  )
}

export default MaterialChange
