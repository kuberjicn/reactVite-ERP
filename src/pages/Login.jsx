
import React, { useState,useContext, useEffect } from 'react'
import { Link, useNavigate,   } from 'react-router-dom'

import './Login.css'
import { setUserSession } from './Common';
import { ToastContainer, toast } from 'react-toastify';
import axios from "../AxiosConfig";
import { useGlobleInfoContext } from "../GlobleInfoProvider";



function Login() {
  // const [state,setState]=useState([])
  const navigate = useNavigate();
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { myState, updateProperty } = useGlobleInfoContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

 
  const handleLogin = (e) => {
    if (e && e.preventDefault) { e.preventDefault(); }
      if (validate()) {
        setError(null);
        setLoading(true);
        console.log(username.value)

        axios.post('/api-user-login/',{ username: username.value, password: password.value }).then(response => {
          setUserSession(response.data.token, response.data.username,response.data.id,response.data.pic,response.data.firstname,response.data.codename);
          updateProperty('token',response.data.token)
          updateProperty('userid',response.data.id)
          updateProperty('codename',response.data.codename)
          updateProperty('username',response.data.user)
          updateProperty('picUrl',response.data.pic)
          toast.log(response.data.token)
          
    // alert(sessionStorage.getItem('pic'))
          setIsLoggedIn(true);
          
        }).catch(err => {
            setLoading(false);
            
            setError("Something went wrong, username or password wrong Please try again later.");
            toast.error(err)
        });
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
        handleLogin();
    }
};

  const validate = () => {
    var result = true
    //alert(username.value +"  "+ password.value)
    if (username.value === '' || username.value === null) {
      result = false;
      toast.warning("please fill username")
    }
    else if (password.value === '' || password.value === null) {
      result = false;
      toast.warning("please fill password")
    }
    return result;
  }
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
      window.location.reload();
      setLoading(false);
     
    }

  }, [isLoggedIn, navigate]); 

  return (
    <div>
      <div className="logarea">
        <div className="imgs">
          <div className="layer">
            <ToastContainer />
            <form method="POST" >

              <div className="loginpanel ">
                <div className='layer2'>
                  <div className="logo">
                    <img src={"./images/sk-logo.png"} alt="" height="100px" />
                  </div>
                  <div className="log">
                    <div className="form-group">
                      <label htmlFor="id_username">User Name : </label>
                      <input id="id_username" className="form-control" type="text" {...username} width="250px" name="username"
                        placeholder="Username" autoComplete='off' />
                    </div>
                    <div className="form-group">
                      <label htmlFor="id_password">Password : </label>
                      <input id="id_password" className="form-control" type="password"  {...password} onKeyDown={handleKeyPress} name="password"
                        placeholder="password" autoComplete='off' />
                    </div>
                    <div className="flink">

                      <Link className="bb" href="#">New user</Link>
                    </div>
                    <div className="form-group">
                      <input type="button"
                        className="btn1  btn-lg btn-block " value={loading ? 'Logging...' : 'Login'} onClick={(e) => handleLogin()} disabled={loading} />
                    </div>
                  </div>
                </div>
              </div>

            </form>

          </div>
        </div>
      </div>


    </div>
  )
}
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login
