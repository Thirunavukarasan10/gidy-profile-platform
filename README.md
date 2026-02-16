 The Profile Project – Full Stack Technical Challenge
 Live Demo

Live Link: https://gidy-profile-platform.onrender.com](https://gidy-profile-platform-vu52-9igatm1co.vercel.app/

 Source Code

GitHub Repository: https://github.com/Thirunavukarasan10/gidy-profile-platform

 Tech Stack
Frontend

React (Vite)

Tailwind CSS

Lucide Icons

Axios

Context API

Backend

Node.js

Express.js

RESTful API Architecture

Database

PostgreSQL (Neon – Cloud Hosted)

pg (node-postgres)

✅ Core Features

Dynamic profile management (view & edit mode)

Skills showcase with real-time endorsements

Interactive work experience timeline

Social links integration

Responsive design (mobile-first)

Dark mode with persistent preference

Modular REST API structure

✨ Innovation Features
1️⃣ Skill Endorsement System

One-click skill endorsements

Real-time endorsement count updates

Session-based duplicate prevention

Backend validation for integrity

Why this matters:
Transforms a static profile into an interactive, community-driven experience.

2️⃣ Achievement Gamification System (Standout Feature)

A unique gamification layer that rewards users for completing and enhancing their profiles.

Example Achievements:

🏆 Profile Perfectionist – Complete profile details

⭐ Skilled Professional – Add 5+ skills

🎯 Career Builder – Add 3+ experiences

🥇 Highly Endorsed – Receive 10+ endorsements

Why it stands out:

Encourages engagement

Improves profile completeness

Unlocks in real-time

Backend-validated logic

Visually enhanced with badges & animations

This adds product thinking beyond a simple UI replica.

3️⃣ Interactive Work Timeline

Animated vertical timeline

Automatic duration calculation

Hover interactions

Present position handling

Clean card-based UI

🏗 Architecture Overview

Modular backend structure (routes + controllers)

Clean separation of concerns

Environment-based configuration

Production-ready database connection

Scalable RESTful API design

Secure environment variable handling

⚙️ Setup Instructions (Local Development)
1️⃣ Clone Repository
git clone https://github.com/Thirunavukarasan10/gidy-profile-platform.git
cd gidy-profile-platform

2️⃣ Backend Setup
cd backend
npm install


Create .env file:

PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/profile_db
NODE_ENV=development


Initialize database:

npm run init-db


Start backend:

npm run dev


Runs at:

http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Runs at:

http://localhost:5173

🚢 Deployment

The application is deployed as a single full-stack service on Render.

Backend + Frontend served via Express

PostgreSQL hosted on Neon (cloud database)

Environment variables configured securely

Production-ready setup with SSL support

🔒 Security Considerations

Parameterized SQL queries (prevents injection)

Server-side validation

CORS configuration

Environment variable protection

Session-based endorsement control

📌 Key Highlights

Fully responsive UI

Clean folder structure

Real-time database interactions

Production deployment

Scalable backend design

Strong product-focused innovation

🏁 Conclusion

This project goes beyond simply replicating a profile page by introducing interactive engagement systems (endorsements & achievements), thoughtful UX decisions, and scalable backend architecture.

It demonstrates:

Full-stack development capability

Clean system design

Production deployment knowledge

Product thinking and innovation

Built with ❤️ for the Full-Stack Technical Challenge.
