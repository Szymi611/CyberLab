import { useState } from "react";
import "./styles.scss";
import { FaRegLightbulb } from "react-icons/fa6";
import { IoMdArrowBack } from "react-icons/io";
import { IoShieldOutline } from "react-icons/io5";
import { GoShieldCheck } from "react-icons/go";
import { BiErrorCircle } from "react-icons/bi";
import { MdWarningAmber } from "react-icons/md";

export default function ErrorBasedSQLInjection() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [extractedSecret, setExtractedSecret] = useState("");

  const handleLogin = async () => {
    setAttempts((prev) => prev + 1);

    try {
      const response = await fetch(
        "http://localhost:8000/api/sqlinjection/error-based-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      setResult({
        type: data.type,
        message: data.message,
        query: data.query,
        errorMessage: data.errorMessage,
        extractedData: data.dataExtracted,
        explanation: data.explanation,
      });

      if (data.dataExtracted) {
        setExtractedSecret(data.dataExtracted);
      }

      if (data.completed) {
        setCompleted(true);
      }
    } catch (error) {
      setResult({
        type: "error",
        message: "Connection error",
        explanation: "Could not connect to the server",
      });
    }
  };

  const buildQuery = () => {
    return `SELECT * FROM users WHERE username = '${
      username || "USER_INPUT"
    }' AND password = '${password || "PASS_INPUT"}'`;
  };

  const hints = [
    "Error-Based SQLi works by embedding data extraction inside error-triggering functions.",
    "In MySQL, functions like EXTRACTVALUE() and UPDATEXML() throw errors with your data visible.",
    "EXTRACTVALUE syntax: extractvalue(1, concat(0x7e, (SELECT query_here)))",
    "0x7e is the tilde (~) character in hex - it helps separate the data in the error.",
    "Try: ' OR extractvalue(1, concat(0x7e, (SELECT secret_key FROM secrets LIMIT 1)))--",
    "UPDATEXML is similar: updatexml(1, concat(0x7e, (SELECT ...)), 1)--",
    "The flag/secret is in the secrets table column: secret_key = 'API_KEY_xyz789'",
  ];

  const [currentHint, setCurrentHint] = useState(0);

  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoToNextTask = () => {
    window.location.href = "/sql-injection";
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="header-container">
          <div className="back-icon">
            <IoMdArrowBack onClick={handleGoBack} />
          </div>
          <div className="header-content">
            <h1>Level 5: Error-Based SQL Injection</h1>
          </div>
          <p>
            Extract data by embedding queries in error-triggering functions!
          </p>
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
              <BiErrorCircle style={{ marginRight: "0.5rem" }} />
              Error-Based SQL Injection
            </h2>
            <p style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
              This technique exploits database error messages. By embedding
              SELECT queries inside error-triggering functions, the database
              reveals data in the error message itself!
            </p>
          </div>
        </div>

        <div
          className="challenge-card"
          style={{
            background: "linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)",
            color: "white",
            marginBottom: "1.5rem",
          }}
        >
          <div className="card-content">
            <h2 className="challenge-title">
              <div className="centeredDiv">
                <MdWarningAmber style={{ marginRight: "0.5rem" }} />
                MySQL Error Functions
              </div>
            </h2>
            <div className="errorFunction-content">
              <p style={{ marginBottom: "0.75rem" }}>
                <strong>EXTRACTVALUE(xml, xpath)</strong>
              </p>
              <p
                style={{
                  marginLeft: "1rem",
                  marginBottom: "1rem",
                  opacity: 0.9,
                }}
              >
                Extracts data from XML. When XPath is invalid, shows data in
                error.
              </p>

              <p style={{ marginBottom: "0.75rem" }}>
                <strong>UPDATEXML(xml, xpath, value)</strong>
              </p>
              <p style={{ marginLeft: "1rem", opacity: 0.9 }}>
                Updates XML nodes. Similar error behavior to EXTRACTVALUE.
              </p>

              <p
                style={{
                  marginTop: "1rem",
                  fontSize: "0.75rem",
                  opacity: 0.8,
                }}
              >
                <strong>Pro tip:</strong> 0x7e in hex = ~ (tilde) character used
                to separate data
              </p>
            </div>
          </div>
        </div>

        <div
          className="challenge-card"
          style={{
            background: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
            color: "white",
            marginBottom: "1.5rem",
          }}
        >
          <div className="card-content">
            <h2 className="challenge-title">Data to Extract</h2>
            <div style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
              <p style={{ marginBottom: "0.5rem" }}>
                <strong>Table:</strong> secrets
              </p>
              <p style={{ marginBottom: "1rem" }}>
                <strong>Column:</strong> secret_key
              </p>
              <p style={{ marginBottom: "1rem" }}>
                <strong>Value:</strong> API_KEY_xyz789 (you need to extract
                this!)
              </p>
              <div
                style={{
                  background: "rgba(0,0,0,0.3)",
                  padding: "0.75rem",
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                }}
              >
                When you extract it correctly, the value will appear in the
                error message!
              </div>
            </div>
          </div>
        </div>

        <div className="challenge-card">
          <div className="card-content">
            <h2 className="challenge-title">Login Form with Error Output</h2>
          </div>

          <div className="login-form">
            <div>
              <label className="login-label">Username (inject here)</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                className="login-input"
                disabled={completed}
              />
            </div>
            <button
              onClick={handleLogin}
              disabled={completed}
              className="login-button"
            >
              {completed ? "✓ Challenge Completed" : "Login"}
            </button>
          </div>

          <div className="query-box">
            <div>
              <h2>Live SQL Query</h2>
            </div>
            <p className="query-label">
              Inject error-based SQL code in the username field:
            </p>
            <pre className="query-pre">{buildQuery()}</pre>
          </div>
        </div>

        {extractedSecret && (
          <div
            className="challenge-card"
            style={{
              background: "linear-gradient(135deg, #27ae60 0%, #229954 100%)",
              color: "white",
              marginTop: "1rem",
            }}
          >
            <div className="card-content">
              <h2 className="challenge-title">✓ Extracted Secret</h2>
              <div className="extracted-content">{extractedSecret}</div>
            </div>
          </div>
        )}

        {result && (
          <div
            className={`result-box ${
              result.type === "success"
                ? "success"
                : result.type === "partial-success"
                ? "partial"
                : "error"
            }`}
            style={
              result.type === "error-shown"
                ? {
                    borderColor: "#f39c12",
                    background: "#fef5e7",
                  }
                : {}
            }
          >
            <div className="result-row">
              <div className="result-body">
                <h3 className="result-title">{result.message}</h3>
                <div className="query-box">
                  <p className="query-label">Executed Query:</p>
                  <pre className="query-pre">{result.query}</pre>
                </div>

                {result.errorMessage && (
                  <div className="error-message-box">
                    <p className="error-message-title">
                      Database Error Message:
                    </p>
                    <pre className="error-message-pre">
                      {result.errorMessage}
                    </pre>
                  </div>
                )}

                {result.extractedData && (
                  <div className="extracted-data-box">
                    <p className="extracted-data-title">Extracted Data:</p>
                    <pre className="extracted-data-pre">
                      {result.extractedData}
                    </pre>
                  </div>
                )}

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
                  <p>That's all hints. You got this!</p>
                )}
              </div>
            )}
          </div>
        )}

        {completed && (
          <div className="completed-panel">
            <h2 className="completed-title">Challenge Completed!</h2>
            <p className="completed-subtitle">
              You successfully extracted data using Error-Based SQL Injection!
            </p>
            <div className="completed-card">
              <h3 className="completed-card-title">
                <div className="completed-card-header">
                  <IoShieldOutline /> What You Learned:
                </div>
              </h3>
              <ul className="completed-list">
                <div>
                  <li className="completed-list-item">
                    <GoShieldCheck />
                    Error-based SQLi embeds queries in error-triggering
                    functions
                  </li>
                </div>
                <li className="completed-list-item">
                  <GoShieldCheck />
                  Database errors can reveal sensitive data if not handled
                  properly
                </li>
                <li className="completed-list-item">
                  <GoShieldCheck />
                  Functions like EXTRACTVALUE() and UPDATEXML() are vulnerable
                </li>
                <li className="completed-list-item">
                  <GoShieldCheck />
                  Always use parameterized queries and suppress detailed error
                  messages!
                </li>
              </ul>
            </div>
            <div className="button-container">
              <button className="next-task-btn" onClick={handleGoToNextTask}>
                Go to Main Page. You successfully completed the tasks!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
