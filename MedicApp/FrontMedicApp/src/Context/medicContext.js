import React, { createContext, useState } from 'react';
import { loginApi } from '../api/api';
// Create a Context
export const MedicContext = createContext({
  isUserLogged: false,
  isRememberMeChecked: "",
  currentUser: "",
  handleIsRememberMeChecked: () => { },
  handleLogin: (loginInfo) => { },
  handleLogout: () => { },
  handleSearch: () => { }
  //this is not used just for admin to add new medics
  , handleRegister: () => { }
});

export const MedicContextProvider = (props) => {

  //all function goes here
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const handleIsRememberMeChecked = () => { setIsRememberMeChecked(true); };

  const handleLogin = async (loginInfo) => {
    try {
      const res = await loginApi(loginInfo);

      // Check if the login response indicates invalid credentials
      if (!res.data || !res.data.user.medicId) {
        alert("Invalid credentials");
        return;
      }
      setCurrentUser(res.data.user);
      setIsUserLogged(true);
      console.log("setting is user " + isUserLogged);
    } catch (e) {
      // Handle error response
      if (e.response && e.response.status === 400) {
        alert("Invalid credentials");
        setIsUserLogged(false);
      } else {
        console.log("Login error:", e);
        setIsUserLogged(false);

        alert("An error occurred during login. Please try again.");
      }
    }
  };

  const handleLogout = () => { setIsUserLogged(false); };
  const handleSearch = () => { };
  const handleRegister = () => { };

  return (<MedicContext.Provider
    value={{
      isUserLogged: isUserLogged,
      isRememberMeChecked: isRememberMeChecked,
      currentUser: currentUser,
      handleIsRememberMeChecked: handleIsRememberMeChecked,
      handleLogin: handleLogin,
      handleLogout: handleLogout,
      handleSearch: handleSearch
      //this is not used just for admin to add new medics
      , handleRegister: handleRegister
    }}>
    {props.children}
  </MedicContext.Provider>
  );
};