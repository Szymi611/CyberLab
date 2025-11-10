import "./styles.scss";
import content from "../../../assets/content/csrf.json";
import { IoMdArrowBack } from "react-icons/io";

export default function CSRFInfo() {
  const handleGoToQuiz = () => {
    window.location.href = "/csrf/quiz";
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="phishing-card">
      <IoMdArrowBack onClick={handleGoBack} style={{ cursor: "pointer" }} />
      <div className="phishing-header">
        <div>
          <h2 className="phishing-title">{content.intro.title}</h2>
          <p className="phishing-intro">{content.intro.summary}</p>
        </div>
      </div>

      <div className="phishing-body">
        <div className="phishing-sections">
          <div className="phishing-section">
            <h2>{content.whatIsCsrf.title}</h2>
            <p>{content.whatIsCsrf.text}</p>
            <h4>{content.whatIsCsrf.exampleScenario.title}</h4>
            <ul>
              {content.whatIsCsrf.exampleScenario.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>

          <div className="phishing-section">
            <h2>{content.whyIsItDangerous.title}</h2>
            <p>{content.whyIsItDangerous.description}</p>
            <ul>
              {content.whyIsItDangerous.impacts.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="phishing-section">
            <h2>{content.howItWorks.title}</h2>
            <ul>
              {content.howItWorks.details.map((detail, index) => (
                <p key={index}>{detail}</p>
              ))}
            </ul>
          </div>

          <div className="phishing-section">
            <h2>{content.conditionsForOccurrence.title}</h2>
            <p>
              {content.conditionsForOccurrence.conditions.map(
                (condition, index) => (
                  <span key={index}>
                    {condition}
                    <br />
                  </span>
                )
              )}
            </p>
          </div>

          <div className="phishing-section">
            <h2>{content.typicalCodingMistakes.title}</h2>
            <p>
              {content.typicalCodingMistakes.mistakes.map((mistake, index) => (
                <span key={index}>
                  {mistake}
                  <br />
                </span>
              ))}
            </p>
          </div>

          <div className="phishing-section">
            <h2>{content.commonVectors.title}</h2>
            <p>
              {content.commonVectors.vectors.map((vector, index) => (
                <span key={index}>
                  {vector}
                  <br />
                </span>
              ))}
            </p>
          </div>

          <div className="phishing-section">
            <h2>{content.howToProtect.title}</h2>
            <p>{content.howToProtect.description}</p>
            <h3>Protection methods</h3>
            <ul>
              <h2>{content.howToProtect.methods.antiCsrfTokens.title}</h2>
              <p>{content.howToProtect.methods.antiCsrfTokens.description}</p>
              <h4>Key points:</h4>
              <ul>
                {content.howToProtect.methods.antiCsrfTokens.keyPoints.map(
                  (point, index) => (
                    <li key={index}>{point}</li>
                  )
                )}
              </ul>
              <h4>Example: </h4>
              <p>
                {content.howToProtect.methods.antiCsrfTokens.example.language} -{" "}
                {content.howToProtect.methods.antiCsrfTokens.example.concept}
              </p>
              <pre className="code-block">
                <code>
                  {content.howToProtect.methods.antiCsrfTokens.example.code.join(
                    "\n"
                  )}
                </code>
              </pre>{" "}
              <h2>{content.howToProtect.methods.sameSiteCookies.title}</h2>
              <p>{content.howToProtect.methods.sameSiteCookies.description}</p>
              <pre className="code-block">
                <code>
                  {
                    content.howToProtect.methods.sameSiteCookies.example
                      .cookieHeader
                  }
                </code>
              </pre>
              <h2>
                {content.howToProtect.methods.originRefererValidation.title}
              </h2>
              <p>
                {
                  content.howToProtect.methods.originRefererValidation
                    .description
                }
              </p>
              <ul>
                {content.howToProtect.methods.originRefererValidation.notes.map(
                  (rule, index) => (
                    <li key={index}>
                      {" "}
                      {index + 1}) {rule}
                    </li>
                  )
                )}
              </ul>
              <h2>{content.howToProtect.methods.corsPolicy.title}</h2>
              <p>{content.howToProtect.methods.corsPolicy.description}</p>
              <ul>
                {content.howToProtect.methods.corsPolicy.rules.map(
                  (rule, index) => (
                    <li key={index}>
                      {" "}
                      {index + 1}) {rule}
                    </li>
                  )
                )}
              </ul>
              <h2>{content.howToProtect.methods.customHeaders.title}</h2>
              <p>{content.howToProtect.methods.customHeaders.description}</p>
              <p>{content.howToProtect.methods.customHeaders.note}</p>
              <h2>{content.howToProtect.methods.avoidUnsafeMethods.title}</h2>
              <p>
                {content.howToProtect.methods.avoidUnsafeMethods.description}
              </p>
              <p>{content.howToProtect.methods.avoidUnsafeMethods.benefit}</p>
              <h2>
                {content.howToProtect.methods.logoutAndSessionPolicies.title}
              </h2>
              <p>
                {
                  content.howToProtect.methods.logoutAndSessionPolicies
                    .description
                }
              </p>
              <ul>
                {content.howToProtect.methods.logoutAndSessionPolicies.recommendations.map(
                  (recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                  )
                )}
              </ul>
              <h2>{content.howToProtect.methods.frameworkSupport.title}</h2>
              <p>{content.howToProtect.methods.frameworkSupport.description}</p>
              <ul>
                {content.howToProtect.methods.frameworkSupport.examples.map(
                  (example, index) => (
                    <li key={index}>{example}</li>
                  )
                )}
              </ul>
            </ul>
          </div>

          <div className="phishing-section">
            <h2>{content.detectionAndMonitoring.title}</h2>
            <p>{content.detectionAndMonitoring.text}</p>
            <ul>
              {content.detectionAndMonitoring.techniques.map(
                (method, index) => (
                  <li key={index}>{method}</li>
                )
              )}
            </ul>
          </div>

          <div className="phishing-section">
            <h2>{content.securityPolicyExamples.title}</h2>
            <ul>
              {content.securityPolicyExamples.policies.map((policy, index) => (
                <li key={index}>{policy}</li>
              ))}
            </ul>
          </div>

          <div className="phishing-section">
            <h2>{content.commonMyths.title}</h2>
            <ul>
              {content.commonMyths.myths.map((myth, index) => (
                <li key={index}>{myth}</li>
              ))}
            </ul>
          </div>

          <div className="phishing-section">
            <h2>{content.specialCases.title}</h2>
            <ul>
              {content.specialCases.cases.map((specialCase, index) => (
                <li key={index}>{specialCase}</li>
              ))}
            </ul>
          </div>

          <div className="phishing-section">
            <h2>{content.summary.title}</h2>
            <ul>
              {content.summary.keyTakeaways.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            <h4>{content.summary.finalNote}</h4>
          </div>
        </div>
      </div>

      <div className="sql-actions">
        <button
          onClick={() => (window.location.href = "/csrf/methodology")}
          className="phishing-btn tertiary desktop-only"
        >
          Start Pentest Methodology
        </button>
        <button
          onClick={() => (window.location.href = "/csrf/tasks/task1")}
          className="phishing-btn tertiary desktop-only"
        >
          Practical Challenges
        </button>
        <button
          onClick={handleGoToQuiz}
          className="phishing-btn tertiary desktop-only"
        >
          Test Your Knowledge (Quiz)
        </button>
      </div>
    </div>
  );
}
