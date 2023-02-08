import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "./Container";
import styles from "./Navbar.module.css";
import logo from "../../img/costs_logo.png";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(token !== null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token1");
    setIsLoggedIn(false);
    window.location = "/login";
  };

  return (
    <nav className={styles.navbar}>
      <Container>
        <Link to="/">
          <img src={logo} width="64" height="64" alt="logo"></img>
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.item}>
            <Link to="/projects">Pojetos</Link>
          </li>
          <li className={styles.item}>
            <Link to="/contact">Contato</Link>
          </li>
          <li className={styles.item}>
            <Link to="/company">Company</Link>
          </li>
          <li className={styles.item}>
            <button
              type="button"
              className={styles.red_btn}
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default NavBar;
