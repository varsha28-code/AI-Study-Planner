import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Plus, Trash2, Brain } from 'lucide-react';
import type { Student, Subject } from '../types';
import { cn } from './Layout';

interface WizardProps {
    onComplete: (student: Student, subjects: Subject[]) => void;
}

const steps = [
    { id: 'profile', title: 'Profile', icon: UserStepIcon },
    { id: 'subjects', title: 'Subjects', icon: BookStepIcon },
    { id: 'availability', title: 'Availability', icon: ClockStepIcon },
];

function UserStepIcon({ active }: { active: boolean }) {
    return <div className={cn("w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors", active ? "border-purple-500 bg-purple-500 text-white" : "border-slate-700 text-slate-500")}>1</div>
}
function BookStepIcon({ active }: { active: boolean }) {
    return <div className={cn("w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors", active ? "border-purple-500 bg-purple-500 text-white" : "border-slate-700 text-slate-500")}>2</div>
}
function ClockStepIcon({ active }: { active: boolean }) {
    return <div className={cn("w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors", active ? "border-purple-500 bg-purple-500 text-white" : "border-slate-700 text-slate-500")}>3</div>
}

const InputWizard: React.FC<WizardProps> = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [student, setStudent] = useState<Partial<Student>>({
        name: '',
        college: '',
        weekdaysHours: 3,
        weekendHours: 6,
        preferredTime: 'Night',
        targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });

    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [newSubject, setNewSubject] = useState<Partial<Subject>>({
        name: '',
        credits: 3,
        confidence: 3,
        weakAreas: [],
        strongAreas: []
    });

    const nextStep = () => setCurrentStep((p: number) => Math.min(steps.length - 1, p + 1));
    const prevStep = () => setCurrentStep((p: number) => Math.max(0, p - 1));

    const addSubject = () => {
        if (!newSubject.name) return;
        setSubjects([...subjects, {
            ...newSubject,
            id: crypto.randomUUID(),
            weakAreas: newSubject.weakAreas || [],
            strongAreas: newSubject.strongAreas || []
        } as Subject]);
        setNewSubject({ name: '', credits: 3, confidence: 3, weakAreas: [], strongAreas: [] });
    };

    const handleComplete = () => {
        if (student.name && subjects.length > 0) {
            onComplete(student as Student, subjects);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-10">
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-12 relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -z-10" />
                <div
                    className="absolute top-1/2 left-0 h-1 bg-purple-600 -z-10 transition-all duration-500"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                />
                {steps.map((step, idx) => (
                    <div key={step.id} className="flex flex-col items-center gap-2 bg-slate-950 px-2">
                        <step.icon active={idx <= currentStep} />
                        <span className={cn("text-sm font-medium", idx <= currentStep ? "text-purple-400" : "text-slate-600")}>{step.title}</span>
                    </div>
                ))}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
                <AnimatePresence mode="wait">
                    {currentStep === 0 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h2 className="text-2xl font-bold">Tell us about yourself</h2>
                            <div className="grid gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={student.name}
                                        onChange={e => setStudent({ ...student, name: e.target.value })}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                        placeholder="e.g. Aman Kumar"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">College / University</label>
                                    <input
                                        type="text"
                                        value={student.college}
                                        onChange={e => setStudent({ ...student, college: e.target.value })}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                        placeholder="e.g. XYZ Institute of Technology"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Target Date</label>
                                        <input
                                            type="date"
                                            value={student.targetDate}
                                            onChange={e => setStudent({ ...student, targetDate: e.target.value })}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all [color-scheme:dark]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Graduation Year</label>
                                        <input
                                            type="text"
                                            value={student.year}
                                            onChange={e => setStudent({ ...student, year: e.target.value })}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                            placeholder="2026"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 1 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h2 className="text-2xl font-bold">Add your subjects</h2>

                            {/* Add Subject Form */}
                            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 space-y-4">
                                <div className="grid gap-4">
                                    <input
                                        type="text"
                                        value={newSubject.name}
                                        onChange={e => setNewSubject({ ...newSubject, name: e.target.value })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                                        placeholder="Subject Name (e.g. Data Structures)"
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-slate-500 mb-1 block">Credits</label>
                                            <input
                                                type="number"
                                                value={newSubject.credits}
                                                onChange={e => setNewSubject({ ...newSubject, credits: parseInt(e.target.value) })}
                                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-500 mb-1 block">Confidence (1-5)</label>
                                            <input
                                                type="range"
                                                min="1" max="5"
                                                value={newSubject.confidence}
                                                onChange={e => setNewSubject({ ...newSubject, confidence: parseInt(e.target.value) })}
                                                className="w-full accent-purple-500 mt-2"
                                            />
                                            <div className="flex justify-between text-xs text-slate-500 px-1">
                                                <span>Low</span>
                                                <span>High</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-500 mb-1 block">Weak Areas (comma separated)</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Trees, Graphs, DP"
                                            value={newSubject.weakAreas?.join(', ')}
                                            onChange={e => setNewSubject({ ...newSubject, weakAreas: e.target.value.split(',').map(s => s.trim()) })}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 outline-none text-sm"
                                        />
                                    </div>
                                    <button
                                        onClick={addSubject}
                                        disabled={!newSubject.name}
                                        className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Plus size={18} /> Add Subject
                                    </button>
                                </div>
                            </div>

                            {/* List */}
                            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                                {subjects.map((sub: Subject) => (
                                    <div key={sub.id} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg border border-slate-700">
                                        <div>
                                            <h4 className="font-medium text-slate-200">{sub.name}</h4>
                                            <p className="text-xs text-slate-500">{sub.credits} Credits • Level {sub.confidence}</p>
                                        </div>
                                        <button
                                            onClick={() => setSubjects(subjects.filter((s: Subject) => s.id !== sub.id))}
                                            className="text-slate-500 hover:text-red-400 p-2"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                                {subjects.length === 0 && (
                                    <div className="text-center py-8 text-slate-500 text-sm border-2 border-dashed border-slate-800 rounded-xl">
                                        No subjects added yet
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 2 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <h2 className="text-2xl font-bold">Study Preferences</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="flex items-center justify-between text-sm font-medium text-slate-400 mb-2">
                                        <span>Weekday Availability</span>
                                        <span className="text-white">{student.weekdaysHours} hours</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="1" max="12"
                                        value={student.weekdaysHours}
                                        onChange={e => setStudent({ ...student, weekdaysHours: parseInt(e.target.value) })}
                                        className="w-full accent-purple-500"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center justify-between text-sm font-medium text-slate-400 mb-2">
                                        <span>Weekend Availability</span>
                                        <span className="text-white">{student.weekendHours} hours</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="1" max="16"
                                        value={student.weekendHours}
                                        onChange={e => setStudent({ ...student, weekendHours: parseInt(e.target.value) })}
                                        className="w-full accent-purple-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-3">Preferred Time</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['Morning', 'Afternoon', 'Night'].map((time) => (
                                            <button
                                                key={time}
                                                onClick={() => setStudent({ ...student, preferredTime: time as any })}
                                                className={cn(
                                                    "py-3 rounded-xl border text-sm font-medium transition-all",
                                                    student.preferredTime === time
                                                        ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20"
                                                        : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700"
                                                )}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-800">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className="px-6 py-2 rounded-lg text-slate-400 hover:text-white disabled:opacity-0 transition-colors"
                    >
                        Back
                    </button>

                    {currentStep < steps.length - 1 ? (
                        <button
                            onClick={nextStep}
                            className="px-6 py-2 bg-slate-100 text-slate-900 hover:bg-white rounded-lg font-medium flex items-center gap-2 transition-colors"
                        >
                            Next Step <ChevronRight size={18} />
                        </button>
                    ) : (
                        <button
                            onClick={handleComplete}
                            disabled={subjects.length === 0}
                            className="px-8 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg font-bold shadow-lg shadow-purple-500/25 flex items-center gap-2 transition-all transform hover:scale-105"
                        >
                            Generate Plan <Brain size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InputWizard;
