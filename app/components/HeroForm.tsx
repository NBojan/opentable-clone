"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/Homepage/HomeHero.module.css";

const HeroForm = () => {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState("");

    const handleSubmit = () => {
        if(searchValue)router.push(`/search?location=${searchValue}`);
        else return;
    }

    return (  
        <form className={`d-flex justify-center ${styles.heroForm}`} onSubmit={e => e.preventDefault()}>
            <input type="text" placeholder="state, city or town" value={searchValue} onChange={e => setSearchValue(e.target.value)} required />
            <button type="submit" className="btn btn-m btn-prim capitalize ml-12" onClick={handleSubmit}>Let's go</button>
        </form>
    );
}
 
export default HeroForm;