import "./Layout.css";

export default function Footer() {

    const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {currentYear} Space Explorer | Built with NASA APIs</p>
    </footer>
  );
}