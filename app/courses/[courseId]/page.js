"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { getCourseById } from "@/app/lib/course-data"
import { CertificateModal } from "@/app/components/certificate-modal"
import { LessonQuiz } from "@/app/components/lesson-quiz"

export default function CoursePage() {
    const { isLoaded, isSignedIn, user } = useUser()
    const router = useRouter()
    const course = getCourseById()

    const [currentLessonId, setCurrentLessonId] = useState(1)
    const [completedLessons, setCompletedLessons] = useState([])
    const [showCertificate, setShowCertificate] = useState(false)
    const [quizSubmitted, setQuizSubmitted] = useState({})
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    // Check authentication and load progress
    useEffect(() => {
        if (isLoaded) {
            if (!isSignedIn) {
                // Redirect to sign-in if not authenticated
                router.push('/sign-in')
                return
            }

            // Load user progress
            loadUserProgress()
        }
    }, [isLoaded, isSignedIn, router])

    // Load user progress from API
    const loadUserProgress = async () => {
        try {
            setLoading(true)
            const email = user?.primaryEmailAddress?.emailAddress

            if (!email) {
                console.error('No email found')
                setLoading(false)
                return
            }

            const response = await fetch(`/api/progress?email=${encodeURIComponent(email)}`)

            if (response.ok) {
                const result = await response.json()

                if (result.success && result.data) {
                    setCurrentLessonId(result.data.currentLessonId || 1)
                    setCompletedLessons(result.data.completedLessons || [])
                    setQuizSubmitted(result.data.quizSubmitted || {})
                }
            } else if (response.status === 401) {
                router.push('/sign-in')
            }
        } catch (error) {
            console.error('Error loading progress:', error)
        } finally {
            setLoading(false)
        }
    }

    // Save progress to API
    const saveProgress = async (updates) => {
        try {
            setSaving(true)
            const email = user?.primaryEmailAddress?.emailAddress

            if (!email) return

            const response = await fetch('/api/progress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    ...updates
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to save progress')
            }
        } catch (error) {
            console.error('Error saving progress:', error)
        } finally {
            setSaving(false)
        }
    }

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Course not found</p>
            </div>
        )
    }

    // Show loading state
    if (loading || !isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-700 font-semibold">Loading your progress...</p>
                </div>
            </div>
        )
    }

    const currentLesson = course.lessons.find((l) => l.id === currentLessonId)
    const isLessonCompleted = completedLessons.includes(currentLessonId)
    const allLessonsCompleted = completedLessons.length === course.lessons.length
    const progress = Math.round((completedLessons.length / course.lessons.length) * 100)
    const isQuizSubmitted = quizSubmitted[currentLessonId]

    const handleQuizComplete = () => {
        const newQuizSubmitted = {
            ...quizSubmitted,
            [currentLessonId]: true,
        }
        setQuizSubmitted(newQuizSubmitted)
        handleMarkComplete(newQuizSubmitted)
    }

    const handleMarkComplete = (updatedQuizSubmitted = quizSubmitted) => {
        if (!isLessonCompleted && updatedQuizSubmitted[currentLessonId]) {
            const newCompletedLessons = [...completedLessons, currentLessonId]
            setCompletedLessons(newCompletedLessons)

            // Save to database
            saveProgress({
                currentLessonId,
                completedLessons: newCompletedLessons,
                quizSubmitted: updatedQuizSubmitted
            })
        }
    }

    const handleNext = () => {
        const currentIndex = course.lessons.findIndex((l) => l.id === currentLessonId)
        if (currentIndex < course.lessons.length - 1) {
            const nextLessonId = course.lessons[currentIndex + 1].id
            setCurrentLessonId(nextLessonId)
            setQuizSubmitted({})

            // Save current lesson progress
            saveProgress({
                currentLessonId: nextLessonId,
                completedLessons,
                quizSubmitted: {}
            })
        }
    }

    const handlePrevious = () => {
        const currentIndex = course.lessons.findIndex((l) => l.id === currentLessonId)
        if (currentIndex > 0) {
            const prevLessonId = course.lessons[currentIndex - 1].id
            setCurrentLessonId(prevLessonId)
            setQuizSubmitted({})

            // Save current lesson progress
            saveProgress({
                currentLessonId: prevLessonId,
                completedLessons,
                quizSubmitted: {}
            })
        }
    }

    const handleLessonSelect = (lessonId) => {
        setCurrentLessonId(lessonId)

        // Save current lesson selection
        saveProgress({
            currentLessonId: lessonId,
            completedLessons,
            quizSubmitted
        })
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white border-b-2 border-red-600 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold">
                                H
                            </div>
                            <span className="text-xl font-bold text-gray-900">HubIt</span>
                        </Link>
                        <div className="flex items-center gap-4">
                            {saving && (
                                <span className="text-sm text-gray-600">
                                    Saving...
                                </span>
                            )}
                            <Link href="/courses" className="text-gray-700 hover:text-red-600 font-semibold transition">
                                Back to Courses
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Course Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{course.title}</h1>
                    <p className="text-gray-700">
                        Lesson {currentLessonId} of {course.lessons.length}
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-900">Course Progress</span>
                        <span className="text-sm font-medium text-red-600">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-red-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {currentLesson && (
                            <div className="space-y-6">
                                <Card className="overflow-hidden border-2 border-red-600">
                                    {/* Video Player */}
                                    <div className="aspect-video bg-black">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={currentLesson.videoUrl}
                                            title={currentLesson.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>

                                    {/* Lesson Content */}
                                    <div className="p-8 space-y-6 bg-white">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentLesson.title}</h2>
                                            <p className="text-gray-700">{currentLesson.description}</p>
                                        </div>

                                        {/* Documentation */}
                                        <div className="border-t-2 border-red-600 pt-6">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Documentation</h3>
                                            <p className="text-gray-700 leading-relaxed">{currentLesson.documentation}</p>
                                        </div>
                                    </div>
                                </Card>

                                {currentLesson.quiz && <LessonQuiz quiz={currentLesson.quiz} onComplete={handleQuizComplete} />}

                                {/* Navigation Buttons */}
                                <div className="flex gap-4 pt-4 border-t-2 border-red-600">
                                    <button
                                        onClick={handlePrevious}
                                        disabled={currentLessonId === 1}
                                        className="flex-1 bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 font-bold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Previous Lesson
                                    </button>
                                    {allLessonsCompleted ? (
                                        <button
                                            onClick={() => setShowCertificate(true)}
                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition"
                                        >
                                            Get Certificate
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleNext}
                                            disabled={currentLessonId === course.lessons.length || !isLessonCompleted}
                                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next Lesson
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar - Lessons List */}
                    <div>
                        <Card className="p-6 sticky top-20 border-2 border-red-600">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Course Lessons</h3>
                            <div className="space-y-2">
                                {course.lessons.map((lesson) => (
                                    <button
                                        key={lesson.id}
                                        onClick={() => handleLessonSelect(lesson.id)}
                                        className={`w-full text-left p-3 rounded-lg transition font-semibold ${currentLessonId === lesson.id
                                                ? "bg-red-600 text-white"
                                                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                                            }`}
                                    >
                                        <div className="flex items-start gap-2">
                                            <span className="text-lg">{completedLessons.includes(lesson.id) ? "✓" : lesson.id}</span>
                                            <span className="text-sm line-clamp-2">{lesson.title}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Certificate Modal */}
            {showCertificate && (
                <CertificateModal
                    isOpen={showCertificate}
                    onClose={() => setShowCertificate(false)}
                    courseName={course.title}
                />
            )}
        </main>
    )
}