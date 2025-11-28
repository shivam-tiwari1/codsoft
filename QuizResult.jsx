import { useLocation } from "react-router-dom";

export default function QuizResult() {
    const location = useLocation();
    const score = location.state?.score;

    return (
        <div style={{ padding: 30 }}>
            <h2>Your Score</h2>
            <h1>{score}</h1>
        </div>
    );
}
