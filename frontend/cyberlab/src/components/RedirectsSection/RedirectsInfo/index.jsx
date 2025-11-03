import { IoMdArrowBack } from "react-icons/io";
import content from "../../../assets/content/redirects.json";
import "./styles.scss";

export default function RedirectsInfo() {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoToQuiz = () => {
    window.location.href = "/redirects/quiz";
  };

  return (
    <div className="redirects-card">
      <IoMdArrowBack onClick={handleGoBack} style={{ cursor: "pointer" }} />
      <div className="redirects-header">
        <div>
          <h2 className="redirects-title">{content.intro.title}</h2>
          <p className="redirects-intro">{content.intro.summary}</p>
        </div>
      </div>

      <div className="redirects-body">
        <div className="redirects-sections">
          <div className="redirects-section">
            <h3>{content.whatAreRedirects.title}</h3>
            <p>{content.whatAreRedirects.description}</p>
            <div className="example-box">
              <h4>{content.whatAreRedirects.realWorldExample.title}</h4>
              <h5>{content.whatAreRedirects.realWorldExample.scenario}</h5>
              <h5>{content.whatAreRedirects.realWorldExample.attack}</h5>
              <p>{content.whatAreRedirects.realWorldExample.impact}</p>
              
            </div>
          </div>

          <div className="redirects-section">
            <h3>{content.howItWorks.title}</h3>
            <ul>
              {content.howItWorks.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>

          <div className="redirects-section">
            <h3>{content.commonParameters.title}</h3>
            <p>{content.commonParameters.description}</p>
            <ul>
              {content.commonParameters.params.map((param, index) => (
                <li key={index}>
                  <code>{param}</code>
                </li>
              ))}
            </ul>
          </div>

          <div className="redirects-section">
            <h3>{content.attackVectors.title}</h3>
            <div className="vectors-list">
              {content.attackVectors.vectors.map((vector, index) => (
                <div key={index} className="vector-card">
                  <h4>{vector.name}</h4>
                  <p>{vector.description}</p>
                  <div className="payload">{vector.payload}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="redirects-section">
            <h3>{content.realWorldImpact.title}</h3>
            {content.realWorldImpact.cases.map((caseItem, index) => (
              <div key={index} className="example-box">
                <h4>{caseItem.company}</h4>
                <p>
                  <strong>Year:</strong> {caseItem.year}
                </p>
                <p>
                  <strong>Impact:</strong> {caseItem.impact}
                </p>
              </div>
            ))}
          </div>

          <div className="redirects-section">
            <h3>{content.defenses.title}</h3>
            <div className="defenses-list">
              {content.defenses.methods.map((method, index) => (
                <div key={index} className="defense-card">
                  <h4>{method.name}</h4>
                  <p>{method.description}</p>
                  {method.code && <pre>{method.code}</pre>}
                </div>
              ))}
            </div>
          </div>

          <div className="redirects-section">
            <div className="owasp-box">
              <h3>{content.owasp.title}</h3>
              <p>{content.owasp.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="redirects-actions">
        <button
          onClick={() => (window.location.href = "/redirects/methodology")}
          className="redirects-btn tertiary desktop-only"
        >
          Start Pentest Methodology
        </button>
        <button
          onClick={() => (window.location.href = "/redirects/tasks")}
          className="redirects-btn tertiary desktop-only"
        >
          Practical Challenges
        </button>
        <button
          onClick={handleGoToQuiz}
          className="redirects-btn tertiary desktop-only"
        >
          Test Your Knowledge (Quiz)
        </button>
      </div>
    </div>
  );
}