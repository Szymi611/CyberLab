import { Link } from "react-router-dom";

export default function SQLInjectionTasks() {
  return (
    <div className="phishing-tasks-container">
      <div className="grid-item">
        <div className="task-content">
          <Link to="" className="phishing-link">
            <span>Zadanie 1</span>
            Ikona
          </Link>
        </div>
      </div>{" "}
      <div className="grid-item">
        <Link to="" className="phishing-link">
          <span>ZAdanie 2</span>
          ikona
        </Link>
      </div>
      <div className="grid-item">Another tasks comming soon</div>
    </div>
  );
}
