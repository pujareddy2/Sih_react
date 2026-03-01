import { Link } from "react-router-dom";
import logo from "../../images/sih.png";

function Header() {
  return (
    <>
      <div className="gov-strip">
        <div className="gov-container">
          <img
            src={logo}
            alt="SIH Logo"
            className="sih-logo"
          />

          <div className="gov-right">
            <Link to="/about">About SIH</Link>
            <Link to="/faqs">FAQs</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/login" className="login-btn">
              SIH Login
            </Link>
          </div>
        </div>
      </div>

      <div className="main-navbar">
        <div className="nav-container">
          <h2 className="brand">SMART INDIA HACKATHON 2025</h2>

          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/problems">Problem Statements</Link></li>
            <li><Link to="/guidelines">Guidelines</Link></li>
            <li><Link to="/faqs">FAQs</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;