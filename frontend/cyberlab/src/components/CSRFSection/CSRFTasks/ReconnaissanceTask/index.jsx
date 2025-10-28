import { useState } from "react";
import "./styles.scss";

export default function CSRFReconnaissanceTask({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [answers, setAnswers] = useState({});

  const steps = [
    {
      id: "identify-actions",
      title: "Identify State-Changing Actions",
      description: "Find actions that modify application state",
      task: (
        <div className="task-box">
          <h4>Identifying Vulnerable Actions</h4>
          <div className="demo-actions">
            <div className="action-item critical">
              <div className="action-details">
                <strong>Money Transfer</strong>
                <code>POST /api/transfer</code>
              </div>
            </div>
            <div className="action-item critical">
              <div className="action-details">
                <strong>Password Change</strong>
                <code>POST /api/change-password</code>
              </div>
            </div>
            <div className="action-item warning">
              <div className="action-details">
                <strong>Email Update</strong>
                <code>POST /api/update-email</code>
              </div>
            </div>
            <div className="action-item warning">
              <div className="action-details">
                <strong>Profile Update</strong>
                <code>POST /api/profile/update</code>
              </div>
            </div>
            <div className="action-item info">
              <div className="action-details">
                <strong>Data Retrieval (GET)</strong>
                <code>GET /api/profile</code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <h5>What to look for:</h5>
            <ul>
              <li>→ State-changing actions (POST, PUT, DELETE)</li>
              <li>→ Financial operations (transfers, purchases)</li>
              <li>→ Permission changes (roles, access)</li>
              <li>→ Account modifications (email, password, 2FA)</li>
              <li>→ Administrative actions</li>
            </ul>
          </div>

          <div className="warning-box">
            <h5>Critical Actions:</h5>
            <p>Actions that should NOT be vulnerable to CSRF:</p>
            <ul>
              <li>Financial transfers</li>
              <li>Credential changes (password, email)</li>
              <li>Account or data deletion</li>
              <li>Permission granting</li>
            </ul>
          </div>
        </div>
      ),
      question: "Which action is MOST critical for CSRF attacks?",
      options: [
        "Retrieving user data (GET)",
        "Money transfer without additional authorization",
        "Displaying the homepage",
        "User login",
      ],
      correct: 1,
      explanation:
        "Money transfers without CSRF protection are the most critical because attackers can force authenticated users to transfer funds without their knowledge.",
    },
    {
      id: "analyze-requests",
      title: "Analyze Request Structure",
      description: "Analyze HTTP request structure",
      task: (
        <div className="task-box">
          <h4>Request Structure Analysis</h4>
          
          <div className="request-example vulnerable">
            <div className="badge danger">VULNERABLE TO CSRF</div>
            <h5>Unprotected Request:</h5>
            <pre><code>{`POST /api/transfer HTTP/1.1
Host: bank.example.com
Cookie: session=abc123xyz
Content-Type: application/x-www-form-urlencoded

to=attacker@evil.com&amount=10000`}</code></pre>
            <div className="vulnerability-note">
              <strong>Problem:</strong> No CSRF token - browser automatically sends cookies!
            </div>
          </div>

          <div className="request-example secure">
            <div className="badge success">PROTECTED</div>
            <h5>Request with CSRF Token:</h5>
            <pre><code>{`POST /api/transfer HTTP/1.1
Host: bank.example.com
Cookie: session=abc123xyz
Content-Type: application/x-www-form-urlencoded
X-CSRF-Token: 8a7f9c2b1e4d3f5a

to=user@example.com&amount=100&csrf_token=8a7f9c2b1e4d3f5a`}</code></pre>
            <div className="security-note">
              <strong>Protection:</strong> CSRF token must be known - attacker doesn't have it!
            </div>
          </div>

          <div className="info-box">
            <h5>What to check:</h5>
            <ul>
              <li>→ Is a CSRF token required?</li>
              <li>→ Are custom headers used?</li>
              <li>→ Is referer/origin validated?</li>
              <li>→ Is re-authentication required?</li>
              <li>→ Are SameSite attributes used in cookies?</li>
            </ul>
          </div>

          <div className="technique-box">
            <h5>Analysis Tools:</h5>
            <div className="tools">
              <div className="tool">
                <strong>Browser DevTools</strong>
                <span>Network tab → Headers</span>
              </div>
              <div className="tool">
                <strong>Burp Suite</strong>
                <span>Intercept requests</span>
              </div>
              <div className="tool">
                <strong>OWASP ZAP</strong>
                <span>Automatic CSRF detection</span>
              </div>
            </div>
          </div>
        </div>
      ),
      question: "What protects against CSRF attacks?",
      options: [
        "Strong user password",
        "HTTPS instead of HTTP",
        "CSRF token in the request that the attacker doesn't know",
        "Database encryption",
      ],
      correct: 2,
      explanation:
        "CSRF tokens are unpredictable values that must be included in state-changing requests. Since attackers can't access the token, they can't forge valid requests.",
    },
    {
      id: "check-protections",
      title: "Check Existing Protections",
      description: "Verify existing protection mechanisms",
      task: (
        <div className="task-box">
          <h4>Security Verification</h4>

          <div className="protection-checklist">
            <div className="protection-item">
              <div className="protection-details">
                <h5>CSRF Token</h5>
                <p>Server-generated token, unique per session</p>
                <code>&lt;input type="hidden" name="csrf_token" value="xyz123"/&gt;</code>
              </div>
            </div>

            <div className="protection-item">
              <div className="protection-details">
                <h5>SameSite Cookies</h5>
                <p>Cookies not sent with cross-site requests</p>
                <code>Set-Cookie: session=abc; SameSite=Strict</code>
              </div>
            </div>

            <div className="protection-item">
              <div className="protection-details">
                <h5>Origin/Referer Check</h5>
                <p>Verification of request origin</p>
                <code>Origin: https://trusted-site.com</code>
              </div>
            </div>

            <div className="protection-item">
              <div className="protection-details">
                <h5>Custom Headers</h5>
                <p>Require custom headers (AJAX)</p>
                <code>X-Requested-With: XMLHttpRequest</code>
              </div>
            </div>

            <div className="protection-item">
              <div className="protection-details">
                <h5>Re-authentication</h5>
                <p>Password confirmation for critical actions</p>
                <code>Required password for transfers &gt; $1000</code>
              </div>
            </div>
          </div>

          <div className="testing-guide">
            <h5>How to test protection:</h5>
            <ol>
              <li>
                <strong>Perform action in browser</strong>
                <p>Intercept request in Burp Suite</p>
              </li>
              <li>
                <strong>Remove CSRF token</strong>
                <p>Check if request is accepted</p>
              </li>
              <li>
                <strong>Change token value</strong>
                <p>Use random string instead of real token</p>
              </li>
              <li>
                <strong>Use old token</strong>
                <p>Check if tokens expire</p>
              </li>
            </ol>
          </div>

          <div className="vulnerability-indicators">
            <h5>Vulnerability Indicators:</h5>
            <div className="indicator danger">
              <p>No CSRF token in forms</p>
            </div>
            <div className="indicator danger">
              <p>Cookie without SameSite attribute</p>
            </div>
            <div className="indicator danger">
              <p>No Origin/Referer validation</p>
            </div>
            <div className="indicator warning">
              <p>Same CSRF token for all users</p>
            </div>
          </div>
        </div>
      ),
      question: "Which protection is MOST effective against CSRF?",
      options: [
        "Using long sessions",
        "Unique, unpredictable CSRF token validated server-side",
        "Complex endpoint names",
        "Hiding forms in JavaScript",
      ],
      correct: 1,
      explanation:
        "A properly implemented CSRF token that is unique, unpredictable, and validated on the server is the most effective defense against CSRF attacks.",
    },
    {
      id: "document-findings",
      title: "Document Findings",
      description: "Gather reconnaissance information",
      task: (
        <div className="task-box">
          <h4>Reconnaissance Summary</h4>

          <div className="documentation-template">
            <h5>CSRF Reconnaissance Report Template:</h5>
            
            <div className="report-section">
              <h6>1. Identified Actions:</h6>
              <table className="findings-table">
                <thead>
                  <tr>
                    <th>Endpoint</th>
                    <th>Method</th>
                    <th>Criticality</th>
                    <th>Protection</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="critical">
                    <td><code>/api/transfer</code></td>
                    <td>POST</td>
                    <td>Critical</td>
                    <td>None</td>
                  </tr>
                  <tr className="warning">
                    <td><code>/api/change-email</code></td>
                    <td>POST</td>
                    <td>Medium</td>
                    <td>Weak</td>
                  </tr>
                  <tr className="success">
                    <td><code>/api/profile/view</code></td>
                    <td>GET</td>
                    <td>Low</td>
                    <td>OK (GET)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="report-section">
              <h6>2. Protection Mechanisms:</h6>
              <ul className="protection-status">
                <li className="missing">CSRF Token - <strong>MISSING</strong></li>
                <li className="missing">SameSite Cookie - <strong>MISSING</strong></li>
                <li className="partial">Referer Check - <strong>PARTIAL</strong></li>
                <li className="missing">Custom Headers - <strong>MISSING</strong></li>
              </ul>
            </div>

            <div className="report-section">
              <h6>3. Potential Attack Vectors:</h6>
              <div className="attack-vectors">
                <div className="vector high">
                  <span className="severity">HIGH</span>
                  <p><strong>Transfer without CSRF token</strong></p>
                  <p>Possible automatic transfer from victim's account</p>
                </div>
                <div className="vector medium">
                  <span className="severity">MEDIUM</span>
                  <p><strong>Email change without verification</strong></p>
                  <p>Account takeover by changing email</p>
                </div>
              </div>
            </div>

            <div className="report-section">
              <h6>4. Recommendations:</h6>
              <ol className="recommendations">
                <li>→ Implement CSRF tokens for all POST/PUT/DELETE</li>
                <li>→ Set SameSite=Strict for session cookies</li>
                <li>→ Validate Origin and Referer headers</li>
                <li>→ Require re-authentication for critical actions</li>
              </ol>
            </div>
          </div>

          <div className="success-box">
            <h5>Congratulations!</h5>
            <p>You've completed the CSRF reconnaissance phase. You've identified potential attack vectors and existing protections.</p>
          </div>
        </div>
      ),
      question: "What should be included in a CSRF reconnaissance report?",
      options: [
        "Only a list of all URLs in the application",
        "Vulnerable actions, their protection, potential attack vectors, and recommendations",
        "The entire application source code",
        "User passwords",
      ],
      correct: 1,
      explanation:
        "A comprehensive reconnaissance report should document vulnerable actions, analyze existing protections, identify attack vectors, and provide actionable recommendations.",
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
        onComplete?.("reconnaissance");
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
    <div className="reconnaissance-container">
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
                {answered.correct ? "Correct!" : "Incorrect"}
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
