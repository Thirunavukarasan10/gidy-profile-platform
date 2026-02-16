The Profile Project

A full-stack professional profile platform built as part of the technical challenge. The application replicates a modern profile page with additional innovative enhancements to improve engagement and personalization.

🌐 Live Application

🔗 https://gidy-profile-platform-vu52-9igatm1co.vercel.app/

💻 Source Code

🔗 https://github.com/Thirunavukarasan10/gidy-profile-platform

🚀 Tech Stack
Frontend

React (Vite)

Tailwind CSS

Lucide Icons

Context API

Fetch API

Backend

Node.js

Express.js

RESTful API architecture

Database

PostgreSQL (Neon – Cloud Hosted)

Deployment

Frontend: Vercel

Backend: Render

Database: Neon PostgreSQL

   Core Features (Replica Requirements)
1️⃣ Dynamic Profile Management

View and edit profile information

Real-time updates

Clean and responsive UI

2️⃣ Skills Section

Categorized skills

Endorsement system

Real-time endorsement counter

Duplicate prevention using session-based tracking

3️⃣ Work Timeline

Vertical interactive timeline

Duration auto-calculation

Current role indicator (“Present”)

Smooth hover animations

4️⃣ Social Links

Multiple platforms supported

Editable in real-time

Icon-based UI representation

5️⃣ Education & Certifications

Structured academic records

Certification tracking with issuer, dates, and credential links

   Innovation Features
🏆 1. Achievement Gamification System

A gamified experience that rewards users for building a complete profile.

Achievements unlock based on:

Profile completion

Skill additions

Timeline entries

Social links

Endorsement milestones

Why this is valuable:

Encourages engagement

Motivates profile completion

Provides real-time visual feedback

Server-side validation prevents manipulation

  2. Dark Mode Toggle (Persistent)

Smooth theme transitions

Stored in localStorage

Global theme management using Context API

Fully responsive in both themes

  3. AI Bio Generator

Generates professional bios

Uses template fallback logic

Context-aware based on skills and role

One-click apply feature

Enhances personalization and improves recruiter-facing profile quality.

  Project Structure
gidy-profile-platform/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── schema.sql
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── utils/
│   │   └── App.jsx
│   └── vite.config.js
│
└── README.md

⚙️ Setup Instructions (Local Development)
Prerequisites

Node.js (v16+)

PostgreSQL

🔹 Backend Setup
cd backend
npm install


Create a PostgreSQL database.

Create .env file:

PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/profile_db
NODE_ENV=development


Initialize schema:

psql -U username -d profile_db -f schema.sql


Start backend:

npm run dev


Backend runs on:

http://localhost:5000

🔹 Frontend Setup
cd frontend
npm install


Create .env file:

VITE_API_URL=http://localhost:5000


Run:

npm run dev


Frontend runs on:

http://localhost:5173

🔒 Security Considerations

SQL injection protection via parameterized queries

Session-based endorsement tracking

Environment variable protection for secrets

Production SSL database connection

Proper CORS configuration

📈 Design & UX Highlights

Responsive design (mobile-first)

Smooth animations and transitions

Clean card-based layout

Professional color system

Accessible UI components

🧠 Architectural Overview

The application follows a clean separation of concerns:

Frontend → React UI
Backend → REST API
Database → PostgreSQL
Deployment → Cloud-hosted microservices architecture

This mirrors real-world production system design.

🚀 Future Enhancements

Authentication & multi-user support

Profile sharing via unique URLs

Export profile as PDF

Analytics dashboard

Project portfolio section

🙏 Acknowledgment

Built as part of the Full-Stack Technical Challenge inspired by modern professional profile platforms.
