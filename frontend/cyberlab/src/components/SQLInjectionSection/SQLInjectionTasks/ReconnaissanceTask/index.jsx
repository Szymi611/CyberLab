import { useState } from "react";
import "./styles.scss";

export default function ReconnaissanceTask({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [answers, setAnswers] = useState({});

  const steps = [
    {
      id: "analyze-form",
      title: "Form Analysis",
      description: "Analyze the login form below",
      task: (
        <div className="task-box">
          <h4>Login Form</h4>
          <form className="form-demo">
            <div>
              <label>Username</label>
              <input type="text" placeholder="Enter username" disabled />
            </div>
            <div>
              <label>Password</label>
              <input type="password" placeholder="Enter password" disabled />
            </div>
            <button disabled>Login</button>
          </form>

          <div className="info-box">
            <h5>What did you observe?</h5>
            <ul>
              <li>Form type (GET/POST)</li>
              <li>Field names (username, password)</li>
              <li>Default values or placeholders</li>
              <li>Client-side validation?</li>
            </ul>
          </div>
        </div>
      ),
      question: "What is the HTTP method of this form?",
      options: ["GET", "POST", "PUT", "DELETE"],
      correct: 1,
      explanation:
        "Login forms should use POST (more secure than GET, which would display data in the URL)",
    },
    {
      id: "identify-fields",
      title: "Field Identification",
      description: "Determine which fields are potentially vulnerable",
      task: (
        <div className="task-box">
          <h4>Form Fields</h4>
          <div className="fields-container">
            <div className="field-card">
              <strong>Username:</strong>
              <p>Sent to server, processed in SQL query</p>
            </div>
            <div className="field-card">
              <strong>Password:</strong>
              <p>Sent to server, processed in SQL query</p>
            </div>
          </div>

          <div className="tip-box">
            <p>
              <strong>Tip:</strong> Both fields are sent to the server and
              may be vulnerable to SQL Injection
            </p>
          </div>
        </div>
      ),
      question: "Which field seems most vulnerable for testing?",
      options: [
        "Username - usually less validation",
        "Password - always encrypted",
        "Both are equally vulnerable",
        "Neither",
      ],
      correct: 2,
      explanation:
        'In pentesting we assume NO field is "safe by default" - we test everything!',
    },
    {
      id: "observe-requests",
      title: "Request Observation",
      description: "Check what's happening in the network (DevTools)",
      task: (
        <div className="task-box">
          <h4>DevTools Analysis (F12 → Network)</h4>
          <div className="devtools-box">
            <p>POST /api/login HTTP/1.1</p>
            <p>Host: vulnerable-app.com</p>
            <p>Content-Type: application/json</p>
            <p></p>
            <p>
              {"{"} "username": "admin", "password": "test123" {"}"}
            </p>
          </div>

          <div className="info-list">
            <p>
              <strong>Important information:</strong>
            </p>
            <ul>
              <li> Endpoint: /api/login</li>
              <li> Method: POST</li>
              <li> Data type: JSON</li>
              <li> Fields: username, password</li>
            </ul>
          </div>
        </div>
      ),
      question: "What should you note while observing requests?",
      options: [
        "Only the HTTP method",
        "Endpoint, method, data format, field names, headers",
        "Only field names",
        "Nothing - it's not important",
      ],
      correct: 1,
      explanation:
        "All this data is crucial! Endpoint = where to attack, format = how to construct payload, headers = may contain tech info",
    },
    {
      id: "document-findings",
      title: "Document Findings",
      description: "Gather all information from reconnaissance",
      task: (
        <div className="task-box">
          <h4>Reconnaissance Summary</h4>
          <div className="summary-box">
            <p>
              <strong>Application:</strong> Vulnerable Login System
            </p>
            <p>
              <strong>Endpoint:</strong> POST /api/login
            </p>
            <p>
              <strong>Input fields:</strong> username, password
            </p>
            <p>
              <strong>Format:</strong> JSON
            </p>
            <p>
              <strong>Potential vulnerabilities:</strong> No input validation,
              no sanitization
            </p>
            <p>
              <strong>Status:</strong>Ready for testing
            </p>
          </div>

          <div className="success-box">
            <p>
              <strong>Reconnaissance phase completed!</strong>
            </p>
            <p>You have all the info needed to proceed to Scanning phase</p>
          </div>
        </div>
      ),
      question: "What do you do next after gathering this information?",
      options: [
        "I immediately launch an attack without planning",
        "I move on to the Scanning phase - testing for vulnerabilities",
        "I wait for someone to give me instructions",
        "I finish the pentest",
      ],
      correct: 1,
      explanation:
        "After reconnaissance, you always move on to Scanning! You have the information, now test for vulnerabilities",
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
    <>
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
    </>
  );
}
