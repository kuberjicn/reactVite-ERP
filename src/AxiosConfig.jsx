import axios from "axios";
import {getToken} from './pages/Common'


//const { myState, updateProperty } = useGlobleInfoContext();
const token = getToken();

axios.defaults.baseURL = 'http://127.0.0.1:3333/api'
axios.defaults.headers.common['Authorization']= `Token ${token}`
export default axios;

