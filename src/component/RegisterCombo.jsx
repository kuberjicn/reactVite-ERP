import React, { useEffect, useState } from 'react'
import "./component.css";



const RegisterCombo = ({initialvalue,onRegisterchange,isall=false,islabel=true}) => {

  
  const [regtype, setRegtype]=useState(initialvalue||'diesel')
  useEffect(()=>{
    //setRegtype(initialvalue)
 // console.log(regtype);

  },[regtype])
  const handleChange=(e)=>{
    const newValue = e.target.value;
    setRegtype(newValue);
    onRegisterchange(e)

  }
  return (
    
    <div >
      {islabel ?
    <label htmlFor="unit" className='form-label'>Register<span style={{color:'red'}}>*</span></label>:''}
    
        <select name='unit' className="site-dropdown form-input combo-fontweight" value={regtype}  onChange={handleChange}>
          {isall?
          <option value={'all'}>ALL</option>:''}
          <option value={'diesel'}>DIESEL</option>
          <option value={'aggre'}>AGGREGATE</option>
          <option value={'cement'}>CEMENT LOOSE</option>
          <option value={'cementbag'}>CEMENT BAG</option>
          <option value={'misc'}>MISC</option>
          <option value={'steel'}>STEEL</option>
          <option value={'brick'}>BRICKS</option>
          <option value={'block'}>BLOCK</option>
          <option value={'tile'}>TILE</option>
          <option value={'granite'}>GRANITE</option>
          <option value={'flooringother'}>FLOORING OTHER</option>
          <option value={'elec'}>ELECTRICALS</option>
          <option value={'plumbing'}>PLUMBING</option>


           </select>
            
            </div>  
    
  )
}

export default RegisterCombo
