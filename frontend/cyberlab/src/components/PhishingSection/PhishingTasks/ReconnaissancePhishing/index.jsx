import { useState } from "react";
import "./styles.scss";

export default function ReconnaissancePhishing({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [answers, setAnswers] = useState({});

  const steps = [
    {
      id: "identify-suspicious",
      title: "Identify Suspicious Elements",
      description: "Learn to recognize red flags in emails and messages",
      task: (
        <div className="task-box">
          <h4>Suspicious Email Example</h4>
          <div className="email-demo">
            <div className="email-header">
              <p><strong>From:</strong> support@paypa1-security.com</p>
              <p><strong>Subject:</strong> URGENT: Your account will be suspended!</p>
              <p><strong>Date:</strong> Today, 3:47 AM</p>
            </div>
            <div className="email-body">
              <p>Dear Valued Customer,</p>
              <p>
                We have detected unusual activity on your account. Your account will be 
                <span className="highlight-danger"> PERMANENTLY SUSPENDED</span> within 
                24 hours unless you verify your information immediately.
              </p>
              <p>Click here to verify: <a href="#">www.paypa1-verify.com/urgent</a></p>
              <p>Failure to comply will result in account closure.</p>
              <p>PayPal Security Team</p>
            </div>
          </div>

          <div className="info-box">
            <h5>Red Flags to Look For:</h5>
            <ul>
              <li>Suspicious sender email (paypa1 instead of paypal)</li>
              <li>Urgent/threatening language</li>
              <li>Unusual timing (3:47 AM)</li>
              <li>Generic greeting ("Dear Valued Customer")</li>
              <li>Suspicious links</li>
            </ul>
          </div>
        </div>
      ),
      question: "What is the FIRST thing you should check in a suspicious email?",
      options: [
        "The content of the message",
        "The sender's email address",
        "The attachments",
        "The time it was sent",
      ],
      correct: 1,
      explanation:
        "Always check the sender's email address first! Phishers often use addresses that look similar to legitimate ones (e.g., paypa1.com instead of paypal.com).",
    },
    {
      id: "analyze-links",
      title: "Analyze Suspicious Links",
      description: "Learn to identify malicious URLs without clicking them",
      task: (
        <div className="task-box">
          <h4>URL Analysis Techniques</h4>
          
          <div className="url-examples">
            <div className="url-card safe">
              <strong>Legitimate URL:</strong>
              <code>https://www.paypal.com/myaccount</code>
              <ul>
                <li>Correct domain: paypal.com</li>
                <li>HTTPS protocol</li>
                <li>No suspicious characters</li>
              </ul>
            </div>

            <div className="url-card danger">
              <strong>Phishing URL #1:</strong>
              <code>http://paypa1.com/verify-account</code>
              <ul>
                <li>Wrong domain: paypa1.com (1 instead of l)</li>
                <li>No HTTPS</li>
              </ul>
            </div>

            <div className="url-card danger">
              <strong>Phishing URL #2:</strong>
              <code>https://secure-paypal.verification-required.com</code>
              <ul>
                <li>Domain is verification-required.com, not paypal.com</li>
                <li>Subdomain tricks</li>
              </ul>
            </div>

            <div className="url-card danger">
              <strong>Phishing URL #3:</strong>
              <code>https://paypal.com-verify-account.phishing.com</code>
              <ul>
                <li>Real domain is phishing.com</li>
                <li>paypal.com is just part of subdomain</li>
              </ul>
            </div>
          </div>

          <div className="tip-box">
            <p>
              <strong>Pro Tip:</strong> Hover over links (don't click!) to see the actual URL.
              The real domain is what comes RIGHT BEFORE the first single slash (/).
            </p>
          </div>
        </div>
      ),
      question: "Which part of a URL is the ACTUAL domain?",
      options: [
        "Everything before .com",
        "The text right before the first single / (after https://)",
        "The subdomain",
        "Everything after www.",
      ],
      correct: 1,
      explanation:
        "The actual domain is what comes right before the first single slash after https://. In 'https://fake.paypal.com/', the domain is 'paypal.com', but in 'https://paypal.fake.com/', the domain is 'fake.com'!",
    },
    {
      id: "verify-sender",
      title: "Verify Sender Authenticity",
      description: "Learn techniques to verify if an email is legitimate",
      task: (
        <div className="task-box">
          <h4>Email Verification Checklist</h4>

          <div className="verification-steps">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <strong>Check the email domain</strong>
                <p>Legitimate companies use their own domain (e.g., @paypal.com, @amazon.com)</p>
                <div className="example">
                  <span className="bad">✗ support@paypal-security.net</span>
                  <span className="good">✓ support@paypal.com</span>
                </div>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <strong>Look for personalization</strong>
                <p>Legitimate emails usually address you by name</p>
                <div className="example">
                  <span className="bad">✗ "Dear Customer"</span>
                  <span className="good">✓ "Dear John Smith"</span>
                </div>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <strong>Check email headers</strong>
                <p>View full headers to see the actual sender's server</p>
                <code className="header-example">Received: from phishing-server.ru</code>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">4</div>
              <div className="step-content">
                <strong>Contact company directly</strong>
                <p>Use official website or phone number to verify</p>
              </div>
            </div>
          </div>

          <div className="warning-box">
            <p>
              <strong>Never:</strong> Click links in suspicious emails, reply with personal info,
              or download attachments from unknown senders.
            </p>
          </div>
        </div>
      ),
      question: "What should you do if you receive a suspicious email from your 'bank'?",
      options: [
        "Click the link to check your account",
        "Reply to the email asking if it's legitimate",
        "Contact your bank using their official phone number or website",
        "Forward it to your friends to warn them",
      ],
      correct: 2,
      explanation:
        "Always contact the company directly using their official website or phone number you find yourself (not from the email). Never click links or reply to suspicious emails.",
    },
    {
      id: "document-indicators",
      title: "Document Phishing Indicators",
      description: "Create a checklist of phishing indicators",
      task: (
        <div className="task-box">
          <h4>Phishing Indicators Checklist</h4>

          <div className="summary-box">
            <div className="indicator-category">
              <h5>Critical Red Flags:</h5>
              <ul>
                <li>Suspicious sender email address</li>
                <li>Urgent/threatening language</li>
                <li>Requests for sensitive information</li>
                <li>Suspicious or shortened links</li>
                <li>Poor grammar/spelling</li>
              </ul>
            </div>

            <div className="indicator-category">
              <h5>Warning Signs:</h5>
              <ul>
                <li>Generic greetings</li>
                <li>Unusual timing</li>
                <li>Unexpected attachments</li>
                <li>Too good to be true offers</li>
                <li>Mismatched URLs</li>
              </ul>
            </div>

            <div className="indicator-category">
              <h5>Safe Verification Methods:</h5>
              <ul>
                <li>Contact company directly via official channels</li>
                <li>Check URL carefully before clicking</li>
                <li>Look for HTTPS and valid certificates</li>
                <li>Verify sender's email domain</li>
                <li>Use anti-phishing browser extensions</li>
              </ul>
            </div>
          </div>

          <div className="success-box">
            <p>
              <strong>Recognition phase complete!</strong>
            </p>
            <p>
              You now know how to identify phishing attempts. Next, you'll learn to analyze them in detail.
            </p>
          </div>
        </div>
      ),
      question: "What makes phishing so effective?",
      options: [
        "Advanced hacking techniques",
        "Exploiting human psychology (urgency, fear, trust)",
        "Sophisticated malware",
        "Expensive tools",
      ],
      correct: 1,
      explanation:
        "Phishing is effective because it exploits human psychology - using urgency, fear, authority, and trust to manipulate people into making quick decisions without thinking critically.",
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
    <div className="phishing-reconnaissance-container">
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