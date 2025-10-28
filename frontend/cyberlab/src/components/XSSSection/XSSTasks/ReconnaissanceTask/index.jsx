import { useState } from "react";
import "./styles.scss";

export default function XSSReconnaissanceTask({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [answers, setAnswers] = useState({});

  const steps = [
    {
      id: "analyze-inputs",
      title: "Input Field Analysis",
      description: "Analyze the application for user input fields",
      task: (
        <div className="task-box">
          <h4>Identifying XSS Entry Points</h4>
          <div className="demo-form">
            <form className="form-demo">
              <div>
                <label>Search</label>
                <input type="text" placeholder="Search products..." disabled />
              </div>
              <div>
                <label>Comment</label>
                <textarea placeholder="Leave a comment..." disabled rows="3" />
              </div>
              <div>
                <label>Username</label>
                <input type="text" placeholder="Enter your name" disabled />
              </div>
              <button disabled>Submit</button>
            </form>
          </div>

          <div className="info-box">
            <h5>What to look for:</h5>
            <ul>
              <li>→ All input fields (text, textarea, search boxes)</li>
              <li>→ URL parameters (?search=, ?id=, ?name=)</li>
              <li>→ Form submissions (POST/GET)</li>
              <li>→ Where user input is displayed back</li>
            </ul>
          </div>
        </div>
      ),
      question: "What is the first step in XSS reconnaissance?",
      options: [
        "Immediately inject malicious scripts",
        "Identify all input fields and parameters where user data is processed",
        "Test only the login form",
        "Skip reconnaissance and start exploitation",
      ],
      correct: 1,
      explanation:
        "Before testing for XSS, you must identify ALL potential entry points where user input is accepted and displayed back to users.",
    },
    {
      id: "identify-reflection",
      title: "Identify Reflection Points",
      description: "Find where user input is reflected in the response",
      task: (
        <div className="task-box">
          <h4>Input Reflection Analysis</h4>
          
          <div className="reflection-demo">
            <div className="reflection-card">
              <strong>Input:</strong>
              <code>Hello World</code>
            </div>
            <div className="reflection-arrow">→</div>
            <div className="reflection-card">
              <strong>Output (Reflected):</strong>
              <code>You searched for: Hello World</code>
            </div>
          </div>

          <div className="tip-box">
            <p>
              <strong>Key Observation:</strong> The application reflects user input
              directly in the HTML response without encoding special characters.
            </p>
          </div>

          <div className="info-list">
            <p><strong>Common reflection points:</strong></p>
            <ul>
              <li>Search results pages</li>
              <li>Error messages</li>
              <li>User profile pages</li>
              <li>Comment sections</li>
              <li>URL parameters in HTML</li>
            </ul>
          </div>
        </div>
      ),
      question: "Why is identifying reflection points important?",
      options: [
        "It's not important at all",
        "Reflected input can execute malicious scripts if not properly sanitized",
        "Only for aesthetic purposes",
        "To slow down the application",
      ],
      correct: 1,
      explanation:
        "If user input is reflected without proper encoding/sanitization, attackers can inject JavaScript that will execute in other users' browsers.",
    },
    {
      id: "context-analysis",
      title: "Context Analysis",
      description: "Determine the context where input is reflected",
      task: (
        <div className="task-box">
          <h4>Understanding Reflection Context</h4>

          <div className="context-examples">
            <div className="context-card">
              <h5>HTML Context</h5>
              <code>&lt;div&gt;Hello TEST&lt;/div&gt;</code>
              <p className="context-desc">Input reflected between HTML tags</p>
            </div>

            <div className="context-card">
              <h5>Attribute Context</h5>
              <code>&lt;input value="TEST"&gt;</code>
              <p className="context-desc">Input reflected in HTML attribute</p>
            </div>

            <div className="context-card">
              <h5>JavaScript Context</h5>
              <code>var name = "TEST";</code>
              <p className="context-desc">Input reflected in JavaScript code</p>
            </div>

            <div className="context-card">
              <h5>URL Context</h5>
              <code>&lt;a href="http://site.com?q=TEST"&gt;</code>
              <p className="context-desc">Input reflected in URL</p>
            </div>
          </div>

          <div className="success-box">
            <p>
              <strong>Pro Tip:</strong> Different contexts require different XSS
              payloads. Always identify the context first!
            </p>
          </div>
        </div>
      ),
      question: "Why does injection context matter?",
      options: [
        "It doesn't matter at all",
        "Different contexts require different payloads and escaping techniques",
        "Only HTML context can be exploited",
        "Context is only for documentation",
      ],
      correct: 1,
      explanation:
        "Each context (HTML, attribute, JavaScript, URL) has different special characters and requires specific payloads to break out and execute code.",
    },
    {
      id: "document-findings",
      title: "Document Findings",
      description: "Gather all reconnaissance information",
      task: (
        <div className="task-box">
          <h4>Reconnaissance Summary</h4>
          <div className="summary-box">
            <p>
              <strong>Application:</strong> E-Commerce Platform
            </p>
            <p>
              <strong>Entry Points Found:</strong>
            </p>
            <ul>
              <li>Search field (/search?q=...)</li>
              <li>Comment section (POST /api/comments)</li>
              <li>Profile name field</li>
            </ul>
            <p>
              <strong>Reflection Points:</strong>
            </p>
            <ul>
              <li>Search results page (HTML context)</li>
              <li>Comment display (HTML context)</li>
              <li>Profile page (Attribute context)</li>
            </ul>
            <p>
              <strong>Potential Vulnerabilities:</strong> No input encoding observed
            </p>
            <p>
              <strong>Status:</strong> Ready for payload testing
            </p>
          </div>

          <div className="success-box">
            <p>
              <strong>Reconnaissance phase completed!</strong>
            </p>
            <p>You have identified all entry points and reflection contexts</p>
          </div>
        </div>
      ),
      question: "What should you do after completing reconnaissance?",
      options: [
        "Stop the penetration test",
        "Move to the Scanning phase to test XSS payloads",
        "Immediately report findings without testing",
        "Wait for someone else to continue",
      ],
      correct: 1,
      explanation:
        "After reconnaissance, the next step is Scanning - testing identified entry points with XSS payloads to confirm vulnerabilities.",
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
