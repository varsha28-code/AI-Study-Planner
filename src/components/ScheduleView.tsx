import React from 'react';
import type { Schedule, StudyBlock } from '../types';
import { format, parseISO, isSameDay } from 'date-fns';
import { CheckCircle, Clock } from 'lucide-react';
import { cn } from './Layout';

interface ScheduleViewProps {
    schedule: Schedule;
}

const ScheduleView: React.FC<ScheduleViewProps> = ({ schedule }) => {
    const dates = Object.keys(schedule).sort();
    const today = new Date();

    // Group by date for simple list view first
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">My Study Schedule</h2>
                    <p className="text-slate-400">Keep up the momentum!</p>
                </div>
                <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium border border-purple-500/20">High Focus</span>
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">Medium Intensity</span>
                </div>
            </div>

            <div className="grid gap-6">
                {dates.map((dateStr) => {
                    const blocks = schedule[dateStr];
                    const dateObj = parseISO(dateStr);
                    const isToday = isSameDay(dateObj, today);

                    return (
                        <div key={dateStr} className={cn("rounded-2xl border bg-slate-900/50 p-6 transition-all", isToday ? "border-purple-500/50 ring-1 ring-purple-500/20 shadow-lg shadow-purple-500/10" : "border-slate-800")}>
                            <div className="flex items-center gap-4 mb-4">
                                <div className={cn("w-12 h-12 rounded-xl flex flex-col items-center justify-center border", isToday ? "bg-purple-600 text-white border-purple-500" : "bg-slate-800 text-slate-400 border-slate-700")}>
                                    <span className="text-xs font-medium uppercase">{format(dateObj, 'MMM')}</span>
                                    <span className="text-xl font-bold leading-none">{format(dateObj, 'd')}</span>
                                </div>
                                <div>
                                    <h3 className={cn("font-medium text-lg", isToday ? "text-white" : "text-slate-300")}>
                                        {isToday ? 'Today' : format(dateObj, 'EEEE')}
                                    </h3>
                                    <p className="text-sm text-slate-500">{blocks.length} sessions scheduled</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {blocks.map((block) => (
                                    <StudyCard key={block.id} block={block} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const StudyCard: React.FC<{ block: StudyBlock }> = ({ block }) => {
    const intensityColor = block.type === 'Learn' ? 'border-l-purple-500' : 'border-l-blue-500';

    return (
        <div className={cn("flex items-start gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800/50 hover:border-slate-700 transition-colors border-l-4", intensityColor)}>
            <div className="min-w-[4rem] text-sm font-medium text-slate-500 pt-1">
                {block.startTime}
            </div>

            <div className="flex-1">
                <h4 className="text-slate-200 font-medium">{block.subjectName}</h4>
                <p className="text-sm text-slate-400 mb-2">Focus: <span className="text-slate-300">{block.topic}</span></p>
                <div className="flex items-center gap-3">
                    <span className={cn("text-xs px-2 py-0.5 rounded border", block.type === 'Learn' ? "bg-purple-500/10 text-purple-400 border-purple-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20")}>
                        {block.type}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock size={12} /> {block.durationMinutes} min
                    </span>
                </div>
            </div>

            <button className="text-slate-600 hover:text-green-500 transition-colors pt-1">
                <CheckCircle size={20} />
            </button>
        </div>
    );
};

export default ScheduleView;
