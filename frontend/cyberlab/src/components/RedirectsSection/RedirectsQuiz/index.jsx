import { useRef, useState } from "react";
import quizData from "../../../assets/content/redirects-quiz.json";
import "./quiz.scss";
import { IoMdArrowBack } from "react-icons/io";

export default function RedirectsQuiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const answeredLockRef = useRef(false);

  const totalQuestions = quizData.questions.length;
  const question = quizData.questions[current];

  const handleAnswer = (index) => {
    if (answeredLockRef.current || finished) return;

    answeredLockRef.current = true;
    setSelected(index);

    if (index === question.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (selected === null) return;

    if (current + 1 < totalQuestions) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
      answeredLockRef.current = false;
    } else {
      setFinished(true);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="quiz-card">
      <IoMdArrowBack
        onClick={handleGoBack}
        style={{ cursor: "pointer", marginTop: "1rem" }}
        aria-label="Go back"
      />
      <h2 className="quiz-title">{quizData.title}</h2>

      {!finished && (
        <p className="quiz-question-count">{`Question ${
          current + 1
        } of ${totalQuestions}`}</p>
      )}

      {!finished ? (
        <div className="quiz-question">
          <h3>{`${current + 1}. ${question.question}`}</h3>
          <ul className="quiz-options">
            {question.options.map((opt, index) => {
              const isSelected = selected === index;
              const isCorrect = index === question.answer;

              let stateClass = "";
              if (selected !== null) {
                stateClass = isCorrect ? "correct" : isSelected ? "wrong" : "";
              }

              return (
                <li
                  key={index}
                  className={`quiz-option ${stateClass} ${
                    selected !== null ? "disabled" : ""
                  }`}
                  onClick={() => handleAnswer(index)}
                  aria-disabled={selected !== null}
                >
                  {opt}
                </li>
              );
            })}
          </ul>

          {selected !== null && (
            <div className="quiz-feedback">
              <p>
                {selected === question.answer ? "Correct! " : "Not quite. "}
                {question.explanation}
              </p>
              <button
                className="quiz-btn"
                onClick={nextQuestion}
                disabled={selected === null}
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="quiz-result">
          <h3>End of quiz!</h3>
          <p>
            Your score: {score} / {totalQuestions}
          </p>
          <button
            className="quiz-btn"
            onClick={() => (window.location.href = "/redirects/methodology")}
          >
            Go to methodology section
          </button>
        </div>
      )}
    </div>
  );
}
