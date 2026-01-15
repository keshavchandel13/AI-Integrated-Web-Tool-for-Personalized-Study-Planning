import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookCheck, 
  BrainCircuit, 
  Flame, 
  Target, 
  Clock, 
  Search, 
  Award,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Zap
} from 'lucide-react';
export default function Profile() {
 const [activeTab, setActiveTab] = useState('academic');

  const userData = {
    name: "Elena Rodriguez",
    currentCollege: "Stanford University",
    major: "B.S. Computer Science",
    year: "Junior (Year 3)",
    aiPersona: "Deep Work Specialist",
    learningStyle: "Visual & Kinesthetic",
    focusScore: 92,
    colleges: [
      { name: "Stanford University", status: "Current", logo: "S", color: "bg-red-700" },
      { name: "UC Berkeley", status: "Transfer Credit", logo: "B", color: "bg-blue-600" }
    ],
    completedCourses: [
      { id: 1, title: "Data Structures & Algorithms", grade: "A", date: "Dec 2023", skills: ["Java", "Efficiency"], aiInsight: "Mastered Big O notation" },
      { id: 2, title: "Introduction to AI", grade: "A+", date: "May 2023", skills: ["Heuristics", "Search"], aiInsight: "Strong performance in Neural Nets" },
      { id: 3, title: "Discrete Mathematics", grade: "B+", date: "Dec 2022", skills: ["Logic", "Proofs"], aiInsight: "Needs review in Graph Theory" },
    ],
    studyStats: [
      { label: "Hours Planned", value: "452", icon: Clock, color: "text-blue-500" },
      { label: "Courses Done", value: "18", icon: BookCheck, color: "text-emerald-500" },
      { label: "Study Streak", value: "14", icon: Flame, color: "text-orange-500" },
      { label: "Focus Rank", value: "Top 5%", icon: Target, color: "text-purple-500" },
    ]
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      {/* Sidebar Mockup (Common in Study Planners) */}
      <div className="fixed left-0 top-0 h-full w-20 hidden lg:flex flex-col items-center py-8 bg-white border-r border-slate-200 z-20">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white mb-10 shadow-lg shadow-indigo-200">
          <BrainCircuit className="w-6 h-6" />
        </div>
        <div className="space-y-8 flex-1">
          <Target className="w-6 h-6 text-slate-400 cursor-pointer hover:text-indigo-600" />
          <BookCheck className="w-6 h-6 text-indigo-600 cursor-pointer" />
          <Zap className="w-6 h-6 text-slate-400 cursor-pointer hover:text-indigo-600" />
          <Award className="w-6 h-6 text-slate-400 cursor-pointer hover:text-indigo-600" />
        </div>
      </div>

      <main className="lg:ml-20 p-4 md:p-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="relative mb-8">
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200 overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <BrainCircuit className="w-64 h-64" />
            </div>
            
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-3xl overflow-hidden ring-4 ring-indigo-50 shadow-xl">
                  <img src="https://picsum.photos/seed/student1/200/200" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-white p-2 rounded-2xl shadow-md border border-slate-100">
                  <Sparkles className="w-6 h-6 text-indigo-600" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-slate-800">{userData.name}</h1>
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100 flex items-center gap-1">
                    <Zap className="w-3 h-3" /> {userData.aiPersona}
                  </span>
                </div>
                
                <div className="flex flex-col gap-2 text-slate-500 mb-6">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-indigo-600" />
                    <span className="font-medium text-slate-700">{userData.currentCollege}</span>
                    <span className="text-slate-300">|</span>
                    <span>{userData.major}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
                  {userData.studyStats.map((stat, idx) => (
                    <div key={idx} className="bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2 mb-1">
                        <stat.icon className={`w-4 h-4 ${stat.color}`} />
                        <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">{stat.label}</span>
                      </div>
                      <div className="text-xl font-bold text-slate-800">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel: Colleges & AI Insights */}
          <div className="lg:col-span-4 space-y-6">
            <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold mb-5 flex items-center justify-between">
                Institutions
                <Search className="w-4 h-4 text-slate-400" />
              </h3>
              <div className="space-y-4">
                {userData.colleges.map((college, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className={`w-12 h-12 ${college.color} rounded-xl flex items-center justify-center text-white font-bold text-xl`}>
                      {college.logo}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-800">{college.name}</p>
                      <p className="text-[10px] text-indigo-600 font-bold uppercase">{college.status}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100">
              <div className="flex items-center gap-2 mb-4">
                <BrainCircuit className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold">AI Learning Insights</h3>
              </div>
              <p className="text-sm text-indigo-100/70 mb-6 leading-relaxed">
                Your focus peak is usually <span className="text-white font-bold">10:00 AM — 12:30 PM</span>. You perform 22% better with visual materials.
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Focus Persistence</span>
                    <span className="text-indigo-400">92%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[92%] rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Course Velocity</span>
                    <span className="text-emerald-400">High</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[78%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Panel: Completed Courses */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Academic History</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white text-xs font-bold rounded-xl border border-slate-200 shadow-sm">Filter</button>
                <button className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-200">Generate Report</button>
              </div>
            </div>

            <div className="space-y-4">
              {userData.completedCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">
                          {course.title}
                        </h4>
                        <span className="bg-emerald-50 text-emerald-600 text-[10px] px-2 py-1 rounded-lg font-black border border-emerald-100 uppercase">
                          Grade: {course.grade}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 flex items-center gap-1">
                        Completed: {course.date} • Verification ID: AI-{course.id}294
                      </p>
                    </div>
                    <button className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {course.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-lg border border-slate-100">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 p-4 bg-indigo-50/30 rounded-2xl border border-indigo-50/50 flex gap-3">
                    <BrainCircuit className="w-5 h-5 text-indigo-400 shrink-0" />
                    <p className="text-xs text-indigo-900/70 italic leading-relaxed">
                      <span className="font-bold text-indigo-900 not-italic">AI Insight: </span>
                      {course.aiInsight}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 text-sm font-bold hover:bg-slate-50 hover:border-indigo-200 hover:text-indigo-400 transition-all">
              + Import More Transcripts
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
