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
import GlobleInfoProvider from "./GlobleInfoProvider";
import Company from "./pages/Master/Company"
import SalaryRegister from "./pages/Master/SalaryRegister";
import { StyleSheetManager } from 'styled-components';

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
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/changepassword" element={<ChangePassword />} />
                <Route path="/changeprofile" element={<ChangeProfile />} />
                <Route path="/company" element={<Company/>} />
                <Route path="/salary-register" element={<SalaryRegister/>} />
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
