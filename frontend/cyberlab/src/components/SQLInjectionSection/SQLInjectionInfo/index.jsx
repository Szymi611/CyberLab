import { IoMdArrowBack } from "react-icons/io";
import content from "../../../assets/content/sql-injection.json";
import "./styles.scss";

export default function SQLInjectionInfo() {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoToQuiz = () => {
    window.location.href = "/sql-injection/quiz";
  };

  return (
    <div className="sql-card">
      <IoMdArrowBack onClick={handleGoBack} style={{ cursor: "pointer" }} />
      <div className="sql-header">
        <div>
          <h2 className="sql-title">{content.intro.title}</h2>
        </div>
      </div>
      <div className="sql-body">
        <div className="sql-sections">
          <div className="sql-section">
            <h3 className="sql-section-title">
              {content.whatIsSQLInjection.title}
            </h3>
            <p className="sql-section-text">
              {content.whatIsSQLInjection.text}
            </p>
          </div>
          <div className="sql-section">
            
          </div>
        </div>
      </div>
    </div>
  );
}
