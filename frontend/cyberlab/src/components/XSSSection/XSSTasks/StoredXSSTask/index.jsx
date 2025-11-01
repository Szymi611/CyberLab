import React, { useState, useEffect } from "react";
import "./styles.scss";

const StoredXSSTask = () => {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  const levels = ["basic", "bypass", "advanced"];
  const [levelIndex, setLevelIndex] = useState(0);
  const [completed, setCompleted] = useState({
    basic: false,
    bypass: false,
    advanced: false,
  });
  const [attempts, setAttempts] = useState([]);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comments");
        const data = await res.json();
        if (data.comments) {
          setComments(data.comments.map((c) => c.content));
        }
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let success = false;
    try {
      const res = await fetch("/api/xss-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload: input, levelIndex, task: "stored" }),
      });
      const data = await res.json();
      success = !!data.success;
    } catch (err) {
      console.error("Verification request failed:", err);
      success = false;
    }

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: input }),
      });
      const data = await res.json();
      if (data.success && data.comment) {
        setComments((c) => [...c, data.comment.content]);
      }
    } catch (err) {
      console.error("Failed to post comment:", err);
    }

    const lvlName = levels[levelIndex];
    setAttempts((a) => [{ payload: input, level: lvlName, success }, ...a]);

    if (success) {
      setCompleted((c) => ({ ...c, [lvlName]: true }));
      if (levelIndex < levels.length - 1)
        setTimeout(() => {
          setLevelIndex((i) => i + 1);
          setInput("");
          setShowHint(false);
        }, 600);
    }

    setInput("");
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
    link.download = `stored-xss-attempts-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const clearAllComments = async () => {
    if (
      !window.confirm(
        "Clear all comments? This will remove them from the server."
      )
    )
      return;
    try {
      await fetch("/api/comments", { method: "DELETE" });
      setComments([]);
    } catch (err) {
      console.error("Failed to clear comments:", err);
    }
  };

  const currentLevelName = levels[levelIndex];

  if (loading) {
    return <div className="task-box">Loading comments...</div>;
  }

  const handleGoNext = () => {
    window.location.href = "/xss/tasks/task3";
  }

  return (
    <div className="task-box">
      <div className="lab-warning">
        <strong>Lab Environment Only</strong> — This is an intentionally
        vulnerable educational application. Never attempt XSS attacks on real
        websites without explicit permission. Unauthorized testing is illegal.
      </div>

      <h2 className="task-title">Stored XSS</h2>

      <p className="task-intro">
        Add a comment. Try to inject JavaScript, e.g.:
        <br />
        <code className="example">
          {"<script>alert('Stored XSS')</script>"}
        </code>
        <br />
        <small>
          Comments are stored on the server and persist across page refreshes
          (true Stored XSS).
        </small>
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
              "Simple comments with onerror/onload or <img> usually work."}
            {currentLevelName === "bypass" &&
              "Try svg/math tags, encoded payloads or iframe/srcdoc."}
            {currentLevelName === "advanced" &&
              "Consider scripts that exfiltrate data (postMessage, fetch(document.cookie), parent.postMessage)."}
          </p>
        </div>
      )}

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          className="task-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter comment or XSS payload"
        />
        <div className="task-actions">
          <button className="btn" type="submit" disabled={!input}>
            Add comment
          </button>
        </div>
      </form>

      <div className="comments-list">
        <div className="log-header">
          <h4>Comments ({comments.length})</h4>
          <button
            className="log-btn"
            onClick={clearAllComments}
            disabled={comments.length === 0}
          >
            Clear all
          </button>
        </div>
        <ul>
          {comments.map((comment, idx) => (
            <li key={idx} className="comment-item">
              <div
                className="comment-content"
                dangerouslySetInnerHTML={{ __html: comment }}
              />
            </li>
          ))}
          {comments.length === 0 && (
            <li className="no-comments">No comments yet. Add one above!</li>
          )}
        </ul>
      </div>

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
          <button className="next-btn" onClick={handleGoNext}>
            All tasks completed! Well done.
          </button>
        )}
      </div>
    </div>
  );
};

export default StoredXSSTask;
