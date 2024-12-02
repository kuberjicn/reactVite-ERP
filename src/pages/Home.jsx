
import React, {  useState } from 'react'

import { useGlobleInfoContext } from "../GlobleInfoProvider";


function Home() {
  const { myState, updateProperty } = useGlobleInfoContext();
  
  //console.log(myState.token);
 
  return (
    <div>
      <p>this id home page</p>
      
     
    </div>
  )
}

export default Home;
