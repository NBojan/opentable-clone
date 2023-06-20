"use client";
import useAuth from "../hooks/useAuth";
import styles from "../../styles/Modal.module.css";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/context";

const ModalForm = () => {
  const { signInFunc, signUpFunc } = useAuth();
  const { signUp, error, loading } = useGlobalContext();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: ""
  });
  const [disabled, setDisabled] = useState(true);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleSubmit = () => {
    if(signUp) signUpFunc(values);
    else signInFunc({email: values.email, password: values.password})
  }

  useEffect(() => {
    if(signUp){
      if(!values.firstName || !values.lastName || !values.email || !values.phone || !values.city || !values.password){
          setDisabled(true);
          return
      }
      else setDisabled(false)
    }
    else {
      if(!values.email || !values.password){
        setDisabled(true);
        return
      }
      else setDisabled(false)
    }
  }, [values])

  return (
    <>
      <div className={`${styles.modalForm} d-flex space-between flex-wrap`}>
        {signUp && (
          <>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className={styles.shortInput}
              onChange={handleChange}
            />
            <input
              type="text" 
              name="lastName"
              placeholder="Last Name"
              className={styles.shortInput}
              onChange={handleChange}
            />
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className={styles.wideInput}
          onChange={handleChange}
        />

        {signUp && (
          <>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className={styles.shortInput}
              onChange={handleChange}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              className={styles.shortInput}
              onChange={handleChange}
            />
          </>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          className={styles.wideInput}
          onChange={handleChange}
        />
      </div>

      {error && <p className="ta-center mb-8 col-prim-5">{error}</p>}

      <button
        type="submit"
        className="btn btn-m btn-prim w100p uppercase disabled"
        disabled={disabled || loading}
        onClick={handleSubmit}
      >
        {signUp ? "create account" : "sign in"}
      </button>
    </>
  );
};

export default ModalForm;
