// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// // Generate a simple session ID for endorsements
// const getSessionId = () => {
//   let sessionId = localStorage.getItem('sessionId');
//   if (!sessionId) {
//     sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
//     localStorage.setItem('sessionId', sessionId);
//   }
//   return sessionId;
// };

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add session ID to requests
// api.interceptors.request.use((config) => {
//   config.headers['x-session-id'] = getSessionId();
//   return config;
// });

// export const profileApi = {
//   // Get profile
//   getProfile: (id = 1) => api.get(`/profile/${id}`),
  
//   // Update profile
//   updateProfile: (id = 1, data) => api.put(`/profile/${id}`, data),
  
//   // Skills
//   addSkill: (profileId = 1, data) => api.post(`/profile/${profileId}/skills`, data),
//   updateSkill: (skillId, data) => api.put(`/skills/${skillId}`, data),
//   deleteSkill: (skillId) => api.delete(`/skills/${skillId}`),
//   endorseSkill: (skillId) => api.post(`/skills/${skillId}/endorse`),
  
//   // Timeline
//   addTimelineItem: (profileId = 1, data) => api.post(`/profile/${profileId}/timeline`, data),
//   updateTimelineItem: (itemId, data) => api.put(`/timeline/${itemId}`, data),
//   deleteTimelineItem: (itemId) => api.delete(`/timeline/${itemId}`),
  
//   // Social Links
//   addSocialLink: (profileId = 1, data) => api.post(`/profile/${profileId}/social-links`, data),
//   updateSocialLink: (linkId, data) => api.put(`/social-links/${linkId}`, data),
//   deleteSocialLink: (linkId) => api.delete(`/social-links/${linkId}`),
  
//   // AI
//   generateBio: (data) => api.post('/ai/generate-bio', data),
// };

// export default api;
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const profileApi = {
  getProfile: async (id = 1) => {
    const res = await fetch(`${API_URL}/api/profile/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch profile");
    }
    return res.json();
  },

  updateProfile: async (id, data) => {
    const res = await fetch(`${API_URL}/api/profile/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to update profile");
    }

    return res.json();
  },
};

