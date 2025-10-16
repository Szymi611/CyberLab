import { useState } from "react";
import "./styles.scss";

export default function ScanningTask({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [answers, setAnswers] = useState({});

  const steps = [
    {
      id: "basic-payloads",
      title: "Basic Payload Testing",
      description: "Test the application with simple SQL injection payloads",
      task: (
        <div className="task-box">
          <h4>Testing Basic Payloads</h4>
          <p className="task-intro">
            Start with simple payloads to detect SQL injection vulnerabilities
          </p>

          <div className="payload-demo">
            <h5>Common Test Payloads:</h5>
            <div className="payload-list">
              <div className="payload-item">
                <code>' OR '1'='1</code>
                <span className="payload-desc">Classic authentication bypass</span>
              </div>
              <div className="payload-item">
                <code>' OR 1=1--</code>
                <span className="payload-desc">Comment out rest of query</span>
              </div>
              <div className="payload-item">
                <code>admin'--</code>
                <span className="payload-desc">Username enumeration</span>
              </div>
              <div className="payload-item">
                <code>' OR 'a'='a</code>
                <span className="payload-desc">Always true condition</span>
              </div>
            </div>
          </div>

          <div className="info-box">
            <h5>What to observe:</h5>
            <ul>
              <li>→ Error messages revealing database structure</li>
              <li>→ Different response times (blind SQL injection)</li>
              <li>→ Changes in application behavior</li>
              <li>→ Successful authentication/unauthorized access</li>
            </ul>
          </div>
        </div>
      ),
      question: "What is the primary goal of testing basic payloads?",
      options: [
        "To crash the application",
        "To detect if SQL injection vulnerability exists",
        "To steal data immediately",
        "To delete the database",
      ],
      correct: 1,
      explanation:
        "Basic payloads help identify if the application is vulnerable to SQL injection before attempting more advanced exploitation techniques.",
    },
    {
      id: "error-analysis",
      title: "Error Message Analysis",
      description: "Analyze database errors to gather information",
      task: (
        <div className="task-box">
          <h4>Analyzing Error Messages</h4>
          
          <div className="error-demo">
            <div className="error-box error-dangerous">
              <strong>Dangerous Error (Reveals Info):</strong>
              <code>
                You have an error in your SQL syntax; check the manual that
                corresponds to your MySQL server version for the right syntax
                to use near ''admin''' at line 1
              </code>
            </div>

            <div className="error-box error-safe">
              <strong>Safe Error (Generic):</strong>
              <code>Invalid credentials. Please try again.</code>
            </div>
          </div>

          <div className="tip-box">
            <p>
              <strong>Information Gathered:</strong>
            </p>
            <ul>
              <li>Database type: MySQL</li>
              <li>Vulnerable parameter: username field</li>
              <li>Query structure: Direct string concatenation</li>
              <li>No input sanitization</li>
            </ul>
          </div>

          <div className="info-list">
            <p><strong>Database Fingerprinting:</strong></p>
            <ul>
              <li>MySQL: "near" in error message</li>
              <li>PostgreSQL: "syntax error at or near"</li>
              <li>MS SQL: "Incorrect syntax near"</li>
              <li>Oracle: "ORA-" error codes</li>
            </ul>
          </div>
        </div>
      ),
      question: "What information can error messages reveal?",
      options: [
        "Only that an error occurred",
        "Database type, query structure, and vulnerable parameters",
        "User passwords",
        "Nothing useful",
      ],
      correct: 1,
      explanation:
        "Detailed error messages can reveal the database type, query structure, table/column names, and exactly where the injection point is - crucial information for exploitation.",
    },
    {
      id: "injection-types",
      title: "Identify Injection Type",
      description: "Determine which SQL injection technique to use",
      task: (
        <div className="task-box">
          <h4>SQL Injection Types</h4>

          <div className="injection-types">
            <div className="type-card type-error">
              <h5>Error-Based SQL Injection</h5>
              <p>Application displays database errors</p>
              <div className="type-example">
                <strong>Example:</strong>
                <code>' AND 1=CONVERT(int, (SELECT @@version))--</code>
              </div>
            </div>

            <div className="type-card type-union">
              <h5>UNION-Based SQL Injection</h5>
              <p>Combine results from multiple SELECT statements</p>
              <div className="type-example">
                <strong>Example:</strong>
                <code>' UNION SELECT NULL, username, password FROM users--</code>
              </div>
            </div>

            <div className="type-card type-blind">
              <h5>Blind SQL Injection</h5>
              <p>No errors shown, test with time delays or boolean logic</p>
              <div className="type-example">
                <strong>Example:</strong>
                <code>' AND IF(1=1, SLEEP(5), 0)--</code>
              </div>
            </div>

            <div className="type-card type-time">
              <h5>Time-Based Blind Injection</h5>
              <p>Application behavior based on time delays</p>
              <div className="type-example">
                <strong>Example:</strong>
                <code>' OR IF(SUBSTRING(password,1,1)='a', SLEEP(5), 0)--</code>
              </div>
            </div>
          </div>

          <div className="success-box">
            <p>
              <strong>Pro Tip:</strong> Start with error-based injection (easiest), 
              then try UNION-based. Use blind techniques only when others fail.
            </p>
          </div>
        </div>
      ),
      question: "Which SQL injection type is easiest to exploit?",
      options: [
        "Time-based blind injection",
        "Error-based injection",
        "Boolean-based blind injection",
        "Second-order injection",
      ],
      correct: 1,
      explanation:
        "Error-based injection is easiest because the database directly reveals information through error messages, making it straightforward to extract data.",
    },
    {
      id: "vulnerability-confirmation",
      title: "Confirm Vulnerability",
      description: "Verify the SQL injection vulnerability exists",
      task: (
        <div className="task-box">
          <h4>Vulnerability Confirmation Steps</h4>

          <div className="confirmation-steps">
            <div className="step-item completed">
              <div className="step-number">1</div>
              <div className="step-content">
                <strong>Inject single quote (')</strong>
                <p>Result: SQL error or different behavior</p>
                <code className="step-code">Username: admin'</code>
              </div>
            </div>

            <div className="step-item completed">
              <div className="step-number">2</div>
              <div className="step-content">
                <strong>Test boolean logic</strong>
                <p>Result: Different responses for true/false conditions</p>
                <code className="step-code">Username: admin' AND '1'='1</code>
                <code className="step-code">Username: admin' AND '1'='2</code>
              </div>
            </div>

            <div className="step-item completed">
              <div className="step-number">3</div>
              <div className="step-content">
                <strong>Confirm with comment</strong>
                <p>Result: Successfully bypass authentication</p>
                <code className="step-code">Username: admin'--</code>
              </div>
            </div>

            <div className="step-item active">
              <div className="step-number">4</div>
              <div className="step-content">
                <strong>Document findings</strong>
                <p>Ready to move to Exploitation phase</p>
              </div>
            </div>
          </div>

          <div className="summary-box">
            <p><strong>Vulnerability Status:</strong> ✓ CONFIRMED</p>
            <p><strong>Injection Type:</strong> Error-based</p>
            <p><strong>Vulnerable Parameter:</strong> username</p>
            <p><strong>Database:</strong> MySQL</p>
            <p><strong>Next Step:</strong> Exploitation Phase</p>
          </div>
        </div>
      ),
      question: "What confirms a SQL injection vulnerability?",
      options: [
        "Application crashes immediately",
        "Different behavior with true/false SQL conditions",
        "User gets logged out",
        "Page loads slower",
      ],
      correct: 1,
      explanation:
        "Observing different application behaviors when injecting true vs false SQL conditions (e.g., '1'='1' vs '1'='2') definitively confirms the vulnerability exists.",
    },
  ];

  const handleAnswer = (stepIndex, selectedOption) => {
    const step = steps[stepIndex];
    const isCorrect = selectedOption === step.correct;

    setAnswers((prev) => ({
      ...prev,
      [stepIndex]: {
        selected: selectedOption,
        correct: isCorrect,
      },
    }));

    if (isCorrect && !completedSteps.includes(stepIndex)) {
      const newCompleted = [...completedSteps, stepIndex];
      setCompletedSteps(newCompleted);

      if (newCompleted.length === steps.length) {
        onComplete?.("scanning");
      }
    }
  };

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goPrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setAnswers({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const step = steps[currentStep];
  const answered = answers[currentStep];

  return (
    <div className="scanning-container">
      <div className="content-section">
        <h2 className="step-title">{step.title}</h2>
        <p className="step-description">{step.description}</p>

        {step.task}

        <div className="question-container">
          <h4 className="question-title">{step.question}</h4>

          <div className="options-container">
            {step.options.map((option, idx) => {
              const isSelected = answered?.selected === idx;
              const isCorrect = idx === step.correct;
              const showResult = answered && isSelected;

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(currentStep, idx)}
                  disabled={answered !== undefined}
                  className={`option-button ${
                    showResult
                      ? isCorrect
                        ? "correct"
                        : "incorrect"
                      : isSelected
                      ? "selected"
                      : ""
                  }`}
                >
                  <span className="option-icon">
                    {showResult ? (isCorrect ? "✓" : "✗") : "○"}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>

            {answered && (
            <div
              className={`feedback-box ${
                answered.correct ? "correct" : "incorrect"
              }`}
            >
              <p className="feedback-title">
                {answered.correct ? "✓ Correct!" : "✗ Incorrect"}
              </p>
              <p className="feedback-explanation">{step.explanation}</p>
              {!answered.correct && (
                <div className="restart-prompt">
                  <p className="restart-text">
                    Don't worry! Learning from mistakes is part of the process.
                    You can restart this phase to try again.
                  </p>
                  <button
                    onClick={handleRestart}
                    className="restart-button"
                  >
                    Restart Phase
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="navigation-buttons">
        <button
          onClick={goPrev}
          disabled={currentStep === 0}
          className="nav-button prev-button"
        >
           Previous
        </button>

        {completedSteps.includes(currentStep) &&
          currentStep < steps.length - 1 && (
            <button onClick={goNext} className="nav-button next-button">
              Next 
            </button>
          )}

        {completedSteps.length === steps.length && (
          <button className="nav-button complete-button">
             Phase completed!
          </button>
        )}
      </div>
    </div>
  );
}