import React, { useState, useEffect } from "react";
import "./styles.scss";

const DOMBasedXSSTask = () => {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    const updateFromHash = () => setOutput(window.location.hash.substring(1));
    updateFromHash();
    window.addEventListener("hashchange", updateFromHash);
    return () => window.removeEventListener("hashchange", updateFromHash);
  }, []);

  const levels = ["basic", "bypass", "advanced"];
  const [levelIndex, setLevelIndex] = useState(0);
  const [completed, setCompleted] = useState({
    basic: false,
    bypass: false,
    advanced: false,
  });
  const [attempts, setAttempts] = useState([]);
  const [showHint, setShowHint] = useState(false);

  const executeInput = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      window.location.hash = input || "";

      let success = false;
      try {
        const res = await fetch("/api/xss-verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payload: input, levelIndex, task: "dom" }),
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
    } catch (err) {
      console.error("Error executing input:", err);
    }
  };

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
    link.download = `dom-xss-attempts-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const currentLevelName = levels[levelIndex];
  
  const handleFinish = () => {
    console.log("All levels completed!");
    window.location.href = "/";
  }

  return (
    <div className="task-box">
      <div className="lab-warning">
        <strong>Lab Environment Only</strong> — This is an intentionally
        vulnerable educational application. Never attempt XSS attacks on real
        websites without explicit permission. Unauthorized testing is illegal.
      </div>

      <h2 className="task-title">DOM-based XSS Task</h2>

      <p className="task-intro">
        There are three levels: <strong>Basic</strong> → <strong>Bypass</strong>{" "}
        → <strong>Advanced</strong>. The input starts empty — type a payload
        (without '#') and click <strong>Execute</strong>. When a payload for the
        current level is detected as successful, the level will be marked
        complete and the task will advance.
      </p>

      <div className="level-indicator">
        <strong>Current level:</strong> {currentLevelName.toUpperCase()}
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
              "Look for simple event handlers (e.g. onerror, onload) or tags such as &lt;img&gt; or &lt;svg&gt;."}
            {currentLevelName === "bypass" &&
              "Try alternative vectors: srcdoc, iframe, encoded/URI-encoded payloads, or elements with autofocus/ontoggle."}
            {currentLevelName === "advanced" &&
              "Think about data exfiltration: postMessage, parent.postMessage, eval/atob, srcdoc with embedded script, or fetch(document.cookie)."}
          </p>
        </div>
      )}

      <form className="task-form" onSubmit={executeInput}>
        <input
          className="task-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Enter an XSS payload for level ${currentLevelName} (without '#')`}
        />
        <div className="task-actions">
          <button className="btn" type="submit" disabled={!input}>
            Execute
          </button>
        </div>
      </form>

      <div className="result-section">
        <h4>Result (render hash as HTML)</h4>
        <div
          className="result-box"
          dangerouslySetInnerHTML={{ __html: output }}
        />

        <div className="attempt-log">
          <div className="log-header">
            <h5>Attempt log (recent)</h5>
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
            {attempts.slice(0, 10).map((a, idx) => (
              <li
                key={idx}
                className={`log-item ${a.success ? "success" : "fail"}`}
              >
                <code>{a.payload}</code> — {a.level} —{" "}
                {a.success ? "Success" : "Fail"}
              </li>
            ))}
          </ul>
          {levelIndex === 2 && completed.advanced && (
            <button className="next-btn" onClick={handleFinish}>
              All levels completed! Well done.
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DOMBasedXSSTask;
