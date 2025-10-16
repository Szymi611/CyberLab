import { useState } from "react";
import "./styles.scss";
import { FaRegLightbulb } from "react-icons/fa6";
import { IoMdArrowBack } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { MdError } from "react-icons/md";
import { IoShieldOutline } from "react-icons/io5";
import { GoShieldCheck } from "react-icons/go";
import { MdSecurity } from "react-icons/md";
import { IoWarning } from "react-icons/io5";

export default function FilteredSQLInjection() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);

  const blockedPatterns = [
    { pattern: /\bOR\b/i, name: "OR" },
    { pattern: /\bAND\b/i, name: "AND" },
    { pattern: /--/, name: "--" },
    { pattern: /#/, name: "#" },
    { pattern: /\/\*/, name: "/*" },
    { pattern: /\*\//, name: "*/" },
    { pattern: /\bUNION\b/i, name: "UNION" },
    { pattern: /\bSELECT\b/i, name: "SELECT" },
  ];

  const [loading, setLoading] = useState(false);

  const filteredLogin = async (user, pass) => {
    try {
      const response = await fetch("/api/sqlinjection/filtered-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: user, password: pass }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server error: ${response.status} - ${text}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error calling backend:", error);
      return { error: true, message: error.message || "Network error" };
    }
  };

  const handleLogin = async () => {
    setAttempts((prev) => prev + 1);
    setLoading(true);
    const loginResult = await filteredLogin(username, password);

    if (!loginResult) {
      setResult({
        type: "error",
        message: "Brak odpowiedzi z serwera",
        query: buildQuery(),
        explanation:
          "Sprawdź czy backend działa i czy ścieżka API jest poprawna.",
      });
      setLoading(false);
      return;
    }

    if (loginResult.error) {
      setResult({
        type: "error",
        message: "Błąd sieci/serwera",
        query: buildQuery(),
        explanation: loginResult.message,
      });
      setLoading(false);
      return;
    }

    if (loginResult.blocked) {
      setResult({
        type: "blocked",
        message: loginResult.message,
        query: loginResult.query,
        blockedWords: loginResult.blockedWords,
        explanation: loginResult.explanation,
      });
    } else if (loginResult.success) {
      setResult({
        type: "success",
        message: loginResult.message,
        query: loginResult.query,
        explanation: loginResult.explanation,
      });
      setCompleted(true);
    } else {
      setResult({
        type: "error",
        message: loginResult.message,
        query: loginResult.query,
        explanation: loginResult.explanation,
      });
    }

    setLoading(false);
  };

  const buildQuery = () => {
    return `SELECT * FROM users WHERE username = '${
      username || "USER_INPUT"
    }' AND password = '${password || "PASS_INPUT"}'`;
  };

  const hints = [
    "The WAF blocks common keywords like OR, AND, --, #, UNION, SELECT",
    "Try using || (double pipe) as an alternative to OR in SQL",
    "Example of bypass: admin' || '1'='1",
    "You can also use && instead of AND for logical operations",
    "URL encoding might work: %27 is ' (single quote), %7C is |",
    "Full working payload: admin' || '1'='1' -- but wait, -- is blocked too!",
    "Try: admin' || 1=1;%00 or simply: ' || '1'='1",
  ];

  const [currentHint, setCurrentHint] = useState(0);

  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoToNextTask = () => {
    window.location.href = "/sql-injection/tasks/task4";
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="header-container">
          <div className="back-icon">
            <IoMdArrowBack onClick={handleGoBack} />
          </div>
          <div className="header-content">
            <h1>Level 3: Filtered SQL Injection Challenge</h1>
          </div>
          <p>Can you bypass the Web Application Firewall (WAF)?</p>
          <div className="attempts-container">
            <span>Attempts: {attempts}</span>
          </div>
        </div>

        <div
          className="challenge-card"
          style={{
            background: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
            color: "white",
            marginBottom: "1.5rem",
          }}
        >
          <div className="card-content">
            <h2 className="challenge-title">
              <div className="divCentered">
                <MdSecurity style={{ marginRight: "0.5rem" }} />
                WAF Protection Enabled
              </div>
            </h2>
            <p style={{ marginTop: "0.5rem", fontSize: "0.95rem" }}>
              This application has a Web Application Firewall that blocks common
              SQL injection patterns. You'll need to use advanced bypass
              techniques!
            </p>
          </div>
        </div>

        <div
          className="challenge-card"
          style={{
            background: "linear-gradient(135deg, #f39c12 0%, #e67e22 100%)",
            color: "white",
            marginBottom: "1.5rem",
          }}
        >
          <div className="card-content">
            <h2 className="challenge-title">
              <div className="divCentered">
                <IoWarning style={{ marginRight: "0.5rem" }} />
                Blocked Keywords by WAF
              </div>
            </h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginTop: "1rem",
              }}
            >
              {blockedPatterns.map((filter, i) => (
                <span
                  key={i}
                  style={{
                    background: "rgba(0,0,0,0.2)",
                    padding: "0.3rem 0.8rem",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    fontFamily: "monospace",
                  }}
                >
                  {filter.name}
                </span>
              ))}
            </div>
            <p
              style={{
                marginTop: "1rem",
                fontSize: "0.9rem",
                opacity: "0.95",
              }}
            >
              These keywords will be detected and blocked. Find alternative
              syntax!
            </p>
          </div>
        </div>

        <div className="challenge-card">
          <div className="card-content">
            <h2 className="challenge-title">Protected Login Form</h2>
          </div>

          <div className="login-form">
            <div>
              <label className="login-label">Username</label>
              <input
                type="text"
                disabled={loading || completed}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-input"
              />
            </div>
            <div>
              <label className="login-label">Password</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                disabled={loading || completed}
              />
            </div>
            <button
              onClick={handleLogin}
              disabled={loading || completed}
              className="login-button"
            >
              {loading
                ? "Checking..."
                : completed
                ? "✓ Challenge Completed"
                : "Login"}{" "}
            </button>
          </div>

          <div className="query-box">
            <div>
              <h2>Live SQL Query</h2>
            </div>
            <p className="query-label">
              Your input is checked by WAF before executing the query:
            </p>
            <pre className="query-pre">{buildQuery()}</pre>
          </div>
        </div>

        {result && (
          <div
            className={`result-box ${
              result.type === "success"
                ? "success"
                : result.type === "blocked"
                ? "blocked"
                : "error"
            }`}
            style={
              result.type === "blocked"
                ? {
                    borderColor: "#e74c3c",
                    background: "#fadbd8",
                  }
                : {}
            }
          >
            <div className="result-row">
              {result.type === "success" ? (
                <div className="result-icon">
                  <div>
                    <MdDone size={28} />
                  </div>
                </div>
              ) : result.type === "blocked" ? (
                <div className="result-icon" style={{ color: "#e74c3c" }}>
                  <MdSecurity size={28} />
                </div>
              ) : (
                <div className="result-icon">
                  <MdError />
                </div>
              )}

              <div className="result-body">
                <h3 className="result-title">{result.message}</h3>

                {result.blockedWords && (
                  <div
                    style={{
                      background: "#fff5f5",
                      border: "2px solid #e74c3c",
                      borderRadius: "8px",
                      padding: "1rem",
                      marginTop: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "#c0392b",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Blocked patterns detected:
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                      }}
                    >
                      {result.blockedWords.map((word, i) => (
                        <span
                          key={i}
                          style={{
                            background: "#e74c3c",
                            color: "white",
                            padding: "0.3rem 0.8rem",
                            borderRadius: "15px",
                            fontSize: "0.85rem",
                            fontFamily: "monospace",
                            fontWeight: "600",
                          }}
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="query-box">
                  <p className="query-label">Attempted Query:</p>
                  <pre className="query-pre">{result.query}</pre>
                </div>
                <p className="result-explanation">{result.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {!completed && (
          <div className="hint-container">
            <div className="hint-header">
              <FaRegLightbulb />
              <h3>Need Help?</h3>
            </div>

            {!showHint ? (
              <button onClick={() => setShowHint(true)} className="hint-button">
                Show Hint
              </button>
            ) : (
              <div className="hint-content">
                {hints.slice(0, currentHint + 1).map((hint, i) => (
                  <div key={i} className="hint-box">
                    <FaRegLightbulb />
                    <p>{hint}</p>
                  </div>
                ))}

                {currentHint < hints.length - 1 ? (
                  <button
                    onClick={() => setCurrentHint((prev) => prev + 1)}
                    className="hint-button"
                  >
                    Next Hint ({currentHint + 1}/{hints.length})
                  </button>
                ) : (
                  <p>That's all hints. Now you're on your own!</p>
                )}
              </div>
            )}
          </div>
        )}

        {completed && (
          <div className="completed-panel">
            <h2 className="completed-title">Challenge Completed!</h2>
            <p className="completed-subtitle">
              You successfully bypassed the WAF and exploited SQL Injection!
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
                  WAF blacklists can be bypassed with alternative SQL syntax
                </li>
                <li className="completed-list-item">
                  <GoShieldCheck />
                  || can replace OR, && can replace AND in SQL
                </li>
                <li className="completed-list-item">
                  <GoShieldCheck />
                  URL encoding and case variations can evade basic filters
                </li>
                <li className="completed-list-item">
                  <GoShieldCheck />
                  Proper defense needs parameterized queries, not just
                  blacklists!
                </li>
              </ul>
            </div>
            <div className="button-container">
              <button className="next-task-btn" onClick={handleGoToNextTask}>
                Go to next task
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
