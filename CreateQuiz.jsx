import { useState } from "react";
import api from "../api";

export default function CreateQuiz() {
    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState([
        { question: "", options: ["", "", "", ""], correctAnswer: 0 }
    ]);

    const addQuestion = () => {
        setQuestions([
            ...questions,
            { question: "", options: ["", "", "", ""], correctAnswer: 0 }
        ]);
    };

    const saveQuiz = async () => {
        try {
            await api.post("/quiz", {
                title,
                questions,
            });

            alert("Quiz Created Successfully!");
        } catch (err) {
            console.error(err);
            alert("Error creating quiz");
        }
    };

    return (
        <div style={{ padding: 30 }}>
            <h2>Create Quiz</h2>

            <input
                type="text"
                placeholder="Quiz Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: "300px", padding: 10, marginBottom: 20 }}
            />

            {questions.map((q, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                    <input
                        type="text"
                        placeholder={`Question ${i + 1}`}
                        value={q.question}
                        onChange={(e) => {
                            const updated = [...questions];
                            updated[i].question = e.target.value;
                            setQuestions(updated);
                        }}
                        style={{ width: "400px", padding: 10 }}
                    />

                    {q.options.map((opt, j) => (
                        <input
                            key={j}
                            type="text"
                            placeholder={`Option ${j + 1}`}
                            value={opt}
                            onChange={(e) => {
                                const updated = [...questions];
                                updated[i].options[j] = e.target.value;
                                setQuestions(updated);
                            }}
                            style={{ display: "block", marginTop: 8, padding: 8 }}
                        />
                    ))}

                    <p>Correct Answer:</p>
                    <select
                        value={q.correctAnswer}
                        onChange={(e) => {
                            const updated = [...questions];
                            updated[i].correctAnswer = Number(e.target.value);
                            setQuestions(updated);
                        }}
                    >
                        <option value={0}>Option 1</option>
                        <option value={1}>Option 2</option>
                        <option value={2}>Option 3</option>
                        <option value={3}>Option 4</option>
                    </select>
                </div>
            ))}

            <button onClick={addQuestion}>+ Add Question</button>
            <br /><br />
            <button onClick={saveQuiz}>Save Quiz</button>
        </div>
    );
}
