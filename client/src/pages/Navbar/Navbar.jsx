import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className={styles.nav}>
      <p className={styles.text}>JobFinder</p>
      <div>
        {localStorage.getItem("token") ? (
          <>
            <span onClick={handleLogout} className={styles.loggedInText}>
              Logout
            </span>
            <span className={styles.loggedInText}>Hello Recruiter</span>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")} className={styles.login}>
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className={styles.register}
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
