import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import InputWizard from './components/InputWizard';
import ScheduleView from './components/ScheduleView';
import { generateSchedule } from './utils/scheduler';
import type { Student, Subject, Schedule } from './types';

function App() {
    const [schedule, setSchedule] = useState<Schedule | null>(null);
    const [, setStudent] = useState<Student | null>(null);

    // Load from local storage on mount (simulated persistence)
    useEffect(() => {
        const savedSchedule = localStorage.getItem('ai-planner-schedule');
        if (savedSchedule) {
            setSchedule(JSON.parse(savedSchedule));
        }
    }, []);

    const handleWizardComplete = (newStudent: Student, newSubjects: Subject[]) => {
        setStudent(newStudent);
        const newSchedule = generateSchedule(newStudent, newSubjects);
        setSchedule(newSchedule);
        localStorage.setItem('ai-planner-schedule', JSON.stringify(newSchedule));
    };

    const handleReset = () => {
        setSchedule(null);
        localStorage.removeItem('ai-planner-schedule');
    }

    return (
        <Layout>
            {!schedule ? (
                <div className="animate-in fade-in zoom-in duration-500">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-4 tracking-tight">
                            Design Your Perfect Roadmap
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Our AI analyzes your subjects, confidence levels, and deadlines to build a
                            personalized study plan that maximizes retention and minimizes burnout.
                        </p>
                    </div>
                    <InputWizard onComplete={handleWizardComplete} />
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-end mb-4">
                        <button onClick={handleReset} className="text-sm text-slate-500 hover:text-white underline">Reset Plan</button>
                    </div>
                    <ScheduleView schedule={schedule} />
                </div>
            )}
        </Layout>
    );
}

export default App;
