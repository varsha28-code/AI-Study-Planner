# AI Study Planner 🎓

> **Build the Future of Planning Your Study Schedule**
> A personalized, adaptive study scheduling tool tailored for engineering students.

---

## 🚀 The Challenge
Engineering students face a unique challenge: balancing high-cognitive load subjects, complex prerequisites, and tight deadlines. Traditional static calendars fail to adapt to the dynamic nature of engineering coursework. Students often study hard, but not smart.

## 💡 The Solution
**AI Study Planner** is a smart scheduling assistant that moves beyond simple time-blocking. It understands *what* you are studying and *how hard* it is.

- **Analyzes** subject difficulty, credits, and your confidence levels.
- **Prioritizes** weak areas and heavy subjects automatically.
- **Adapts** to your specific availability (Weekdays vs Weekends).

## ✨ Key Features

### 🧠 Intelligent Weighted Scheduling
The core algorithm calculates a "Study Weight" for every subject:
`Weight = (Credits * 1.5) + ((6 - Confidence) * 2)`
This ensuring that a 4-credit "Data Structures" course (where you have low confidence) gets significantly more focus than a 2-credit elective you're already good at.

### 📅 Dynamic Timeline Generation
- **Automated Planning**: Generates a day-by-day plan from today until your target date.
- **Smart Distribution**: allocates "Deep Learn" sessions for low-confidence topics and "Practice/Revision" for stronger ones.
- **Focus Topics**: Cycles through your specific "Weak Areas" (e.g., "Trees", "Graphs") to ensure no gap is left unfilled.

### 🎨 Premium User Experience
- **Modern Aesthetic**: Dark mode, glassmorphism effects, and vibrant gradients.
- **Interactive Wizard**: A guided, step-by-step onboarding flow to collect your data (built with **Framer Motion**).
- **Responsive Design**: Works perfectly on desktop and mobile.

---

## 🛠️ Tech Stack

- **Core**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Management**: [date-fns](https://date-fns.org/)

---

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-study-planner.git
   cd ai-study-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```bash
src/
├── components/
│   ├── InputWizard.tsx    # Multi-step form for user details
│   ├── Layout.tsx         # Main responsive shell with sidebar
│   └── ScheduleView.tsx   # Timeline visualization of the plan
├── types/
│   └── index.ts           # TypeScript definitions (Student, Subject, Schedule)
├── utils/
│   └── scheduler.ts       # THE BRAIN: Weighted scheduling algorithm
├── App.tsx                # Main controller & state management
└── main.tsx               # Entry point
```

---

## 🔮 Future Roadmap (MVP+)

- [ ] **Backend Persistence**: Integrate Supabase/Firebase to save schedules across devices.
- [ ] **Google Calendar Sync**: Export generated study blocks directly to GCal.
- [ ] **Syllabus Parsing**: Upload a PDF syllabus and let an LLM extract topics automatically.
- [ ] **Analytics**: Visual charts showing "Hours Studied" vs "Goal".

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

> Built with ❤️ for Engineering Students everywhere.
