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
          <div className="sql-section">
            <div className="sql-section-title">
              <h3>{content.howToProtect.title}</h3>
              <p className="sql-section-text">
                {content.howToProtect.description}
              </p>
              <div>
                <h3>1. {content.howToProtect.methods.preparedStatements.title}</h3>
                <p>
                  {content.howToProtect.methods.preparedStatements.description}
                </p>
                <div className="sql-examples">
                  <h4>Examples:</h4>
                  {content.howToProtect.methods.preparedStatements.examples.map(
                    (ex, i) => (
                      <div key={i} className="sql-example">
                        <p>
                          <strong>{ex.language}</strong>
                        </p>
                        <p>Placeholder style: {ex.placeholderStyle}</p>
                        {ex.sql && <pre className="sql-message">{ex.sql}</pre>}
                        {ex.sqlTemplate && (
                          <pre className="sql-message">{ex.sqlTemplate}</pre>
                        )}
                        {ex.params && (
                          <p>Params: {JSON.stringify(ex.params)}</p>
                        )}
                        {ex.paramsConstruction && (
                          <pre className="sql-message">
                            {JSON.stringify(ex.paramsConstruction, null, 2)}
                          </pre>
                        )}
                        <p>{ex.note}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div>
                <h3>2. {content.howToProtect.methods.useOrmWisely.title}</h3>
                <p>{content.howToProtect.methods.useOrmWisely.description}</p>
                <p>
                  <ul>
                    {content.howToProtect.methods.useOrmWisely.recommendations.map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                </p>
              </div>
              <div>
                <h3>3. {content.howToProtect.methods.leastPrivilege.title}</h3>
                <p>{content.howToProtect.methods.leastPrivilege.description}</p>
                <p>
                  <ul>
                    {content.howToProtect.methods.leastPrivilege.recommendations.map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                </p>
              </div>
              <div>
                <h3>4. {content.howToProtect.methods.inputValidation.title}</h3>
                <p>{content.howToProtect.methods.inputValidation.description}</p>
                <p>
                  <ul>
                    {content.howToProtect.methods.inputValidation.recommendations.map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                </p>
              </div>
              <div>
                <h3>5. {content.howToProtect.methods.avoidDynamicSql.title}</h3>
                <p>{content.howToProtect.methods.avoidDynamicSql.description}</p>
                <p>
                  <ul>
                    {content.howToProtect.methods.avoidDynamicSql.recommendations.map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                </p>
              </div>
              <div>
                <h3>6. {content.howToProtect.methods.errorHandling.title}</h3>
                <p>{content.howToProtect.methods.errorHandling.description}</p>
                <p>
                  <ul>
                    {content.howToProtect.methods.errorHandling.recommendations.map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                </p>
              </div>
              <div>
                <h3>7. {content.howToProtect.methods.webApplicationFirewall.title}</h3>
                <p>{content.howToProtect.methods.webApplicationFirewall.description}</p>
                <p>
                  <ul>
                    {content.howToProtect.methods.webApplicationFirewall.recommendations.map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                </p>
              </div>
              <div>
                <h3>8. {content.howToProtect.methods.monitoringAndLogging.title}</h3>
                <p>{content.howToProtect.methods.monitoringAndLogging.description}</p>
                <p>
                  <ul>
                    {content.howToProtect.methods.monitoringAndLogging.recommendations.map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                </p>
              </div>
              <div>
                <h3>9. {content.howToProtect.methods.regularSecurityTesting.title}</h3>
                <p>{content.howToProtect.methods.regularSecurityTesting.description}</p>
                <p>
                  <ul>
                    {content.howToProtect.methods.regularSecurityTesting.recommendations.map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                </p>
              </div>
              <div>
                <h3>10. {content.howToProtect.methods.secureDatabaseConfig.title}</h3>
                <p>{content.howToProtect.methods.secureDatabaseConfig.description}</p>
                <p>
                  <ul>
                    {content.howToProtect.methods.secureDatabaseConfig.recommendations.map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                </p>
              </div>
            </div>
          </div>
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
