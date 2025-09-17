import { useState } from "react";
import emails from "./emails.json";
import "./styles.scss";
import { IoWarningOutline } from "react-icons/io5";
import flagOptions from "./constants";


export default function EmailAnalysis() {
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
  const [selectedFlags, setSelectedFlags] = useState([]);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [completedEmails, setCompletedEmails] = useState(0);

  const currentEmail = emails.emails[currentEmailIndex] || {};

  console.log(currentEmail);

  const handleFlagToggle = (flagId) => {
    setSelectedFlags((prev) =>
      prev.includes(flagId)
        ? prev.filter((f) => f !== flagId)
        : [...prev, flagId]
    );
  };

  const calculateScore = () => {
    const correctFlags = currentEmail.redFlags;
    const correctSelected = selectedFlags.filter((flag) =>
      correctFlags.includes(flag)
    );
    const incorrectSelected = selectedFlags.filter(
      (flag) => !correctFlags.includes(flag)
    );

    const points = correctSelected.length * 10 - incorrectSelected.length * 5;
    return Math.max(0, points);
  };

  const handleSubmit = () => {
    const emailScore = calculateScore();
    setScore(emailScore);
    setTotalScore((prev) => prev + emailScore);
    setShowResults(true);
  };

  const handleNext = () => {
    setCompletedEmails((prev) => prev + 1);
    if (currentEmailIndex < emails.emails.length - 1) {
      setCurrentEmailIndex((prev) => prev + 1);
      setSelectedFlags([]);
      setShowResults(false);
      setScore(0);
    } else {
      alert(
        `Zadanie zakończone! Twój wynik: ${totalScore + score}/${
          emails.emails.length * 50
        } punktów`
      );
    }
  };

  const resetTask = () => {
    setCurrentEmailIndex(0);
    setSelectedFlags([]);
    setShowResults(false);
    setScore(0);
    setTotalScore(0);
    setCompletedEmails(0);
  };

  console.log(currentEmail);

  return (
    <div className="email-analysis-container">
      <div className="email-analysis-header">
        <h2>Email Analysis Task</h2>
        <p>
          Your task is to analyze the emails provided below and identify any
          suspicious elements that may indicate it is a phishing attempt. After
          reviewing the email, please select the elements you find suspicious
          and submit your analysis. Once you submit, you can check your answers
          and see explanations for each suspicious element. You will face a
          total of {emails.emails.length} emails. Good luck!
        </p>
        <div className="progress-section">
          <div className="progress-info">
            <span>
              Email {currentEmailIndex + 1} of {emails.emails.length}
            </span>
            <span>Total score: {totalScore} points</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${(completedEmails / emails.emails.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="email-card">
        <p>From: {currentEmail.sender}</p>
        <h3>Subject: {currentEmail.subject}</h3>
        <h4>Contents:</h4>
        <p>{currentEmail.body}</p>
      </div>
      <div className="email-options">
        <div className="email-options-checkboxes">
          <h4>Choose suspicious elements</h4>
          <div className="email-flags-list">
            {flagOptions.map((flag) => (
              <label key={flag.id} className="email-flag-label">
                <input
                  type="checkbox"
                  className="email-flag-checkbox"
                  checked={selectedFlags.includes(flag.id)}
                  onChange={() => handleFlagToggle(flag.id)}
                  disabled={showResults}
                />
                <IoWarningOutline />
                <span className="email-flag-text">{flag.label}</span>
              </label>
            ))}
          </div>
        </div>
        {!showResults && (
          <button className="emailAnalysis-btn" onClick={handleSubmit}>
            Check your answers
          </button>
        )}
      </div>
      {showResults && (
        <div className="email-results">
          <h4>Analysis results:</h4>

          <div className="results-flags">
            {flagOptions.map((option) => {
              const isCorrectFlag = currentEmail.redFlags.includes(option.id);
              const wasSelected = selectedFlags.includes(option.id);
              const isCorrect = isCorrectFlag === wasSelected;

              return (
                <div
                  key={option.id}
                  className={`result-flag ${
                    isCorrect ? "correct" : "incorrect"
                  }`}
                >
                  <span className="flag-status">{isCorrect ? "✅" : "❌"}</span>
                  <span className="flag-label">{option.label}</span>
                  <span className="flag-type">
                    {isCorrectFlag ? "(Podejrzane)" : "(OK)"}
                  </span>
                </div>
              );
            })}
          </div>

          {currentEmail.redFlags && currentEmail.redFlags.length > 0 && (
            <div className="explanations">
              <h5>Explanations:</h5>
              {currentEmail.redFlags.map((flag) => (
                <div key={flag} className="explanation">
                  <strong>
                    {flagOptions.find((f) => f.id === flag)?.label}:
                  </strong>
                  <span>{currentEmail.explanation[flag]}</span>
                </div>
              ))}
            </div>
          )}

          <div className="score-section">
            <div className="current-score">Score: {score} / 50 points</div>
            <div className="total-score">
              Total score: {totalScore + score} points
            </div>

            {currentEmailIndex < emails.emails.length - 1 ? (
              <button className="emailAnalysis-btn" onClick={handleNext}>
                Next email ({currentEmailIndex + 1}/{emails.emails.length})
              </button>
            ) : (
              <div>
                <p>
                  Task completed! Final score: {totalScore + score}/
                  {emails.emails.length * 50} points
                </p>
                <button className="emailAnalysis-btn" onClick={resetTask}>
                  Start over
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
