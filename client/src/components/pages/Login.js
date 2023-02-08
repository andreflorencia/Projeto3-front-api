import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const enroll = "http://localhost:8801/user/enroll";
      const authUrl = "http://localhost:8800/api/auth/login";
      const authRes = await axios.post(authUrl, data);
      const enrollData = {
        id: "admin",
        secret: "adminpw",
      };
      const enrrolRes = await axios.post(enroll, enrollData);
      console.log(authRes);
      console.log(enrrolRes);
      localStorage.setItem("token1", enrrolRes.data.token);
      localStorage.setItem("token", authRes.data.accessToken);

      navigate("/");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Entre na sua Conta</h1>
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Entrar na Conta
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>Novo aqui ?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Registo
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
