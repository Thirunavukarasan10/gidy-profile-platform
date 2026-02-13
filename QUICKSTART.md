# Quick Start Guide

Get the Profile Project running in 5 minutes!

## Prerequisites
- Node.js installed (v16+)
- PostgreSQL installed and running
- Basic command line knowledge

## Step-by-Step Setup

### 1. Clone or Extract the Project
```bash
cd profile-project
```

### 2. Set Up Database

**Create database:**
```bash
createdb profile_db
```

If you don't have `createdb`, use psql:
```bash
psql -U postgres
CREATE DATABASE profile_db;
\q
```

### 3. Backend Setup

```bash
cd backend
npm install
```

**Create .env file:**
```bash
cp .env.example .env
```

**Edit .env** (use your PostgreSQL credentials):
```
PORT=5000
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/profile_db
NODE_ENV=development
```

**Initialize database with sample data:**
```bash
npm run init-db
```

**Start backend server:**
```bash
npm run dev
```

You should see:
```
✅ Server running on port 5000
✅ Database connected
```

### 4. Frontend Setup

**Open a new terminal**, then:

```bash
cd frontend
npm install
```

**Create .env file:**
```bash
cp .env.example .env
```

**Start frontend:**
```bash
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:3000/
```

### 5. Open in Browser

Navigate to: **http://localhost:3000**

You should see the profile page with sample data!

## What to Try First

1. **Toggle Dark Mode** - Click moon/sun icon (top-right)
2. **Endorse a Skill** - Click 👍 on any skill
3. **Edit Mode** - Click "Edit Mode" button (top-left)
4. **Add Experience** - In edit mode, add a timeline item
5. **Generate Bio** - Try the AI bio generator
6. **Check Achievements** - See which achievements you've unlocked

## Troubleshooting

### Database Connection Issues
- Make sure PostgreSQL is running
- Check your credentials in `.env`
- Try: `psql -U postgres -d profile_db -c "SELECT NOW();"`

### Port Already in Use
Backend (5000):
```bash
# Change PORT in backend/.env to 5001
```

Frontend (3000):
```bash
# Vite will automatically suggest port 3001
```

### CORS Errors
Make sure backend is running first, then start frontend.

### "Module not found" Errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

## Sample Credentials

The database comes with a sample profile:
- Name: Alex Johnson
- Email: alex.johnson@example.com
- Profile ID: 1 (used in API calls)

## Next Steps

- Read the full README.md for detailed documentation
- Check out DEPLOYMENT.md for production deployment
- Customize the sample data
- Add your own profile information

## Need Help?

Common commands:

**Reset Database:**
```bash
cd backend
npm run init-db
```

**Check Backend is Running:**
```bash
curl http://localhost:5000/api/health
```

**View Backend Logs:**
Backend terminal will show all API requests and errors.

---

Happy coding! 🚀
