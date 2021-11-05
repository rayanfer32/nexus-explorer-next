import styles from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

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
