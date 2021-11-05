import React from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/Layout.module.css";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <Navbar></Navbar>
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
      </div>
      <Footer/>
    </>
  );
}

export default Layout;
