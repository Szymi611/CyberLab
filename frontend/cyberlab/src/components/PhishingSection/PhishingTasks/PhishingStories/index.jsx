import { IoMdArrowBack } from "react-icons/io";
import { GoQuestion } from "react-icons/go";
import "./styles.scss";
import InfoModal from "../../../../lib/Modal/index.jsx";
import { useState } from "react";
import stories from "./stories.json";

export default function PhishingStories() {
  const [showInfo, setShowInfo] = useState(false);
  const [currentStoriesIndex, setCurrentStoriesIndex] = useState(0);
  const [completedStories, setCompletedStories] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answer, setAnswer] = useState(null);

  const currentStory = stories.stories[currentStoriesIndex] || {};

  const handleSubmit = (selectedIndex) => {
    setAnswer(selectedIndex);
    setShowResults(true);
  };

  const handleNext = () => {
    setCompletedStories((prev) => prev + 1);
    if (currentStoriesIndex < stories.stories.length - 1) {
      setCurrentStoriesIndex((prev) => prev + 1);
      setShowResults(false);
      setAnswer(null);
    }
  }

  return (
    <div className="phishing-stories-container">
      <div className="phishing-stories-header">
        <div className="phishing-stories-title">
          <IoMdArrowBack />
          <h2>{stories.title}</h2>
          <span className="stories-tips-icon" onClick={() => setShowInfo(true)}>
            <GoQuestion size={24} />
          </span>
          <InfoModal
            open={showInfo}
            onClose={() => setShowInfo(false)}
            data={stories.tips}
          />
        </div>

        <p>
          You will receive a total of {stories.stories.length} stories.
          <br />
          Good luck!
        </p>

        <div className="progress-section">
          <div className="progress-info">
            <span>
              Story {currentStoriesIndex + 1} of {stories.stories.length}
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${(completedStories / stories.stories.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="story-card">
        <h3>{stories.question}</h3>
        <p>{currentStory.scenario}</p>
        <div className="story-options">
          <div className="story-options-content">
            <h4>Story content and analysis</h4>
            <div className="story-options-buttons">
              {currentStory.options &&
                stories.options.map((option, index) => (
                  <div key={index} className="story-option">
                    <button
                      className={`stories-btn ${
                        index === 0 ? "error-btn" : "success-btn"
                      }`}
                      onClick={() => handleSubmit(index)}
                      disabled={showResults}
                    >
                      {option}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {showResults && (
        <div className="story-results">
          <h4>Results: </h4>
          {currentStory.answer === answer ? (
            <p className="correct-answer">Correct! Well done.</p>
          ) : (
            <>
              <p className="incorrect-answer">Incorrect. </p>
              <p>{currentStory.explanation}</p>
            </>
          )}
          <button onClick={handleNext}>Next Story</button>
        </div>
      )}
    </div>
  );
}
