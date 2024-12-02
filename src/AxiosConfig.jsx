import axios from "axios";
import {getToken} from './pages/Common'


//const { myState, updateProperty } = useGlobleInfoContext();
const token = getToken();
//console.log(token);
axios.defaults.baseURL = 'https://erp.kuberji.co.in/api'
axios.defaults.headers.common['Authorization']= `Token ${token}`
export default axios;

