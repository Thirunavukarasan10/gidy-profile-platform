# 🎯 The Profile Project

A modern, full-stack professional profile application with innovative features including skill endorsements, interactive timeline, dark mode, AI-powered bio generation, and a gamification system with unlockable achievements.

![Tech Stack](https://img.shields.io/badge/Stack-PERN-blue)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791)

## 🚀 Features

### Core Features
- **Dynamic Profile Management**: View and edit profile information in real-time
- **Skills Showcase**: Display technical skills with category organization
- **Work Timeline**: Interactive, animated timeline of professional experience
- **Social Links**: Connect all your social profiles in one place
- **Responsive Design**: Beautiful UI on all devices
- **Dark Mode**: Toggle between light and dark themes with persistent preference

### Innovation Features

#### 1️⃣ **Skill Endorsement System**
- One-click endorsements for skills
- Real-time endorsement count updates
- Session-based tracking to prevent duplicate endorsements
- Visual feedback with animated counters
- Persistent endorsement state using localStorage

**How it works:**
- Visitors can endorse skills with a simple click
- Each endorsement increments the skill's count in the database
- Session IDs prevent users from endorsing the same skill multiple times
- Endorsed skills are marked visually for the user

#### 2️⃣ **Interactive Work Timeline**
- Vertical timeline with smooth animations
- Visual timeline dots and connecting lines
- Hover effects that scale timeline items
- Automatic duration calculation (years/months)
- Shows "Present" for current positions
- Color-coded and gradient-styled for visual appeal

**Design highlights:**
- Gradient timeline line from primary color palette
- Animated dots that grow on hover
- Clean card-based layout with shadows
- Date formatting and duration display

#### 3️⃣ **Dark Mode Toggle**
- Smooth transitions between themes
- Persistent preference using localStorage
- System-wide theme application
- Tailwind's dark mode utilities
- Fixed toggle button with icon animation

**Implementation:**
- React Context API for global theme state
- CSS class toggling on document root
- Tailwind's `dark:` variant for styling
- Seamless 200ms transitions

#### 4️⃣ **AI-Generated Bio Summary**
- Integration with OpenAI API (with fallback templates)
- Generate professional bios from skills and interests
- User inputs: title, skills (auto-pulled), interests
- Multiple generation attempts until satisfied
- One-click bio application to profile

**Capabilities:**
- Smart template fallback when API is unavailable
- Contextual bio generation based on user input
- Professional, engaging, first-person narratives
- Immediate preview before saving

### 🎮 Standout Feature: **Achievement Gamification System**

A unique gamification layer that rewards users for building comprehensive profiles.

**Achievements Include:**
- 🏆 **Profile Perfectionist**: Complete all basic profile information
- ⭐ **Skilled Professional**: Add 5+ skills
- 🎯 **Career Builder**: Add 3+ work experiences
- ⚡ **Social Butterfly**: Connect 3+ social profiles
- 🥇 **Highly Endorsed**: Receive 10+ total endorsements
- 🏅 **Expert Level**: Receive 50+ total endorsements

**Why this is impressive:**
1. **Engagement**: Encourages users to complete their profiles
2. **Motivation**: Visual progress tracking with unlockable milestones
3. **Personalization**: Each achievement has unique icons and gradient colors
4. **Real-time**: Achievements unlock immediately when criteria are met
5. **Visual Polish**: Animated "NEW!" badges for recently unlocked achievements
6. **Backend Logic**: Server-side validation ensures achievement integrity

**Technical Implementation:**
- Database table tracking unlocked achievements
- Server-side checks after profile updates
- Prevents duplicate unlocks with unique constraints
- Local storage for "new achievement" notifications
- Gradient colors and animations for visual appeal

## 🛠️ Tech Stack

### Frontend
- **React 18.2** with Hooks
- **Vite** for blazing-fast development
- **Tailwind CSS** for utility-first styling
- **Lucide React** for beautiful icons
- **Axios** for API requests
- **Context API** for state management

### Backend
- **Node.js** with Express
- **PostgreSQL** database
- **pg** (node-postgres) for database connection
- **dotenv** for environment management
- **CORS** enabled for cross-origin requests
- **OpenAI API** (optional) for AI bio generation

### Database Schema
- **profiles** - User profile information
- **skills** - Skills with endorsement counts
- **skill_endorsements** - Tracks individual endorsements
- **timeline_items** - Work experience entries
- **social_links** - Social media connections
- **achievement_unlocks** - Gamification achievements

## 📁 Project Structure

```
profile-project/
├── backend/
│   ├── config/
│   │   └── database.js          # Database connection
│   ├── controllers/
│   │   ├── profileController.js # Profile CRUD operations
│   │   └── aiController.js      # AI bio generation
│   ├── routes/
│   │   └── api.js               # API route definitions
│   ├── scripts/
│   │   └── initDb.js            # Database initialization
│   ├── .env.example             # Environment template
│   ├── schema.sql               # PostgreSQL schema
│   ├── package.json
│   └── server.js                # Express server entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProfileHeader.jsx      # Profile info & edit
│   │   │   ├── SkillsSection.jsx      # Skills with endorsements
│   │   │   ├── Timeline.jsx           # Work experience timeline
│   │   │   ├── SocialLinks.jsx        # Social media links
│   │   │   ├── BioGenerator.jsx       # AI bio generator
│   │   │   ├── Achievements.jsx       # Gamification achievements
│   │   │   ├── ThemeToggle.jsx        # Dark mode toggle
│   │   │   └── Loading.jsx            # Loading state
│   │   ├── context/
│   │   │   └── ThemeContext.jsx       # Theme management
│   │   ├── utils/
│   │   │   └── api.js                 # API client
│   │   ├── App.jsx                    # Main app component
│   │   ├── main.jsx                   # React entry point
│   │   └── index.css                  # Global styles
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md                    # This file
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create PostgreSQL database:**
   ```bash
   createdb profile_db
   ```

4. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and update:
   ```
   PORT=5000
   DATABASE_URL=postgresql://username:password@localhost:5432/profile_db
   NODE_ENV=development
   
   # Optional: For AI Bio Generation
   OPENAI_API_KEY=your_actual_api_key
   ```

5. **Initialize database:**
   ```bash
   npm run init-db
   ```
   
   This will create all tables and insert sample data.

6. **Start the server:**
   ```bash
   npm run dev
   ```
   
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   The default should work:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```
   
   Frontend will run on `http://localhost:3000`

### Verify Setup

1. Open `http://localhost:3000` in your browser
2. You should see the sample profile (Alex Johnson)
3. Try endorsing skills, toggling dark mode, and editing the profile
4. Check that achievements unlock as you complete profile sections

## 🚢 Deployment

### Backend Deployment (Render)

1. **Create a new Web Service on Render:**
   - Connect your GitHub repository
   - Select the `backend` directory
   - Build command: `npm install`
   - Start command: `npm start`

2. **Add Environment Variables:**
   ```
   DATABASE_URL=<your_render_postgres_url>
   NODE_ENV=production
   OPENAI_API_KEY=<your_openai_key>
   ```

3. **Create PostgreSQL Database:**
   - Add a new PostgreSQL database on Render
   - Copy the internal database URL to `DATABASE_URL`

4. **Initialize Database:**
   - Use Render's shell to run: `npm run init-db`

### Frontend Deployment (Vercel)

1. **Create a new project on Vercel:**
   - Import your GitHub repository
   - Framework: Vite
   - Root Directory: `frontend`

2. **Configure Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Add Environment Variable:**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

4. **Deploy:**
   - Vercel will automatically build and deploy

### Alternative: Both on Render

You can deploy both frontend and backend on Render:
- Backend as a Web Service (as above)
- Frontend as a Static Site with build command `npm run build`

## 🧪 Testing the Features

### Skill Endorsement System
1. Click the thumbs-up icon on any skill
2. Watch the counter increment
3. Try clicking again - it should be disabled
4. Open in incognito/private window - you can endorse again

### Timeline Animations
1. Hover over timeline items to see scaling effects
2. Try adding new experiences in edit mode
3. Note the automatic duration calculations

### Dark Mode
1. Click the moon/sun icon in top-right
2. Theme persists on page reload
3. All components adapt to the theme

### AI Bio Generator
1. Enable edit mode
2. Click "Generate AI Bio"
3. Add optional title and interests
4. Click generate and try multiple times
5. Click "Use This Bio" to apply

### Achievement System
1. Complete profile information to unlock "Profile Perfectionist"
2. Add 5 skills to unlock "Skilled Professional"
3. Add 3 timeline items to unlock "Career Builder"
4. Get 10 total endorsements for "Highly Endorsed"
5. Watch for the "NEW!" badge animation

## 🎨 Design Highlights

### Color Palette
- Primary: Blue gradient (50-900 shades)
- Achievements: Unique gradients per achievement
- Dark Mode: Carefully selected gray tones

### Animations
- Fade-in on page load
- Slide-up for cards
- Hover effects on interactive elements
- Pulse animation for new achievements
- Smooth theme transitions

### Responsive Design
- Mobile-first approach
- Grid layouts adapt to screen size
- Touch-friendly buttons
- Optimized for tablets and desktops

## 🔒 Security Considerations

- Session-based endorsement tracking prevents spam
- SQL injection protection via parameterized queries
- CORS configuration for cross-origin security
- Environment variables for sensitive data
- Input validation on both frontend and backend

## 🚀 Future Enhancements

Potential features for expansion:
- User authentication and multiple profiles
- Profile analytics dashboard
- Export profile as PDF
- Share profile via unique URLs
- Email notifications for endorsements
- More achievement types
- Skill categories with filtering
- Project showcase section
- Testimonials/recommendations
- Profile completeness percentage

## 📝 API Documentation

### Profile Endpoints
- `GET /api/profile/:id` - Get profile with all data
- `PUT /api/profile/:id` - Update profile

### Skills Endpoints
- `POST /api/profile/:id/skills` - Add skill
- `PUT /api/skills/:skillId` - Update skill
- `DELETE /api/skills/:skillId` - Delete skill
- `POST /api/skills/:skillId/endorse` - Endorse skill

### Timeline Endpoints
- `POST /api/profile/:id/timeline` - Add timeline item
- `PUT /api/timeline/:itemId` - Update timeline item
- `DELETE /api/timeline/:itemId` - Delete timeline item

### Social Links Endpoints
- `POST /api/profile/:id/social-links` - Add social link
- `PUT /api/social-links/:linkId` - Update social link
- `DELETE /api/social-links/:linkId` - Delete social link

### AI Endpoints
- `POST /api/ai/generate-bio` - Generate AI bio

## 🤝 Contributing

This is a technical challenge project, but suggestions are welcome!

## 📄 License

MIT License - feel free to use this project for learning and inspiration.

## 🙏 Acknowledgments

- Inspired by modern profile pages like Gidy.ai
- Built with modern web technologies
- Designed for recruiters and developers

---

**Built with ❤️ for The Profile Project Technical Challenge**
