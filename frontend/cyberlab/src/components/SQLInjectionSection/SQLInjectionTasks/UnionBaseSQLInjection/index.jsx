import { useState } from "react";
import "./styles.scss";
import { FaRegLightbulb } from "react-icons/fa6";
import { IoMdArrowBack } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { MdError } from "react-icons/md";
import { IoShieldOutline } from "react-icons/io5";
import { GoShieldCheck } from "react-icons/go";
import { GiDatabase } from "react-icons/gi";
import { MdStorage } from "react-icons/md";

export default function UnionBasedSQLInjection() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [discoveredData, setDiscoveredData] = useState([]);

  const handleLogin = async () => {
    setAttempts((prev) => prev + 1);

    try {
      const response = await fetch(
        "http://localhost:8000/api/sqlinjection/union-based-login",
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
        extractedData: data.extractedData || [],
        explanation: data.explanation,
      });

      if (data.extractedData) {
        setDiscoveredData(data.extractedData);
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
    "You need to use UNION SELECT to extract data from other tables in the database.",
    "Available tables: users (id, username, password), secrets (id, secret_key), admin_data (id, admin_user, admin_pass, email)",
    "The main query selects from 'users' table which has 2 columns: id, username, password",
    "Your UNION SELECT must have the SAME NUMBER OF COLUMNS as the main query (2 columns).",
    "Try: ' UNION SELECT id, secret_key FROM secrets -- to query the secrets table",
    "Full example: ' UNION SELECT 1, secret_key FROM secrets -- (use 1 as padding for first column)",
    "Look for a table with a column containing 'FLAG' - the secrets table has the flag!",
  ];

  const [currentHint, setCurrentHint] = useState(0);

  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoToNextTask = () => {
    window.location.href = "/sql-injection/tasks/task5";
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="header-container">
          <div className="back-icon">
            <IoMdArrowBack onClick={handleGoBack} />
          </div>
          <div className="header-content">
            <h1>Level 4: UNION-Based SQL Injection</h1>
          </div>
          <p>Extract data from multiple database tables using UNION SELECT!</p>
          <div className="attempts-container">
            <span>Attempts: {attempts}</span>
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
            <h2 className="challenge-title">
              <div className="divCentered">
                <GiDatabase style={{ marginRight: "0.5rem" }} />
                Database Structure
              </div>
            </h2>
            <div className="database-info">
              <p className="database-subtitle">Available Tables:</p>
              <div className="database-record">
                <p>
                  <strong>users:</strong> id (int), username (string), password
                  (string)
                </p>
                <p>
                  <strong>secrets:</strong> id (int), secret_key (string)
                </p>
                <p>
                  <strong>admin_data:</strong> id (int), admin_user (string),
                  admin_pass (string), email (string)
                </p>
              </div>
              <p className="database-hint">
                The FLAG you're looking for is in the secrets table!
              </p>
            </div>
          </div>
        </div>

        <div
          className="challenge-card"
          style={{
            background: "linear-gradient(135deg, #e67e22 0%, #d35400 100%)",
            color: "white",
            marginBottom: "1.5rem",
          }}
        >
          <div className="card-content">
            <h2 className="challenge-title">
              <div className="divCentered">
                <MdStorage style={{ marginRight: "0.5rem" }} />
                UNION SELECT Rules
              </div>
            </h2>
            <p style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
              The main query selects <strong>2 columns</strong> from the users
              table. Your UNION query must also return exactly{" "}
              <strong>2 columns</strong>, or the database will throw an error!
            </p>
            <p className="database-hint">
              If a table has more columns than needed, use padding (like '1' or
              'NULL').
            </p>
          </div>
        </div>

        <div className="challenge-card">
          <div className="card-content">
            <h2 className="challenge-title">Search Users & Extract Data</h2>
          </div>

          <div className="login-form">
            <div>
              <label className="login-label">Username (with injection)</label>
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
              {completed ? "✓ Challenge Completed" : "Search"}
            </button>
          </div>

          <div className="query-box">
            <div>
              <h2>Live SQL Query</h2>
            </div>
            <p className="query-label">
              Your injected query will be combined with the original query:
            </p>
            <pre className="query-pre">{buildQuery()}</pre>
          </div>
        </div>

        {discoveredData.length > 0 && (
          <div
            className="challenge-card"
            style={{
              background: "linear-gradient(135deg, #27ae60 0%, #229954 100%)",
              color: "white",
              marginBottom: "1.5rem",
              marginTop: "1.5rem",
            }}
          >
            <div className="card-content">
              <h2 className="challenge-title">Extracted Data</h2>
              <div className="discover-content">
                <table className="discover-table">
                  <thead>
                    <tr className="discover-table-row">
                      {Object.keys(discoveredData[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {discoveredData.map((row, idx) => (
                      <tr key={idx} className="discover-table-row">
                        {Object.values(row).map((val, i) => (
                          <td className="discover-table-td" key={i}>
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

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
                  <p>That's all hints. You got this! </p>
                )}
              </div>
            )}
          </div>
        )}

        {completed && (
          <div className="completed-panel">
            <h2 className="completed-title"> Challenge Completed!</h2>
            <p className="completed-subtitle">
              You successfully extracted the FLAG using UNION-Based SQL
              Injection!
            </p>
            <div className="completed-card">
              <h3 className="completed-card-title">
                <div className="completed-card-header">
                  <IoShieldOutline /> What You Learned:
                </div>
              </h3>
              <ul className="completed-list">
                <div className="completed-list-item">
                  <li>
                    <div className="divCentered">
                      <GoShieldCheck />
                      <span className="learnt-text">
                        UNION SELECT combines results from multiple tables
                      </span>
                    </div>
                  </li>
                </div>
                <li>
                  <div className="divCentered">
                    <GoShieldCheck />
                    <span className="learnt-text">
                      Column count must match between UNION queries
                    </span>
                  </div>
                </li>
                <li>
                  <div className="divCentered">
                    <GoShieldCheck />
                    <span className="learnt-text">
                      You can extract data from ANY table in the database
                    </span>
                  </div>
                </li>
                <li>
                  <div className="divCentered">
                    <GoShieldCheck />
                    <span className="learnt-text">
                      Parameterized queries + least privilege prevent this!
                    </span>
                  </div>
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
