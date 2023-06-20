"use client"

import styles from "../../styles/Modal.module.css";
import { ModalForm } from "./index";
import { useGlobalContext } from "../context/context";

const Modal = () => {
    const { open, signUp, closeModal } = useGlobalContext();
    return (  
        <aside className={`${styles.modal} ${open && styles.modalOpen}`} aria-label="modal" onClick={closeModal}>
            <div className={styles.modalBox}>
                <h5 className="ta-center uppercase border-b-grey pb-8 mb-24">{signUp ? "create account" : "sign in"}</h5>
                <h4 className="ta-center capitalize mb-24">{signUp ? "create your OpenTable account" : "log into your account"}</h4>
                <ModalForm />
            </div>
        </aside>
    );
}
 
export default Modal;