📦 DeadlineBox

Never miss a deadline.

DeadlineBox is a lightweight student productivity web app designed to solve a simple but common problem: students forgetting important academic deadlines because their assignments, projects, exams, and submissions are scattered across different places.

Built for WarriorHacks 2.0 — Hackathon Track.

---

🎯 The Problem

Students regularly receive deadlines through:

- College/classroom announcements
- WhatsApp or messaging groups
- Notes and notebooks
- Assignment sheets
- Online learning platforms
- Conversations with classmates and teachers

Because these deadlines are scattered across different places, students can easily:

- Forget an assignment
- Miss a submission
- Underestimate how little time remains
- Lose track of multiple upcoming tasks
- Discover that something is overdue too late

This is especially relevant to students managing multiple subjects and deadlines at the same time.

---

💡 Our Solution

DeadlineBox puts academic deadlines into one simple dashboard.

A student can add a deadline with:

- Subject
- Task
- Date
- Time
- Importance

DeadlineBox then automatically organizes the tasks according to their urgency and importance.

The student can immediately see:

«🔴 What needs attention now
🟠 What is coming soon
🟢 What can wait»

A live countdown shows exactly how much time remains.

When the deadline is reached, DeadlineBox displays an in-app deadline alert and marks the task as overdue until the student completes it.

---

🌍 Community Impact

WarriorHacks 2.0 asks participants to create projects that solve an issue in their community, county, state, or nation.

DeadlineBox focuses on an everyday issue within the student community:

Missed academic deadlines.

The goal is not to replace existing learning platforms.

Instead, DeadlineBox provides students with a simple personal layer for organizing deadlines from different sources in one place.

Who does it help?

🎓 High school students
🎓 College students
🎓 University students
🎓 Students managing multiple subjects and assignments

Why does it matter?

Missing a deadline can lead to:

- Lost marks
- Late submissions
- Increased academic stress
- Poor time management
- Last-minute work

DeadlineBox aims to help students stay aware of what is due and when.

---

🚀 How DeadlineBox Works

Add Deadline
     ↓
Enter Subject + Task
     ↓
Choose Date + Time
     ↓
Select Importance
     ↓
DeadlineBox Saves It
     ↓
Automatic Priority
     ↓
Live Countdown
     ↓
Deadline Reached
     ↓
In-App Alert
     ↓
Mark Completed

---

✨ Key Features

📅 Add Deadlines

Students can create deadlines with:

- Subject
- Task
- Date
- Time
- Importance

---

🧠 Automatic Priority

Students do not need to manually arrange their tasks.

DeadlineBox considers:

Time remaining

Time Remaining| Priority
Overdue| 🔴 Critical
Within 24 hours| 🔴 Urgent
1–3 days| 🟠 Soon
More than 3 days| 🟢 Upcoming

Importance is also considered:

High > Medium > Low

This helps the most important and urgent work appear first.

---

⏳ Live Countdown

Every active deadline displays a real-time countdown.

Example:

2d 05h 31m 12s

The countdown updates every second.

When the deadline passes:

🚨 OVERDUE

---

🚨 In-App Deadline Alert

When a deadline reaches its scheduled time, DeadlineBox displays an in-app alert.

The task remains visible as overdue until the student marks it as completed.

«Note: The current MVP intentionally uses an in-app alert rather than relying on browser background notifications.»

---

✅ Complete Tasks

When a student finishes their work, they can select:

✓ Complete

The task moves to the Completed section.

Completed tasks no longer display an active countdown.

---

✏️ Edit Tasks

Students can modify an existing deadline's:

- Subject
- Task
- Date
- Time
- Importance

The priority and countdown update automatically.

---

🗑️ Delete Tasks

Unwanted deadlines can be deleted.

This keeps the dashboard clean and focused.

---

💾 Local Storage

DeadlineBox uses the browser's LocalStorage API.

Deadline information is saved locally so that refreshing the page does not remove the user's tasks.

No account or database is required.

---

📊 Dashboard

The dashboard provides an overview of:

Today
Soon
Upcoming
Completed

These statistics update automatically as deadlines are added, completed, or deleted.

---

🌙 Dark & Light Mode

DeadlineBox supports:

- ☀️ Light mode
- 🌙 Dark mode

The interface is designed to remain readable and comfortable in both themes.

---

📱 Responsive Design

DeadlineBox is designed for:

- 📱 Mobile phones
- 📱 Tablets
- 💻 Laptops
- 🖥️ Desktop computers

The layout adapts to different screen sizes using responsive CSS.

---

🛠️ Technology

DeadlineBox is intentionally built as a lightweight frontend application.

Core technologies

- HTML5
- CSS3
- Vanilla JavaScript

Browser APIs

- LocalStorage API
- JavaScript Date API

Deployment

- GitHub
- Vercel

---

🚫 No Backend Required

DeadlineBox does not use:

- React
- Next.js
- Vue
- Angular
- Node.js
- Express
- MongoDB
- MySQL
- Firebase
- Supabase
- Authentication
- External AI APIs
- Payment systems

The complete MVP runs in the browser.

---

📂 Project Structure

DeadlineBox/
│
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    └── logo.svg

---

⚙️ Running the Project

DeadlineBox is a static web application.

Option 1 — Open directly

Download or clone the repository and open:

index.html

in a modern browser.

Option 2 — Clone with Git

git clone https://github.com/YOUR-USERNAME/deadlinebox.git

Then:

cd deadlinebox

Open "index.html" in your browser.

No backend installation is required.

---

🌐 Live Demo

Live Website:

PASTE YOUR VERCEL URL HERE

Example:

https://deadlinebox-example.vercel.app

---

🎥 Demo

The hackathon demonstration focuses on the complete student workflow:

1. Add a deadline

Create an academic task with a date, time, and importance.

2. Automatic organization

Show how DeadlineBox places the most urgent task first.

3. Countdown

Show the live remaining time.

4. Deadline alert

Demonstrate the in-app alert when a deadline is reached.

5. Complete the task

Mark the deadline as completed.

6. Persistence

Refresh the page and demonstrate that the data remains saved.

---

🧪 Example Scenario

Imagine a student has three tasks:

Mathematics Assignment
Due Today
High Importance

Physics Project
Due Tomorrow
Medium Importance

Chemistry Presentation
Due in 5 Days
Low Importance

DeadlineBox automatically places the Mathematics assignment at the highest priority because it is both urgent and important.

The student does not need to manually organize the list.

---

🔐 Privacy

DeadlineBox does not require:

- Name
- Email
- Password
- Account
- Login
- Signup

Deadline information is stored locally in the browser.

The current MVP does not send the user's deadline data to a backend server.

---

♿ Accessibility & UX

The interface is designed with usability in mind.

The application uses:

- Semantic HTML
- Clearly labeled form fields
- Keyboard-friendly controls
- Visible buttons
- Responsive layouts
- Readable contrast
- Touch-friendly mobile controls

The goal is to make the application understandable without requiring technical knowledge.

---

📈 Feasibility

DeadlineBox deliberately avoids unnecessary complexity.

The MVP can run entirely as a static website.

This makes it:

- Lightweight
- Fast
- Easy to deploy
- Easy to maintain
- Easy for students to use
- Affordable to operate

Because there is no backend or database, the MVP has no server infrastructure cost.

---

🔮 Future Improvements

The current project intentionally focuses on one problem.

Possible future versions could include:

- Progressive Web App support
- Reliable background notifications
- Calendar integration
- Recurring deadlines
- Cloud synchronization
- Cross-device access
- Optional student accounts
- Integration with academic platforms

These features are not part of the current MVP.

---

🏆 Why DeadlineBox Fits WarriorHacks 2.0

WarriorHacks 2.0 asks participants to create a project that solves an issue in their community, county, state, or nation.

DeadlineBox addresses a common problem within the student community:

«Keeping track of academic deadlines.»

Instead of creating a complicated productivity platform, DeadlineBox focuses on one clear problem and provides a simple solution that students can immediately understand and use.

Impact

Helps students stay aware of upcoming work.

Feasibility

Built entirely with standard web technologies and browser APIs.

User Experience

Simple dashboard, clear priority categories, countdowns, and responsive design.

Technical Craft

Uses structured JavaScript, LocalStorage persistence, automatic priority calculation, real-time countdowns, responsive CSS, and client-side state management.

---

🧑‍💻 Hackathon

WarriorHacks 2.0

Track:

Hackathon Track

Project:

DeadlineBox

Tagline:

«Never miss a deadline.»

---

📜 Project Philosophy

DeadlineBox follows a simple development principle:

WORKING
   ↓
SIMPLE
   ↓
POLISHED
   ↓
EXTRA FEATURES

The goal was to build a reliable MVP rather than an unnecessarily complicated application.

---

⭐ Final Idea

«Add deadline → automatically organize → track time → get alerted → complete it.»

DeadlineBox

Never miss a deadline.
