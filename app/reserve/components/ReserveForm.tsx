"use client";

import useReservation from "@/app/hooks/useReservation";
import styles from "../../../styles/Reserve/Reserve.module.css";
import { useEffect, useState } from "react";

const ReserveForm = ({
  queries,
}: {
  queries: {
    slug: string;
    day: string;
    time: string;
    partySize: string;
  };
}) => {
  const [values, setValues] = useState({
    bookerFirstName: "",
    bookerLastName: "",
    bookerEmail: "",
    bookerPhone: "",
    bookerOccasion: "",
    bookerRequest: "",
  });
  const {
    bookerFirstName,
    bookerLastName,
    bookerEmail,
    bookerPhone,
    bookerOccasion,
    bookerRequest,
  } = values;
  const [disabled, setDisabled] = useState(true);
  const { data, loading, error, getReservation } = useReservation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    getReservation(queries, values);
  };

  useEffect(() => {
    if (!bookerFirstName || !bookerLastName || !bookerEmail || !bookerPhone)
      setDisabled(true);
    else setDisabled(false);
  }, [values]);

  return (
    <>
      <h4 className="mTB-24">
        {data ? "Booking complete" : "You're almost done"}!
      </h4>
        
      <form className={styles.reserveForm} onSubmit={(e) => e.preventDefault()}>
        <div className="d-flex space-between flex-wrap">
          <input
            type="text"
            placeholder="First name"
            name="bookerFirstName"
            value={bookerFirstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Last name"
            name="bookerLastName"
            value={bookerLastName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Phone number"
            name="bookerPhone"
            value={bookerPhone}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="bookerEmail"
            value={bookerEmail}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Occasion (optional)"
            name="bookerOccasion"
            value={bookerOccasion}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Requests (optional)"
            name="bookerRequest"
            value={bookerRequest}
            onChange={handleChange}
          />
        </div>

        {error && <p className="ta-center mb-8 col-prim-5">{error}</p>}

        <button
          type="submit"
          disabled={disabled || loading}
          className="btn btn-l btn-prim w100p capitalize"
          onClick={handleSubmit}
        >
          {loading ? <div className={styles.loading}></div> : "complete reservation"}
        </button>
      </form>
    </>
  );
};

export default ReserveForm;
