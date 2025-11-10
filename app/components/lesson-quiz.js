"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

export function LessonQuiz({ quiz, onComplete }) {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState({})
    const [showResults, setShowResults] = useState(false)
    const [score, setScore] = useState(0)

    if (!quiz || quiz.questions.length === 0) return null

    const question = quiz.questions[currentQuestion]
    const isAnswered = selectedAnswers[currentQuestion] !== undefined
    const isLastQuestion = currentQuestion === quiz.questions.length - 1
    const allQuestionsAnswered = Object.keys(selectedAnswers).length === quiz.questions.length

    const handleSelectAnswer = (optionIndex) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [currentQuestion]: optionIndex,
        })
    }

    const handleNext = () => {
        if (!isLastQuestion) {
            setCurrentQuestion(currentQuestion + 1)
        }
    }

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1)
        }
    }

    const handleSubmit = () => {
        let correctCount = 0
        quiz.questions.forEach((q, index) => {
            if (selectedAnswers[index] === q.correctAnswer) {
                correctCount++
            }
        })
        const finalScore = Math.round((correctCount / quiz.questions.length) * 100)
        setScore(finalScore)
        setShowResults(true)
    }

    const handleCompleteQuiz = () => {
        onComplete()
    }

    if (showResults) {
        return (
            <Card className="p-8 border-2 border-red-600 bg-white">
                <div className="text-center space-y-6">
                    <h3 className="text-3xl font-bold text-gray-900">Quiz Completed!</h3>
                    <div className="bg-red-50 rounded-lg p-8">
                        <p className="text-gray-700 text-lg">Great job! You've answered all the questions.</p>
                    </div>
                    <div className="text-left space-y-3 max-h-96 overflow-y-auto">
                        {quiz.questions.map((q, index) => (
                            <div key={index} className="border border-gray-300 rounded-lg p-4">
                                <p className="font-semibold text-gray-900 mb-2">
                                    Q{index + 1}. {q.question}
                                </p>
                                <p
                                    className={`text-sm ${selectedAnswers[index] === q.correctAnswer ? "text-green-600 font-semibold" : "text-red-600"
                                        }`}
                                >
                                    Your answer: {q.options[selectedAnswers[index]]}
                                </p>
                                {selectedAnswers[index] !== q.correctAnswer && (
                                    <p className="text-sm text-green-600 font-semibold">Correct answer: {q.options[q.correctAnswer]}</p>
                                )}
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleCompleteQuiz}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition"
                    >
                        Continue to Next Lesson
                    </button>
                </div>
            </Card>
        )
    }

    return (
        <Card className="p-8 border-2 border-red-600 bg-white">
            <div className="space-y-6">
                {/* Progress */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Lesson Quiz</h3>
                    <span className="text-sm font-semibold text-red-600">
                        Question {currentQuestion + 1} of {quiz.questions.length}
                    </span>
                </div>

                {/* Question */}
                <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">{question.question}</h4>

                    {/* Options */}
                    <div className="space-y-3">
                        {question.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleSelectAnswer(index)}
                                className={`w-full text-left p-4 rounded-lg border-2 transition font-medium ${selectedAnswers[currentQuestion] === index
                                        ? "border-red-600 bg-red-50 text-gray-900"
                                        : "border-gray-300 bg-white text-gray-900 hover:border-red-400"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedAnswers[currentQuestion] === index
                                                ? "border-red-600 bg-red-600"
                                                : "border-gray-300 bg-white"
                                            }`}
                                    >
                                        {selectedAnswers[currentQuestion] === index && <div className="w-2 h-2 bg-white rounded-full" />}
                                    </div>
                                    <span>{option}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex gap-4 pt-6 border-t-2 border-red-600">
                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className="flex-1 bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 font-bold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    {isLastQuestion ? (
                        <button
                            onClick={handleSubmit}
                            disabled={!allQuestionsAnswered}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Submit Quiz
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            disabled={!isAnswered}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next Question
                        </button>
                    )}
                </div>
            </div>
        </Card>
    )
}
