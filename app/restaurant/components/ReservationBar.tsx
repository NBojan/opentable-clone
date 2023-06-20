"use client"
import Link from "next/link";
import DatePicker from "react-datepicker";
import getWorkingTimes from "@/utils/findWorkingTimes";
import useAvailability from "@/app/hooks/useAvailability";
import styles from "../../../styles/Restaurant/Restaurant.module.css";
import { useState } from "react";
import { convertToDisplayTime, getDayIso } from "@/utils/convertTime";
import { partySize as partySizes } from "@/utils/partySize";

const ReservationBar = ({slug, openTime, closeTime} : {slug: string, openTime:string, closeTime:string}) => {
    const { data, loading, error, getAvailabilites } = useAvailability();
    const workingTimes = getWorkingTimes(openTime, closeTime);
    const [startDate, setStartDate] = useState(new Date());
    const [day, setDay] = useState(getDayIso(new Date()));
    const [time, setTime] = useState(openTime);
    const [partySize, setPartySize] = useState("2");
    
    const handleDate = (date : Date | null) => {
        if(!date) return
        else {
            setDay(getDayIso(date));
            setStartDate(date);
        }
    }

    const handleSubmit = () => getAvailabilites(slug, day, time, partySize);
    
    return (
        <div className={styles.barContainer}>
            <div className={`${styles.bar} box-shadow transition-2`}>
                <h5 className="pb-8 border-b-grey ta-center">Make a Reservation</h5>

                <div className={`${styles.formControl} d-flex flex-column pTB-16 border-b-grey`}>
                    <label htmlFor="partySize" className="mb-8">Party size</label>
                    <select name="partySize" id="partySize" value={partySize} onChange={e => setPartySize(e.target.value)}>
                        {partySizes.map(size => <option value={size.value} key={size.value}>{size.label}</option>)}
                    </select>
                </div>

                <div className={`${styles.barFlex} pTB-16 mb-16 d-flex space-between`}>
                    <div className={`${styles.formControl} d-flex flex-column border-b-grey`}>
                        <label htmlFor="day" className="mb-8">Date</label>
                        <DatePicker minDate={new Date()} selected={startDate} onChange={handleDate} dateFormat="MMM dd yyyy" />
                    </div>

                    <div className={`${styles.formControl} d-flex flex-column border-b-grey`}>
                        <label htmlFor="time" className="mb-8">Time</label>
                        <select name="time" id="time" value={time} onChange={e => setTime(e.target.value)}>
                            {workingTimes.map(time => <option value={time.time} key={time.time}>{time.displayTime}</option>)}
                        </select>
                    </div>
                </div>

                {error && <p className="ta-center mb-8 col-prim-5">{error}</p>}
                
                <button type="button" disabled={loading} className="btn btn-l btn-prim w100p disabled" onClick={handleSubmit}>
                    {loading ? <div className={styles.loading}></div> : "Find a Time"}
                </button>

                {data && (
                    <div className={`${styles.timesCont} d-flex flex-wrap space-between mt-16`}>
                        {data.length ?
                            data.map(item => {
                                const { time, day, partySize, available } = item;
                                if(!available) return <button key={time} className="btn col-fff disabled" disabled>{convertToDisplayTime(time)}</button>
                                return <Link href={{pathname: `/reserve/${slug}`, query: {day, time, partySize}}} key={time} className="btn btn-prim">
                                    {convertToDisplayTime(time)}
                                    </Link>
                            })  
                        : 
                            <p>No available times.</p>
                        }
                    </div>
                )} 
            </div>
        </div>
    );
}
 
export default ReservationBar;