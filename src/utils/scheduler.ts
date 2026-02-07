import type { Student, Subject, Schedule, StudyBlock } from '../types';
import { addDays, format, differenceInDays, parseISO, isWeekend } from 'date-fns';

// Weights for calculation
const WEIGHTS = {
    CREDITS: 1.5,
    CONFIDENCE_INVERSE: 2, // Lower confidence = higher weight
    DAYS_REMAINING_INVERSE: 1,
};

export const calculateSubjectWeights = (subjects: Subject[]): Subject[] => {
    const totalWeightRaw = subjects.reduce((acc, sub) => {
        // Confidence 1 (Low) -> Factor 5. Confidence 5 (High) -> Factor 1.
        const confidenceFactor = 6 - sub.confidence;
        const rawWeight = (sub.credits * WEIGHTS.CREDITS) + (confidenceFactor * WEIGHTS.CONFIDENCE_INVERSE);
        return acc + rawWeight;
    }, 0);

    return subjects.map(sub => {
        const confidenceFactor = 6 - sub.confidence;
        const rawWeight = (sub.credits * WEIGHTS.CREDITS) + (confidenceFactor * WEIGHTS.CONFIDENCE_INVERSE);
        return {
            ...sub,
            weight: rawWeight / totalWeightRaw // Normalized weight (0-1)
        };
    });
};

export const generateSchedule = (student: Student, subjects: Subject[]): Schedule => {
    const schedule: Schedule = {};
    const weightedSubjects = calculateSubjectWeights(subjects);

    const today = new Date();
    const targetDate = parseISO(student.targetDate);
    const totalDays = differenceInDays(targetDate, today);

    // Safe guard: if target date is in past or too close, default to 30 days
    const daysToPlan = totalDays > 0 ? totalDays : 30;

    for (let i = 0; i < daysToPlan; i++) {
        const currentDate = addDays(today, i);
        const dateKey = format(currentDate, 'yyyy-MM-dd');
        const isWknd = isWeekend(currentDate);
        const availableMinutes = (isWknd ? student.weekendHours : student.weekdaysHours) * 60;

        // Distribute time based on weights
        let dailyBlocks: StudyBlock[] = [];
        let startTimeMinutes = 0; // Relative to start of study session

        // If preferred time is Night, let's say purely for display purposes implementation starts at 18:00 (6 PM)
        // This is a simplification. A real calendar would need real start times.
        let displayStartHour = student.preferredTime === 'Night' ? 18 : student.preferredTime === 'Morning' ? 8 : 14;

        weightedSubjects.forEach(sub => {
            if (!sub.weight) return;

            const subjectMinutes = Math.floor(availableMinutes * sub.weight);
            // Minimum effective study session is 30 mins
            if (subjectMinutes < 30) return;

            // Determine topic (Logic placeholder: cycle through weak areas first)
            const topic = sub.weakAreas.length > 0
                ? sub.weakAreas[i % sub.weakAreas.length]
                : 'General Review';

            const type: 'Learn' | 'Practice' | 'Revision' = sub.confidence < 3 ? 'Learn' : 'Practice';

            dailyBlocks.push({
                id: crypto.randomUUID(),
                subjectId: sub.id,
                subjectName: sub.name,
                date: dateKey,
                startTime: formatTime(displayStartHour, startTimeMinutes),
                durationMinutes: subjectMinutes,
                topic: topic,
                type: type,
                isCompleted: false
            });

            startTimeMinutes += subjectMinutes;
            // Add 10 min break
            startTimeMinutes += 10;
        });

        schedule[dateKey] = dailyBlocks;
    }

    return schedule;
};

const formatTime = (startHour: number, minutesAdded: number): string => {
    const totalMinutes = (startHour * 60) + minutesAdded;
    const h = Math.floor(totalMinutes / 60) % 24;
    const m = totalMinutes % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};
