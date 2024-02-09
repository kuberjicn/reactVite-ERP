import React, { createContext, useState,useContext } from "react";

const GlobleInfoContext = createContext();

const GlobleInfoProvider = ({ children }) => {
  const [myState, setMyState] = useState({
    sitename: sessionStorage.getItem('sitename')?sessionStorage.getItem('sitename'):'kuberji',
    siteid: sessionStorage.getItem('siteid'),
    token:sessionStorage.getItem('token')?sessionStorage.getItem('token'):'',
    userid:sessionStorage.getItem('userid')?sessionStorage.getItem('userid'):'',
    codename:sessionStorage.getItem('codename')?sessionStorage.getItem('codename'):'',
    username:sessionStorage.getItem('username')?sessionStorage.getItem('username'):'',
    
  });
  const updateProperty = (propertyName, value) => {
    sessionStorage.setItem([propertyName],[value])
    setMyState((prevState) => ({
      ...prevState,
      [propertyName]: value,
    }));
  
  };
  const contextValue = {
    myState,
    updateProperty,
  };
  return (
    <GlobleInfoContext.Provider value={contextValue}>
      {children}
    </GlobleInfoContext.Provider>
  );
};


export default GlobleInfoProvider;
export const useGlobleInfoContext = () => useContext(GlobleInfoContext);