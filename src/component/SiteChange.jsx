import React, { useEffect, useState } from "react"
import axios from "../AxiosConfig";

import './component.css'
import { useGlobleInfoContext } from "../GlobleInfoProvider";

const SiteChange = () => {

    const { myState, updateProperty } = useGlobleInfoContext();
    
    const [lastindex,setLastindex] = useState(0)
    const [error, setError] = useState(null);
    let [siteid, setsiteid] = useState(myState.siteid)
    const [data, setData] = useState([])



    const fetchSite=()=>{
        
        axios.get('/site/').then(response => {
        setData(response.data)
       
      }).catch(err => {
        setError("Something went wrong. Please try again later."); 
       
      });
     

    } 
    

    const handleSiteChange = (e) => {
        const newValue = e.target.value;
        const newText=e.target.options[e.target.selectedIndex].text;
        const index=e.target.selectedIndex
        setsiteid(newText);
        setLastindex(index)
        updateProperty('siteid',newValue)
        updateProperty('sitename',newText)
        updateProperty('index',index)
    };

    useEffect(() => {
        fetchSite()
        setsiteid(myState.siteid?myState.siteid:1);
       
    }, []);
    
     

    return (
        <div>
            <select id="sites" name="sites" className="site-dropdown"  onChange={handleSiteChange}  value={siteid}   >
                
                {data.map((item) =>
                    <option value={item.site_id} key={item.site_id} >{item.sitename}</option>
                )};

            </select>
        </div>
    )
}

export default SiteChange