import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SessionTimeout = ({ logoutTime = 10 * 60 * 1000 }) => {  // default 10 minutes in milliseconds
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);
  let timeoutId = null;

  // Reset the timer when there's user activity
  const resetTimeout = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      handleLogout();
    }, logoutTime);  // Trigger logout after 10 minutes of inactivity
  };

  // Handle logout logic
  const handleLogout = () => {

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("codename");
    localStorage.setItem('firstLogin', true);
    // window.location.href = "https://www.google.com";
    navigate('/');

    setTimeout(() => {
        window.location.href = "https://www.google.com";
    }, 10000);

    //window.location.assign("https://www.google.com");

    
    // Perform logout action
    // localStorage.removeItem('userToken'); // Or any session tokens you use
    // alert('You have been logged out due to inactivity.');
    // navigate('/login');
  };

  useEffect(() => {
    // Add event listeners for user interaction
    const handleUserActivity = () => {
      setIsActive(true);
      resetTimeout();
    };

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);

    // Set initial timer when the component mounts
    resetTimeout();

    return () => {
      // Cleanup event listeners and timeout
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
      clearTimeout(timeoutId);
    };
  }, []);

  return null;  // This component doesn't render anything
};

export default SessionTimeout;
