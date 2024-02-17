import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeUserSession } from './Common'; // Assuming you have a function to remove user session

function SessionTimeout() {
    const navigate = useNavigate();
    const timeOutTime=10
    const [logoutTimer, setLogoutTimer] = useState(null);

    useEffect(() => {
        // Set up the timer when the component mounts
        const timeout = setTimeout(() => {
            // Timeout expired, log out the user
            removeUserSession();
            navigate(''); // Redirect to login page after logout
        }, timeOutTime * 60 * 1000); // 10 minutes timeout

        // Store the timer ID in state
        setLogoutTimer(timeout);
         
        // Clear the timer if the component unmounts or if user logs out manually
        return () => {
            if (logoutTimer) {
                clearTimeout(logoutTimer);
                //console.log('df');
            }
        };
    }, [navigate]); // Re-run effect when navigation or logoutTimer changes

    // Reset the timer whenever there is user activity
    const handleUserActivity = () => {
        //console.log(logoutTimer);
        // Clear existing timer
        if (logoutTimer) {
            clearTimeout(logoutTimer);
            
           // console.log(logoutTimer);
        }
        
        // Set up new timer
        setLogoutTimer(setTimeout(() => {
            // Timeout expired, log out the user
            removeUserSession();
            navigate(''); // Redirect to login page after logout
        }, timeOutTime * 60 * 1000)); // 10 minutes timeout

        
    };

    // Attach event listeners to capture user activity
    useEffect(() => {
        // Add event listeners for user activity (e.g., mousemove, keypress)
        const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
        const listener = () => handleUserActivity();
        events.forEach(event => {
            window.addEventListener(event, listener);
        });

        // Remove event listeners when the component unmounts
        return () => {
            events.forEach(event => {
                window.removeEventListener(event, listener);
            });
        };
    }, [handleUserActivity]);

    return null; // This component does not render anything visible
}

export default SessionTimeout;
