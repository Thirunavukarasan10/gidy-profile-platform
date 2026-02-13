# Deployment Guide

Complete guide to deploying the Profile Project to production.

## Recommended Stack: Vercel + Render

### Why This Stack?
- **Vercel**: Best-in-class React/Vite hosting with automatic deployments
- **Render**: Free PostgreSQL database and Node.js hosting
- **Easy Setup**: Both have excellent free tiers
- **Auto-Deploy**: Push to GitHub triggers new deployments

## Prerequisites

- GitHub account
- Vercel account (free)
- Render account (free)
- Project pushed to GitHub repository

---

## Part 1: Deploy Database & Backend (Render)

### Step 1: Create PostgreSQL Database

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `profile-db` (or your choice)
   - **Database**: `profile_db`
   - **User**: (auto-generated)
   - **Region**: Choose closest to you
   - **Plan**: Free
4. Click **"Create Database"**
5. Wait for database to be created (~2 minutes)

**Important:** Copy the **Internal Database URL** (starts with `postgresql://`)

### Step 2: Create Backend Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `profile-backend` (or your choice)
   - **Region**: Same as database
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
4. Click **"Advanced"** to add environment variables

### Step 3: Add Environment Variables

Add these environment variables:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Your Internal Database URL from Step 1 |
| `NODE_ENV` | `production` |
| `PORT` | `5000` (Render auto-detects this) |
| `OPENAI_API_KEY` | Your OpenAI key (optional) |

5. Click **"Create Web Service"**
6. Wait for deployment (~3-5 minutes)

### Step 4: Initialize Database Schema

Once deployed:

1. Go to your backend service in Render
2. Click **"Shell"** tab (terminal icon)
3. Run:
   ```bash
   npm run init-db
   ```
4. You should see: ✅ Database schema initialized successfully

**Copy your backend URL** - looks like: `https://profile-backend.onrender.com`

---

## Part 2: Deploy Frontend (Vercel)

### Step 1: Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)

### Step 2: Add Environment Variable

Under **"Environment Variables"**:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://your-backend.onrender.com/api` |

Replace with your actual Render backend URL from Part 1, Step 4.

### Step 3: Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes for build
3. You'll get a URL like: `https://your-project.vercel.app`

---

## Part 3: Verify Deployment

### Test Backend
```bash
curl https://your-backend.onrender.com/api/health
```

Should return: `{"status":"ok","timestamp":"..."}`

### Test Frontend
1. Visit your Vercel URL
2. You should see the profile page
3. Try:
   - Toggling dark mode
   - Endorsing a skill
   - Editing the profile
   - Generating an AI bio (if OpenAI key added)

---

## Alternative: Deploy Both on Render

You can deploy frontend on Render too:

### Frontend as Static Site

1. Click **"New +"** → **"Static Site"**
2. Connect repository
3. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add environment variable:
   - `VITE_API_URL`: Your backend URL

---

## Environment Variables Reference

### Backend (.env)
```bash
# Required
DATABASE_URL=postgresql://user:pass@host/database
NODE_ENV=production
PORT=5000

# Optional
OPENAI_API_KEY=sk-...
```

### Frontend (.env)
```bash
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## Custom Domain Setup

### Vercel (Frontend)
1. Go to project settings → Domains
2. Add your custom domain
3. Follow DNS configuration steps

### Render (Backend)
1. Go to service settings → Custom Domains
2. Add your custom domain
3. Update DNS records as instructed

---

## Performance Optimization

### Backend
- Render's free tier sleeps after 15min inactivity
- Consider paid tier ($7/month) for 24/7 uptime
- Add Redis caching for better performance

### Frontend
- Vercel automatically optimizes builds
- Images are lazy-loaded
- Code-splitting enabled by Vite

### Database
- Free tier: 1GB storage, 97 hours/month uptime
- Upgrade to paid tier for better reliability
- Consider connection pooling for high traffic

---

## Monitoring & Logs

### Render
- **Logs**: Available in service dashboard
- **Metrics**: CPU, Memory, Request count
- **Alerts**: Set up email notifications

### Vercel
- **Analytics**: Built-in performance monitoring
- **Logs**: Runtime and build logs
- **Real-time**: See deployments and errors

---

## Troubleshooting

### "Internal Server Error" on Backend
- Check Render logs for errors
- Verify DATABASE_URL is correct
- Ensure database schema is initialized

### Frontend Can't Connect to Backend
- Verify VITE_API_URL is set correctly
- Check CORS is enabled on backend
- Ensure backend is deployed and running

### Database Connection Issues
- Check if database is active (Render dashboard)
- Verify connection string format
- Ensure SSL is enabled for production

### API Rate Limits (OpenAI)
- Free tier: 3 requests/min
- Consider implementing rate limiting
- Use template fallback if API fails

---

## Scaling Considerations

### For Higher Traffic
1. **Database**: Upgrade to Standard plan ($7/mo)
2. **Backend**: Move to paid plan for 24/7 uptime
3. **Caching**: Add Redis for session management
4. **CDN**: Vercel includes CDN automatically

### For Multiple Users
1. Add user authentication
2. Implement profile IDs in URL routes
3. Add API rate limiting
4. Consider horizontal scaling

---

## Backup & Recovery

### Database Backups (Render)
- Free tier: Manual backups only
- Paid tier: Automatic daily backups
- Export with pg_dump:
  ```bash
  pg_dump $DATABASE_URL > backup.sql
  ```

### Restore Database
```bash
psql $DATABASE_URL < backup.sql
```

---

## Cost Breakdown

### Free Tier (Both Services)
- **Render DB**: Free (1GB, 90 days)
- **Render Backend**: Free (sleeps after 15min)
- **Vercel Frontend**: Free (100GB bandwidth)
- **Total**: $0/month

### Recommended Paid Tier
- **Render DB**: $7/month (persistent)
- **Render Backend**: $7/month (24/7 uptime)
- **Vercel Frontend**: Free (sufficient)
- **Total**: $14/month

---

## Security Checklist

- [ ] Environment variables not in code
- [ ] CORS configured properly
- [ ] SQL injection protection (parameterized queries)
- [ ] HTTPS enabled (automatic on both platforms)
- [ ] API rate limiting considered
- [ ] Input validation on frontend and backend
- [ ] Database credentials secure

---

## Deployment Checklist

Backend:
- [ ] Database created on Render
- [ ] Backend service deployed
- [ ] Environment variables configured
- [ ] Database schema initialized
- [ ] Health endpoint responding

Frontend:
- [ ] Project imported to Vercel
- [ ] API URL environment variable set
- [ ] Build successful
- [ ] Can access deployment URL
- [ ] Dark mode persists
- [ ] API calls working

---

## Support & Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [PostgreSQL Guides](https://www.postgresql.org/docs/)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)

---

**Congratulations! Your profile is now live! 🎉**
