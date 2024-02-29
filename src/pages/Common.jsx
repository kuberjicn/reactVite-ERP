import { useGlobleInfoContext } from "../GlobleInfoProvider";

// return the user data from the session storage
export const getUser = () => {
    return sessionStorage.getItem('user') || null;
}
   
  // return the token from the session storage
export const getToken = () => {
  //console.log('get token',sessionStorage.getItem('token'));
    return sessionStorage.getItem('token') || null;
}
   


  // remove the token and user from the session storage
export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('codename');
    //sessionStorage.removeItem('sitename');
}
   
  // set the token and user from the session storage
export const setUserSession = (token, user,userid,pic,firstname,codename) => {
    
    sessionStorage.setItem('token', token);
    //localStorage.setItem('token',token)
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

export const addDaysToDate = (date, days) => {
  const newDate = new Date(date); // Create a new Date object based on the provided date
  newDate.setDate(newDate.getDate() + days); // Add the specified number of days to the date
  return newDate.toISOString().split('T')[0]; // Return the new date in YYYY-MM-DD format
};


import styled from 'styled-components';

// Define the styled component outside of any component
export const CenteredTextCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center !important;
  width:100%;
`;

export const formattedDate=() =>{ const newDate= date
  .toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
  .replace(/\//g, "-");
return newDate;
}

