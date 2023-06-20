import axios from "axios";
import { useState } from "react";
import { useGlobalContext } from "../context/context";
import { removeCookies } from "cookies-next";

const useAuth = () => {
    const { setAuthState, setOpen } = useGlobalContext();

    /*SIGN IN*/
    const signInFunc = async (inputs: {email:string, password:string}) => {
        setAuthState({data: null, error: null, loading: true})

        const response = await axios.post("http://localhost:3000/api/auth/signin", inputs)
        .catch(err => setAuthState({data: null, error: err.response.data.errMsg, loading: false}));

        if(response) {
            setAuthState({data: response.data, error: null, loading: false});
            setOpen(false);
        }
    };

    /*SIGN UP*/
    const signUpFunc = async (inputs: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      city: string;
      password: string;
    }) => {
      setAuthState({ data: null, error: null, loading: true });

      const response = await axios
        .post("http://localhost:3000/api/auth/signup", inputs)
        .catch((err) =>
          setAuthState({ data: null, error: err.response.data.errMsg, loading: false })
        );

      if (response) {
        setAuthState({ data: response.data, error: null, loading: false });
        setOpen(false);
      }
    };


    /*SIGN OUT*/
    const signOutFunc = () => {
      removeCookies("jwt");
      setAuthState({data: null, error: null, loading: false})
    }

    return { signInFunc, signUpFunc, signOutFunc }
}
 
export default useAuth;