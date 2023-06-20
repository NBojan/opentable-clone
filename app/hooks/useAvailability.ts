import axios from "axios";
import { useState } from "react";

const url = "http://localhost:3000/api/restaurant/";

const useAvailability = () => {
    const [data, setData] = useState<{time:string, available:boolean, day:string, partySize:string}[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const getAvailabilites = async (slug: string, day: string, time: string, partySize: string) => {
        setLoading(true);
        setError(null);

        const response = await axios(`${url}${slug}/availability?day=${day}&time=${time}&partySize=${partySize}`)
        .catch(err => setError(err.response.data.errMsg));

        if(response) setData(response.data);
        
        setLoading(false);
    }

    return { data, error, loading, getAvailabilites }
}
 
export default useAvailability;