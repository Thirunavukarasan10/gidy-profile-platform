-- -- -- Database Schema for Profile Project
-- -- -- Run this script to initialize your PostgreSQL database

-- -- -- Drop tables if they exist (for clean setup)
-- -- DROP TABLE IF EXISTS skill_endorsements CASCADE;
-- -- DROP TABLE IF EXISTS skills CASCADE;
-- -- DROP TABLE IF EXISTS timeline_items CASCADE;
-- -- DROP TABLE IF EXISTS social_links CASCADE;
-- -- DROP TABLE IF EXISTS achievement_unlocks CASCADE;
-- -- DROP TABLE IF EXISTS profiles CASCADE;

-- -- -- Profiles Table
-- -- CREATE TABLE profiles (
-- --     id SERIAL PRIMARY KEY,
-- --     profile_picture_url TEXT,
-- --     first_name VARCHAR(100) NOT NULL,
-- --     last_name VARCHAR(100) NOT NULL,
-- --     bio TEXT,
-- --     title VARCHAR(200),
-- --     email VARCHAR(255) UNIQUE,
-- --     location VARCHAR(255),
-- --     theme_preference VARCHAR(20) DEFAULT 'light',
-- --     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
-- --     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- -- );

-- -- -- Skills Table
-- -- CREATE TABLE skills (
-- --     id SERIAL PRIMARY KEY,
-- --     profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
-- --     skill_name VARCHAR(100) NOT NULL,
-- --     endorsement_count INTEGER DEFAULT 0,
-- --     category VARCHAR(50),
-- --     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- -- );

-- -- -- Skill Endorsements Table (tracks who endorsed what)
-- -- CREATE TABLE skill_endorsements (
-- --     id SERIAL PRIMARY KEY,
-- --     skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
-- --     endorser_ip VARCHAR(45),
-- --     endorser_session VARCHAR(255),
-- --     endorsed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
-- --     UNIQUE(skill_id, endorser_session)
-- -- );

-- -- -- Timeline Items Table
-- -- CREATE TABLE timeline_items (
-- --     id SERIAL PRIMARY KEY,
-- --     profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
-- --     title VARCHAR(200) NOT NULL,
-- --     company VARCHAR(200),
-- --     description TEXT,
-- --     start_date DATE,
-- --     end_date DATE,
-- --     is_current BOOLEAN DEFAULT false,
-- --     type VARCHAR(50) DEFAULT 'work',
-- --     sort_order INTEGER DEFAULT 0,
-- --     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- -- );

-- -- -- Social Links Table
-- -- CREATE TABLE social_links (
-- --     id SERIAL PRIMARY KEY,
-- --     profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
-- --     platform VARCHAR(50) NOT NULL,
-- --     url TEXT NOT NULL,
-- --     icon VARCHAR(50),
-- --     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- -- );

-- -- -- Achievement Unlocks Table (Standout Feature: Gamification)
-- -- CREATE TABLE achievement_unlocks (
-- --     id SERIAL PRIMARY KEY,
-- --     profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
-- --     achievement_key VARCHAR(100) NOT NULL,
-- --     achievement_name VARCHAR(200) NOT NULL,
-- --     achievement_description TEXT,
-- --     unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
-- --     UNIQUE(profile_id, achievement_key)
-- -- );

-- -- -- Create indexes for better performance
-- -- CREATE INDEX idx_skills_profile_id ON skills(profile_id);
-- -- CREATE INDEX idx_timeline_profile_id ON timeline_items(profile_id);
-- -- CREATE INDEX idx_social_links_profile_id ON social_links(profile_id);
-- -- CREATE INDEX idx_skill_endorsements_skill_id ON skill_endorsements(skill_id);
-- -- CREATE INDEX idx_achievement_unlocks_profile_id ON achievement_unlocks(profile_id);

-- -- -- Insert sample data for demonstration
-- -- INSERT INTO profiles (first_name, last_name, bio, title, email, location, profile_picture_url)
-- -- VALUES (
-- --     'Alex',
-- --     'Johnson',
-- --     'Full-stack developer passionate about building scalable applications and elegant user experiences. I love solving complex problems and learning new technologies.',
-- --     'Senior Full Stack Developer',
-- --     'alex.johnson@example.com',
-- --     'San Francisco, CA',
-- --     'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
-- -- );

-- -- -- Get the profile ID for the sample data
-- -- DO $$
-- -- DECLARE
-- --     profile_id INTEGER;
-- -- BEGIN
-- --     SELECT id INTO profile_id FROM profiles WHERE email = 'alex.johnson@example.com';
    
-- --     -- Insert sample skills
-- --     INSERT INTO skills (profile_id, skill_name, endorsement_count, category) VALUES
-- --         (profile_id, 'React', 15, 'Frontend'),
-- --         (profile_id, 'Node.js', 12, 'Backend'),
-- --         (profile_id, 'PostgreSQL', 8, 'Database'),
-- --         (profile_id, 'TypeScript', 10, 'Language'),
-- --         (profile_id, 'AWS', 6, 'Cloud'),
-- --         (profile_id, 'Docker', 7, 'DevOps');
    
-- --     -- Insert sample timeline items
-- --     INSERT INTO timeline_items (profile_id, title, company, description, start_date, end_date, is_current, type, sort_order) VALUES
-- --         (profile_id, 'Senior Full Stack Developer', 'TechCorp Inc.', 'Leading development of cloud-based SaaS platform serving 100K+ users. Architected microservices infrastructure and mentored junior developers.', '2022-01-15', NULL, true, 'work', 1),
-- --         (profile_id, 'Full Stack Developer', 'StartupXYZ', 'Built MVP from scratch using React and Node.js. Implemented CI/CD pipeline and reduced deployment time by 60%.', '2020-06-01', '2021-12-31', false, 'work', 2),
-- --         (profile_id, 'Frontend Developer', 'Digital Agency', 'Developed responsive websites for clients using modern frameworks. Collaborated with design team to create pixel-perfect UIs.', '2019-03-01', '2020-05-31', false, 'work', 3);
    
-- --     -- Insert sample social links
-- --     INSERT INTO social_links (profile_id, platform, url, icon) VALUES
-- --         (profile_id, 'GitHub', 'https://github.com/alexjohnson', 'github'),
-- --         (profile_id, 'LinkedIn', 'https://linkedin.com/in/alexjohnson', 'linkedin'),
-- --         (profile_id, 'Twitter', 'https://twitter.com/alexjohnson', 'twitter'),
-- --         (profile_id, 'Portfolio', 'https://alexjohnson.dev', 'globe');
-- -- END $$;

-- -- -- Function to update the updated_at timestamp
-- -- CREATE OR REPLACE FUNCTION update_updated_at_column()
-- -- RETURNS TRIGGER AS $$
-- -- BEGIN
-- --     NEW.updated_at = CURRENT_TIMESTAMP;
-- --     RETURN NEW;
-- -- END;
-- -- $$ language 'plpgsql';

-- -- -- Trigger to automatically update updated_at
-- -- CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
-- -- FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- -- Drop existing tables
-- DROP TABLE IF EXISTS skill_endorsements CASCADE;
-- DROP TABLE IF EXISTS achievement_unlocks CASCADE;
-- DROP TABLE IF EXISTS social_links CASCADE;
-- DROP TABLE IF EXISTS timeline_items CASCADE;
-- DROP TABLE IF EXISTS skills CASCADE;
-- DROP TABLE IF EXISTS profiles CASCADE;

-- -- Profiles table
-- CREATE TABLE profiles (
--   id SERIAL PRIMARY KEY,
--   first_name VARCHAR(100) NOT NULL,
--   last_name VARCHAR(100) NOT NULL,
--   email VARCHAR(255),
--   title VARCHAR(200),
--   bio TEXT,
--   location VARCHAR(200),
--   profile_picture_url TEXT,
--   theme_preference VARCHAR(10) DEFAULT 'light',
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Skills table
-- CREATE TABLE skills (
--   id SERIAL PRIMARY KEY,
--   profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
--   skill_name VARCHAR(100) NOT NULL,
--   category VARCHAR(50) DEFAULT 'General',
--   endorsement_count INTEGER DEFAULT 0,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Skill endorsements tracking
-- CREATE TABLE skill_endorsements (
--   id SERIAL PRIMARY KEY,
--   skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
--   endorser_session VARCHAR(255) NOT NULL,
--   endorser_ip VARCHAR(50),
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   UNIQUE(skill_id, endorser_session)
-- );

-- -- Timeline items (work experience, education, etc.)
-- CREATE TABLE timeline_items (
--   id SERIAL PRIMARY KEY,
--   profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
--   title VARCHAR(200) NOT NULL,
--   company VARCHAR(200),
--   description TEXT,
--   start_date DATE,
--   end_date DATE,
--   is_current BOOLEAN DEFAULT false,
--   type VARCHAR(50) DEFAULT 'work',
--   sort_order INTEGER DEFAULT 0,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Social links
-- CREATE TABLE social_links (
--   id SERIAL PRIMARY KEY,
--   profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
--   platform VARCHAR(50) NOT NULL,
--   url TEXT NOT NULL,
--   icon VARCHAR(50),
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Achievement unlocks
-- CREATE TABLE achievement_unlocks (
--   id SERIAL PRIMARY KEY,
--   profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
--   achievement_key VARCHAR(50) NOT NULL,
--   achievement_name VARCHAR(200) NOT NULL,
--   achievement_description TEXT,
--   unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   UNIQUE(profile_id, achievement_key)
-- );

-- -- Insert default profile
-- INSERT INTO profiles (first_name, last_name, email, title, bio, location, profile_picture_url)
-- VALUES (
--   'John',
--   'Doe',
--   'john.doe@example.com',
--   'Full Stack Developer',
--   'Passionate software engineer with expertise in building scalable web applications. I love solving complex problems and creating elegant solutions.',
--   'San Francisco, CA',
--   'https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe'
-- );

-- -- Insert sample skills
-- INSERT INTO skills (profile_id, skill_name, category, endorsement_count) VALUES
-- (1, 'React', 'Frontend', 12),
-- (1, 'Node.js', 'Backend', 8),
-- (1, 'PostgreSQL', 'Database', 6),
-- (1, 'TypeScript', 'Language', 10),
-- (1, 'Tailwind CSS', 'Frontend', 5);

-- -- Insert sample timeline
-- INSERT INTO timeline_items (profile_id, title, company, description, start_date, end_date, is_current) VALUES
-- (1, 'Senior Full Stack Developer', 'Tech Corp', 'Led development of customer-facing web applications serving 100K+ users. Implemented CI/CD pipelines and mentored junior developers.', '2022-01-01', NULL, true),
-- (1, 'Full Stack Developer', 'StartUp Inc', 'Built scalable microservices architecture. Reduced API response time by 60% through optimization.', '2020-03-01', '2021-12-31', false),
-- (1, 'Junior Developer', 'WebDev Co', 'Developed responsive web applications using React and Node.js. Collaborated with design team on UX improvements.', '2018-06-01', '2020-02-28', false);

-- -- Insert sample social links
-- INSERT INTO social_links (profile_id, platform, url, icon) VALUES
-- (1, 'GitHub', 'https://github.com/johndoe', 'github'),
-- (1, 'LinkedIn', 'https://linkedin.com/in/johndoe', 'linkedin'),
-- (1, 'Twitter', 'https://twitter.com/johndoe', 'twitter');

-- -- Create indexes for better performance
-- CREATE INDEX idx_skills_profile ON skills(profile_id);
-- CREATE INDEX idx_timeline_profile ON timeline_items(profile_id);
-- CREATE INDEX idx_social_profile ON social_links(profile_id);
-- CREATE INDEX idx_achievements_profile ON achievement_unlocks(profile_id);






























-- =====================================================
-- COMPLETE DATABASE SCHEMA - PROFESSIONAL PROFILE PROJECT
-- =====================================================
-- Run this script to initialize your PostgreSQL database

-- Drop existing tables in correct order (respecting foreign keys)
DROP TABLE IF EXISTS skill_endorsements CASCADE;
DROP TABLE IF EXISTS achievement_unlocks CASCADE;
DROP TABLE IF EXISTS social_links CASCADE;
DROP TABLE IF EXISTS timeline_items CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS certificates CASCADE;
DROP TABLE IF EXISTS education CASCADE;
DROP TABLE IF EXISTS career_vision CASCADE;
DROP TABLE IF EXISTS resumes CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- =====================================================
-- CORE TABLES
-- =====================================================

-- Profiles table
CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  title VARCHAR(200),
  bio TEXT,
  location VARCHAR(200),
  profile_picture_url TEXT,
  theme_preference VARCHAR(10) DEFAULT 'light',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- NEW FEATURE TABLES
-- =====================================================

-- Career Vision table
CREATE TABLE career_vision (
  id SERIAL PRIMARY KEY,
  profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  current_role TEXT,
  long_term_aspiration TEXT,
  target_field VARCHAR(200),
  inspiration TEXT,
  current_focus TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Education table
CREATE TABLE education (
  id SERIAL PRIMARY KEY,
  profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
  degree VARCHAR(200) NOT NULL,
  institution VARCHAR(200) NOT NULL,
  field_of_study VARCHAR(200),
  start_year INTEGER,
  end_year INTEGER,
  description TEXT,
  is_current BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Certificates table
CREATE TABLE certificates (
  id SERIAL PRIMARY KEY,
  profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  issuer VARCHAR(200) NOT NULL,
  issue_date DATE,
  expiry_date DATE,
  credential_id VARCHAR(200),
  credential_url TEXT,
  file_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Resumes table (for ATS analysis)
CREATE TABLE resumes (
  id SERIAL PRIMARY KEY,
  profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  ats_score INTEGER,
  ats_analysis JSONB,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- EXISTING FEATURE TABLES
-- =====================================================

-- Skills table
CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
  skill_name VARCHAR(100) NOT NULL,
  category VARCHAR(50) DEFAULT 'General',
  endorsement_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skill endorsements tracking
CREATE TABLE skill_endorsements (
  id SERIAL PRIMARY KEY,
  skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
  endorser_session VARCHAR(255) NOT NULL,
  endorser_ip VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(skill_id, endorser_session)
);

-- Timeline items (work experience)
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

-- Social links
CREATE TABLE social_links (
  id SERIAL PRIMARY KEY,
  profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  url TEXT NOT NULL,
  icon VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Achievement unlocks
CREATE TABLE achievement_unlocks (
  id SERIAL PRIMARY KEY,
  profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_key VARCHAR(50) NOT NULL,
  achievement_name VARCHAR(200) NOT NULL,
  achievement_description TEXT,
  unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(profile_id, achievement_key)
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX idx_skills_profile ON skills(profile_id);
CREATE INDEX idx_timeline_profile ON timeline_items(profile_id);
CREATE INDEX idx_social_profile ON social_links(profile_id);
CREATE INDEX idx_achievements_profile ON achievement_unlocks(profile_id);
CREATE INDEX idx_education_profile ON education(profile_id);
CREATE INDEX idx_certificates_profile ON certificates(profile_id);
CREATE INDEX idx_career_vision_profile ON career_vision(profile_id);
CREATE INDEX idx_resumes_profile ON resumes(profile_id);

-- =====================================================
-- SAMPLE DATA
-- =====================================================

-- Insert default profile
INSERT INTO profiles (first_name, last_name, email, title, bio, location, profile_picture_url)
VALUES (
  'John',
  'Doe',
  'john.doe@example.com',
  'Full Stack Developer',
  'Passionate software engineer with expertise in building scalable web applications. I love solving complex problems and creating elegant solutions.',
  'San Francisco, CA',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe'
);

-- Insert sample skills
INSERT INTO skills (profile_id, skill_name, category, endorsement_count) VALUES
(1, 'React', 'Frontend', 12),
(1, 'Node.js', 'Backend', 8),
(1, 'PostgreSQL', 'Database', 6),
(1, 'TypeScript', 'Language', 10),
(1, 'Tailwind CSS', 'Frontend', 5);

-- Insert sample timeline
INSERT INTO timeline_items (profile_id, title, company, description, start_date, end_date, is_current) VALUES
(1, 'Senior Full Stack Developer', 'Tech Corp', 'Led development of customer-facing web applications serving 100K+ users. Implemented CI/CD pipelines and mentored junior developers.', '2022-01-01', NULL, true),
(1, 'Full Stack Developer', 'StartUp Inc', 'Built scalable microservices architecture. Reduced API response time by 60% through optimization.', '2020-03-01', '2021-12-31', false),
(1, 'Junior Developer', 'WebDev Co', 'Developed responsive web applications using React and Node.js. Collaborated with design team on UX improvements.', '2018-06-01', '2020-02-28', false);

-- Insert sample social links
INSERT INTO social_links (profile_id, platform, url, icon) VALUES
(1, 'GitHub', 'https://github.com/johndoe', 'github'),
(1, 'LinkedIn', 'https://linkedin.com/in/johndoe', 'linkedin'),
(1, 'Twitter', 'https://twitter.com/johndoe', 'twitter');

-- Insert sample education
INSERT INTO education (profile_id, degree, institution, field_of_study, start_year, end_year, description) VALUES
(1, 'Bachelor of Science', 'Stanford University', 'Computer Science', 2014, 2018, 'Focus on software engineering and algorithms. GPA: 3.8/4.0');

-- Insert sample career vision
INSERT INTO career_vision (profile_id, current_role, long_term_aspiration, target_field, inspiration, current_focus) VALUES
(1, 
 'Building scalable web applications and leading a small team of developers',
 'Become a Principal Engineer or Engineering Manager at a leading tech company',
 'Cloud Infrastructure & Distributed Systems',
 'Inspired by the impact of technology on solving real-world problems',
 'Learning Kubernetes and system design patterns'
);

-- =====================================================
-- FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for profiles
CREATE TRIGGER update_profiles_updated_at 
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for career_vision
CREATE TRIGGER update_career_vision_updated_at 
BEFORE UPDATE ON career_vision
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for education
CREATE TRIGGER update_education_updated_at 
BEFORE UPDATE ON education
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();