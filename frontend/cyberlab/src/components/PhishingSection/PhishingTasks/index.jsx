import { Link } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { IoIosLink } from "react-icons/io";

import "./styles.scss";

export default function PhishingTasks() {
  return (
    <div className="phishing-tasks-container">
      <div className="grid-item">
        <div className="task-content">
          <Link to="/phishing/tasks/emailAnalysis" className="phishing-link">
            <span>Email Analiziator</span>
            <MdOutlineMail alt="Email Analiziator" className="main-page-task-img" size={64}/>
          </Link>
        </div>
      </div>{" "}
      <div className="grid-item">
        <Link to="/phishing/tasks/urlInspector" className="phishing-link">
          <span>URL Inspector</span>
          <IoIosLink alt="URL Inspector" className="main-page-task-img" size={64}/>
        </Link>
      </div>
      <div className="grid-item">Another tasks comming soon</div>
    </div>
  );
}
