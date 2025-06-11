import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";

export default function Summary({ userAnswers }) {
  const numQuestions = QUESTIONS.length;
  const numSkipped = userAnswers.filter((answer) => answer === null).length;
  const skippedPercentage = Math.round((numSkipped / numQuestions) * 100);

  const numAnsweredCorrectly = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  ).length;
  const answeredCorrectlyPercentage = Math.round(
    (numAnsweredCorrectly / numQuestions) * 100
  );

  const numAnsweredIncorrectly = numQuestions - numSkipped - numAnsweredCorrectly;
  const answeredIncorrectlyPercentage = Math.round(
    (numAnsweredIncorrectly / numQuestions) * 100
  );

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy Icon" />
      <h2>Quiz Completed</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedPercentage}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{answeredCorrectlyPercentage}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{answeredIncorrectlyPercentage}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {QUESTIONS.map((question, index) => {
          let cssClass = "user-answer";
          if (userAnswers[index] === null) {
            cssClass += " skipped";
          } else if (userAnswers[index] === question.answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{question.text}</p>
              <p className={cssClass}>{userAnswers[index] || "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
