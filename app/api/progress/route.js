// app/api/progress/route.js
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import dbConnect from '@/app/lib/mongoose';
import UserProgress from '@/app/models/UserProgress';

// GET user progress
export async function GET(request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Get email from query params
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        await dbConnect();

        let progress = await UserProgress.findOne({ email });

        // If no progress exists, create default progress
        if (!progress) {
            progress = new UserProgress({
                email,
                courseId: 'operating-system',
                currentLessonId: 1,
                completedLessons: [],
                quizSubmitted: {}
            });
            await progress.save();
        }

        return NextResponse.json({
            success: true,
            data: {
                currentLessonId: progress.currentLessonId,
                completedLessons: progress.completedLessons,
                quizSubmitted: Object.fromEntries(progress.quizSubmitted || new Map())
            }
        });
    } catch (error) {
        console.error('Error fetching progress:', error);
        return NextResponse.json(
            { error: 'Failed to fetch progress' },
            { status: 500 }
        );
    }
}

// POST/PUT update user progress
export async function POST(request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { email, currentLessonId, completedLessons, quizSubmitted } = body;

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        await dbConnect();

        let progress = await UserProgress.findOne({ email });

        if (!progress) {
            // Create new progress
            progress = new UserProgress({
                email,
                courseId: 'operating-system',
                currentLessonId: currentLessonId || 1,
                completedLessons: completedLessons || [],
                quizSubmitted: quizSubmitted || {}
            });
        } else {
            // Update existing progress
            if (currentLessonId !== undefined) {
                progress.currentLessonId = currentLessonId;
            }
            if (completedLessons !== undefined) {
                progress.completedLessons = completedLessons;
            }
            if (quizSubmitted !== undefined) {
                progress.quizSubmitted = new Map(Object.entries(quizSubmitted));
            }
        }

        await progress.save();

        return NextResponse.json({
            success: true,
            message: 'Progress updated successfully',
            data: {
                currentLessonId: progress.currentLessonId,
                completedLessons: progress.completedLessons,
                quizSubmitted: Object.fromEntries(progress.quizSubmitted || new Map())
            }
        });
    } catch (error) {
        console.error('Error updating progress:', error);
        return NextResponse.json(
            { error: 'Failed to update progress' },
            { status: 500 }
        );
    }
}