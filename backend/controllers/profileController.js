// // import pool from '../config/database.js';

// // export const profileController = {
// //   // Get profile with all related data
// //   async getProfile(req, res) {
// //     const profileId = req.params.id || 1;

// //     try {
// //       // Get profile
// //       const profileResult = await pool.query(
// //         'SELECT * FROM profiles WHERE id = $1',
// //         [profileId]
// //       );

// //       if (profileResult.rows.length === 0) {
// //         return res.status(404).json({ error: 'Profile not found' });
// //       }

// //       const profile = profileResult.rows[0];

// //       // Get skills
// //       const skillsResult = await pool.query(
// //         'SELECT * FROM skills WHERE profile_id = $1 ORDER BY endorsement_count DESC',
// //         [profileId]
// //       );

// //       // Get timeline items
// //       const timelineResult = await pool.query(
// //         'SELECT * FROM timeline_items WHERE profile_id = $1 ORDER BY sort_order ASC, start_date DESC',
// //         [profileId]
// //       );

// //       // Get social links
// //       const socialLinksResult = await pool.query(
// //         'SELECT * FROM social_links WHERE profile_id = $1',
// //         [profileId]
// //       );

// //       // Get achievements
// //       const achievementsResult = await pool.query(
// //         'SELECT * FROM achievement_unlocks WHERE profile_id = $1 ORDER BY unlocked_at DESC',
// //         [profileId]
// //       );

// //       res.json({
// //         profile,
// //         skills: skillsResult.rows,
// //         timeline: timelineResult.rows,
// //         socialLinks: socialLinksResult.rows,
// //         achievements: achievementsResult.rows
// //       });
// //     } catch (error) {
// //       console.error('Error fetching profile:', error);
// //       res.status(500).json({ error: 'Failed to fetch profile' });
// //     }
// //   },

// //   // Update profile
// //   async updateProfile(req, res) {
// //     const profileId = req.params.id || 1;
// //     const {
// //       first_name,
// //       last_name,
// //       bio,
// //       title,
// //       email,
// //       location,
// //       profile_picture_url,
// //       theme_preference
// //     } = req.body;

// //     try {
// //       const result = await pool.query(
// //         `UPDATE profiles 
// //          SET first_name = COALESCE($1, first_name),
// //              last_name = COALESCE($2, last_name),
// //              bio = COALESCE($3, bio),
// //              title = COALESCE($4, title),
// //              email = COALESCE($5, email),
// //              location = COALESCE($6, location),
// //              profile_picture_url = COALESCE($7, profile_picture_url),
// //              theme_preference = COALESCE($8, theme_preference),
// //              updated_at = CURRENT_TIMESTAMP
// //          WHERE id = $9
// //          RETURNING *`,
// //         [first_name, last_name, bio, title, email, location, profile_picture_url, theme_preference, profileId]
// //       );

// //       if (result.rows.length === 0) {
// //         return res.status(404).json({ error: 'Profile not found' });
// //       }

// //       // Check for achievements
// //       await checkAndUnlockAchievements(profileId);

// //       res.json(result.rows[0]);
// //     } catch (error) {
// //       console.error('Error updating profile:', error);
// //       res.status(500).json({ error: 'Failed to update profile' });
// //     }
// //   },

// //   // Add skill
// //   async addSkill(req, res) {
// //     const profileId = req.params.id || 1;
// //     const { skill_name, category } = req.body;

// //     if (!skill_name) {
// //       return res.status(400).json({ error: 'Skill name is required' });
// //     }

// //     try {
// //       const result = await pool.query(
// //         'INSERT INTO skills (profile_id, skill_name, category, endorsement_count) VALUES ($1, $2, $3, 0) RETURNING *',
// //         [profileId, skill_name, category || 'General']
// //       );

// //       // Check for achievements
// //       await checkAndUnlockAchievements(profileId);

// //       res.status(201).json(result.rows[0]);
// //     } catch (error) {
// //       console.error('Error adding skill:', error);
// //       res.status(500).json({ error: 'Failed to add skill' });
// //     }
// //   },

// //   // Update skill
// //   async updateSkill(req, res) {
// //     const { skillId } = req.params;
// //     const { skill_name, category } = req.body;

// //     try {
// //       const result = await pool.query(
// //         'UPDATE skills SET skill_name = COALESCE($1, skill_name), category = COALESCE($2, category) WHERE id = $3 RETURNING *',
// //         [skill_name, category, skillId]
// //       );

// //       if (result.rows.length === 0) {
// //         return res.status(404).json({ error: 'Skill not found' });
// //       }

// //       res.json(result.rows[0]);
// //     } catch (error) {
// //       console.error('Error updating skill:', error);
// //       res.status(500).json({ error: 'Failed to update skill' });
// //     }
// //   },

// //   // Delete skill
// //   async deleteSkill(req, res) {
// //     const { skillId } = req.params;

// //     try {
// //       const result = await pool.query('DELETE FROM skills WHERE id = $1 RETURNING *', [skillId]);

// //       if (result.rows.length === 0) {
// //         return res.status(404).json({ error: 'Skill not found' });
// //       }

// //       res.json({ message: 'Skill deleted successfully' });
// //     } catch (error) {
// //       console.error('Error deleting skill:', error);
// //       res.status(500).json({ error: 'Failed to delete skill' });
// //     }
// //   },

// //   // Endorse skill
// //   async endorseSkill(req, res) {
// //     const { skillId } = req.params;
// //     const sessionId = req.headers['x-session-id'] || req.ip;

// //     try {
// //       // Check if already endorsed
// //       const existingEndorsement = await pool.query(
// //         'SELECT * FROM skill_endorsements WHERE skill_id = $1 AND endorser_session = $2',
// //         [skillId, sessionId]
// //       );

// //       if (existingEndorsement.rows.length > 0) {
// //         return res.status(400).json({ error: 'Already endorsed this skill' });
// //       }

// //       // Add endorsement
// //       await pool.query(
// //         'INSERT INTO skill_endorsements (skill_id, endorser_session, endorser_ip) VALUES ($1, $2, $3)',
// //         [skillId, sessionId, req.ip]
// //       );

// //       // Increment endorsement count
// //       const result = await pool.query(
// //         'UPDATE skills SET endorsement_count = endorsement_count + 1 WHERE id = $1 RETURNING *',
// //         [skillId]
// //       );

// //       // Get profile_id for achievement check
// //       const skill = result.rows[0];
// //       const profileResult = await pool.query('SELECT profile_id FROM skills WHERE id = $1', [skillId]);
// //       await checkAndUnlockAchievements(profileResult.rows[0].profile_id);

// //       res.json(result.rows[0]);
// //     } catch (error) {
// //       console.error('Error endorsing skill:', error);
// //       res.status(500).json({ error: 'Failed to endorse skill' });
// //     }
// //   },

// //   // Add timeline item
// //   async addTimelineItem(req, res) {
// //     const profileId = req.params.id || 1;
// //     const { title, company, description, start_date, end_date, is_current, type } = req.body;

// //     if (!title) {
// //       return res.status(400).json({ error: 'Title is required' });
// //     }

// //     try {
// //       // Get max sort_order
// //       const maxOrderResult = await pool.query(
// //         'SELECT COALESCE(MAX(sort_order), 0) as max_order FROM timeline_items WHERE profile_id = $1',
// //         [profileId]
// //       );
// //       const nextOrder = maxOrderResult.rows[0].max_order + 1;

// //       const result = await pool.query(
// //         `INSERT INTO timeline_items 
// //          (profile_id, title, company, description, start_date, end_date, is_current, type, sort_order) 
// //          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
// //         [profileId, title, company, description, start_date, end_date, is_current || false, type || 'work', nextOrder]
// //       );

// //       // Check for achievements
// //       await checkAndUnlockAchievements(profileId);

// //       res.status(201).json(result.rows[0]);
// //     } catch (error) {
// //       console.error('Error adding timeline item:', error);
// //       res.status(500).json({ error: 'Failed to add timeline item' });
// //     }
// //   },

// //   // Update timeline item
// //   async updateTimelineItem(req, res) {
// //     const { itemId } = req.params;
// //     const { title, company, description, start_date, end_date, is_current, type } = req.body;

// //     try {
// //       const result = await pool.query(
// //         `UPDATE timeline_items 
// //          SET title = COALESCE($1, title),
// //              company = COALESCE($2, company),
// //              description = COALESCE($3, description),
// //              start_date = COALESCE($4, start_date),
// //              end_date = COALESCE($5, end_date),
// //              is_current = COALESCE($6, is_current),
// //              type = COALESCE($7, type)
// //          WHERE id = $8 RETURNING *`,
// //         [title, company, description, start_date, end_date, is_current, type, itemId]
// //       );

// //       if (result.rows.length === 0) {
// //         return res.status(404).json({ error: 'Timeline item not found' });
// //       }

// //       res.json(result.rows[0]);
// //     } catch (error) {
// //       console.error('Error updating timeline item:', error);
// //       res.status(500).json({ error: 'Failed to update timeline item' });
// //     }
// //   },

// //   // Delete timeline item
// //   async deleteTimelineItem(req, res) {
// //     const { itemId } = req.params;

// //     try {
// //       const result = await pool.query('DELETE FROM timeline_items WHERE id = $1 RETURNING *', [itemId]);

// //       if (result.rows.length === 0) {
// //         return res.status(404).json({ error: 'Timeline item not found' });
// //       }

// //       res.json({ message: 'Timeline item deleted successfully' });
// //     } catch (error) {
// //       console.error('Error deleting timeline item:', error);
// //       res.status(500).json({ error: 'Failed to delete timeline item' });
// //     }
// //   },

// //   // Add social link
// //   async addSocialLink(req, res) {
// //     const profileId = req.params.id || 1;
// //     const { platform, url, icon } = req.body;

// //     if (!platform || !url) {
// //       return res.status(400).json({ error: 'Platform and URL are required' });
// //     }

// //     try {
// //       const result = await pool.query(
// //         'INSERT INTO social_links (profile_id, platform, url, icon) VALUES ($1, $2, $3, $4) RETURNING *',
// //         [profileId, platform, url, icon || platform.toLowerCase()]
// //       );

// //       res.status(201).json(result.rows[0]);
// //     } catch (error) {
// //       console.error('Error adding social link:', error);
// //       res.status(500).json({ error: 'Failed to add social link' });
// //     }
// //   },

// //   // Update social link
// //   async updateSocialLink(req, res) {
// //     const { linkId } = req.params;
// //     const { platform, url, icon } = req.body;

// //     try {
// //       const result = await pool.query(
// //         'UPDATE social_links SET platform = COALESCE($1, platform), url = COALESCE($2, url), icon = COALESCE($3, icon) WHERE id = $4 RETURNING *',
// //         [platform, url, icon, linkId]
// //       );

// //       if (result.rows.length === 0) {
// //         return res.status(404).json({ error: 'Social link not found' });
// //       }

// //       res.json(result.rows[0]);
// //     } catch (error) {
// //       console.error('Error updating social link:', error);
// //       res.status(500).json({ error: 'Failed to update social link' });
// //     }
// //   },

// //   // Delete social link
// //   async deleteSocialLink(req, res) {
// //     const { linkId } = req.params;

// //     try {
// //       const result = await pool.query('DELETE FROM social_links WHERE id = $1 RETURNING *', [linkId]);

// //       if (result.rows.length === 0) {
// //         return res.status(404).json({ error: 'Social link not found' });
// //       }

// //       res.json({ message: 'Social link deleted successfully' });
// //     } catch (error) {
// //       console.error('Error deleting social link:', error);
// //       res.status(500).json({ error: 'Failed to delete social link' });
// //     }
// //   }
// // };

// // // Helper function to check and unlock achievements
// // async function checkAndUnlockAchievements(profileId) {
// //   try {
// //     const achievements = [];

// //     // Get current profile data
// //     const profileData = await pool.query(
// //       `SELECT 
// //         p.*,
// //         (SELECT COUNT(*) FROM skills WHERE profile_id = p.id) as skill_count,
// //         (SELECT COUNT(*) FROM timeline_items WHERE profile_id = p.id) as timeline_count,
// //         (SELECT COUNT(*) FROM social_links WHERE profile_id = p.id) as social_count,
// //         (SELECT SUM(endorsement_count) FROM skills WHERE profile_id = p.id) as total_endorsements
// //       FROM profiles p WHERE id = $1`,
// //       [profileId]
// //     );

// //     const data = profileData.rows[0];

// //     // Achievement: Profile Complete
// //     if (data.first_name && data.last_name && data.bio && data.title) {
// //       achievements.push({
// //         key: 'profile_complete',
// //         name: 'Profile Perfectionist',
// //         description: 'Completed all basic profile information'
// //       });
// //     }

// //     // Achievement: Skilled Professional (5+ skills)
// //     if (data.skill_count >= 5) {
// //       achievements.push({
// //         key: 'skilled_professional',
// //         name: 'Skilled Professional',
// //         description: 'Added 5 or more skills to your profile'
// //       });
// //     }

// //     // Achievement: Career Builder (3+ timeline items)
// //     if (data.timeline_count >= 3) {
// //       achievements.push({
// //         key: 'career_builder',
// //         name: 'Career Builder',
// //         description: 'Added 3 or more experiences to your timeline'
// //       });
// //     }

// //     // Achievement: Social Butterfly (3+ social links)
// //     if (data.social_count >= 3) {
// //       achievements.push({
// //         key: 'social_butterfly',
// //         name: 'Social Butterfly',
// //         description: 'Connected 3 or more social profiles'
// //       });
// //     }

// //     // Achievement: Highly Endorsed (10+ total endorsements)
// //     if (data.total_endorsements >= 10) {
// //       achievements.push({
// //         key: 'highly_endorsed',
// //         name: 'Highly Endorsed',
// //         description: 'Received 10 or more skill endorsements'
// //       });
// //     }

// //     // Achievement: Expert Level (50+ total endorsements)
// //     if (data.total_endorsements >= 50) {
// //       achievements.push({
// //         key: 'expert_level',
// //         name: 'Expert Level',
// //         description: 'Received 50 or more skill endorsements'
// //       });
// //     }

// //     // Insert new achievements
// //     for (const achievement of achievements) {
// //       await pool.query(
// //         `INSERT INTO achievement_unlocks (profile_id, achievement_key, achievement_name, achievement_description)
// //          VALUES ($1, $2, $3, $4)
// //          ON CONFLICT (profile_id, achievement_key) DO NOTHING`,
// //         [profileId, achievement.key, achievement.name, achievement.description]
// //       );
// //     }
// //   } catch (error) {
// //     console.error('Error checking achievements:', error);
// //   }
// // }
// import pool from '../config/database.js';

// export const profileController = {
//   // Get profile with all related data
//   async getProfile(req, res) {
//     const profileId = req.params.id || 1;

//     try {
//       // Get profile
//       const profileResult = await pool.query(
//         'SELECT * FROM profiles WHERE id = $1',
//         [profileId]
//       );

//       if (profileResult.rows.length === 0) {
//         return res.status(404).json({ error: 'Profile not found' });
//       }

//       const profile = profileResult.rows[0];

//       // Get skills
//       const skillsResult = await pool.query(
//         'SELECT * FROM skills WHERE profile_id = $1 ORDER BY endorsement_count DESC',
//         [profileId]
//       );

//       // Get timeline items
//       const timelineResult = await pool.query(
//         'SELECT * FROM timeline_items WHERE profile_id = $1 ORDER BY start_date DESC',
//         [profileId]
//       );

//       // Get social links
//       const socialLinksResult = await pool.query(
//         'SELECT * FROM social_links WHERE profile_id = $1',
//         [profileId]
//       );

//       // Get achievements
//       const achievementsResult = await pool.query(
//         'SELECT * FROM achievement_unlocks WHERE profile_id = $1 ORDER BY unlocked_at DESC',
//         [profileId]
//       );

//       res.json({
//         profile,
//         skills: skillsResult.rows,
//         timeline: timelineResult.rows,
//         socialLinks: socialLinksResult.rows,
//         achievements: achievementsResult.rows
//       });
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//       res.status(500).json({ error: 'Failed to fetch profile' });
//     }
//   },

//   // Update profile
//   async updateProfile(req, res) {
//     const profileId = req.params.id;
//     const {
//       first_name,
//       last_name,
//       bio,
//       title,
//       email,
//       location,
//       profile_picture_url,
//       theme_preference
//     } = req.body;

//     try {
//       const result = await pool.query(
//         `UPDATE profiles 
//          SET first_name = COALESCE($1, first_name),
//              last_name = COALESCE($2, last_name),
//              bio = COALESCE($3, bio),
//              title = COALESCE($4, title),
//              email = COALESCE($5, email),
//              location = COALESCE($6, location),
//              profile_picture_url = COALESCE($7, profile_picture_url),
//              theme_preference = COALESCE($8, theme_preference),
//              updated_at = CURRENT_TIMESTAMP
//          WHERE id = $9
//          RETURNING *`,
//         [first_name, last_name, bio, title, email, location, profile_picture_url, theme_preference, profileId]
//       );

//       if (result.rows.length === 0) {
//         return res.status(404).json({ error: 'Profile not found' });
//       }

//       // Check for achievements
//       await checkAndUnlockAchievements(profileId);

//       res.json(result.rows[0]);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       res.status(500).json({ error: 'Failed to update profile' });
//     }
//   },

//   // Add skill
//   async addSkill(req, res) {
//     const profileId = req.params.id;
//     const { skill_name, category } = req.body;

//     if (!skill_name) {
//       return res.status(400).json({ error: 'Skill name is required' });
//     }

//     try {
//       const result = await pool.query(
//         'INSERT INTO skills (profile_id, skill_name, category, endorsement_count) VALUES ($1, $2, $3, 0) RETURNING *',
//         [profileId, skill_name, category || 'General']
//       );

//       // Check for achievements
//       await checkAndUnlockAchievements(profileId);

//       res.status(201).json(result.rows[0]);
//     } catch (error) {
//       console.error('Error adding skill:', error);
//       res.status(500).json({ error: 'Failed to add skill' });
//     }
//   },

//   // Update skill
//   async updateSkill(req, res) {
//     const { skillId } = req.params;
//     const { skill_name, category } = req.body;

//     try {
//       const result = await pool.query(
//         'UPDATE skills SET skill_name = COALESCE($1, skill_name), category = COALESCE($2, category) WHERE id = $3 RETURNING *',
//         [skill_name, category, skillId]
//       );

//       if (result.rows.length === 0) {
//         return res.status(404).json({ error: 'Skill not found' });
//       }

//       res.json(result.rows[0]);
//     } catch (error) {
//       console.error('Error updating skill:', error);
//       res.status(500).json({ error: 'Failed to update skill' });
//     }
//   },

//   // Delete skill - FIXED to accept profileId
//   async deleteSkill(req, res) {
//     const { skillId, id: profileId } = req.params;

//     try {
//       const result = await pool.query(
//         'DELETE FROM skills WHERE id = $1 AND profile_id = $2 RETURNING *',
//         [skillId, profileId]
//       );

//       if (result.rows.length === 0) {
//         return res.status(404).json({ error: 'Skill not found' });
//       }

//       res.json({ message: 'Skill deleted successfully' });
//     } catch (error) {
//       console.error('Error deleting skill:', error);
//       res.status(500).json({ error: 'Failed to delete skill' });
//     }
//   },

//   // Endorse skill
//   async endorseSkill(req, res) {
//     const { skillId } = req.params;
//     const sessionId = req.headers['x-session-id'] || req.ip;

//     try {
//       // Check if already endorsed
//       const existingEndorsement = await pool.query(
//         'SELECT * FROM skill_endorsements WHERE skill_id = $1 AND endorser_session = $2',
//         [skillId, sessionId]
//       );

//       if (existingEndorsement.rows.length > 0) {
//         return res.status(400).json({ error: 'Already endorsed this skill' });
//       }

//       // Add endorsement
//       await pool.query(
//         'INSERT INTO skill_endorsements (skill_id, endorser_session, endorser_ip) VALUES ($1, $2, $3)',
//         [skillId, sessionId, req.ip]
//       );

//       // Increment endorsement count
//       const result = await pool.query(
//         'UPDATE skills SET endorsement_count = endorsement_count + 1 WHERE id = $1 RETURNING *',
//         [skillId]
//       );

//       // Get profile_id for achievement check
//       const profileResult = await pool.query('SELECT profile_id FROM skills WHERE id = $1', [skillId]);
//       if (profileResult.rows.length > 0) {
//         await checkAndUnlockAchievements(profileResult.rows[0].profile_id);
//       }

//       res.json(result.rows[0]);
//     } catch (error) {
//       console.error('Error endorsing skill:', error);
//       res.status(500).json({ error: 'Failed to endorse skill' });
//     }
//   },

//   // Add timeline item
//   async addTimelineItem(req, res) {
//     const profileId = req.params.id;
//     const { title, company, description, start_date, end_date, is_current, type } = req.body;

//     if (!title || !String(title).trim()) {
//       return res.status(400).json({ error: 'Title is required' });
//     }

//     const startDate = start_date && String(start_date).trim() ? start_date : null;
//     const endDate = end_date && String(end_date).trim() ? end_date : null;

//     try {
//       const result = await pool.query(
//         `INSERT INTO timeline_items 
//          (profile_id, title, company, description, start_date, end_date, is_current, type) 
//          VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
//         [profileId, title.trim(), company || null, description || null, startDate, endDate, Boolean(is_current), type || 'work']
//       );

//       // Check for achievements
//       await checkAndUnlockAchievements(profileId);

//       res.status(201).json(result.rows[0]);
//     } catch (error) {
//       console.error('Error adding timeline item:', error);
//       res.status(500).json({ error: 'Failed to add timeline item' });
//     }
//   },

//   // Update timeline item
//   async updateTimelineItem(req, res) {
//     const { itemId } = req.params;
//     const { title, company, description, start_date, end_date, is_current, type } = req.body;

//     try {
//       const result = await pool.query(
//         `UPDATE timeline_items 
//          SET title = COALESCE($1, title),
//              company = COALESCE($2, company),
//              description = COALESCE($3, description),
//              start_date = COALESCE($4, start_date),
//              end_date = COALESCE($5, end_date),
//              is_current = COALESCE($6, is_current),
//              type = COALESCE($7, type)
//          WHERE id = $8 RETURNING *`,
//         [title, company, description, start_date, end_date, is_current, type, itemId]
//       );

//       if (result.rows.length === 0) {
//         return res.status(404).json({ error: 'Timeline item not found' });
//       }

//       res.json(result.rows[0]);
//     } catch (error) {
//       console.error('Error updating timeline item:', error);
//       res.status(500).json({ error: 'Failed to update timeline item' });
//     }
//   },

//   // Delete timeline item - FIXED to accept profileId
//   async deleteTimelineItem(req, res) {
//     const { itemId, id: profileId } = req.params;

//     try {
//       const result = await pool.query(
//         'DELETE FROM timeline_items WHERE id = $1 AND profile_id = $2 RETURNING *',
//         [itemId, profileId]
//       );

//       if (result.rows.length === 0) {
//         return res.status(404).json({ error: 'Timeline item not found' });
//       }

//       res.json({ message: 'Timeline item deleted successfully' });
//     } catch (error) {
//       console.error('Error deleting timeline item:', error);
//       res.status(500).json({ error: 'Failed to delete timeline item' });
//     }
//   },

//   // Add social link
//   async addSocialLink(req, res) {
//     const profileId = req.params.id;
//     const { platform, url, icon } = req.body;

//     if (!platform || !url) {
//       return res.status(400).json({ error: 'Platform and URL are required' });
//     }

//     try {
//       const result = await pool.query(
//         'INSERT INTO social_links (profile_id, platform, url, icon) VALUES ($1, $2, $3, $4) RETURNING *',
//         [profileId, platform, url, icon || platform.toLowerCase()]
//       );

//       // Check for achievements
//       await checkAndUnlockAchievements(profileId);

//       res.status(201).json(result.rows[0]);
//     } catch (error) {
//       console.error('Error adding social link:', error);
//       res.status(500).json({ error: 'Failed to add social link' });
//     }
//   },

//   // Update social link
//   async updateSocialLink(req, res) {
//     const { linkId } = req.params;
//     const { platform, url, icon } = req.body;

//     try {
//       const result = await pool.query(
//         'UPDATE social_links SET platform = COALESCE($1, platform), url = COALESCE($2, url), icon = COALESCE($3, icon) WHERE id = $4 RETURNING *',
//         [platform, url, icon, linkId]
//       );

//       if (result.rows.length === 0) {
//         return res.status(404).json({ error: 'Social link not found' });
//       }

//       res.json(result.rows[0]);
//     } catch (error) {
//       console.error('Error updating social link:', error);
//       res.status(500).json({ error: 'Failed to update social link' });
//     }
//   },

//   // Delete social link - FIXED to accept profileId
//   async deleteSocialLink(req, res) {
//     const { linkId, id: profileId } = req.params;

//     try {
//       const result = await pool.query(
//         'DELETE FROM social_links WHERE id = $1 AND profile_id = $2 RETURNING *',
//         [linkId, profileId]
//       );

//       if (result.rows.length === 0) {
//         return res.status(404).json({ error: 'Social link not found' });
//       }

//       res.json({ message: 'Social link deleted successfully' });
//     } catch (error) {
//       console.error('Error deleting social link:', error);
//       res.status(500).json({ error: 'Failed to delete social link' });
//     }
//   }
// };

// // Helper function to check and unlock achievements
// async function checkAndUnlockAchievements(profileId) {
//   try {
//     const achievements = [];

//     // Get current profile data
//     const profileData = await pool.query(
//       `SELECT 
//         p.*,
//         (SELECT COUNT(*) FROM skills WHERE profile_id = p.id) as skill_count,
//         (SELECT COUNT(*) FROM timeline_items WHERE profile_id = p.id) as timeline_count,
//         (SELECT COUNT(*) FROM social_links WHERE profile_id = p.id) as social_count,
//         (SELECT COALESCE(SUM(endorsement_count), 0) FROM skills WHERE profile_id = p.id) as total_endorsements
//       FROM profiles p WHERE id = $1`,
//       [profileId]
//     );

//     const data = profileData.rows[0];

//     // Achievement: Profile Complete
//     if (data.first_name && data.last_name && data.bio && data.title) {
//       achievements.push({
//         key: 'profile_complete',
//         name: 'Profile Perfectionist',
//         description: 'Completed all basic profile information'
//       });
//     }

//     // Achievement: Skilled Professional (5+ skills)
//     if (data.skill_count >= 5) {
//       achievements.push({
//         key: 'skilled_professional',
//         name: 'Skilled Professional',
//         description: 'Added 5 or more skills to your profile'
//       });
//     }

//     // Achievement: Career Builder (3+ timeline items)
//     if (data.timeline_count >= 3) {
//       achievements.push({
//         key: 'career_builder',
//         name: 'Career Builder',
//         description: 'Added 3 or more experiences to your timeline'
//       });
//     }

//     // Achievement: Social Butterfly (3+ social links)
//     if (data.social_count >= 3) {
//       achievements.push({
//         key: 'social_butterfly',
//         name: 'Social Butterfly',
//         description: 'Connected 3 or more social profiles'
//       });
//     }

//     // Achievement: Highly Endorsed (10+ total endorsements)
//     if (data.total_endorsements >= 10) {
//       achievements.push({
//         key: 'highly_endorsed',
//         name: 'Highly Endorsed',
//         description: 'Received 10 or more skill endorsements'
//       });
//     }

//     // Achievement: Expert Level (50+ total endorsements)
//     if (data.total_endorsements >= 50) {
//       achievements.push({
//         key: 'expert_level',
//         name: 'Expert Level',
//         description: 'Received 50 or more skill endorsements'
//       });
//     }

//     // Insert new achievements
//     for (const achievement of achievements) {
//       await pool.query(
//         `INSERT INTO achievement_unlocks (profile_id, achievement_key, achievement_name, achievement_description)
//          VALUES ($1, $2, $3, $4)
//          ON CONFLICT (profile_id, achievement_key) DO NOTHING`,
//         [profileId, achievement.key, achievement.name, achievement.description]
//       );
//     }
//   } catch (error) {
//     console.error('Error checking achievements:', error);
//   }
// }



























import pool from '../config/database.js';

export const profileController = {
  // ========================================
  // PROFILE OPERATIONS
  // ========================================
  
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

      // Get all related data in parallel
      const [
        skillsResult,
        timelineResult,
        socialLinksResult,
        achievementsResult,
        educationResult,
        certificatesResult,
        careerVisionResult,
        resumesResult
      ] = await Promise.all([
        pool.query('SELECT * FROM skills WHERE profile_id = $1 ORDER BY endorsement_count DESC', [profileId]),
        pool.query('SELECT * FROM timeline_items WHERE profile_id = $1 ORDER BY start_date DESC NULLS LAST', [profileId]),
        pool.query('SELECT * FROM social_links WHERE profile_id = $1', [profileId]),
        pool.query('SELECT * FROM achievement_unlocks WHERE profile_id = $1 ORDER BY unlocked_at DESC', [profileId]),
        pool.query('SELECT * FROM education WHERE profile_id = $1 ORDER BY start_year DESC NULLS LAST', [profileId]),
        pool.query('SELECT * FROM certificates WHERE profile_id = $1 ORDER BY issue_date DESC NULLS LAST', [profileId]),
        pool.query(`
          SELECT id,
                 profile_id,
                 current_role,
                 long_term_aspiration,
                 target_field,
                 inspiration,
                 current_focus,
                 created_at,
                 updated_at
          FROM career_vision
          WHERE profile_id = $1
        `, [profileId]),
        pool.query('SELECT * FROM resumes WHERE profile_id = $1 ORDER BY uploaded_at DESC LIMIT 1', [profileId])
      ]);

      res.json({
        profile,
        skills: skillsResult.rows,
        timeline: timelineResult.rows,
        socialLinks: socialLinksResult.rows,
        achievements: achievementsResult.rows,
        education: educationResult.rows,
        certificates: certificatesResult.rows,
        careerVision: careerVisionResult.rows[0] || null,
        resume: resumesResult.rows[0] || null
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  },

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

      await checkAndUnlockAchievements(profileId);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Failed to update profile' });
    }
  },

  // ========================================
  // CAREER VISION OPERATIONS
  // ========================================

  async getCareerVision(req, res) {
    const profileId = req.params.id;

    try {
      const result = await pool.query(
        'SELECT * FROM career_vision WHERE profile_id = $1',
        [profileId]
      );
      res.json(result.rows[0] || null);
    } catch (error) {
      console.error('Error fetching career vision:', error);
      res.status(500).json({ error: 'Failed to fetch career vision' });
    }
  },

 async upsertCareerVision(req, res) {
  const profileId = req.params.id;
  const { current_role, target_field, inspiration, current_focus } = req.body;

  try {
    const result = await (
      `INSERT INTO career_vision
       (profile_id, current_role, target_field, inspiration, current_focus)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (profile_id)
       DO UPDATE SET
         current_role = EXCLUDED.current_role,
         target_field = EXCLUDED.target_field,
         inspiration = EXCLUDED.inspiration,
         current_focus = EXCLUDED.current_focus,
         updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [profileId, current_role, target_field, inspiration, current_focus]
    );
    

    await checkAndUnlockAchievements(profileId);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error saving career vision:', error);
    res.status(500).json({ error: 'Failed to save career vision' });
  }
},

  // ========================================
  // EDUCATION OPERATIONS
  // ========================================

  async addEducation(req, res) {
    const profileId = req.params.id;
    const { degree, institution, field_of_study, start_year, end_year, description, is_current } = req.body;

    if (!degree || !institution) {
      return res.status(400).json({ error: 'Degree and institution are required' });
    }

    try {
      const result = await pool.query(
        `INSERT INTO education (profile_id, degree, institution, field_of_study, start_year, end_year, description, is_current)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [profileId, degree, institution, field_of_study, start_year, end_year, description, is_current || false]
      );

      await checkAndUnlockAchievements(profileId);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error adding education:', error);
      res.status(500).json({ error: 'Failed to add education' });
    }
  },

  async updateEducation(req, res) {
    const { educationId } = req.params;
    const { degree, institution, field_of_study, start_year, end_year, description, is_current } = req.body;

    try {
      const result = await pool.query(
        `UPDATE education
         SET degree = COALESCE($1, degree),
             institution = COALESCE($2, institution),
             field_of_study = COALESCE($3, field_of_study),
             start_year = COALESCE($4, start_year),
             end_year = COALESCE($5, end_year),
             description = COALESCE($6, description),
             is_current = COALESCE($7, is_current),
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $8 RETURNING *`,
        [degree, institution, field_of_study, start_year, end_year, description, is_current, educationId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Education not found' });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating education:', error);
      res.status(500).json({ error: 'Failed to update education' });
    }
  },

  async deleteEducation(req, res) {
    const { educationId, id: profileId } = req.params;

    try {
      const result = await pool.query(
        'DELETE FROM education WHERE id = $1 AND profile_id = $2 RETURNING *',
        [educationId, profileId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Education not found' });
      }

      res.json({ message: 'Education deleted successfully' });
    } catch (error) {
      console.error('Error deleting education:', error);
      res.status(500).json({ error: 'Failed to delete education' });
    }
  },

  // ========================================
  // CERTIFICATE OPERATIONS
  // ========================================

  async addCertificate(req, res) {
    const profileId = req.params.id;
    const { title, issuer, issue_date, expiry_date, credential_id, credential_url, file_url } = req.body;

    if (!title || !issuer) {
      return res.status(400).json({ error: 'Title and issuer are required' });
    }

    try {
      const result = await pool.query(
        `INSERT INTO certificates (profile_id, title, issuer, issue_date, expiry_date, credential_id, credential_url, file_url)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [profileId, title, issuer, issue_date, expiry_date, credential_id, credential_url, file_url]
      );

      await checkAndUnlockAchievements(profileId);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error adding certificate:', error);
      res.status(500).json({ error: 'Failed to add certificate' });
    }
  },

  async updateCertificate(req, res) {
    const { certificateId } = req.params;
    const { title, issuer, issue_date, expiry_date, credential_id, credential_url, file_url } = req.body;

    try {
      const result = await pool.query(
        `UPDATE certificates
         SET title = COALESCE($1, title),
             issuer = COALESCE($2, issuer),
             issue_date = COALESCE($3, issue_date),
             expiry_date = COALESCE($4, expiry_date),
             credential_id = COALESCE($5, credential_id),
             credential_url = COALESCE($6, credential_url),
             file_url = COALESCE($7, file_url)
         WHERE id = $8 RETURNING *`,
        [title, issuer, issue_date, expiry_date, credential_id, credential_url, file_url, certificateId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Certificate not found' });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating certificate:', error);
      res.status(500).json({ error: 'Failed to update certificate' });
    }
  },

  async deleteCertificate(req, res) {
    const { certificateId, id: profileId } = req.params;

    try {
      const result = await pool.query(
        'DELETE FROM certificates WHERE id = $1 AND profile_id = $2 RETURNING *',
        [certificateId, profileId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Certificate not found' });
      }

      res.json({ message: 'Certificate deleted successfully' });
    } catch (error) {
      console.error('Error deleting certificate:', error);
      res.status(500).json({ error: 'Failed to delete certificate' });
    }
  },

  // ========================================
  // SKILLS OPERATIONS
  // ========================================

  async addSkill(req, res) {
    const profileId = req.params.id;
    const { skill_name, category } = req.body;

    if (!skill_name) {
      return res.status(400).json({ error: 'Skill name is required' });
    }

    try {
      const result = await pool.query(
        'INSERT INTO skills (profile_id, skill_name, category, endorsement_count) VALUES ($1, $2, $3, 0) RETURNING *',
        [profileId, skill_name, category || 'General']
      );

      await checkAndUnlockAchievements(profileId);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error adding skill:', error);
      res.status(500).json({ error: 'Failed to add skill' });
    }
  },

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

  async deleteSkill(req, res) {
    const { skillId, id: profileId } = req.params;

    try {
      const result = await pool.query(
        'DELETE FROM skills WHERE id = $1 AND profile_id = $2 RETURNING *',
        [skillId, profileId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Skill not found' });
      }

      res.json({ message: 'Skill deleted successfully' });
    } catch (error) {
      console.error('Error deleting skill:', error);
      res.status(500).json({ error: 'Failed to delete skill' });
    }
  },

  async endorseSkill(req, res) {
    const { skillId } = req.params;
    const sessionId = req.headers['x-session-id'] || req.ip;

    try {
      const existingEndorsement = await pool.query(
        'SELECT * FROM skill_endorsements WHERE skill_id = $1 AND endorser_session = $2',
        [skillId, sessionId]
      );

      if (existingEndorsement.rows.length > 0) {
        return res.status(400).json({ error: 'Already endorsed this skill' });
      }

      await pool.query(
        'INSERT INTO skill_endorsements (skill_id, endorser_session, endorser_ip) VALUES ($1, $2, $3)',
        [skillId, sessionId, req.ip]
      );

      const result = await pool.query(
        'UPDATE skills SET endorsement_count = endorsement_count + 1 WHERE id = $1 RETURNING *',
        [skillId]
      );

      const profileResult = await pool.query('SELECT profile_id FROM skills WHERE id = $1', [skillId]);
      if (profileResult.rows.length > 0) {
        await checkAndUnlockAchievements(profileResult.rows[0].profile_id);
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error endorsing skill:', error);
      res.status(500).json({ error: 'Failed to endorse skill' });
    }
  },

  // ========================================
  // TIMELINE OPERATIONS
  // ========================================

  async addTimelineItem(req, res) {
    const profileId = req.params.id;
    const { title, company, description, start_date, end_date, is_current, type } = req.body;

    if (!title || !String(title).trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }

    try {
      const result = await pool.query(
        `INSERT INTO timeline_items 
         (profile_id, title, company, description, start_date, end_date, is_current, type) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [profileId, title.trim(), company || null, description || null, start_date || null, end_date || null, Boolean(is_current), type || 'work']
      );

      await checkAndUnlockAchievements(profileId);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error adding timeline item:', error);
      res.status(500).json({ error: 'Failed to add timeline item' });
    }
  },

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

  async deleteTimelineItem(req, res) {
    const { itemId, id: profileId } = req.params;

    try {
      const result = await pool.query(
        'DELETE FROM timeline_items WHERE id = $1 AND profile_id = $2 RETURNING *',
        [itemId, profileId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Timeline item not found' });
      }

      res.json({ message: 'Timeline item deleted successfully' });
    } catch (error) {
      console.error('Error deleting timeline item:', error);
      res.status(500).json({ error: 'Failed to delete timeline item' });
    }
  },

  // ========================================
  // SOCIAL LINKS OPERATIONS
  // ========================================

  async addSocialLink(req, res) {
    const profileId = req.params.id;
    const { platform, url, icon } = req.body;

    if (!platform || !url) {
      return res.status(400).json({ error: 'Platform and URL are required' });
    }

    try {
      const result = await pool.query(
        'INSERT INTO social_links (profile_id, platform, url, icon) VALUES ($1, $2, $3, $4) RETURNING *',
        [profileId, platform, url, icon || platform.toLowerCase()]
      );

      await checkAndUnlockAchievements(profileId);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error adding social link:', error);
      res.status(500).json({ error: 'Failed to add social link' });
    }
  },

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

  async deleteSocialLink(req, res) {
    const { linkId, id: profileId } = req.params;

    try {
      const result = await pool.query(
        'DELETE FROM social_links WHERE id = $1 AND profile_id = $2 RETURNING *',
        [linkId, profileId]
      );

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

// ========================================
// HELPER FUNCTIONS
// ========================================

async function checkAndUnlockAchievements(profileId) {
  try {
    const achievements = [];

    const profileData = await pool.query(
      `SELECT 
        p.*,
        (SELECT COUNT(*) FROM skills WHERE profile_id = p.id) as skill_count,
        (SELECT COUNT(*) FROM timeline_items WHERE profile_id = p.id) as timeline_count,
        (SELECT COUNT(*) FROM social_links WHERE profile_id = p.id) as social_count,
        (SELECT COUNT(*) FROM education WHERE profile_id = p.id) as education_count,
        (SELECT COUNT(*) FROM certificates WHERE profile_id = p.id) as certificate_count,
        (SELECT COALESCE(SUM(endorsement_count), 0) FROM skills WHERE profile_id = p.id) as total_endorsements,
        (SELECT COUNT(*) FROM career_vision WHERE profile_id = p.id) as has_career_vision
      FROM profiles p WHERE id = $1`,
      [profileId]
    );

    const data = profileData.rows[0];

    if (data.first_name && data.last_name && data.bio && data.title) {
      achievements.push({
        key: 'profile_complete',
        name: 'Profile Perfectionist',
        description: 'Completed all basic profile information'
      });
    }

    if (data.skill_count >= 5) {
      achievements.push({
        key: 'skilled_professional',
        name: 'Skilled Professional',
        description: 'Added 5 or more skills to your profile'
      });
    }

    if (data.timeline_count >= 3) {
      achievements.push({
        key: 'career_builder',
        name: 'Career Builder',
        description: 'Added 3 or more experiences to your timeline'
      });
    }

    if (data.social_count >= 3) {
      achievements.push({
        key: 'social_butterfly',
        name: 'Social Butterfly',
        description: 'Connected 3 or more social profiles'
      });
    }

    if (data.total_endorsements >= 10) {
      achievements.push({
        key: 'highly_endorsed',
        name: 'Highly Endorsed',
        description: 'Received 10 or more skill endorsements'
      });
    }

    if (data.education_count >= 1) {
      achievements.push({
        key: 'educated',
        name: 'Well Educated',
        description: 'Added education to your profile'
      });
    }

    if (data.certificate_count >= 1) {
      achievements.push({
        key: 'certified',
        name: 'Certified Professional',
        description: 'Added at least one certificate'
      });
    }

    if (data.has_career_vision > 0) {
      achievements.push({
        key: 'visionary',
        name: 'Visionary',
        description: 'Defined your career vision'
      });
    }

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