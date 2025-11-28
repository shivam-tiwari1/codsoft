import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const TakeQuiz = () => {
  const { id } = useParams();   // <-- FIXED
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const res = await api.get(`/quiz/${id}`); // <-- FIXED
        setQuiz(res.data);
      } catch (err) {
        console.error("Error loading quiz:", err);
      }
    };
    loadQuiz();
  }, [id]);

  if (!quiz) return <h2 className="text-center mt-10">Loading quiz...</h2>;

  const question = quiz.questions[current];

  const handleNext = () => {
    if (selected === question.correctAnswer) {
      setScore(score + 1);
    }

    setSelected(null);

    if (current + 1 < quiz.questions.length) {
      setCurrent(current + 1);
    } else {
      navigate(`/result/${id}`, {
        state: { score, total: quiz.questions.length }
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">{quiz.title}</h2>

      <h3 className="text-lg font-semibold mb-2">
        Q{current + 1}. {question.text}
      </h3>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelected(option)}
            className={`block w-full border p-3 rounded-lg 
              ${selected === option ? "bg-blue-500 text-white" : "bg-gray-100"}`}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        className="mt-5 w-full bg-green-600 text-white p-3 rounded-lg"
      >
        {current + 1 === quiz.questions.length ? "Submit" : "Next"}
      </button>
    </div>
  );
};

export default TakeQuiz;
