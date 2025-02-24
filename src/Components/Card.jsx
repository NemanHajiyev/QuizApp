import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Confetti from "react-confetti";

function Card({ questions }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(20);
    const navigate = useNavigate();

    useEffect(() => {
        if (questions && questions.length > 0) {
            const question = questions[currentIndex];
            setCurrentQuestion(question);

            const allAnswers = [
                question.correct_answer,
                ...question.incorrect_answers,
            ];
            const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);
            setAnswers(shuffledAnswers);
        }
    }, [currentIndex, questions]);

    const handleAnswer = (selectedAnswer) => {
        if (currentQuestion.correct_answer === selectedAnswer) {
            setScore(score + 100);
        }

        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setTimer(20);
        }
    };

    useEffect(() => {
        if (timer === 0) {
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setTimer(20);
            }
        }
        const interval = setInterval(() => {
            setTimer(timer > 0 ? timer - 1 : 0);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, currentIndex, questions.length]);

    if (!currentQuestion) {
        return <div>Loading...</div>;
    }

    if (currentIndex === 10) {
        return (
            <div className="general">
                <Confetti className="confetti" />
                <p className="result">
                    Total Score: <span style={{ color: "red" }}>{score}</span> Points
                </p>
                <button className="back" onClick={() => navigate("/")}>
                    ⬅ Back
                </button>
            </div>
        );
    }

    return (
        <div className="card">
            <div className="timer">{timer}</div>
            <div className="title">
                <h2>
                    {currentIndex + 1}/10 -{" "}
                    <span dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
                </h2>
            </div>

            <div className="answer">
                {answers.map((answer, index) => (
                    <button
                        key={index}
                        className="quiz-btn"
                        onClick={() => handleAnswer(answer)} >

                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </button>
                ))}
            </div>
            <button className="back" onClick={() => navigate("/")}>
                ⬅ Back
            </button>
        </div>
    );
}

export default Card;
