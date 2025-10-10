import quizData from "../../../assets/content/sql-injection-quiz.json";
import { IoMdArrowBack } from "react-icons/io";
import { useState } from "react";
import "./styles.scss";

export default function SQLInjectionQuiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = quizData.questions[current];

  const totalQuestions = quizData.questions.length;

  const handleAnswer = (index) => {
    setSelected(index);
    if (index === question.answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (current + 1 < quizData.questions.length) {
      setCurrent(current + 1);
      setSelected(null);
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
      />
      <h2 className="quiz-title">{quizData.quizTitle}</h2>
      <p className="quiz-question-count">{`Question ${
        current + 1
      } of ${totalQuestions}`}</p>
      {!finished ? (
        <div className="quiz-question">
          <h3>{`${current + 1}. ${question.question}`}</h3>
          <ul className="quiz-options">
            {question.options.map((opt, index) => (
              <li
                key={index}
                className={`quiz-option ${
                  selected === index
                    ? index === question.answer
                      ? "correct"
                      : "wrong"
                    : ""
                }`}
                onClick={() => selected === null && handleAnswer(index)}
              >
                {opt}
              </li>
            ))}
          </ul>

          {selected !== null && (
            <div className="quiz-feedback">
              {selected !== question.answer && <p>{question.explanation}</p>}
              <button className="quiz-btn" onClick={nextQuestion}>
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="quiz-result">
          <h3>End of quiz!</h3>
          <p>
            Your score: {score} / {quizData.questions.length}
          </p>
          <button
            className="quiz-btn"
            onClick={() => (window.location.href = "/sql-injection/tasks")}
          >
            Go to tasks
          </button>
        </div>
      )}
    </div>
  );
}
