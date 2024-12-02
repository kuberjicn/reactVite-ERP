import React, { useEffect, useState } from "react"
import axios from "../AxiosConfig";
import './component.css'
import { useGlobleInfoContext } from "../GlobleInfoProvider";
import { FaPlus} from "react-icons/fa6";
import SiteModalForm from "../pages/Master/SiteModalForm";

const SiteChange = ({isaddVisible=false}) => {

    const { myState, updateProperty } = useGlobleInfoContext();
    
    const [lastindex,setLastindex] = useState(0)
    const [error, setError] = useState(null);
    let [siteid, setSiteid] = useState(myState.siteid||0)
    const [data, setData] = useState([])
    const [isdisable,setIsdisable]=useState(false)
    const [isShow, setIsShow] = useState(false);
    const [type, settype] = useState("");
    const [dataEdit, setDataEdit] = useState([]);

  const [change, setChange] = useState(false);
    
    
    const fetchSite = async () => {
        try {
          const response = await axios.get("/site/")
          
          setData(response.data);
          
          if (!siteid && response.data.length > 0) {
            const firstSite = response.data[0];
            setSiteid(firstSite.site_id);
            updateProperty("siteid", firstSite.site_id);
            updateProperty("sitename", firstSite.sitename);
            updateProperty("index", 0);
          }
        } catch (err) {
          if (err.response && err.response.status === 401) {
            setError("Unauthorized. Please check your credentials.");
          } else {
            setError("Something went wrong. Please try again later.");
          }
        }
      };
    const handleSiteChange = (e) => {
        const newValue = e.target.value;
        const newText=e.target.options[e.target.selectedIndex].text;
        const index=e.target.selectedIndex
        setSiteid(newValue);
        setLastindex(index)
        
        updateProperty('siteid',newValue)
        updateProperty('sitename',newText)
        
        
    };

    useEffect(() => {
        if (!myState.token) {
          return;
        }
    
        fetchSite();
    
      }, [myState.token]); 

      useEffect(() => {
        if (!myState.token) {
          return;
        }
    
        fetchSite();
    
      }, [change]); 
    useEffect(() => {
        //console.log(myState.token);
        if (!myState.token){
            return ;
        }
        //fetchSite()
        setSiteid(myState.siteid);
       
    }, [siteid]);
    
     useEffect (()=>{
       // console.log(isdisable)
        setIsdisable(myState.isSitedisable||false )
     },[myState.isSitedisable])

     const isModalShow = (type) => {
      settype(type);
  
      setIsShow(true);
    };
    const isModalHide = () => {
      //setChange(!change)
      setDataEdit([]);
      setIsShow(false);
      settype("");
    };
  
    const onUpdate = () => {
      setChange(!change);
      setDataEdit([]);
      setIsShow(false);
      settype("");
    };

    return (
        <div style={isdisable?{visibility:"hidden"}:{visibility:'visible'}}>
            {error && <div className="error-message">{error}</div>}
           <div style={{display:'flex',justifyContent:'space-between',}}>
          
            <select id="sites" name="sites"  className="site-dropdown form-input "  
            onChange={handleSiteChange}   value={ siteid} disabled={isdisable}    >
            <option style={{fontWeight:'500',color:'#333',textTransform:'capitalize'}} value={0} >Shree kuberji</option>
                { data && data.length > 0 && data.map((item) =>
                     <option value={item.site_id} key={item.site_id} >{item.sitename}</option>
                )};

            </select>
            {isaddVisible?
            <button className="mbtn mbtn-edit"  style={{height:'35px', marginLeft:'2px',width:'25px',padding:'2px 2px'}} title='add new data'  onClick={() => isModalShow("add")} >
            <FaPlus  size={16} />
          </button>:''}
            </div>

        <SiteModalForm
        isShow={isShow}
        onHide={isModalHide}
        onUpdate={onUpdate}
        type={type}
        data={dataEdit}
      />
        </div>
    )
}

export default SiteChange