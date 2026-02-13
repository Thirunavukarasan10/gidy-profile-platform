-- Database Schema for Profile Project
-- Run this script to initialize your PostgreSQL database

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS skill_endorsements CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS timeline_items CASCADE;
DROP TABLE IF EXISTS social_links CASCADE;
DROP TABLE IF EXISTS achievement_unlocks CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Profiles Table
CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    profile_picture_url TEXT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    bio TEXT,
    title VARCHAR(200),
    email VARCHAR(255) UNIQUE,
    location VARCHAR(255),
    theme_preference VARCHAR(20) DEFAULT 'light',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills Table
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
    skill_name VARCHAR(100) NOT NULL,
    endorsement_count INTEGER DEFAULT 0,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skill Endorsements Table (tracks who endorsed what)
CREATE TABLE skill_endorsements (
    id SERIAL PRIMARY KEY,
    skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
    endorser_ip VARCHAR(45),
    endorser_session VARCHAR(255),
    endorsed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(skill_id, endorser_session)
);

-- Timeline Items Table
CREATE TABLE timeline_items (
    id SERIAL PRIMARY KEY,
    profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    company VARCHAR(200),
    description TEXT,
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT false,
    type VARCHAR(50) DEFAULT 'work',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Social Links Table
CREATE TABLE social_links (
    id SERIAL PRIMARY KEY,
    profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL,
    url TEXT NOT NULL,
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Achievement Unlocks Table (Standout Feature: Gamification)
CREATE TABLE achievement_unlocks (
    id SERIAL PRIMARY KEY,
    profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
    achievement_key VARCHAR(100) NOT NULL,
    achievement_name VARCHAR(200) NOT NULL,
    achievement_description TEXT,
    unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(profile_id, achievement_key)
);

-- Create indexes for better performance
CREATE INDEX idx_skills_profile_id ON skills(profile_id);
CREATE INDEX idx_timeline_profile_id ON timeline_items(profile_id);
CREATE INDEX idx_social_links_profile_id ON social_links(profile_id);
CREATE INDEX idx_skill_endorsements_skill_id ON skill_endorsements(skill_id);
CREATE INDEX idx_achievement_unlocks_profile_id ON achievement_unlocks(profile_id);

-- Insert sample data for demonstration
INSERT INTO profiles (first_name, last_name, bio, title, email, location, profile_picture_url)
VALUES (
    'Alex',
    'Johnson',
    'Full-stack developer passionate about building scalable applications and elegant user experiences. I love solving complex problems and learning new technologies.',
    'Senior Full Stack Developer',
    'alex.johnson@example.com',
    'San Francisco, CA',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
);

-- Get the profile ID for the sample data
DO $$
DECLARE
    profile_id INTEGER;
BEGIN
    SELECT id INTO profile_id FROM profiles WHERE email = 'alex.johnson@example.com';
    
    -- Insert sample skills
    INSERT INTO skills (profile_id, skill_name, endorsement_count, category) VALUES
        (profile_id, 'React', 15, 'Frontend'),
        (profile_id, 'Node.js', 12, 'Backend'),
        (profile_id, 'PostgreSQL', 8, 'Database'),
        (profile_id, 'TypeScript', 10, 'Language'),
        (profile_id, 'AWS', 6, 'Cloud'),
        (profile_id, 'Docker', 7, 'DevOps');
    
    -- Insert sample timeline items
    INSERT INTO timeline_items (profile_id, title, company, description, start_date, end_date, is_current, type, sort_order) VALUES
        (profile_id, 'Senior Full Stack Developer', 'TechCorp Inc.', 'Leading development of cloud-based SaaS platform serving 100K+ users. Architected microservices infrastructure and mentored junior developers.', '2022-01-15', NULL, true, 'work', 1),
        (profile_id, 'Full Stack Developer', 'StartupXYZ', 'Built MVP from scratch using React and Node.js. Implemented CI/CD pipeline and reduced deployment time by 60%.', '2020-06-01', '2021-12-31', false, 'work', 2),
        (profile_id, 'Frontend Developer', 'Digital Agency', 'Developed responsive websites for clients using modern frameworks. Collaborated with design team to create pixel-perfect UIs.', '2019-03-01', '2020-05-31', false, 'work', 3);
    
    -- Insert sample social links
    INSERT INTO social_links (profile_id, platform, url, icon) VALUES
        (profile_id, 'GitHub', 'https://github.com/alexjohnson', 'github'),
        (profile_id, 'LinkedIn', 'https://linkedin.com/in/alexjohnson', 'linkedin'),
        (profile_id, 'Twitter', 'https://twitter.com/alexjohnson', 'twitter'),
        (profile_id, 'Portfolio', 'https://alexjohnson.dev', 'globe');
END $$;

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
