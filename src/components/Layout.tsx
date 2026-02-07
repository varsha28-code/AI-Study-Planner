import React from 'react';
import { BookOpen, Calendar, Settings, GraduationCap, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface LayoutProps {
    children: React.ReactNode;
}

export function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const navItems = [
        { icon: Calendar, label: 'Schedule', active: true },
        { icon: BookOpen, label: 'Subjects', active: false },
        { icon: GraduationCap, label: 'Progress', active: false },
        { icon: Settings, label: 'Settings', active: false },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500/30">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                        <GraduationCap size={20} className="text-white" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">AI Planner</span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <div className="flex">
                {/* Sidebar Navigation */}
                <aside className={cn(
                    "fixed lg:sticky top-0 h-screen w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col transition-transform duration-300 z-40",
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}>
                    <div className="hidden lg:flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <GraduationCap size={24} className="text-white" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">AI Planner</span>
                    </div>

                    <nav className="space-y-2 flex-1">
                        {navItems.map((item) => (
                            <button
                                key={item.label}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                    item.active
                                        ? "bg-purple-600/10 text-purple-400 font-medium"
                                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
                                )}
                            >
                                <item.icon size={20} className={cn(
                                    "transition-colors",
                                    item.active ? "text-purple-400" : "text-slate-500 group-hover:text-slate-300"
                                )} />
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="mt-auto pt-6 border-t border-slate-800">
                        <div className="flex items-center gap-3 px-2">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-medium">
                                AK
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-200 truncate">Aman Kumar</p>
                                <p className="text-xs text-slate-500 truncate">Computer Science</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;

