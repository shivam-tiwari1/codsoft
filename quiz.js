import express from "express";
import Quiz from "../models/Quiz.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// CREATE QUIZ
router.post("/", auth, async (req, res) => {
    const quiz = await Quiz.create({
        ...req.body,
        createdBy: req.user.id
    });
    res.json(quiz);
});

// GET ALL QUIZZES
router.get("/", async (req, res) => {
    const quizzes = await Quiz.find();
    res.json(quizzes);
});

// GET QUIZ BY ID
router.get("/:id", async (req, res) => {
    const quiz = await Quiz.findById(req.params.id);
    res.json(quiz);
});

// SUBMIT QUIZ
router.post("/:id/submit", async (req, res) => {
    const { answers } = req.body;
    const quiz = await Quiz.findById(req.params.id);

    let score = 0;

    quiz.questions.forEach((q, i) => {
        if (q.correctAnswer === answers[i]) score++;
    });

    res.json({ score });
});

export default router;
