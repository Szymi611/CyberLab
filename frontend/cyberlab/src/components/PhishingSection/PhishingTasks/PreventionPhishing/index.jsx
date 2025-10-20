import { useState } from "react";
import "./styles.scss";

export default function PreventionPhishing({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [answers, setAnswers] = useState({});

  const steps = [
    {
      id: "technical-defenses",
      title: "Technical Defense Mechanisms",
      description: "Implement security tools and technologies",
      task: (
        <div className="task-box">
          <h4>Multi-Layer Security Approach</h4>

          <div className="defense-layers">
            <div className="layer">
              <div className="layer-icon">🛡️</div>
              <h5>Email Filters & Anti-Phishing</h5>
              <ul>
                <li>Enable built-in spam filters</li>
                <li>Use anti-phishing browser extensions (uBlock Origin, Malwarebytes)</li>
                <li>Configure email client to show full headers</li>
                <li>Enable warnings for external emails</li>
              </ul>
            </div>

            <div className="layer">
              <div className="layer-icon">🔐</div>
              <h5>Authentication & Passwords</h5>
              <ul>
                <li>Enable Two-Factor Authentication (2FA) everywhere</li>
                <li>Use unique passwords for each account</li>
                <li>Use a password manager (Bitwarden, 1Password)</li>
                <li>Never save passwords in browsers</li>
              </ul>
            </div>

            <div className="layer">
              <div className="layer-icon">🔄</div>
              <h5>Software & Updates</h5>
              <ul>
                <li>Keep OS and software updated</li>
                <li>Use updated antivirus software</li>
                <li>Enable automatic security updates</li>
                <li>Use secure, updated browsers</li>
              </ul>
            </div>

            <div className="layer">
              <div className="layer-icon">🌐</div>
              <h5>Network Security</h5>
              <ul>
                <li>Use VPN on public WiFi</li>
                <li>Enable firewall</li>
                <li>Verify HTTPS certificates</li>
                <li>Use DNS filtering (Cloudflare, Quad9)</li>
              </ul>
            </div>
          </div>

          <div className="info-box">
            <h5>Key Principle:</h5>
            <p>
              Defense in depth - multiple layers ensure that if one fails, others still protect you.
            </p>
          </div>
        </div>
      ),
      question: "What is the MOST effective technical defense against phishing?",
      options: [
        "Using antivirus software only",
        "Two-Factor Authentication (2FA)",
        "Strong passwords alone",
        "Ad blockers",
      ],
      correct: 1,
      explanation:
        "2FA is the most effective defense because even if attackers steal your password through phishing, they can't access your account without the second factor (code from your phone, security key, etc.).",
    },
    {
      id: "safe-practices",
      title: "Safe Browsing Practices",
      description: "Develop secure online habits",
      task: (
        <div className="task-box">
          <h4>Daily Security Habits</h4>

          <div className="practices-grid">
            <div className="practice do">
              <h5>DO:</h5>
              <ul>
                <li>Type URLs directly into the browser</li>
                <li>Verify HTTPS and certificate before login</li>
                <li>Use bookmarks for important sites</li>
                <li>Hover over links before clicking</li>
                <li>Check sender addresses carefully</li>
                <li>Contact companies through official channels</li>
                <li>Report suspicious emails</li>
                <li>Verify requests via phone calls</li>
                <li>Keep software updated</li>
                <li>Use separate emails for banking</li>
              </ul>
            </div>

            <div className="practice dont">
              <h5>DON'T:</h5>
              <ul>
                <li>Click links in unexpected emails</li>
                <li>Download attachments from unknown senders</li>
                <li>Enter credentials on HTTP sites</li>
                <li>Use public WiFi for banking</li>
                <li>Share passwords or 2FA codes</li>
                <li>Reply to suspicious emails</li>
                <li>Trust caller ID alone</li>
                <li>Ignore browser security warnings</li>
                <li>Use same password everywhere</li>
                <li>Trust "too good to be true" offers</li>
              </ul>
            </div>
          </div>

          <div className="tip-box">
            <p>
              <strong>Remember:</strong> When in doubt, don't click! It's always safer to 
              navigate directly to a website than to click a link in an email.
            </p>
          </div>
        </div>
      ),
      question: "What should you do FIRST if you click a phishing link by mistake?",
      options: [
        "Nothing, it's too late",
        "Immediately change passwords and enable 2FA",
        "Turn off your computer",
        "Delete your email account",
      ],
      correct: 1,
      explanation:
        "Act quickly! Change your passwords immediately (from a different device if possible), enable 2FA on all accounts, scan for malware, and monitor your accounts for suspicious activity. Time is critical!",
    },
    {
      id: "incident-response",
      title: "Phishing Incident Response",
      description: "Know what to do if you're targeted",
      task: (
        <div className="task-box">
          <h4>Response Action Plan</h4>

          <div className="response-steps">
            <div className="response-step immediate">
              <h5>Immediate Actions (If you clicked/entered info):</h5>
              <ol>
                <li>
                  <strong>Disconnect from internet</strong> - Stop any ongoing data transmission
                </li>
                <li>
                  <strong>Change passwords</strong> - Use different device, start with email & banking
                </li>
                <li>
                  <strong>Enable 2FA</strong> - On all critical accounts immediately
                </li>
                <li>
                  <strong>Scan for malware</strong> - Run full antivirus/anti-malware scan
                </li>
                <li>
                  <strong>Contact your bank</strong> - If financial info was compromised
                </li>
              </ol>
            </div>

            <div className="response-step reporting">
              <h5>Reporting:</h5>
              <ul>
                <li>Report to IT department (if work email)</li>
                <li>Forward to company being impersonated</li>
                <li>Report to email provider (spam/phishing button)</li>
                <li>File report with local authorities if money lost</li>
                <li>Report to Anti-Phishing Working Group (reportphishing@apwg.org)</li>
              </ul>
            </div>

            <div className="response-step monitoring">
              <h5>Ongoing Monitoring:</h5>
              <ul>
                <li>Check account statements regularly</li>
                <li>Monitor credit reports</li>
                <li>Watch for suspicious account activity</li>
                <li>Set up fraud alerts</li>
                <li>Keep records of the incident</li>
              </ul>
            </div>
          </div>

          <div className="warning-box">
            <p>
              <strong>Important:</strong> Don't panic, but act quickly. The faster you respond, 
              the less damage attackers can do.
            </p>
          </div>
        </div>
      ),
      question: "Who should you report a phishing attempt to?",
      options: [
        "Only your email provider",
        "Only the police",
        "Multiple parties: your email provider, the impersonated company, and authorities",
        "No one, just delete it",
      ],
      correct: 2,
      explanation:
        "Report to multiple parties! Your email provider can improve filters, the impersonated company needs to know, and authorities can investigate. Reporting helps protect others too.",
    },
    {
      id: "education-awareness",
      title: "Build Security Culture",
      description: "Share knowledge and stay informed",
      task: (
        <div className="task-box">
          <h4>Continuous Security Education</h4>

          <div className="education-areas">
            <div className="area">
              <h5>Stay Informed:</h5>
              <ul>
                <li>Follow cybersecurity news and blogs</li>
                <li>Learn about new phishing techniques</li>
                <li>Attend security awareness training</li>
                <li>Join security communities</li>
              </ul>
            </div>

            <div className="area">
              <h5>Educate Others:</h5>
              <ul>
                <li>Share knowledge with family and friends</li>
                <li>Report and discuss phishing attempts</li>
                <li>Create awareness in your workplace</li>
                <li>Help less tech-savvy users</li>
              </ul>
            </div>

            <div className="area">
              <h5>Practice Skills:</h5>
              <ul>
                <li>Use phishing simulators for training</li>
                <li>Analyze suspicious emails critically</li>
                <li>Test your knowledge regularly</li>
                <li>Stay skeptical and verify everything</li>
              </ul>
            </div>

            <div className="area">
              <h5>Resources:</h5>
              <ul>
                <li>Google's Phishing Quiz</li>
                <li>PhishingBox training platform</li>
                <li>KnowBe4 security awareness</li>
                <li>NIST Cybersecurity Framework</li>
              </ul>
            </div>
          </div>

          <div className="success-box">
            <p>
              <strong>Prevention phase complete!</strong>
            </p>
            <p>
              You now have a complete understanding of phishing: recognition, analysis, and prevention. 
              Stay vigilant and keep learning!
            </p>
          </div>
        </div>
      ),
      question: "What is the BEST long-term defense against phishing?",
      options: [
        "Expensive security software",
        "Never using email",
        "Continuous education and awareness",
        "Avoiding all websites",
      ],
      correct: 2,
      explanation:
        "Continuous education is the best defense. Phishing techniques evolve constantly, so staying informed and maintaining awareness is more effective than any single tool or avoidance strategy.",
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
        onComplete?.("prevention");
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
    <div className="phishing-prevention-container">
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