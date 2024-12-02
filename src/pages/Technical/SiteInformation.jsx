import React, { useEffect,useState } from 'react'
import BusyForm from "../../component/BusyForm";
import axios from "../../AxiosConfig";
import { useGlobleInfoContext } from "../../GlobleInfoProvider";
import TitalBar from '../../component/TitalBar';


const SiteInformation = () => {
  const [data, setData] = useState([]);
  const [isBusyShow, setIsBusyShow] = useState(false);
  const [error, setError] = useState(null);
  const { myState, updateProperty } = useGlobleInfoContext();
  const [change, setChange] = useState(false);
  const [olddp_link, setOlddp_link] = useState(null);
  const [oldrera_link, setOldrera_link] = useState(null);


  const PDFThumbnail = ({ imageUrl,header='' }) => {
    return (
      <>
      <div style={{textTransform:'uppercase',fontWeight:'bold'}}> {header}</div>
      <div style={{ margin: '10px', border: '1px solid #ddd', boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)' }}>
        <img src={imageUrl} alt="PDF Thumbnail" style={{ width: '150px', height: '100px' ,objectFit:'cover' }} />
        <a
          href={imageUrl}
          download
          style={{
            display: 'inline-block',
            marginTop: '10px',
            padding: '5px 10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
          }}
          target='_blank'
        >
          Download
        </a>

      </div>
      </>
    );
  };


  const fetchSitedetail = async () => {
   
    
    setIsBusyShow(true)
    try {
      const response = await axios.get(`site-profile/?siteid=${myState.siteid}`);
      
      
      setOlddp_link(response.data[0].dp_link)
      //response.data[0].dp_link=null
      setOldrera_link(response.data[0].rera_link)
      //response.data[0].rera_link=null
      setData(response.data[0]||{});
      
  } catch (error) {
      setError("Something went wrong. Please try again later.");
    console.log(error);

  }
  setIsBusyShow(false)
  };


  useEffect(()=>{
    fetchSitedetail()
    console.log(data);
  },[myState.siteid,change])


  return (
    <div>
       <BusyForm isShow={isBusyShow} />
      <TitalBar
      onRefresh={() => setChange(!change)}
      title="Site Information "
      buttonString={["refresh",'print']}
       />
       <div style={{display:'flex',justifyContent:'space-around' ,padding:'15px'}}>
        <div style={{width:'30%' }}>
        <label style={{display:'block',fontWeight:'bold',textTransform:'uppercase'}} >Short Name : <span >{data.short_name}</span></label>
        <div style={{border:'1px solid #dadada',padding:'5px',borderRadius:'5px', margin:'5px 0'}}><span>Site Detail :</span>

        <div style={{display:'flex',justifyContent:'space-between'}} className='cn-label label-fontsize'> 
          <div style={{width:'50px',textAlign:'right'}}>Name:</div>
          <div  style={{width:'85%'}}>{data.site?.sitename}</div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}} className='cn-label label-fontsize'> 
          <div style={{width:'50px',textAlign:'right'}}>Street:</div>
          <div  style={{width:'85%'}}>{data.site?.add1}</div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}} className='cn-label label-fontsize'> 
          <div style={{width:'50px',textAlign:'right'}}>Street:</div>
          <div  style={{width:'85%'}}>{data.site?.add2}</div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}} className='cn-label label-fontsize'> 
          <div style={{width:'50px',textAlign:'right'}}>City:</div>
          <div  style={{width:'85%'}}>{data.site?.city}</div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}} className='cn-label label-fontsize'> 
          <div style={{width:'50px',textAlign:'right'}}>State:</div>
          <div  style={{width:'85%'}}>{data.site?.state}</div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}} className='cn-label label-fontsize'> 
          <div style={{width:'50px',textAlign:'right'}}>email:</div>
          <div  style={{width:'85%'}}>{data.site?.email}</div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}} className='cn-label label-fontsize'> 
          <div style={{width:'50px',textAlign:'right'}}>Phone:</div>
          <div  style={{width:'85%'}}>{data.site?.phone}</div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}} className='cn-label label-fontsize'> 
          <div style={{width:'50px',textAlign:'right'}}>Contact Person:</div>
          <div  style={{width:'85%'}}>{data.site?.contactperson}</div>
        </div>

       
       
        </div>

        <div style={{border:'1px solid #dadada',padding:'5px',borderRadius:'5px', margin:'5px 0'}}><span>Company Detail :</span>

        <div style={{display:'flex',justifyContent:'space-between'}} className='cn-label label-fontsize'> 
          <div style={{width:'50px',textAlign:'right'}}>Name:</div>
          <div  style={{width:'85%'}}>{data.site?.compid.compname}</div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}} className='cn-label label-fontsize'> 
          <div style={{width:'50px',textAlign:'right'}}>PAN:</div>
          <div  style={{width:'85%'}}>{data.site?.compid.PAN}</div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}} className='cn-label label-fontsize'> 
          <div style={{width:'50px',textAlign:'right'}}>GST:</div>
          <div  style={{width:'85%'}}>{data.site?.compid.GST}</div>
        </div>

        <div style={{display:'flex',justifyContent:'space-between'}} className='cn-label label-fontsize'> 
          <div style={{width:'50px',textAlign:'right'}}>email:</div>
          <div  style={{width:'85%'}}>{data.site?.compid.email}</div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}} className='cn-label label-fontsize'> 
          <div style={{width:'50px',textAlign:'right'}}>Phone:</div>
          <div  style={{width:'85%'}}>{data.site?.compid.phone}</div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}} className='cn-label label-fontsize'> 
          <div style={{width:'50px',textAlign:'right'}}>Contact Person:</div>
          <div  style={{width:'85%'}}>{data.site?.compid.contactperson}</div>
        </div>


              


        </div>
        </div>

        <div style={{width:'30%'}}>
        <label className='form-label' htmlFor='rate'>Detail : </label>
        <div style={{border:'1px solid #dadada',padding:'5px',borderRadius:'5px', margin:'5px 0'}}><span>Site Detail :</span>

        <div style={{display:'flex',justifyContent:'space-between'}} className='cn-label label-fontsize'> 
          <div style={{width:'80px',textAlign:'right'}}>Land Area:</div>
          <div  style={{width:'75%'}}>{data.land_area}</div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}} className='cn-label label-fontsize'> 
          <div style={{width:'80px',textAlign:'right'}}>Built Up area:</div>
          <div  style={{width:'75%'}}>{data.builtup_area} sft</div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}} className='cn-label label-fontsize'> 
          <div style={{width:'80px',textAlign:'right'}}>Const. Area:</div>
          <div  style={{width:'75%'}}>{data.construction_area} sft</div>
        </div>

        <div style={{display:'flex',justifyContent:'space-between'}} className='cn-label label-fontsize'> 
          <div style={{width:'80px',textAlign:'right'}}>Park. Area:</div>
          <div  style={{width:'75%'}}>{data.parking_construction_area}</div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}} className='cn-label label-fontsize'> 
          <div style={{width:'80px',textAlign:'right'}}>D. Permit:</div>
          <div  style={{width:'75%'}}>{data.dp_id}</div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}} className='cn-label label-fontsize'> 
          <div style={{width:'80px',textAlign:'right'}}>rera permit:</div>
          <div  style={{width:'75%'}}>{data.rera_id}</div>
        </div>


              


        </div>         

        </div>

        <div style={{width:'30%'}}>
       
              <PDFThumbnail imageUrl={data.rera_link} header='rera certificate'/>
              <PDFThumbnail imageUrl={data.dp_link} header='development permit'/>

        </div>

</div>
    </div>
  )
}

export default SiteInformation
