import "../styles/globals.css"
import Link from "next/link";
import notFound from "../public/not-found.svg";

const Custom404 = () => {
    return (  
        <article className="page d-flex align-center justify-center flex-column ta-center p16">
            <img src={notFound.src} alt="helloo" className="w100p mw-420 mb-12" />
            <h3>404 - That page can't be found.</h3>
            <Link href="/" className="btn btn-m btn-prim capitalize">back to homepage</Link>
        </article>
    );
}
 
export default Custom404;