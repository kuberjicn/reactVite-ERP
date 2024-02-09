import { useGlobleInfoContext } from "../GlobleInfoProvider";

// return the user data from the session storage
export const getUser = () => {
    return sessionStorage.getItem('user') || null;
}
   
  // return the token from the session storage
export const getToken = () => {
    return sessionStorage.getItem('token') || null;
}
   
  // remove the token and user from the session storage
export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('codename');
}
   
  // set the token and user from the session storage
export const setUserSession = (token, user,userid,pic,firstname,codename) => {
    
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', user);
    sessionStorage.setItem('pic', pic);
    sessionStorage.setItem('firstname', firstname);
    sessionStorage.setItem('codename',codename);
}

export const setActiveSite = (sitename,siteid) => {
   
    sessionStorage.setItem('sitename', sitename);
    sessionStorage.setItem('siteid', siteid);
}

export const getActiveSiteId = () => { 
    return sessionStorage.getItem('siteid') || null;
}

export const checkPermissions=(permission)=>{
    //const { myState, updateProperty } = useGlobleInfoContext();
    // let codenameString = typeof myState.codename === 'string' ? myState.codename : String(myState.codename);
    // if (!codenameString){
    //   codenameString=sessionStorage.getItem('codename')
    //   //console.log(codenameString)
    //   updateProperty('codename',codenameString)
    // }
    const arr=sessionStorage.getItem('codename').split(',')
    //console.log(arr)
    if (arr.includes(permission)){ return true}
    else{false}
}

export const getCurrentDate = () =>{
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
    const day = currentDate.getDate();

    const formattedCurrentDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    return formattedCurrentDate
}

import styled from 'styled-components';

// Define the styled component outside of any component
export const CenteredTextCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center !important;
  width:100%;
`;
  
  