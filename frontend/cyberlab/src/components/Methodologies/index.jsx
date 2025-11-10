import "./styles.scss";
import PhishingImg from "../../assets/images/PhishingIcon.png";
import XSSImg from "../../assets/images/XSSIcon.png";
import CSRFImg from "../../assets/images/CSRFIcon.png";
import SQLImg from "../../assets/images/SqlInjectionIcon.png";
import { Link } from "react-router-dom";
import RedirectsImg from "../../assets/images/RedirectsIcon.png";
import MethodologiesImg from "../../assets/images/MethodologiesIcon.png";

export default function Methodologies() {
  return (
    <div className="main-page-container">
      
      {/* Phishing */}
      <div className="grid-item phishing">
        <div className="phishing-content">
          <Link to="/phishing/methodology" className="phishing-link">
            <span>Phishing Methodologies</span>
            <img
              src={PhishingImg}
              alt="Phishing attack "
              className="main-page-attack-img"
            />
          </Link>
        </div>
      </div>
      {/* SQL Injection */}
      <div className="grid-item">
        <div className="sql-injection-content">
          <Link to="/sql-injection/methodology" className="sql-injection-link">
            <span>SQL Injection Methodologies</span>
            <img
              src={SQLImg}
              alt="SQL Injection attack"
              className="main-page-attack-img"
            />
          </Link>
        </div>
      </div>
      {/* Cross-Site Scripting */}
      <div className="grid-item xss">
        <div className="xss-content">
          <Link to="/xss/methodology" className="xss-link">
            <span>Cross-Site Scripting Methodologies</span>
            <img
              src={XSSImg}
              alt="Cross-Site Scripting attack"
              className="main-page-attack-img"
            />
          </Link>
        </div>
      </div>
      {/* CSRF */}
      <div className="grid-item csrf">
        <Link to="/csrf/methodology" className="csrf-link">
          <span>CSRF Methodologies</span>
          <img
            src={CSRFImg}
            alt="Cross-Site Request Forgery attack"
            className="main-page-attack-img"
          />
        </Link>
      </div>
      <div className="grid-item redirects">
        <Link to="/redirects/methodology" className="redirects-link">
          <span>Redirects Methodologies</span>
          <img
            src={RedirectsImg}
            alt="Redirects attack"
            className="main-page-attack-img"
          />
        </Link>
      </div>
            <div className="grid-item redirects">
              <Link to="/interactive-pentest" className="redirects-link">
                <span>Try to perform a pentest on your own </span>
                <img
                  src={MethodologiesImg}
                  alt="Methodologies"
                  className="main-page-attack-img"
                />
              </Link>
            </div>
    </div>
  );
}
