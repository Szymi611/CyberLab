import "./MainPage.scss";
import PhishingImg from "../../assets/images/PhishingIcon.png";
import XSSImg from "../../assets/images/XSSIcon.png";
import CSRFImg from "../../assets/images/CSRFIcon.png";
import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div className="main-page-container">
      {/* Phishing */}

      <div className="grid-item phishing">
        <div className="phishing-content">
          <Link to="/phishing" className="phishing-link">
            <span>Phishing</span>
            <img
              src={PhishingImg}
              alt="Phishing attack "
              className="main-page-attack-img"
            />
          </Link>
        </div>
      </div>
      {/* SQL Injection */}
      <div className="grid-item">SQL Injection</div>
      {/* Cross-Site Scripting */}
      <div className="grid-item xss">
        Cross-Site Scripting(XSS)
        <img
          src={XSSImg}
          alt="Cross-Site Scripting attack"
          className="main-page-attack-img"
        />
      </div>
      {/* CSRF */}
      <div className="grid-item csrf">
        CSRF
        <img
          src={CSRFImg}
          alt="Cross-Site Scripting attack"
          className="main-page-attack-img"
        />
      </div>
      <div className="grid-item div5">Directory Trav</div>
      <div className="grid-item div6">XSS DOM</div>
    </div>
  );
}
