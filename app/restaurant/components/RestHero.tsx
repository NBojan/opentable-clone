import styles from "../../../styles/Restaurant/Restaurant.module.css";
import { Location } from "@prisma/client";

const RestHero = ({name, location}: {name:string, location: Location}) => {
    return (  
        <div className={`${styles.restHero} hero-gradient d-flex align-center justify-center ta-center`}>
            <h3 className="col-fff capitalize">{name} {`(${location.name})`}</h3>
        </div>
    );
}
 
export default RestHero;