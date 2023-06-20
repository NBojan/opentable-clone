"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [authState, setAuthState] = useState({
    data: null,
    error: null,
    loading: false
  });
  
  const openModal = (checker) => {
    if (checker) setSignUp(true);
    else setSignUp(false);
    setOpen(true);
  };
  const closeModal = (e) => {
    if (e.target.getAttribute("aria-label")) setOpen(false);
  };

  const fetchUserJwt = async () => {
    setAuthState({data: null, error: null, loading: true});
    const jwt = getCookie('jwt');

    if(!jwt) return setAuthState({data: null, error: null, loading: false});
    
    const response = await axios("https://opentable-clone-seven.vercel.app/api/auth/me", {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    .catch(err => setAuthState({ data: null, error: err.response.data.errMsg, loading: false }));

    if(response) setAuthState({ data: response.data, error: null, loading: false });
  }

  useEffect(() => {
    fetchUserJwt();
  }, [])

  return (
    <AppContext.Provider value={{ open, signUp, setOpen, openModal, closeModal, ...authState, setAuthState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
