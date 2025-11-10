import { useState } from "react";
import { GoShieldCheck } from "react-icons/go";
import { IoShieldOutline } from "react-icons/io5";
import "./styles.scss";

export default function CSRFTokenBypass() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [result, setResult] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [discoveredBypass, setDiscoveredBypass] = useState([]);
  const [loading, setLoading] = useState(false);

  const VALID_TOKEN = "csrf_token_abc123xyz";
  const TARGET_RECIPIENT = "attacker@evil.com";
  const TARGET_AMOUNT = "5000";

  const hints = [
    "The application checks for a CSRF token, but the validation might be weak.",
    "Try removing the csrf_token parameter entirely from your request.",
    "Try sending an empty string as the token value: csrf_token=''",
    "Try sending null: csrf_token=null",
    "Try sending the parameter without a value: csrf_token=",
    "Weak validation often accepts: null, empty string, undefined, or missing parameter!",
  ];

  const [currentHint, setCurrentHint] = useState(0);

  const handleTransfer = async () => {
    setAttempts((prev) => prev + 1);
    setLoading(true);

    try {
      const payload = {
        recipient,
        amount,
      };

      if (csrfToken !== undefined && csrfToken !== "") {
        payload.csrf_token = csrfToken;
      }

      const response = await fetch(
        "http://localhost:8000/api/csrf/token-bypass-transfer",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      setResult(data);

      if (
        data.success &&
        recipient === TARGET_RECIPIENT &&
        amount === TARGET_AMOUNT &&
        (csrfToken === "" ||
          csrfToken === "null" ||
          csrfToken === null ||
          !csrfToken)
      ) {
        const bypassMethod =
          !csrfToken || csrfToken === "" ? "empty/missing" : "null";
        if (!discoveredBypass.includes(bypassMethod)) {
          setDiscoveredBypass([...discoveredBypass, bypassMethod]);
        }

        setCompleted(true);
        setResult({
          ...data,
          message: `Bypass successful using ${bypassMethod} token!`,
          bypassType: bypassMethod,
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

  const handleGoToNextTask = () => {
    window.location.href = "/csrf/tasks/task3";
  };

  return (
    <div className="csrf-task-container">
      <div className="csrf-task-content">
        <div className="header-container">
          <div className="header-content">
            <h1>CSRF Task 2: Token Bypass Attack</h1>
          </div>
        </div>

        <div className="task-description">
          <h3>Mission Objective:</h3>
          <p>
            The development team learned about CSRF and added token
            validation... or did they? Your mission is to bypass the weak CSRF
            token implementation and transfer <strong>$5000</strong> to{" "}
            <code>attacker@evil.com</code> without a valid token.
          </p>

          <div className="vulnerability-info">
            <h4>Intelligence Gathered:</h4>
            <ul>
              <li>
                {" "}
                <strong>Endpoint:</strong>{" "}
                <code>
                  POST http://localhost:8000/api/csrf/token-bypass-transfer
                </code>
              </li>
              <li>
                {" "}
                <strong>Parameters:</strong> <code>recipient</code>,{" "}
                <code>amount</code>, <code>csrf_token</code>
              </li>
              <li>
                <strong>Valid Token:</strong> <code>{VALID_TOKEN}</code>
              </li>
              <li>
                <strong>Vulnerability:</strong> Weak token validation logic
              </li>
              <li>
                <strong>Authentication:</strong> Session cookies
              </li>
            </ul>
          </div>

          <div className="attack-scenario">
            <h4>Common Weak Validation Mistakes:</h4>
            <ul>
              <li>
                Checking if token exists, but accepting null/empty values
              </li>
              <li>Not enforcing token presence on all requests</li>
              <li>Client-side only validation (easily bypassed)</li>
              <li>
                Accepting token in GET parameters (leaks in logs/referer)
              </li>
              <li>Same token for all users (not session-specific)</li>
            </ul>
          </div>

          <div className="bypass-techniques">
            <h4>Bypass Techniques to Try:</h4>
            <div className="techniques-grid">
              <div className="technique-card">
                <h5>1. Remove Token Parameter</h5>
                <code>{'{ recipient: "...", amount: "..." }'}</code>
                <p>Simply don't include csrf_token</p>
              </div>
              <div className="technique-card">
                <h5>2. Empty Token</h5>
                <code>{'csrf_token: ""'}</code>
                <p>Send empty string</p>
              </div>
              <div className="technique-card">
                <h5>3. Null Token</h5>
                <code>{"csrf_token: null"}</code>
                <p>Explicitly send null</p>
              </div>
              <div className="technique-card">
                <h5>4. Invalid Token</h5>
                <code>{'csrf_token: "invalid123"'}</code>
                <p>Use wrong token value</p>
              </div>
            </div>
          </div>
        </div>

        <div className="testing-form">
          <h3>Test the Endpoint</h3>
          <p>Try different token bypass techniques:</p>

          <div className="form-inputs">
            <input
              type="text"
              placeholder="Recipient (attacker@evil.com)"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="csrf-input"
            />
            <input
              type="number"
              placeholder="Amount (5000)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="csrf-input"
            />
            <input
              type="text"
              placeholder="CSRF Token (try: empty, null, or remove)"
              value={csrfToken}
              onChange={(e) => setCsrfToken(e.target.value)}
              className="csrf-input token-input"
            />
            <button
              onClick={handleTransfer}
              className="transfer-btn"
              disabled={loading}
            >
              {loading ? "Testing..." : "Test Bypass"}
            </button>
          </div>

          <div className="quick-actions">
            <button onClick={() => setCsrfToken("")} className="quick-btn">
              Set Empty
            </button>
            <button onClick={() => setCsrfToken("null")} className="quick-btn">
              Set "null"
            </button>
            <button
              onClick={() => setCsrfToken(VALID_TOKEN)}
              className="quick-btn valid"
            >
              Use Valid Token
            </button>
          </div>

          {result && (
            <div
              className={`result-box ${result.success ? "success" : "error"}`}
            >
              <h4>{result.message}</h4>
              {result.details && (
                <div className="result-details">
                  <pre>{JSON.stringify(result.details, null, 2)}</pre>
                </div>
              )}
              {result.bypassType && (
                <div className="bypass-info">
                  <strong>Bypass Method:</strong> {result.bypassType}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bypass-tracker">
          <h3>Bypass Methods Discovered:</h3>
          <div className="bypass-list">
            {discoveredBypass.length === 0 ? (
              <p className="no-bypass">
                No bypass methods discovered yet. Keep testing!
              </p>
            ) : (
              discoveredBypass.map((method, idx) => (
                <div key={idx} className="bypass-item">
                  <strong>{method}</strong> bypass discovered!
                </div>
              ))
            )}
          </div>
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
              You successfully bypassed the weak CSRF token validation!
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
                  Simply having a CSRF token doesn't guarantee security
                </li>
                <li className="completed-list-item">
                  <GoShieldCheck />
                  Weak validation logic can be bypassed (null, empty, missing
                  parameter)
                </li>
                <li className="completed-list-item">
                  <GoShieldCheck />
                  Token validation must be strict and mandatory on server-side
                </li>
                <li className="completed-list-item">
                  <GoShieldCheck />
                  Never trust client-side validation alone
                </li>
                <li className="completed-list-item">
                  <GoShieldCheck />
                  Tokens must be cryptographically random and session-specific
                </li>
              </ul>
            </div>

            <div className="defense-tips">
              <h4>Proper CSRF Token Implementation:</h4>
              <ul>
                <li>
                  <strong>Mandatory:</strong> Reject ALL requests without
                  valid token
                </li>
                <li>
                  <strong>Server-side:</strong> Validate token on server,
                  never trust client
                </li>
                <li>
                  <strong>Session-specific:</strong> Token must be tied to
                  user session
                </li>
                <li>
                  <strong>Unpredictable:</strong> Use cryptographically
                  secure random generation
                </li>
                <li>
                  <strong>One-time use:</strong> Invalidate token after
                  successful use (optional but better)
                </li>
                <li>
                  <strong>Expiration:</strong> Tokens should have reasonable
                  TTL
                </li>
              </ul>
            </div>

            <div className="code-example">
              <h4>Secure Validation Example:</h4>
              <pre>
                <code>{`// WEAK (what we exploited):
if (req.body.csrf_token) {
  if (req.body.csrf_token === validToken) {
    // process request
  }
}

// SECURE:
if (!req.body.csrf_token) {
  return res.status(403).json({ error: "CSRF token required" });
}

if (req.body.csrf_token !== req.session.csrfToken) {
  return res.status(403).json({ error: "Invalid CSRF token" });
}

// Token is valid and session-specific
// Process request...`}</code>
              </pre>
            </div>

            <div className="button-container">
              <button className="next-task-btn" onClick={handleGoToNextTask}>
                Next Task: Email Change Attack →
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
            <span className="stat-label">Bypasses Found:</span>
            <span className="stat-value">{discoveredBypass.length}</span>
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
