import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function QuizList() {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        api.get("/quiz").then((res) => setQuizzes(res.data));
    }, []);

    return (
        <div style={{ padding: 30 }}>
            <h2>Available Quizzes</h2>

            {quizzes.map((quiz) => (
                <div key={quiz._id} style={{ marginBottom: 15 }}>
                    <h3>{quiz.title}</h3>
                    <Link to={`/quiz/${quiz._id}`}>
                        <button>Take Quiz</button>
                    </Link>
                </div>
            ))}
        </div>
    );
}
