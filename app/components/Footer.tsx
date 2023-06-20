import styles from "../../styles/Footer.module.css";

const Footer = () => {
    return (  
        <section className={styles.footerSection}>
            <footer className="d-flex flex-column align-center justify-center">
                <p className="col-prim-5">NBojan</p>
                <p className="col-fff ta-center">
                    Created with <span className="col-prim-5">NextJS</span>, © {new Date().getFullYear()} 
                </p>
            </footer>
        </section>
    );
}
 
export default Footer;