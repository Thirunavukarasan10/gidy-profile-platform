import pool from '../config/database.js';

export const profileController = {
  // Get profile with all related data
  async getProfile(req, res) {
    const profileId = req.params.id || 1;

    try {
      // Get profile
      const profileResult = await pool.query(
        'SELECT * FROM profiles WHERE id = $1',
        [profileId]
      );

      if (profileResult.rows.length === 0) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      const profile = profileResult.rows[0];

      // Get skills
      const skillsResult = await pool.query(
        'SELECT * FROM skills WHERE profile_id = $1 ORDER BY endorsement_count DESC',
        [profileId]
      );

      // Get timeline items
      const timelineResult = await pool.query(
        'SELECT * FROM timeline_items WHERE profile_id = $1 ORDER BY sort_order ASC, start_date DESC',
        [profileId]
      );

      // Get social links
      const socialLinksResult = await pool.query(
        'SELECT * FROM social_links WHERE profile_id = $1',
        [profileId]
      );

      // Get achievements
      const achievementsResult = await pool.query(
        'SELECT * FROM achievement_unlocks WHERE profile_id = $1 ORDER BY unlocked_at DESC',
        [profileId]
      );

      res.json({
        profile,
        skills: skillsResult.rows,
        timeline: timelineResult.rows,
        socialLinks: socialLinksResult.rows,
        achievements: achievementsResult.rows
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  },

  // Update profile
  async updateProfile(req, res) {
    const profileId = req.params.id || 1;
    const {
      first_name,
      last_name,
      bio,
      title,
      email,
      location,
      profile_picture_url,
      theme_preference
    } = req.body;

    try {
      const result = await pool.query(
        `UPDATE profiles 
         SET first_name = COALESCE($1, first_name),
             last_name = COALESCE($2, last_name),
             bio = COALESCE($3, bio),
             title = COALESCE($4, title),
             email = COALESCE($5, email),
             location = COALESCE($6, location),
             profile_picture_url = COALESCE($7, profile_picture_url),
             theme_preference = COALESCE($8, theme_preference),
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $9
         RETURNING *`,
        [first_name, last_name, bio, title, email, location, profile_picture_url, theme_preference, profileId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      // Check for achievements
      await checkAndUnlockAchievements(profileId);

      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Failed to update profile' });
    }
  },

  // Add skill
  async addSkill(req, res) {
    const profileId = req.params.id || 1;
    const { skill_name, category } = req.body;

    if (!skill_name) {
      return res.status(400).json({ error: 'Skill name is required' });
    }

    try {
      const result = await pool.query(
        'INSERT INTO skills (profile_id, skill_name, category, endorsement_count) VALUES ($1, $2, $3, 0) RETURNING *',
        [profileId, skill_name, category || 'General']
      );

      // Check for achievements
      await checkAndUnlockAchievements(profileId);

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error adding skill:', error);
      res.status(500).json({ error: 'Failed to add skill' });
    }
  },

  // Update skill
  async updateSkill(req, res) {
    const { skillId } = req.params;
    const { skill_name, category } = req.body;

    try {
      const result = await pool.query(
        'UPDATE skills SET skill_name = COALESCE($1, skill_name), category = COALESCE($2, category) WHERE id = $3 RETURNING *',
        [skill_name, category, skillId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Skill not found' });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating skill:', error);
      res.status(500).json({ error: 'Failed to update skill' });
    }
  },

  // Delete skill
  async deleteSkill(req, res) {
    const { skillId } = req.params;

    try {
      const result = await pool.query('DELETE FROM skills WHERE id = $1 RETURNING *', [skillId]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Skill not found' });
      }

      res.json({ message: 'Skill deleted successfully' });
    } catch (error) {
      console.error('Error deleting skill:', error);
      res.status(500).json({ error: 'Failed to delete skill' });
    }
  },

  // Endorse skill
  async endorseSkill(req, res) {
    const { skillId } = req.params;
    const sessionId = req.headers['x-session-id'] || req.ip;

    try {
      // Check if already endorsed
      const existingEndorsement = await pool.query(
        'SELECT * FROM skill_endorsements WHERE skill_id = $1 AND endorser_session = $2',
        [skillId, sessionId]
      );

      if (existingEndorsement.rows.length > 0) {
        return res.status(400).json({ error: 'Already endorsed this skill' });
      }

      // Add endorsement
      await pool.query(
        'INSERT INTO skill_endorsements (skill_id, endorser_session, endorser_ip) VALUES ($1, $2, $3)',
        [skillId, sessionId, req.ip]
      );

      // Increment endorsement count
      const result = await pool.query(
        'UPDATE skills SET endorsement_count = endorsement_count + 1 WHERE id = $1 RETURNING *',
        [skillId]
      );

      // Get profile_id for achievement check
      const skill = result.rows[0];
      const profileResult = await pool.query('SELECT profile_id FROM skills WHERE id = $1', [skillId]);
      await checkAndUnlockAchievements(profileResult.rows[0].profile_id);

      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error endorsing skill:', error);
      res.status(500).json({ error: 'Failed to endorse skill' });
    }
  },

  // Add timeline item
  async addTimelineItem(req, res) {
    const profileId = req.params.id || 1;
    const { title, company, description, start_date, end_date, is_current, type } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    try {
      // Get max sort_order
      const maxOrderResult = await pool.query(
        'SELECT COALESCE(MAX(sort_order), 0) as max_order FROM timeline_items WHERE profile_id = $1',
        [profileId]
      );
      const nextOrder = maxOrderResult.rows[0].max_order + 1;

      const result = await pool.query(
        `INSERT INTO timeline_items 
         (profile_id, title, company, description, start_date, end_date, is_current, type, sort_order) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [profileId, title, company, description, start_date, end_date, is_current || false, type || 'work', nextOrder]
      );

      // Check for achievements
      await checkAndUnlockAchievements(profileId);

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error adding timeline item:', error);
      res.status(500).json({ error: 'Failed to add timeline item' });
    }
  },

  // Update timeline item
  async updateTimelineItem(req, res) {
    const { itemId } = req.params;
    const { title, company, description, start_date, end_date, is_current, type } = req.body;

    try {
      const result = await pool.query(
        `UPDATE timeline_items 
         SET title = COALESCE($1, title),
             company = COALESCE($2, company),
             description = COALESCE($3, description),
             start_date = COALESCE($4, start_date),
             end_date = COALESCE($5, end_date),
             is_current = COALESCE($6, is_current),
             type = COALESCE($7, type)
         WHERE id = $8 RETURNING *`,
        [title, company, description, start_date, end_date, is_current, type, itemId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Timeline item not found' });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating timeline item:', error);
      res.status(500).json({ error: 'Failed to update timeline item' });
    }
  },

  // Delete timeline item
  async deleteTimelineItem(req, res) {
    const { itemId } = req.params;

    try {
      const result = await pool.query('DELETE FROM timeline_items WHERE id = $1 RETURNING *', [itemId]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Timeline item not found' });
      }

      res.json({ message: 'Timeline item deleted successfully' });
    } catch (error) {
      console.error('Error deleting timeline item:', error);
      res.status(500).json({ error: 'Failed to delete timeline item' });
    }
  },

  // Add social link
  async addSocialLink(req, res) {
    const profileId = req.params.id || 1;
    const { platform, url, icon } = req.body;

    if (!platform || !url) {
      return res.status(400).json({ error: 'Platform and URL are required' });
    }

    try {
      const result = await pool.query(
        'INSERT INTO social_links (profile_id, platform, url, icon) VALUES ($1, $2, $3, $4) RETURNING *',
        [profileId, platform, url, icon || platform.toLowerCase()]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error adding social link:', error);
      res.status(500).json({ error: 'Failed to add social link' });
    }
  },

  // Update social link
  async updateSocialLink(req, res) {
    const { linkId } = req.params;
    const { platform, url, icon } = req.body;

    try {
      const result = await pool.query(
        'UPDATE social_links SET platform = COALESCE($1, platform), url = COALESCE($2, url), icon = COALESCE($3, icon) WHERE id = $4 RETURNING *',
        [platform, url, icon, linkId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Social link not found' });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating social link:', error);
      res.status(500).json({ error: 'Failed to update social link' });
    }
  },

  // Delete social link
  async deleteSocialLink(req, res) {
    const { linkId } = req.params;

    try {
      const result = await pool.query('DELETE FROM social_links WHERE id = $1 RETURNING *', [linkId]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Social link not found' });
      }

      res.json({ message: 'Social link deleted successfully' });
    } catch (error) {
      console.error('Error deleting social link:', error);
      res.status(500).json({ error: 'Failed to delete social link' });
    }
  }
};

// Helper function to check and unlock achievements
async function checkAndUnlockAchievements(profileId) {
  try {
    const achievements = [];

    // Get current profile data
    const profileData = await pool.query(
      `SELECT 
        p.*,
        (SELECT COUNT(*) FROM skills WHERE profile_id = p.id) as skill_count,
        (SELECT COUNT(*) FROM timeline_items WHERE profile_id = p.id) as timeline_count,
        (SELECT COUNT(*) FROM social_links WHERE profile_id = p.id) as social_count,
        (SELECT SUM(endorsement_count) FROM skills WHERE profile_id = p.id) as total_endorsements
      FROM profiles p WHERE id = $1`,
      [profileId]
    );

    const data = profileData.rows[0];

    // Achievement: Profile Complete
    if (data.first_name && data.last_name && data.bio && data.title) {
      achievements.push({
        key: 'profile_complete',
        name: 'Profile Perfectionist',
        description: 'Completed all basic profile information'
      });
    }

    // Achievement: Skilled Professional (5+ skills)
    if (data.skill_count >= 5) {
      achievements.push({
        key: 'skilled_professional',
        name: 'Skilled Professional',
        description: 'Added 5 or more skills to your profile'
      });
    }

    // Achievement: Career Builder (3+ timeline items)
    if (data.timeline_count >= 3) {
      achievements.push({
        key: 'career_builder',
        name: 'Career Builder',
        description: 'Added 3 or more experiences to your timeline'
      });
    }

    // Achievement: Social Butterfly (3+ social links)
    if (data.social_count >= 3) {
      achievements.push({
        key: 'social_butterfly',
        name: 'Social Butterfly',
        description: 'Connected 3 or more social profiles'
      });
    }

    // Achievement: Highly Endorsed (10+ total endorsements)
    if (data.total_endorsements >= 10) {
      achievements.push({
        key: 'highly_endorsed',
        name: 'Highly Endorsed',
        description: 'Received 10 or more skill endorsements'
      });
    }

    // Achievement: Expert Level (50+ total endorsements)
    if (data.total_endorsements >= 50) {
      achievements.push({
        key: 'expert_level',
        name: 'Expert Level',
        description: 'Received 50 or more skill endorsements'
      });
    }

    // Insert new achievements
    for (const achievement of achievements) {
      await pool.query(
        `INSERT INTO achievement_unlocks (profile_id, achievement_key, achievement_name, achievement_description)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (profile_id, achievement_key) DO NOTHING`,
        [profileId, achievement.key, achievement.name, achievement.description]
      );
    }
  } catch (error) {
    console.error('Error checking achievements:', error);
  }
}
