import { login } from "../services/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import LoginImage from "../assets/login.png";
export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    login(data).then((response) => {
      alert(`Welcome, ${response.data.name}`);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      navigate("/jobs");
    });
  };
  return (
    <div style={{ display: "flex" }}>
      <div className={styles.container}>
        <h1 className={styles.h1}>Already have an account ?</h1>
        <h2 className={styles.h2}>Your personal job finder is here</h2>
        <input
          className={styles.input}
          name="email"
          value={data.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
        ></input>
        <input
          className={styles.input}
          name="password"
          value={data.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
        ></input>
        <button onClick={handleLogin} className={styles.button}>
          Sign in
        </button>
        <p className={styles.footer}>
          Don&apos;t have an account?
          <span
            onClick={() => navigate("/register")}
            className={styles.underline}
          >
            Sign Up
          </span>
        </p>
      </div>
      <img style={{ maxHeight: "100vh", width: "50vw" }} src={LoginImage} />
    </div>
  );
}
