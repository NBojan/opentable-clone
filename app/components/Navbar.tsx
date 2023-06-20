"use client";

import Link from "next/link";
import useAuth from "../hooks/useAuth";
import styles from "../../styles/Navbar.module.css";
import { useGlobalContext } from "../context/context";

const Navbar = () => {
  const { signOutFunc } = useAuth();
  const { openModal, loading, data } = useGlobalContext();

  return (
    <section className={styles.navSection}>
      <nav className="d-flex align-center space-between">
        <Link href="/" className={styles.logo}>
          OpenTable
        </Link>

        {loading ? (
          <div className={styles.loading}></div>
        ) : (
          <div className="d-flex align-center">
            {data ? (
              <>
                <p className={`mr-8 ${styles.name} capitalize`}>
                  {data.firstName} {data.lastName.slice(0, 1)}.
                </p>
                <button
                  type="button"
                  className="btn btn-m btn-prim capitalize"
                  onClick={signOutFunc}
                >
                  sign out
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-m btn-prim mr-8 capitalize"
                  onClick={() => openModal(false)}
                >
                  sign in
                </button>
                <button
                  type="button"
                  className="btn btn-m btn-signup capitalize"
                  onClick={() => openModal(true)}
                >
                  sign up
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </section>
  );
};

export default Navbar;
