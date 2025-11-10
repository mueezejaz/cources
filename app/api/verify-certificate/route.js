// app/api/verify-certificate/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongoose';
import UserProgress from '@/app/models/UserProgress';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const certificateId = searchParams.get('id');
        const email = searchParams.get('email');
        const course = searchParams.get('course');

        // Validate required parameters
        if (!certificateId || !email || !course) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Missing required parameters'
                },
                { status: 400 }
            );
        }

        await dbConnect();

        // Find user progress
        const progress = await UserProgress.findOne({ email });

        if (!progress) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'No certificate found for this email'
                },
                { status: 404 }
            );
        }

        // Check if the course is completed (all lessons completed)
        const courseData = 5;

        if (!courseData) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid course'
                },
                { status: 404 }
            );
        }

        const allLessonsCompleted = progress.completedLessons.length === courseData;

        if (!allLessonsCompleted) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Course not completed yet'
                },
                { status: 400 }
            );
        }

        // Certificate is valid
        return NextResponse.json({
            success: true,
            message: 'Certificate verified successfully',
            issuedDate: progress.lastUpdated
                ? new Date(progress.lastUpdated).toLocaleDateString()
                : new Date().toLocaleDateString(),
            email: progress.email,
            course: courseData.title,
            completedLessons: progress.completedLessons.length,
            totalLessons: courseData.lessons.length
        });

    } catch (error) {
        console.error('Error verifying certificate:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to verify certificate'
            },
            { status: 500 }
        );
    }
}

// Helper function to get course data
function getCourseById(courseId) {
    // This should match your course-data.js structure
    const operatingSystemLessons = [
        { id: 1, title: "Introduction to Operating Systems" },
        { id: 2, title: "Process Management" },
        { id: 3, title: "Memory Management" },
        { id: 4, title: "File Systems" },
        { id: 5, title: "I/O Management" },
        { id: 6, title: "Concurrency & Synchronization" }
    ];

    if (courseId === 'operating-system') {
        return {
            id: 'operating-system',
            title: 'Operating System',
            lessons: operatingSystemLessons
        };
    }

    return null;
}