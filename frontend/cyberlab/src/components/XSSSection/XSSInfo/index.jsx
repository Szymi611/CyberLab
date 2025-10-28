import { IoMdArrowBack } from "react-icons/io";
import content from "../../../assets/content/xss.json";
import "./styles.scss";

export default function XSSInfo() {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoToQuiz = () => {
    window.location.href = "/xss/quiz";
  };

  return (
    <div className="xss-card">
      <IoMdArrowBack onClick={handleGoBack} style={{ cursor: "pointer" }} />
      <div className="xss-header">
        <div>
          <h2 className="xss-title">{content.intro.title}</h2>
        </div>
      </div>
      <div className="xss-body">
        <div className="xss-sections">
          <div className="xss-section">
            <h3 className="xss-section-title">{content.whatIsXss.title}</h3>
            <div className="xss-section-text">{content.whatIsXss.text}</div>
          </div>
          <div className="xss-section">
            <h3 className="xss-section-title">
              {content.whyIsItDangerous.title}
            </h3>
            <div className="xss-section-text">
              <ul>
                {content.whyIsItDangerous.risks.map((risk, index) => (
                  <li key={index}>{risk}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="xss-section">
            <h3 className="xss-section-title">{content.typesOfXss.title}</h3>
            <div className="xss-section-text">
              <ul>
                {Object.values(content.typesOfXss.types).map((type, index) => (
                  <li key={index}>
                    <h4>{type.name}</h4>
                    <p>{type.description}</p>
                    <pre className="xss-message">{type.example}</pre>
                    <p>{type.howItWorks}</p>
                    <p>{type.realWorldScenario}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="xss-section">
            <h3 className="xss-section-title">
              {content.occurrenceConditions.title}
            </h3>
            <div className="xss-section-text">
              <ul>
                {content.occurrenceConditions.places.map((place, index) => (
                  <li key={index}>{place}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="xss-section">
            <h3 className="xss-section-title">
              {content.typicalCodingMistakes.title}
            </h3>
            <div className="xss-section-text">
              <ul>
                {content.typicalCodingMistakes.mistakes.map(
                  (mistake, index) => (
                    <li key={index}>{mistake}</li>
                  )
                )}
              </ul>
            </div>
          </div>
          <div className="xss-section">
            <h3 className="xss-section-title">{content.howToProtect.title}</h3>
            <div className="xss-section-text">
              {content.howToProtect.description}
            </div>
            <div className="xss-section-text">
              <ul>
                {Object.values(content.howToProtect.methods).map(
                  (method, index) => (
                    <li key={index}>
                      <h3>{method.title}</h3>
                      <p>{method.description}</p>
                      {method.encodingTypes && (
                        <div className="xss-encoding-types">
                          {Object.values(method.encodingTypes).map((enc, i) => (
                            <div key={i} style={{ marginBottom: "1rem" }}>
                              <h4>{enc.title}</h4>
                              <p>{enc.description}</p>
                              {enc.example && (
                                <pre className="xss-message">{enc.example}</pre>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      {method.recommendations && (
                        <div className="xss-section-text">
                          <ul>
                            {method.recommendations.map(
                              (recommendation, index) => (
                                <li key={index}>{recommendation}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
          <div className="xss-section">
            <h3 className="xss-section-title">
              {content.detectionAndMonitoring.title}
            </h3>
            <div className="xss-section-text">
              {content.detectionAndMonitoring.description}
            </div>
            <div className="xss-section-text">
              <ul>
                {content.detectionAndMonitoring.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="xss-section">
            <h3 className="xss-section-title">
              {content.secureCodePolicyExamples.title}
            </h3>
            <div className="xss-section-text">
              {content.secureCodePolicyExamples.description}
            </div>
            <div className="xss-section-text">
              <ul>
                {content.secureCodePolicyExamples.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="xss-section">
            <h3 className="xss-section-title">{content.commonMyths.title}</h3>
            <div className="xss-section-text">
              {content.commonMyths.description}
            </div>
            <div className="xss-section-text">
              <ul>
                {content.commonMyths.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="xss-section">
            <h3 className="xss-section-title">
              {content.realWorldExamples.title}
            </h3>
            <div className="xss-section-text">
              {content.realWorldExamples.description}
            </div>
            <div className="xss-section-text">
              <ul>
                {content.realWorldExamples.examples.map((example, index) => (
                  <li key={index}>
                    <div>
                      <h3>{example.name}</h3>
                      <p>{example.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="xss-section">
            <h3 className="xss-section-title">{content.summary.title}</h3>
            <p className="xss-section-text">{content.summary.description}</p>
            <div className="xss-section-text">
              <ul>
                {content.summary.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="xss-actions">
        <button
          onClick={() => (window.location.href = "/xss/methodology")}
          className="xss-btn tertiary desktop-only"
        >
          Start Pentest Methodology
        </button>
        <button
          onClick={() => (window.location.href = "/xss/tasks/task1")}
          className="xss-btn tertiary desktop-only"
        >
          Practical Challenges
        </button>
        <button
          onClick={handleGoToQuiz}
          className="xss-btn tertiary desktop-only"
        >
          Test Your Knowledge (Quiz)
        </button>
      </div>
    </div>
  );
}
