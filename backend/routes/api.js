import express from 'express';
import { profileController } from '../controllers/profileController.js';
import { aiController } from '../controllers/aiController.js';

const router = express.Router();

// Profile routes
router.get('/profile/:id?', profileController.getProfile);
router.put('/profile/:id?', profileController.updateProfile);

// Skills routes
router.post('/profile/:id/skills', profileController.addSkill);
router.put('/skills/:skillId', profileController.updateSkill);
router.delete('/skills/:skillId', profileController.deleteSkill);
router.post('/skills/:skillId/endorse', profileController.endorseSkill);

// Timeline routes
router.post('/profile/:id/timeline', profileController.addTimelineItem);
router.put('/timeline/:itemId', profileController.updateTimelineItem);
router.delete('/timeline/:itemId', profileController.deleteTimelineItem);

// Social links routes
router.post('/profile/:id/social-links', profileController.addSocialLink);
router.put('/social-links/:linkId', profileController.updateSocialLink);
router.delete('/social-links/:linkId', profileController.deleteSocialLink);

// AI routes
router.post('/ai/generate-bio', aiController.generateBio);

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
