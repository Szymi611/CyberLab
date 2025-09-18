import { useState } from "react";
import urls from "./urls.json";
import { IoWarningOutline } from "react-icons/io5";
import { GoQuestion } from "react-icons/go";
import "./styles.scss";
import InfoModal from "../../../../lib/Modal/index.jsx";

export default function UrlInspector() {
  console.log(urls);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [selectedFlags, setSelectedFlags] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [completedUrls, setCompletedUrls] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  const handleFlagToggle = (flagId) => {
    setSelectedFlags((prev) =>
      prev.includes(flagId)
        ? prev.filter((f) => f !== flagId)
        : [...prev, flagId]
    );
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleNext = () => {
    setCompletedUrls((prev) => prev + 1);
    if (currentUrlIndex < urls.urls.length - 1) {
      setCurrentUrlIndex((prev) => prev + 1);
      setSelectedFlags([]);
      setShowResults(false);
    }
  };

  const resetTask = () => {
    setCurrentUrlIndex(0);
    setSelectedFlags([]);
    setShowResults(false);
    setCompletedUrls(0);
  };

  const backToTasksPage = () => {
    window.location.href = "/phishing/tasks";
  }

  const currentUrl = urls.urls[currentUrlIndex] || {};

  return (
    <div className="url-analysis-container">
      <div className="url-analysis-header">
        <div className="url-analysis-title">
          <h2>URLs Inspector</h2>
          <span className="url-tips-icon" onClick={() => setShowInfo(true)}>
            <GoQuestion size={24} />
          </span>
          <InfoModal open={showInfo} onClose={() => setShowInfo(false)} data={urls.tips} />
        </div>

        <p>
          Imagine you are a special agent in somebody's computer form security
          department. Your job is to make sure the owner of the device does not
          fall for any phishing URLs he got somewhere. You will receive a total
          of {urls.urls.length} URLs. Find the suspicious elements in them and
          don't let the owner get phished! Not all of them are phishing, some
          are perfectly safe.
          <br />
          Good luck!
        </p>
        <div className="progress-section">
          <div className="progress-info">
            <span>
              URL {currentUrlIndex + 1} of {urls.urls.length}
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${(completedUrls / urls.urls.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="url-card">
        <h3>{currentUrl.displayText}</h3>
        {currentUrl.id % 4 === 0 ? (
          <a
            href={currentUrl.actualUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here
          </a>
        ) : (
          <p>{currentUrl.actualUrl}</p>
        )}
      </div>
      <div className="url-options">
        <div className="url-options-checkboxes">
          <h4>Choose suspicious elements</h4>
          <div className="url-flags-list">
            {urls.flagTypes.map((flag) => (
              <label key={flag.id} className="url-flag-label">
                <input
                  type="checkbox"
                  className="url-flag-checkbox"
                  checked={selectedFlags.includes(flag.id)}
                  onChange={() => handleFlagToggle(flag.id)}
                  disabled={showResults}
                />
                <IoWarningOutline />
                <span className="url-flag-text">{flag.label}</span>
              </label>
            ))}
          </div>
        </div>
        {!showResults && (
          <button className="urlAnalysis-btn" onClick={handleSubmit}>
            Check your answers
          </button>
        )}
      </div>
      {showResults && (
        <div className="url-results">
          <h4>Analysis results:</h4>

          <div className="results-flags">
            {urls.flagTypes.map((option) => {
              const isCorrectFlag = currentUrl.redFlags.includes(option.id);
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
                  <span className="flag-description">{option.description}</span>
                  <span className="flag-type">
                    {isCorrectFlag ? "(Podejrzane)" : "(OK)"}
                  </span>
                </div>
              );
            })}
          </div>

          {currentUrl.redFlags && currentUrl.redFlags.length > 0 && (
            <div className="explanations">
              <h5>Explanations:</h5>
              <div className="explanation">
                <strong>
                  <span>{currentUrl.explanation}</span>
                </strong>
              </div>
            </div>
          )}

          <div className="score-section">
            {currentUrlIndex < urls.urls.length - 1 ? (
              <button className="urlAnalysis-btn" onClick={handleNext}>
                Next URL ({currentUrlIndex + 1}/{urls.urls.length})
              </button>
            ) : (
              <div>
                <p>Task completed!</p>
                <button className="urlAnalysis-btn" onClick={backToTasksPage}>
                  End task
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
