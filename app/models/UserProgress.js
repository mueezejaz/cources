// app/models/UserProgress.js
import mongoose from 'mongoose';

const UserProgressSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    courseId: {
        type: String,
        required: true,
        default: 'operating-system'
    },
    currentLessonId: {
        type: Number,
        default: 1
    },
    completedLessons: {
        type: [Number],
        default: []
    },
    quizSubmitted: {
        type: Map,
        of: Boolean,
        default: {}
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Update lastUpdated on save
UserProgressSchema.pre('save', function(next) {
    this.lastUpdated = Date.now();
    next();
});

export default mongoose.models.UserProgress || mongoose.model('UserProgress', UserProgressSchema);