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
    const { myState ,updateProperty} = useGlobleInfoContext();
    const[sitename, setSitename]=useState(myState.sitename)
    const [pmenu,setPmenu]=useState(false)
    
    const navigate = useNavigate();
    const [logoutTimer, setLogoutTimer] = useState(null);
    const [isSidebarHidden, setSidebarHidden] = useState(false);
    const [profilePic,setProfilePic]=useState('')
    
    const toggleSidebar=()=>{
        setSidebarHidden(!isSidebarHidden);
    }
    
    const hideSidebar=()=>{
        setSidebarHidden(true);
    }

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
useEffect(()=>{
    const picSrc = sessionStorage.getItem("pic") || "./images/no_image.png";
    setProfilePic(picSrc)
},[])
useEffect(()=>{
    //  console.log(myState.picUrl);
   setSitename(myState.sitename)
   
},[myState.sitename,myState.isSitedisable])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    const detailPane = document.querySelector('.detail-pane');
        // Function to apply or remove event listeners based on screen size
        const handleMediaChange = (e) => {
            if (e.matches) {  // Screen is 600px or less
                detailPane.addEventListener('mousedown', hideSidebar);
            } else {  // Screen is greater than 600px
                detailPane.removeEventListener('mousedown', hideSidebar);
            }
        };

        // Initial check
        handleMediaChange(mediaQuery);

        // Listen for media query changes
        mediaQuery.addEventListener('change', handleMediaChange);

        // Add event listener for profile menu
        document.addEventListener('mousedown', handleClickOutsideProfileMenu);

        // Cleanup listeners
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideProfileMenu);
            mediaQuery.removeEventListener('change', handleMediaChange);
            detailPane.removeEventListener('mousedown', hideSidebar);
        };
}, [pmenu,isSidebarHidden]); 
  




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
        <div className='containers'>
            <SessionTimeout logoutTime={15 * 60 * 1000}/>
            <button  className={`toggle-btn ${isSidebarHidden ? 'hidden' : ''}`}   onClick={toggleSidebar}>☰</button>
            <div className={`sidenav ${isSidebarHidden ? 'hidden' : ''}`}>
            
                <div className="brand-bar" onClick={handlebrand}>
                    <img id="app-logo" src={"./images/logo.png"} alt="" />
                    {/* <h3 className='text-emphasis'>Kuberji</h3> */}
                    
                </div>
                <div className="app-menu" >
                    <Sidenav />
                </div> 
                <div>
                    <ToastContainer />
                </div>
            </div>
            <div className={`content ${isSidebarHidden ? 'expanded' : ''}`}>
                <div className="top-bar">
                    <div className="top-bar-detail">
                        <h2 id="caption">{sitename }</h2>
                        <div className="profile"  onClick={()=>setPmenu(!pmenu)} >
                            <h5 id="id_user">[@ <span>{sessionStorage.getItem('firstname')}</span>]</h5>
                            <img width={'30px'} src={profilePic}  id="id_user_pic" />
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
