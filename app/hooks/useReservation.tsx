import axios from "axios";
import { useState } from "react";

const url = "https://opentable-clone-seven.vercel.app/api/restaurant/";

const useReservation = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getReservation = async (
    queries: {
      slug: string;
      day: string;
      time: string;
      partySize: string;
    },
    values: {
      bookerFirstName: string;
      bookerLastName: string;
      bookerEmail: string;
      bookerPhone: string;
      bookerOccasion: string;
      bookerRequest: string;
    }
  ) => {
    const { slug, day, time, partySize } = queries;
    setLoading(true);
    setError(null);

    const response = await axios.post(`${url}${slug}/reserve?day=${day}&time=${time}&partySize=${partySize}`, {
        ...values
    })
    .catch((err) => setError(err.response.data.errMsg));

    if (response) setData(response.data);

    setLoading(false);
  };

  return { data, error, loading, getReservation };
};

export default useReservation;
