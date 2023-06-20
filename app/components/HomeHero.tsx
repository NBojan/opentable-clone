import HeroForm from "./HeroForm";
import styles from "../../styles/Homepage/HomeHero.module.css";

const HomeHero = () => {
    return (  
        <div className={`${styles.homeHero} hero-gradient d-flex align-center justify-center`}>
            <div className="ta-center">
                <h2 className="col-fff mb-24">Find your table for any occasion</h2>
                <HeroForm />
            </div>
        </div>
    );
}
 
export default HomeHero;