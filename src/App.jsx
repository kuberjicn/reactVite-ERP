import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./pages/Layout";
import ChangePassword from "./pages/ChangePassword";
// import Changeprofile from "./pages/changeProfile";
import ChangeProfile from "./pages/ChangeProfile"
import Login from "./pages/Login";
import PrivateRoutes from "./pages/PrivateRoutes";
import PublicRoutes from "./pages/PublicRoutes";
import Site from "./pages/Master/Site";
import Entity from "./pages/Master/Entity";
import Material from "./pages/Master/Material";
import GlobleInfoProvider from "./GlobleInfoProvider";
import Company from "./pages/Master/Company"
import SalaryRegister from "./pages/Master/SalaryRegister";
import { StyleSheetManager } from 'styled-components';
import LeaveRegister from "./pages/Master/LeaveRegister";
import LeaveApplication from "./pages/Attaandance/LeaveApplication";
import AttandanceRegister from "./pages/Attaandance/AttandanceRegister";
import PayRoll from "./pages/Attaandance/PayRoll";
import Activity from "./pages/Master/Activity";
import Labour from "./pages/Labour/labour";
import LabourReport from "./pages/Labour/LabourReport";
import Inventory from "./pages/store/Inventory";
import InwardOutward from "./pages/store/InwardOutward";
import StoreReport from "./pages/store/StoreReport";
import LeaveAndHoliday from "./pages/Settings/LeaveAndHoliday";

import DefalutSetting from "./pages/Settings/DefalutSetting";
import CubeRegister from "./pages/Technical/CubeRegister";

import AacBlockRegister from "./pages/Technical/AacBlockRegister";
import UnderConstruction from "./pages/UnderConstruction";
import SiteInformation from "./pages/Technical/SiteInformation";

function App() {
  return (
    <>
    <StyleSheetManager shouldForwardProp={(prop) => prop !== 'sortActive'}>
      <Router>
      <GlobleInfoProvider>
          <Routes>
           <Route  element={<PrivateRoutes />}>
              <Route  element={<Layout  />}>
                <Route path="/site" element={<Site />} />
                <Route path="/entity" element={<Entity />} />
                <Route path="/material" element={<Material />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/changepassword" element={<ChangePassword />} />
                <Route path="/changeprofile" element={<ChangeProfile />} />
                <Route path="/company" element={<Company/>} />
                <Route path="/salary-register" element={<SalaryRegister/>} />
                <Route path="/leave-register" element={<LeaveRegister/>} />
                <Route path="/leave-application" element={<LeaveApplication/>} />
                <Route path="/attandance" element={<AttandanceRegister/>} />
                <Route path="/payroll" element={<PayRoll/>} />
                <Route path="/labour" element={<Labour/>} />
                <Route path="/labour-report" element={<LabourReport/>} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/inward-outward" element={<InwardOutward formtype={'inoutward'} />} />
                <Route path="/store-report" element={<StoreReport />} />
                <Route path="/register" element={<InwardOutward formtype='register'/>} />
                <Route path="/holyday-leave" element={<LeaveAndHoliday />} />
                <Route path="/default-setting" element={<DefalutSetting />} />
                <Route path="/cube-register" element={<CubeRegister />} />
                <Route path="/site-inforamtion" element={<SiteInformation/>} />
               
                <Route path="/aacblock-register" element={<AacBlockRegister />} />
                <Route path="/under-construction" element={<UnderConstruction />} />


                
              </Route>
            </Route>
            
            <Route element={<PublicRoutes />}>
              <Route path="" element={<Login />} />
            </Route>
           
          </Routes>
          </GlobleInfoProvider>
      </Router>
      </StyleSheetManager>
    </>
  );
}

export default App;
