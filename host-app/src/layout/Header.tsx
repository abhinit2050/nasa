import { Link } from "react-router-dom";
import "./Layout.css"

export default function Header() {
  return (
    <header className="header">
      <h2>🚀 Space Explorer</h2>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/apod">APOD</Link>
        <Link to="/mars">Mars</Link>
        <Link to="/collections">Collections</Link>
      </nav>
    </header>
  );
}