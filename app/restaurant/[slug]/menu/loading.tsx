import styles from "../../../../styles/Restaurant/Restaurant.module.css";

const Loading = () => {
    return (  
        <>
            <div className={`${styles.restHero} hero-gradient d-flex align-center justify-center ta-center`}>
                <h3 className="col-fff capitalize">loading menu items</h3>
            </div>

            <div className="mt-32">
                <div className="loading"></div>
            </div>
        </>
    );
}
 
export default Loading;