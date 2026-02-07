export interface Student {
    name: string;
    college: string;
    year: string;
    email: string;
    weekdaysHours: number;
    weekendHours: number;
    preferredTime: 'Morning' | 'Afternoon' | 'Night';
    targetDate: string;
}

export interface Subject {
    id: string;
    name: string;
    credits: number;
    confidence: number; // 1-5
    weakAreas: string[];
    strongAreas: string[];
    weight?: number; // Calculated priority
}

export interface StudyBlock {
    id: string;
    subjectId: string;
    subjectName: string;
    date: string;
    startTime: string; // HH:mm
    durationMinutes: number;
    topic?: string;
    type: 'Learn' | 'Practice' | 'Revision';
    isCompleted: boolean;
}

export interface Schedule {
    [date: string]: StudyBlock[];
}
