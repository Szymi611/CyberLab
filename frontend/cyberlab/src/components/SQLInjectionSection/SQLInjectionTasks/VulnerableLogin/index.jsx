import { useState } from "react";
import "./styles.scss";
import { FaRegLightbulb } from "react-icons/fa6";
import { IoMdArrowBack } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { MdError } from "react-icons/md";
import { IoShieldOutline } from "react-icons/io5";
import { GoShieldCheck } from "react-icons/go";

export default function VulnerableLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const vulnerableLogin = async (user, pass) => {
    try {
      const response = await fetch("/api/sqlinjection/vulnerable-login", {
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
    setResult(null);
    setLoading(true);
    const loginResult = await vulnerableLogin(username, password);

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
      setResult({
        type: "success",
        message: "Success! You bypassed authentication using SQL Injection!",
        query: loginResult.query,
        explanation:
          "Your input modified the SQL query logic, making it always return true. Well done!",
      });
      setCompleted(true);
    } else {
      setResult({
        type: "error",
        message: "Login failed. The credentials are incorrect.",
        query: loginResult.query,
        explanation:
          "Try injecting SQL code that makes the WHERE clause always true. Or help yourself with hints!",
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
    " The admin username is 'admin'",
    " Try adding SQL code after the username",
    " What if you close the quote and add OR '1'='1'?",
    " Example: admin' OR '1'='1",
    " The -- symbol comments out the rest of the SQL query",
  ];

  const [currentHint, setCurrentHint] = useState(0);

  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoToNextTask = () => {
    window.location.href = "/sql-injection/tasks/task2";
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="header-container">
          <div className="back-icon">
            <IoMdArrowBack onClick={handleGoBack} />
          </div>
          <div className="header-content">
            <h1>SQL Injection Challenge</h1>
          </div>
          <p>Can you bypass the login without knowing the password?</p>
          <div className="attempts-container">
            <span>Attempts: {attempts}</span>
          </div>
        </div>

        <div className="challenge-card">
          <div className="card-content">
            <h2 className="challenge-title">Vulnerable Login Form</h2>
          </div>

          <div className="login-form">
            <div>
              <label className="login-label">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="login-input"
                disabled={completed}
              />
            </div>
            <div>
              <label className="login-label">Password</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="login-input"
                disabled={completed}
              />
            </div>
            <button
              onClick={handleLogin}
              disabled={completed}
              className="login-button"
            >
              {loading
                ? "Checking..."
                : completed
                ? "Challenge Completed"
                : "Login"}{" "}
            </button>
          </div>

          <div className="query-box">
            <div>
              <h2>Live SQL Query</h2>
            </div>
            <p className="query-label">
              This is how your input is being used in the SQL query. It will
              update automatically as you type into inputs:
            </p>
            <pre className="query-pre">{buildQuery()}</pre>
          </div>
        </div>

        {result && (
          <div
            className={`result-box ${
              result.type === "success" ? "success" : "error"
            }`}
          >
            <div className="result-row">
              {result.type === "success" ? (
                <div className="result-icon">
                  <div>
                    <MdDone size={28} />
                  </div>
                </div>
              ) : (
                <div className="result-icon">
                  <MdError />
                </div>
              )}

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
              You successfully exploited SQL Injection vulnerability!
            </p>
            <div className="completed-card">
              <h3 className="completed-card-title">
                <div className="completed-card-header">
                  <IoShieldOutline /> How to Prevent This:
                </div>
              </h3>
              <ul className="completed-list">
                <div>
                  <li className="completed-list-item">
                    <GoShieldCheck />
                    Use prepared statements with parameterized queries
                  </li>
                </div>
                <li className="completed-list-item">
                  <GoShieldCheck />
                  Never concatenate user input directly into SQL
                </li>
                <li className="completed-list-item">
                  <GoShieldCheck />
                  Validate and sanitize all user inputs
                </li>
                <li className="completed-list-item">
                  <GoShieldCheck />
                  Use ORM frameworks with proper escaping
                </li>
              </ul>
            </div>
            <div className="button-container">
              <button className="next-task-btn" onClick={handleGoToNextTask}>Go to next task</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
