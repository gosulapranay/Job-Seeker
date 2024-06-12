import { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";
import LoginImage from "../assets/login.png";
import styles from "./Register.module.css";
export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const registerUser = async (e) => {
    e.preventDefault();
    const response = await register(data);
    alert(response.data);
    navigate("/login");
  };
  console.log(data);
  return (
    <div style={{ display: "flex" }}>
      <div className={styles.container}>
        <h1 className={styles.h1}>Create an account</h1>
        <h2 className={styles.h2}>Your personal job finder is here</h2>
        <input
          className={styles.input}
          name="name"
          value={data.name}
          onChange={handleChange}
          type="text"
          placeholder="Name"
        ></input>
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
          name="mobile"
          value={data.mobile}
          onChange={handleChange}
          type="tel"
          placeholder="Mobile"
        ></input>
        <input
          className={styles.input}
          name="password"
          value={data.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
        ></input>
        <button onClick={registerUser} className={styles.button}>
          Create Account
        </button>
        <p className={styles.footer}>
          Already have an account?
          <span onClick={() => navigate("/")} className={styles.underline}>
            Sign in
          </span>
        </p>
      </div>
      <img style={{ maxHeight: "100vh", width: "50vw" }} src={LoginImage} />
    </div>
  );
}
