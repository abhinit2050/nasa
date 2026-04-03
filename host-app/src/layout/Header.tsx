import { Link } from "react-router-dom";
import "./Layout.css"
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Header() {

    const {user, logout} = useAuth();
    const {mode, toggleTheme} = useTheme();

  return (
    <header className="header">
      <h2>🚀 Space Explorer</h2>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/apod">APOD</Link>
        <Link to="/mars">Mars</Link>
      {user && <Link to="/collections">Collections</Link>}

        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <div className="authArea">
            <span className="userGreeting">Hi {user?.username}</span>
            <button className="authButton" onClick={logout}>
              Logout
            </button>
            <button className="themeButton" onClick={toggleTheme}>
                {mode === "dark" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}