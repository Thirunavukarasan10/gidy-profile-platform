-- =====================================================
-- COMPLETE DATABASE SCHEMA - PROFESSIONAL PROFILE PROJECT
-- =====================================================

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

CREATE TABLE resumes (
  id SERIAL PRIMARY KEY,
  profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  ats_score INTEGER,
  ats_analysis JSONB,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
  skill_name VARCHAR(100) NOT NULL,
  category VARCHAR(50) DEFAULT 'General',
  endorsement_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE skill_endorsements (
  id SERIAL PRIMARY KEY,
  skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
  endorser_session VARCHAR(255) NOT NULL,
  endorser_ip VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(skill_id, endorser_session)
);

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

CREATE TABLE social_links (
  id SERIAL PRIMARY KEY,
  profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  url TEXT NOT NULL,
  icon VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE achievement_unlocks (
  id SERIAL PRIMARY KEY,
  profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_key VARCHAR(50) NOT NULL,
  achievement_name VARCHAR(200) NOT NULL,
  achievement_description TEXT,
  unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(profile_id, achievement_key)
);

CREATE INDEX idx_skills_profile ON skills(profile_id);
CREATE INDEX idx_timeline_profile ON timeline_items(profile_id);
CREATE INDEX idx_social_profile ON social_links(profile_id);
CREATE INDEX idx_achievements_profile ON achievement_unlocks(profile_id);
CREATE INDEX idx_education_profile ON education(profile_id);
CREATE INDEX idx_certificates_profile ON certificates(profile_id);
CREATE INDEX idx_career_vision_profile ON career_vision(profile_id);
CREATE INDEX idx_resumes_profile ON resumes(profile_id);

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

INSERT INTO skills (profile_id, skill_name, category, endorsement_count) VALUES
(1, 'React', 'Frontend', 12),
(1, 'Node.js', 'Backend', 8),
(1, 'PostgreSQL', 'Database', 6),
(1, 'TypeScript', 'Language', 10),
(1, 'Tailwind CSS', 'Frontend', 5);

INSERT INTO timeline_items (profile_id, title, company, description, start_date, end_date, is_current) VALUES
(1, 'Senior Full Stack Developer', 'Tech Corp', 'Led development of customer-facing web applications serving 100K+ users. Implemented CI/CD pipelines and mentored junior developers.', '2022-01-01', NULL, true),
(1, 'Full Stack Developer', 'StartUp Inc', 'Built scalable microservices architecture. Reduced API response time by 60% through optimization.', '2020-03-01', '2021-12-31', false),
(1, 'Junior Developer', 'WebDev Co', 'Developed responsive web applications using React and Node.js. Collaborated with design team on UX improvements.', '2018-06-01', '2020-02-28', false);

INSERT INTO social_links (profile_id, platform, url, icon) VALUES
(1, 'GitHub', 'https://github.com/johndoe', 'github'),
(1, 'LinkedIn', 'https://linkedin.com/in/johndoe', 'linkedin'),
(1, 'Twitter', 'https://twitter.com/johndoe', 'twitter');

INSERT INTO education (profile_id, degree, institution, field_of_study, start_year, end_year, description) VALUES
(1, 'Bachelor of Science', 'Stanford University', 'Computer Science', 2014, 2018, 'Focus on software engineering and algorithms. GPA: 3.8/4.0');

INSERT INTO career_vision (profile_id, current_role, long_term_aspiration, target_field, inspiration, current_focus) VALUES
(1, 'Building scalable web applications and leading a small team of developers', 'Become a Principal Engineer or Engineering Manager at a leading tech company', 'Cloud Infrastructure & Distributed Systems', 'Inspired by the impact of technology on solving real-world problems', 'Learning Kubernetes and system design patterns');

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at 
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_career_vision_updated_at 
BEFORE UPDATE ON career_vision
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_education_updated_at 
BEFORE UPDATE ON education
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
