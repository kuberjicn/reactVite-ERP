import React, { useState,useContext,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidenav from '../component/Sidenav'
import { Link, Outlet } from 'react-router-dom';
import './Layout.css'
import { checkPermissions, getUser, removeUserSession } from './Common';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGlobleInfoContext } from "../GlobleInfoProvider";
import SessionTimeout from './SessionTimeout';

function Layout(props) {
    const { myState } = useGlobleInfoContext();
    const [pmenu,setPmenu]=useState(false)
    const user = getUser();
    const navigate = useNavigate();
    const [logoutTimer, setLogoutTimer] = useState(null);


    
  
  const handleLogout = () => {
    removeUserSession();
    localStorage.setItem('firstLogin', true);
    navigate('/');
  }
  const handlebrand=()=>{
    navigate('/home')
  }

  const handleClickOutsideProfileMenu = (event) => {
    if (pmenu && !event.target.closest('.profile-menu')) {
        setPmenu(false);
    }
}

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideProfileMenu);

    return () => {
        document.removeEventListener('mousedown', handleClickOutsideProfileMenu);
    };
}, [pmenu]);
  
  let profileMenu = null;
    if (pmenu) {
        profileMenu = (
            <div className='profile-menu'>
                {checkPermissions('change_userprofile') && <Link to={'/changeprofile'} onClick={()=>setPmenu(false)} >Change Profile</Link>}
                <hr style={{ margin: '3px' }} />
                <Link to={'/changepassword'} onClick={()=>setPmenu(false)}>Change password</Link>
                <hr style={{ margin: '3px' }} />
                <Link to={'/'} onClick={handleLogout}>Log Out</Link>
            </div>
        );
    }

    return (
        <div>
            {/* <SessionTimeout /> */}
            <div className="left-side">
                <div className="brand-bar" onClick={handlebrand}>
                    <img id="app-logo" src={"./images/sk-logo.png"} alt="" />
                    <h3>Kuberji</h3>
                </div>
                <div className="app-menu" >
                    <Sidenav />
                </div> 
                <div>
                    <ToastContainer />
                </div>
            </div>
            <div className="right-side">
                <div className="top-bar">
                    <div className="top-bar-detail">
                        <h2 id="caption">{myState.sitename }</h2>
                        <div className="profile"  onClick={()=>setPmenu(!pmenu)} >
                            <h5 id="id_user">[@ <span>{sessionStorage.getItem('firstname')}</span>]</h5>
                            <img src={sessionStorage.getItem('pic')} alt="" id="id_user_pic" />
                        </div>
                        <div className={`profile-menu ${pmenu ? 'active' : ''}`}>
                            {checkPermissions('change_userprofile') && <Link to={'/changeprofile'} onClick={() => setPmenu(false)}>Change Profile</Link>}
                            <hr style={{ margin: '3px' }} />
                            <Link to={'/changepassword'} onClick={() => setPmenu(false)}>Change password</Link>
                            <hr style={{ margin: '3px' }} />
                            <Link to={'/'} onClick={() => { handleLogout(); setPmenu(false); }}>Log Out</Link>
                        </div>
                    </div>
                </div>
                <div className="detail-pane"  >
                    
                    <Outlet  />
                </div>
            </div>
        </div>

    )
}

export default Layout
