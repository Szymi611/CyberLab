import React, { useState } from "react";
import "./styles.scss";

const ReflectedXSSTask = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const levels = ["basic", "bypass", "advanced"];
  const [levelIndex, setLevelIndex] = useState(0);
  const [completed, setCompleted] = useState({
    basic: false,
    bypass: false,
    advanced: false,
  });
  const [attempts, setAttempts] = useState([]);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOutput(input);

    let success = false;
    try {
      const res = await fetch("/api/xss-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload: input, levelIndex, task: "reflected" }),
      });
      const data = await res.json();
      success = !!data.success;
    } catch (err) {
      console.error("Verification request failed:", err);
      success = false;
    }

    const lvlName = levels[levelIndex];
    setAttempts((a) => [{ payload: input, level: lvlName, success }, ...a]);

    if (success) {
      setCompleted((c) => ({ ...c, [lvlName]: true }));
      if (levelIndex < levels.length - 1) {
        setTimeout(() => {
          setLevelIndex((i) => i + 1);
          setInput("");
          setShowHint(false);
        }, 600);
      }
    }
  };

  const currentLevelName = levels[levelIndex];

  const clearLog = () => setAttempts([]);

  const exportLog = () => {
    const csv = ["Payload,Level,Result"]
      .concat(
        attempts.map(
          (a) =>
            `"${a.payload.replace(/"/g, '""')}",${a.level},${
              a.success ? "Success" : "Fail"
            }`
        )
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `reflected-xss-attempts-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleGoNext = () => {
    window.location.href = "/xss/tasks/task2";
  };

  return (
    <div className="task-box">
      <div className="lab-warning">
        <strong>Lab Environment Only</strong> — This is an intentionally
        vulnerable educational application. Never attempt XSS attacks on real
        websites without explicit permission. Unauthorized testing is illegal.
      </div>

      <h2 className="task-title">Reflected XSS</h2>

      <p className="task-intro">
        Enter text or try to inject JavaScript, e.g.:
        <br />
        <code className="example">{"<script>alert('XSS')</script>"}</code>
      </p>

      <div className="level-indicator">
        <strong>Current level:</strong> {currentLevelName.toUpperCase()} &nbsp;|
        &nbsp;Completed: {completed.basic ? "Basic✓" : "-"}{" "}
        {completed.bypass ? ", Bypass✓" : ""}{" "}
        {completed.advanced ? ", Advanced✓" : ""}
      </div>

      <div className="hint-controls">
        <button
          className="hint-btn"
          type="button"
          onClick={() => setShowHint((s) => !s)}
        >
          {showHint ? "Hide hint" : "Get hint"}
        </button>
        {completed[currentLevelName] && levelIndex < levels.length - 1 && (
          <button
            className="hint-btn"
            type="button"
            onClick={() => {
              setLevelIndex((i) => i + 1);
              setInput("");
              setShowHint(false);
            }}
          >
            Next level
          </button>
        )}
      </div>

      {showHint && (
        <div className="hint-box">
          <p className="hint-text">
            {currentLevelName === "basic" &&
              "Look for simple event handlers (e.g. onerror, onload) or tags such as <img>."}
            {currentLevelName === "bypass" &&
              "Try encoded payloads, svg/math or iframe/srcdoc vectors."}
            {currentLevelName === "advanced" &&
              "Try data exfiltration vectors: postMessage, fetch(document.cookie), eval/atob."}
          </p>
        </div>
      )}

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          className="task-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text or XSS payload"
        />
        <div className="task-actions">
          <button className="btn" type="submit" disabled={!input}>
            Submit
          </button>
        </div>
      </form>

      <div className="result-section">
        <h4>Result</h4>
        <div
          className="result-box"
          dangerouslySetInnerHTML={{ __html: output }}
        />

        <div className="attempt-log">
          <div className="log-header">
            <h5>Attempt log</h5>
            <div className="log-actions">
              <button
                className="log-btn"
                onClick={clearLog}
                disabled={attempts.length === 0}
              >
                Clear
              </button>
              <button
                className="log-btn"
                onClick={exportLog}
                disabled={attempts.length === 0}
              >
                Export CSV
              </button>
            </div>
          </div>
          <ul>
            {attempts.slice(0, 10).map((entry, idx) => (
              <li
                key={idx}
                className={`log-item ${entry.success ? "success" : "fail"}`}
              >
                <code className="log-payload">{entry.payload}</code> —{" "}
                {entry.level} — {entry.success ? "Success" : "Fail"}
              </li>
            ))}
          </ul>
          {levelIndex === 2 && completed.advanced && (
            <button className="next-btn" onClick={handleGoNext}>
              All tasks completed! Well done.
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReflectedXSSTask;
