import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");

  const handleLogin = () => {
    login({ username, role });
    navigate("/");
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <h2>Login</h2>

        <div className={styles.control}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            className={styles.inputField}
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.control}>
          <label htmlFor="role">Role</label>
          <select
            id="role"
            className={styles.selectField}
            value={role}
            onChange={(e) => setRole(e.target.value as "user" | "admin")}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button className={styles.loginButton} onClick={handleLogin}>
          Login
        </button>

        <div className={styles.loginNote}>
          Tip: Enter any username and pick a role to see role-based pages.
        </div>
      </div>
    </div>
  );
};

export default Login;