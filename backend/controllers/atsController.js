import pool from '../config/database.js';

export const atsController = {
  // Analyze resume for ATS compatibility
  async analyzeResume(req, res) {
    const { profileId, resumeText, targetRole } = req.body;

    if (!resumeText) {
      return res.status(400).json({ error: 'Resume text is required' });
    }

    try {
      const analysis = performATSAnalysis(resumeText, targetRole);
      
      res.json(analysis);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      res.status(500).json({ error: 'Failed to analyze resume' });
    }
  },

  // Save resume
  async saveResume(req, res) {
    const profileId = req.params.id;
    const { file_url, file_name, ats_analysis } = req.body;

    if (!file_url || !file_name) {
      return res.status(400).json({ error: 'File URL and name are required' });
    }

    try {
      const result = await pool.query(
        `INSERT INTO resumes (profile_id, file_url, file_name, ats_analysis)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [profileId, file_url, file_name, ats_analysis ? JSON.stringify(ats_analysis) : null]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error saving resume:', error);
      res.status(500).json({ error: 'Failed to save resume' });
    }
  },

  // Get latest resume
  async getResume(req, res) {
    const profileId = req.params.id;

    try {
      const result = await pool.query(
        'SELECT * FROM resumes WHERE profile_id = $1 ORDER BY uploaded_at DESC LIMIT 1',
        [profileId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'No resume found' });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching resume:', error);
      res.status(500).json({ error: 'Failed to fetch resume' });
    }
  }
};

// Helper function to perform ATS analysis
function performATSAnalysis(resumeText, targetRole = '') {
  const text = resumeText.toLowerCase();
  
  // Define keyword sets for different roles
  const techKeywords = [
    'javascript', 'python', 'java', 'react', 'node.js', 'angular', 'vue',
    'typescript', 'sql', 'nosql', 'mongodb', 'postgresql', 'mysql',
    'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'ci/cd',
    'agile', 'scrum', 'git', 'rest api', 'graphql', 'microservices',
    'html', 'css', 'sass', 'webpack', 'babel', 'jest', 'testing'
  ];

  const softSkills = [
    'leadership', 'communication', 'teamwork', 'problem-solving',
    'collaboration', 'analytical', 'creative', 'adaptable',
    'mentoring', 'project management', 'time management'
  ];

  const actionVerbs = [
    'led', 'developed', 'created', 'implemented', 'designed',
    'managed', 'built', 'architected', 'improved', 'optimized',
    'reduced', 'increased', 'launched', 'delivered', 'collaborated'
  ];

  // Count keywords found
  let foundTechKeywords = techKeywords.filter(keyword => text.includes(keyword));
  let foundSoftSkills = softSkills.filter(skill => text.includes(skill));
  let foundActionVerbs = actionVerbs.filter(verb => text.includes(verb));

  // Check for common issues
  const issues = [];
  const suggestions = [];
  const missingKeywords = [];

  // Check for measurable achievements
  const hasNumbers = /\d+%|\d+\+|$\d+|x\d+/.test(resumeText);
  if (!hasNumbers) {
    issues.push('No quantifiable achievements detected');
    suggestions.push('Add metrics and numbers to quantify your impact (e.g., "Increased performance by 40%")');
  }

  // Check for action verbs
  if (foundActionVerbs.length < 5) {
    issues.push('Limited use of strong action verbs');
    suggestions.push('Use more action verbs to start your bullet points (Led, Developed, Implemented, etc.)');
  }

  // Check for soft skills
  if (foundSoftSkills.length < 3) {
    issues.push('Few soft skills mentioned');
    suggestions.push('Include soft skills like leadership, communication, and teamwork');
  }

  // Check resume length (approximate word count)
  const wordCount = resumeText.split(/\s+/).length;
  if (wordCount < 200) {
    issues.push('Resume appears too short');
    suggestions.push('Add more detail about your experiences and achievements');
  } else if (wordCount > 1000) {
    issues.push('Resume might be too long');
    suggestions.push('Consider condensing to highlight only the most relevant experiences');
  }

  // Check for common formatting issues
  if (!/email|@/.test(text)) {
    issues.push('Email address not detected');
    suggestions.push('Ensure your email is clearly visible');
  }

  if (!/phone|mobile|tel|\d{3}[-.]?\d{3}[-.]?\d{4}/.test(text)) {
    issues.push('Phone number not detected');
    suggestions.push('Include a phone number for contact');
  }

  // Suggest missing technical keywords based on found keywords
  const categoryKeywords = {
    'Frontend': ['react', 'vue', 'angular', 'html', 'css', 'javascript', 'typescript'],
    'Backend': ['node.js', 'python', 'java', 'express', 'django', 'spring'],
    'Database': ['sql', 'postgresql', 'mongodb', 'mysql', 'redis'],
    'DevOps': ['docker', 'kubernetes', 'ci/cd', 'aws', 'azure', 'jenkins'],
    'Testing': ['jest', 'mocha', 'cypress', 'selenium', 'unit testing']
  };

  // Find missing keywords from categories where user has some keywords
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    const hasKeywordsInCategory = keywords.some(k => foundTechKeywords.includes(k));
    if (hasKeywordsInCategory) {
      const missing = keywords.filter(k => !foundTechKeywords.includes(k));
      if (missing.length > 0 && missing.length <= 3) {
        missingKeywords.push(...missing.slice(0, 2));
      }
    }
  }

  // Calculate ATS score (0-100)
  let score = 50; // Base score

  // Add points for keywords
  score += Math.min(foundTechKeywords.length * 2, 20);
  score += Math.min(foundSoftSkills.length * 2, 10);
  score += Math.min(foundActionVerbs.length, 10);

  // Add points for quantifiable achievements
  if (hasNumbers) score += 10;

  // Deduct points for issues
  score -= issues.length * 2;

  // Ensure score is between 0 and 100
  score = Math.max(0, Math.min(100, score));

  return {
    score: Math.round(score),
    foundKeywords: {
      technical: foundTechKeywords.slice(0, 10),
      softSkills: foundSoftSkills.slice(0, 5),
      actionVerbs: foundActionVerbs.slice(0, 5)
    },
    missingKeywords: missingKeywords.slice(0, 5),
    issues,
    suggestions,
    summary: getScoreSummary(score)
  };
}

function getScoreSummary(score) {
  if (score >= 80) {
    return 'Excellent! Your resume is well-optimized for ATS systems.';
  } else if (score >= 60) {
    return 'Good! Your resume should pass most ATS systems with some improvements.';
  } else if (score >= 40) {
    return 'Fair. Consider adding more keywords and quantifiable achievements.';
  } else {
    return 'Needs improvement. Add more relevant keywords, metrics, and professional formatting.';
  }
}