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
              {content.whatIsSqlInjection.title}
            </h3>
            <p className="sql-section-text">
              {content.whatIsSqlInjection.text}
            </p>
          </div>
          <div className="sql-section">
            <div className="sql-section-title">
              <h3>{content.whyIsItDangerous.title}</h3>
              <p className="sql-section-text">
                <ul>
                  {content.whyIsItDangerous.risks.map((risk, index) => (
                    <li key={index}>{risk}</li>
                  ))}
                </ul>
              </p>
            </div>
          </div>
          <div className="sql-section">
            <div className="sql-section-title">
              <h3>{content.occurrenceConditions.title}</h3>
              <p className="sql-section-text">
                <ul>
                  {content.occurrenceConditions.places.map((place, index) => (
                    <li key={index}>{place}</li>
                  ))}
                </ul>
              </p>
            </div>
          </div>
          <div className="sql-section">
            <div className="sql-section-title">
              <h3>{content.typicalCodingMistakes.title}</h3>
              <p className="sql-section-text">
                <ul>
                  {content.typicalCodingMistakes.mistakes.map(
                    (mistake, index) => (
                      <li key={index}>{mistake}</li>
                    )
                  )}
                </ul>
              </p>
            </div>
          </div>
          {/* How to protect */}
          {/* <div className="sql-section">
            <div className="sql-section-title">
              <h3>{content.typicalCodingMistakes.title}</h3>
              <p className="sql-section-text">
                <ul>
                  {content.typicalCodingMistakes.mistakes.map((mistake, index) => (
                    <li key={index}>{mistake}</li>
                  ))}
                </ul>
              </p>
            </div>
          </div> */}
          <div className="sql-section">
            <div className="sql-section-title">
              <h3>{content.detectionAndMonitoring.description}</h3>
              <p className="sql-section-text">
                <ul>
                  {content.detectionAndMonitoring.points.map(
                    (method, index) => (
                      <li key={index}>{method}</li>
                    )
                  )}
                </ul>
              </p>
            </div>
          </div>
          <div className="sql-section">
            <div className="sql-section-title">
              <h3>{content.secureCodePolicyExamples.title}</h3>
              <p>{content.secureCodePolicyExamples.description}</p>
              <p className="sql-section-text">
                <ul>
                  {content.secureCodePolicyExamples.points.map(
                    (method, index) => (
                      <li key={index}>{method}</li>
                    )
                  )}
                </ul>
              </p>
            </div>
          </div>
          <div className="sql-section">
            <div className="sql-section-title">
              <h3>{content.specialAndDifficultCases.title}</h3>
              <p className="sql-section-text">
                <ul>
                  {content.specialAndDifficultCases.points.map(
                    (method, index) => (
                      <li key={index}>{method}</li>
                    )
                  )}
                </ul>
              </p>
            </div>
          </div>
          <div className="sql-section">
            <div className="sql-section-title">
              <h3>{content.commonMyths.title}</h3>
              <p>{content.commonMyths.description}</p>
              <p className="sql-section-text">
                <ul>
                  {content.commonMyths.points.map((method, index) => (
                    <li key={index}>{method}</li>
                  ))}
                </ul>
              </p>
            </div>
          </div>
          <div className="sql-section">
            <div className="sql-section-title">
              <h3>{content.summary.title}</h3>
              <p>{content.summary.description}</p>
              <p className="sql-section-text">
                <ul>
                  {content.summary.points.map((method, index) => (
                    <li key={index}>{method}</li>
                  ))}
                </ul>
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleGoToQuiz}
        className="phishing-btn primary desktop-only"
      >
        Start quiz
      </button>
    </div>
  );
}
