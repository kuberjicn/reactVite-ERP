import { useGlobleInfoContext } from "../GlobleInfoProvider";

// return the user data from the session storage
export const getUser = () => {
  return sessionStorage.getItem("user") || null;
};

// return the token from the session storage
export const getToken = () => {
  //console.log('get token',sessionStorage.getItem('token'));
  return sessionStorage.getItem("token") || null;
};

// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("codename");
  //sessionStorage.removeItem('sitename');
};

// set the token and user from the session storage
export const setUserSession = (
  token,
  user,
  userid,
  pic,
  firstname,
  codename
) => {
  sessionStorage.setItem("token", token);
  //localStorage.setItem('token',token)
  sessionStorage.setItem("user", user);
  sessionStorage.setItem("pic", pic);
  sessionStorage.setItem("firstname", firstname);
  sessionStorage.setItem("codename", codename);
};

export const setActiveSite = (sitename, siteid) => {
  sessionStorage.setItem("sitename", sitename);
  sessionStorage.setItem("siteid", siteid);
};

export const getActiveSiteId = () => {
  return sessionStorage.getItem("siteid") || null;
};

export const toCamelCase = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase())
    .replace(/^(.)/, (match, chr) => chr.toLowerCase());
};

export const checkPermissions = (permission) => {
  
  const arr = sessionStorage.getItem("codename").split(",");
  //console.log(arr)
  if (arr.includes(permission)) {
    return true;
  } else {
    false;
  }
};

export const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
  const day = currentDate.getDate();

  const formattedCurrentDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
  return formattedCurrentDate;
};

export const addDaysToDate = (date, days) => {
  const newDate = new Date(date); // Create a new Date object based on the provided date
  newDate.setDate(newDate.getDate() + days); // Add the specified number of days to the date
  return newDate.toISOString().split("T")[0]; // Return the new date in YYYY-MM-DD format
};

export function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
}

import styled from "styled-components";

// Define the styled component outside of any component
export const CenteredTextCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center !important;
  width: 100%;
`;

export const RightTextCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: center !important;
  width: 100%;
`;


export const formattedDate = () => {
  const newDate = new Date()
    .toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");
  return newDate;
};


export function formatDateymd(dateString) {
  console.log(dateString)
  const [day, month, year] = dateString.split("-");
  return `${year}-${month}-${day}`;
}