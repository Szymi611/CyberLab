import { useState } from "react";
import "./styles.scss";
import { FaRegLightbulb } from "react-icons/fa6";
import { IoMdArrowBack } from "react-icons/io";
import { IoShieldOutline } from "react-icons/io5";
import { GoShieldCheck } from "react-icons/go";
import { AiOutlineEye } from "react-icons/ai";

export default function BlindSQLInjection() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [discoveredPassword, setDiscoveredPassword] = useState("");

  const ACTUAL_PASSWORD = "s3cr3t";

  const [loading, setLoading] = useState(false);

  const blindLogin = async (user, pass) => {
    try {
      const response = await fetch("/api/sqlinjection/blind-login", {
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
    const loginResult = await blindLogin(username, password);

    if (!loginResult) {
      setResult({
        type: "error",
        message: "No response from server",
        query: buildQuery(),
        explanation:
          "Check if the backend is running and if the API path is correct.",
      });
      setLoading(false);
      return;
    }

    if (loginResult.error) {
      setResult({
        type: "error",
        message: "Network/server error",
        query: buildQuery(),
        explanation: loginResult.message,
      });
      setLoading(false);
      return;
    }

    if (loginResult.success) {
      const substringPattern =
        /admin'\s*AND\s*SUBSTRING\s*\(\s*password\s*,\s*(\d+)\s*,\s*1\s*\)\s*=\s*'([^']+)'/i;
      const match = username.match(substringPattern);

      if (match) {
        const position = parseInt(match[1]);
        const newDiscovered = ACTUAL_PASSWORD.substring(0, position);

        if (newDiscovered.length > discoveredPassword.length) {
          setDiscoveredPassword(newDiscovered);
        }

        if (newDiscovered === ACTUAL_PASSWORD) {
          setCompleted(true);
          setResult({
            type: "success",
            message: "Congratulations! You've discovered the full password!",
            query: loginResult.query,
            explanation: `The password is: ${ACTUAL_PASSWORD}. You used Blind SQL Injection to extract it character by character! This technique works even when the application doesn't show error messages.`,
          });
          setLoading(false);
          return;
        }
      }

      setResult({
        type: "partial",
        message: loginResult.message,
        query: loginResult.query,
        explanation: `Your query condition returned TRUE. Discovered so far: "${discoveredPassword}". Keep extracting the next character!`,
      });
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
    "The username is 'admin'. You need to extract the password character by character.",
    "Use SUBSTRING(password, position, 1) to get one character at a time from the password.",
    "Example: admin' AND SUBSTRING(password, 1, 1) = 'a' - this checks if first char is 'a'",
    "Try guessing the first character: a, b, c, s... When you get TRUE, move to position 2!",
    "The password is 6 characters long. Extract all 6 characters to complete the challenge.",
    "Full working example: admin' AND SUBSTRING(password, 1, 1) = 's' (first char is 's'!)",
  ];

  const [currentHint, setCurrentHint] = useState(0);

  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoToNextTask = () => {
    window.location.href = "/sql-injection/tasks/task3";
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="header-container">
          <div className="back-icon">
            <IoMdArrowBack onClick={handleGoBack} />
          </div>
          <div className="header-content">
            <h1>Level 2: Blind SQL Injection Challenge</h1>
          </div>
          <p>Extract the password without seeing any error messages!</p>
          <div className="attempts-container">
            <span>Attempts: {attempts}</span>
          </div>
        </div>

        <div
          className="challenge-card"
          style={{
            background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
            color: "white",
            marginBottom: "1.5rem",
          }}
        >
          <div className="card-content">
            <h2 className="challenge-title">
              <AiOutlineEye style={{ marginRight: "0.5rem" }} />
              Blind SQL Injection Mode
            </h2>
            <p style={{ marginTop: "0.5rem", fontSize: "0.95rem" }}>
              This application doesn't show SQL errors! You'll only see "Login
              Successful" or "Login Failed". Use TRUE/FALSE conditions to
              extract the password character by character.
            </p>
          </div>
        </div>

        {discoveredPassword && (
          <div
            className="challenge-card"
            style={{
              background: "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
              color: "white",
              marginBottom: "1.5rem",
            }}
          >
            <div className="card-content">
              <h2 className="challenge-title">Password Discovery Progress</h2>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  marginTop: "1rem",
                  letterSpacing: "0.5rem",
                  textAlign: "center",
                }}
              >
                {discoveredPassword}
                {!completed &&
                  "_".repeat(
                    ACTUAL_PASSWORD.length - discoveredPassword.length
                  )}
              </div>
              <p
                style={{
                  textAlign: "center",
                  marginTop: "0.5rem",
                  fontSize: "0.9rem",
                }}
              >
                {discoveredPassword.length} / {ACTUAL_PASSWORD.length}{" "}
                characters discovered
              </p>
            </div>
          </div>
        )}

        <div className="challenge-card">
          <div className="card-content">
            <h2 className="challenge-title">Login Form (No Error Messages)</h2>
          </div>

          <div className="login-form">
            <div>
              <label className="login-label">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-input"
                disabled={completed || loading}
              />
            </div>
            <div>
              <label className="login-label">Password</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                disabled={completed || loading}
              />
            </div>
            <button
              onClick={handleLogin}
              disabled={completed || loading}
              className="login-button"
            >
              {loading
                ? "Checking..."
                : completed
                ? "✓ Challenge Completed"
                : "Login"}
            </button>
          </div>

          <div className="query-box">
            <div>
              <h2>Live SQL Query (Backend)</h2>
            </div>
            <p className="query-label">
              This is the backend query. Remember: you won't see error messages,
              only TRUE/FALSE results!
            </p>
            <pre className="query-pre">{buildQuery()}</pre>
          </div>
        </div>

        {result && (
          <div
            className={`result-box ${
              result.type === "success"
                ? "success"
                : result.type === "partial"
                ? "partial"
                : "error"
            }`}
          >
            <div className="result-row">

              <div className="result-body">
                <h3 className="result-title">{result.message}</h3>
                <div className="query-box">
                  <p className="query-label">Executed Query:</p>
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
              You successfully extracted the password using Blind SQL Injection!
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
                  Blind SQL Injection uses TRUE/FALSE responses instead of error
                  messages
                </li>
                <li className="completed-list-item">
                  <GoShieldCheck />
                  SUBSTRING() function can extract data character by character
                </li>
                <li className="completed-list-item">
                  <GoShieldCheck />
                  Even without visible errors, SQL injection is still possible
                </li>
                <li className="completed-list-item">
                  <GoShieldCheck />
                  Always use parameterized queries to prevent ALL types of SQL
                  injection
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
