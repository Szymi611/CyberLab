import { useState } from "react";
import "./styles.scss";

export default function AnalysisPhishing({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [answers, setAnswers] = useState({});

  const steps = [
    {
      id: "social-engineering",
      title: "Understand Social Engineering Tactics",
      description: "Learn how attackers manipulate human psychology",
      task: (
        <div className="task-box">
          <h4>Common Social Engineering Techniques</h4>

          <div className="tactics-grid">
            <div className="tactic-card urgency">
              <h5>Urgency & Scarcity</h5>
              <p className="example">"Your account will be closed in 24 hours!"</p>
              <p className="description">
                Creates panic to bypass critical thinking. Victims act quickly without verifying.
              </p>
            </div>

            <div className="tactic-card authority">
              <h5>Authority & Trust</h5>
              <p className="example">"This is your bank's security department..."</p>
              <p className="description">
                Impersonates trusted entities. People tend to comply with authority figures.
              </p>
            </div>

            <div className="tactic-card fear">
              <h5>Fear & Threats</h5>
              <p className="example">"Suspicious activity detected! Verify now or face legal action."</p>
              <p className="description">
                Uses fear to override judgment. Victims act to avoid negative consequences.
              </p>
            </div>

            <div className="tactic-card greed">
              <h5>Greed & Curiosity</h5>
              <p className="example">"You've won $10,000! Click to claim your prize!"</p>
              <p className="description">
                Exploits desire for rewards. Too good to be true offers lower defenses.
              </p>
            </div>
          </div>

          <div className="info-box">
            <h5>Defense Strategy:</h5>
            <ul>
              <li>Pause and think before acting on emotional triggers</li>
              <li>Verify independently through official channels</li>
              <li>Question urgency - legitimate companies give time</li>
              <li>If it seems too good to be true, it probably is</li>
            </ul>
          </div>
        </div>
      ),
      question: "Which psychological trigger is MOST commonly used in phishing attacks?",
      options: [
        "Humor and entertainment",
        "Urgency and fear",
        "Confusion and complexity",
        "Boredom and routine",
      ],
      correct: 1,
      explanation:
        "Urgency and fear are the most effective triggers. They create stress that impairs judgment and pushes victims to act quickly without proper verification.",
    },
    {
      id: "email-headers",
      title: "Analyze Email Headers",
      description: "Learn to read technical indicators of phishing",
      task: (
        <div className="task-box">
          <h4>Email Header Analysis</h4>

          <div className="header-comparison">
            <div className="header-example legitimate">
              <strong>Legitimate Email Headers:</strong>
              <pre>{`From: notifications@paypal.com
Reply-To: notifications@paypal.com
Return-Path: bounce@paypal.com
Received: from mail.paypal.com [64.4.250.36]
DKIM-Signature: v=1; a=rsa-sha256; d=paypal.com
SPF: PASS`}</pre>
              <ul className="indicators">
                <li>Matching From and Reply-To domains</li>
                <li>Legitimate server IP</li>
                <li>Valid DKIM signature</li>
                <li>SPF authentication passed</li>
              </ul>
            </div>

            <div className="header-example phishing">
              <strong>Phishing Email Headers:</strong>
              <pre>{`From: security@paypal.com
Reply-To: hacker@suspicious-server.ru
Return-Path: bounce@malicious-domain.xyz
Received: from unknown-server.ru [185.220.101.45]
DKIM-Signature: none
SPF: FAIL`}</pre>
              <ul className="indicators">
                <li>Mismatched Reply-To address</li>
                <li>Suspicious server location (.ru)</li>
                <li>No DKIM signature</li>
                <li>Failed SPF check</li>
              </ul>
            </div>
          </div>

          <div className="tip-box">
            <p>
              <strong>How to view headers:</strong> In most email clients, look for 
              "Show Original", "View Source", or "Message Details" options in the menu.
            </p>
          </div>
        </div>
      ),
      question: "What is the MOST reliable technical indicator that an email is phishing?",
      options: [
        "The email has attachments",
        "Mismatched Reply-To address from a different domain",
        "The email is long and detailed",
        "It contains images",
      ],
      correct: 1,
      explanation:
        "A mismatched Reply-To address (especially from a different domain) is a strong indicator of phishing. Legitimate companies use consistent domains across all email fields.",
    },
    {
      id: "link-analysis",
      title: "Deep Link Analysis",
      description: "Advanced techniques for URL inspection",
      task: (
        <div className="task-box">
          <h4>Advanced URL Analysis</h4>

          <div className="analysis-techniques">
            <div className="technique">
              <h5>1. Homograph Attacks</h5>
              <p>Using similar-looking characters from different alphabets:</p>
              <div className="url-comparison">
                <code className="real">paypal.com (real)</code>
                <code className="fake">pаypal.com (Cyrillic 'а' instead of Latin 'a')</code>
              </div>
              <p className="note">These look identical but are different domains!</p>
            </div>

            <div className="technique">
              <h5>2. Subdomain Tricks</h5>
              <p>The real domain comes AFTER the last dot before the slash:</p>
              <div className="url-breakdown">
                <code>https://paypal.secure-login.attacker.com/verify</code>
                <p className="breakdown-explain">
                  Real domain: <span className="danger">attacker.com</span><br/>
                  "paypal.secure-login" is just a subdomain!
                </p>
              </div>
            </div>

            <div className="technique">
              <h5>3. URL Shorteners</h5>
              <p>Shortened URLs hide the real destination:</p>
              <code>bit.ly/2xK9pLm</code>
              <p className="note">
                Always expand shortened URLs before clicking using services like 
                checkshorturl.com or getlinkinfo.com
              </p>
            </div>

            <div className="technique">
              <h5>4. IP Address URLs</h5>
              <p>Legitimate sites rarely use direct IP addresses:</p>
              <code className="suspicious">http://192.168.1.100/paypal-login</code>
              <p className="note">Major red flag - legitimate companies use domain names!</p>
            </div>
          </div>

          <div className="warning-box">
            <p>
              <strong>Always:</strong> Check the full URL before entering any information.
              When in doubt, type the company's official URL directly into your browser.
            </p>
          </div>
        </div>
      ),
      question: "What is a homograph attack?",
      options: [
        "Using multiple domains that redirect to each other",
        "Using characters from different alphabets that look similar",
        "Creating very long URLs to confuse users",
        "Using special characters in passwords",
      ],
      correct: 1,
      explanation:
        "Homograph attacks use characters from different alphabets (like Cyrillic) that look identical to Latin characters, creating domain names that appear legitimate but lead to phishing sites.",
    },
    {
      id: "content-analysis",
      title: "Analyze Message Content",
      description: "Identify suspicious content patterns",
      task: (
        <div className="task-box">
          <h4>Content Red Flags Checklist</h4>

          <div className="content-checklist">
            <div className="category">
              <h5>Language & Grammar:</h5>
              <ul>
                <li>Spelling mistakes and typos</li>
                <li>Poor grammar or awkward phrasing</li>
                <li>Inconsistent formatting</li>
                <li>Generic greetings ("Dear User")</li>
              </ul>
            </div>

            <div className="category">
              <h5>Request Type:</h5>
              <ul>
                <li>Asks for passwords or PINs</li>
                <li>Requests immediate payment</li>
                <li>Wants you to download attachments</li>
                <li>Asks to click links to "verify" info</li>
              </ul>
            </div>

            <div className="category">
              <h5>Pressure Tactics:</h5>
              <ul>
                <li>"Act now or lose access!"</li>
                <li>"Limited time offer expires today!"</li>
                <li>"Your account will be suspended!"</li>
                <li>"Urgent action required immediately!"</li>
              </ul>
            </div>

            <div className="category">
              <h5>Attachments & Links:</h5>
              <ul>
                <li>Unexpected attachments (.exe, .zip, .scr)</li>
                <li>Multiple redirects</li>
                <li>Shortened or obfuscated URLs</li>
                <li>Buttons with hidden link destinations</li>
              </ul>
            </div>
          </div>

          <div className="success-box">
            <p>
              <strong>Analysis phase complete!</strong>
            </p>
            <p>
              You can now analyze phishing attempts systematically. Next, you'll learn prevention strategies.
            </p>
          </div>
        </div>
      ),
      question: "Which request is the BIGGEST red flag in an email?",
      options: [
        "Asking you to update your profile picture",
        "Asking for your password or PIN",
        "Asking you to read their newsletter",
        "Asking you to follow them on social media",
      ],
      correct: 1,
      explanation:
        "Legitimate companies NEVER ask for passwords, PINs, or sensitive authentication details via email. This is the biggest red flag and clear indicator of phishing.",
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
        onComplete?.("analysis");
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
    <div className="phishing-analysis-container">
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