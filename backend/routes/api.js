// // import express from 'express';
// // import { profileController } from '../controllers/profileController.js';
// // import { aiController } from '../controllers/aiController.js';

// // const router = express.Router();

// // // Profile routes
// // router.get('/profile/:id?', profileController.getProfile);
// // router.put('/profile/:id?', profileController.updateProfile);

// // // Skills routes
// // router.post('/profile/:id/skills', profileController.addSkill);
// // router.put('/skills/:skillId', profileController.updateSkill);
// // router.delete('/skills/:skillId', profileController.deleteSkill);
// // router.post('/skills/:skillId/endorse', profileController.endorseSkill);

// // // Timeline routes
// // router.post('/profile/:id/timeline', profileController.addTimelineItem);
// // router.put('/timeline/:itemId', profileController.updateTimelineItem);
// // router.delete('/timeline/:itemId', profileController.deleteTimelineItem);

// // // Social links routes
// // router.post('/profile/:id/social-links', profileController.addSocialLink);
// // router.put('/social-links/:linkId', profileController.updateSocialLink);
// // router.delete('/social-links/:linkId', profileController.deleteSocialLink);

// // // AI routes
// // router.post('/ai/generate-bio', aiController.generateBio);

// // // Health check
// // router.get('/health', (req, res) => {
// //   res.json({ status: 'ok', timestamp: new Date().toISOString() });
// // });

// // export default router;
// import express from 'express';
// import { profileController } from '../controllers/profileController.js';
// import { aiController } from '../controllers/aiController.js';

// const router = express.Router();

// // Profile routes
// router.get('/profile/:id?', profileController.getProfile);
// router.put('/profile/:id', profileController.updateProfile);

// // Skills routes - FIXED to match frontend expectations
// router.post('/profile/:id/skills', profileController.addSkill);
// router.put('/profile/:id/skills/:skillId', profileController.updateSkill);
// router.delete('/profile/:id/skills/:skillId', profileController.deleteSkill);
// router.post('/skills/:skillId/endorse', profileController.endorseSkill);

// // Timeline routes
// router.post('/profile/:id/timeline', profileController.addTimelineItem);
// router.put('/profile/:id/timeline/:itemId', profileController.updateTimelineItem);
// router.delete('/profile/:id/timeline/:itemId', profileController.deleteTimelineItem);

// // Social links routes
// router.post('/profile/:id/social-links', profileController.addSocialLink);
// router.put('/profile/:id/social-links/:linkId', profileController.updateSocialLink);
// router.delete('/profile/:id/social-links/:linkId', profileController.deleteSocialLink);

// // AI routes
// router.post('/ai/generate-bio', aiController.generateBio);

// // Health check
// router.get('/health', (req, res) => {
//   res.json({ status: 'ok', timestamp: new Date().toISOString() });
// });

// export default router;
































import express from 'express';
import { profileController } from '../controllers/profileController.js';
import { aiController } from '../controllers/aiController.js';
import { atsController } from '../controllers/atsController.js';

const router = express.Router();

// ========================================
// PROFILE ROUTES
// ========================================

router.get('/profile/:id?', profileController.getProfile);
router.put('/profile/:id', profileController.updateProfile);

// ========================================
// CAREER VISION ROUTES
// ========================================

router.get('/profile/:id/career-vision', profileController.getCareerVision);
router.post('/profile/:id/career-vision', profileController.upsertCareerVision);
router.put('/profile/:id/career-vision', profileController.upsertCareerVision);

// ========================================
// EDUCATION ROUTES
// ========================================

router.post('/profile/:id/education', profileController.addEducation);
router.put('/profile/:id/education/:educationId', profileController.updateEducation);
router.delete('/profile/:id/education/:educationId', profileController.deleteEducation);

// ========================================
// CERTIFICATE ROUTES
// ========================================

router.post('/profile/:id/certificates', profileController.addCertificate);
router.put('/profile/:id/certificates/:certificateId', profileController.updateCertificate);
router.delete('/profile/:id/certificates/:certificateId', profileController.deleteCertificate);

// ========================================
// SKILLS ROUTES
// ========================================

router.post('/profile/:id/skills', profileController.addSkill);
router.put('/profile/:id/skills/:skillId', profileController.updateSkill);
router.delete('/profile/:id/skills/:skillId', profileController.deleteSkill);
router.post('/skills/:skillId/endorse', profileController.endorseSkill);

// ========================================
// TIMELINE ROUTES
// ========================================

router.post('/profile/:id/timeline', profileController.addTimelineItem);
router.put('/profile/:id/timeline/:itemId', profileController.updateTimelineItem);
router.delete('/profile/:id/timeline/:itemId', profileController.deleteTimelineItem);

// ========================================
// SOCIAL LINKS ROUTES
// ========================================

router.post('/profile/:id/social-links', profileController.addSocialLink);
router.put('/profile/:id/social-links/:linkId', profileController.updateSocialLink);
router.delete('/profile/:id/social-links/:linkId', profileController.deleteSocialLink);

// ========================================
// AI ROUTES
// ========================================

router.post('/ai/generate-bio', aiController.generateBio);

// ========================================
// ATS ROUTES
// ========================================

router.post('/ats/analyze', atsController.analyzeResume);
router.post('/profile/:id/resume', atsController.saveResume);
router.get('/profile/:id/resume', atsController.getResume);

// ========================================
// HEALTH CHECK
// ========================================

router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;