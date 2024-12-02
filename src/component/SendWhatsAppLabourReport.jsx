import React from 'react'
import axios from "../AxiosConfig";
import { useGlobleInfoContext } from "../GlobleInfoProvider";
import {  formatDateymd } from '../pages/Common';



export const SendWhatsAppLabourReport = () => {
  const { myState } = useGlobleInfoContext();
  
  const sendReport = async (ddate) => {
  try {
    console.log(ddate);
    const mydate=formatDateymd(ddate)
    const response = await axios.get(`/setting/get_value_by_key/?siteid=${myState.siteid}&key=lbrwa`);
    const cellNos = response.data.value;
    console.log(cellNos);

    const response2 = await axios.get(`/pdf-lbr-report/?siteid=${myState.siteid}&ddate=${mydate}`);
    const file_path=response2.data.file_url
    const encodedFilePath = encodeURIComponent(file_path);
    console.log(file_path);
    if (!cellNos || cellNos.length === 0 || !file_path) {
      console.error("No phone numbers found in the settings.");
      return;
    }
    

  for (const cell_no of cellNos) {
    const url = `https://enotify.app/api/sendFileWithCaption?token=cltfj09np4da2kpwyjsdhmtey&phone=${cell_no}&link=${encodedFilePath}&message=report on date:${ddate}`;
    console.log(url);
    try {
      const sendResponse = await axios.post(url);
      console.log(`Message sent to ${cell_no}:`, sendResponse.data);
    } catch (error) {
      console.error(`Error sending message to ${cell_no}:`, error);
    }
  }
  } catch (error) {
  console.error("Error fetching settings:", error);
  }
}
return { sendReport };
}



