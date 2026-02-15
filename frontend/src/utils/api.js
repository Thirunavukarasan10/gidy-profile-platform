// // // import axios from 'axios';

// // // const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// // // // Generate a simple session ID for endorsements
// // // const getSessionId = () => {
// // //   let sessionId = localStorage.getItem('sessionId');
// // //   if (!sessionId) {
// // //     sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
// // //     localStorage.setItem('sessionId', sessionId);
// // //   }
// // //   return sessionId;
// // // };

// // // const api = axios.create({
// // //   baseURL: API_URL,
// // //   headers: {
// // //     'Content-Type': 'application/json',
// // //   },
// // // });

// // // // Add session ID to requests
// // // api.interceptors.request.use((config) => {
// // //   config.headers['x-session-id'] = getSessionId();
// // //   return config;
// // // });

// // // export const profileApi = {
// // //   // Get profile
// // //   getProfile: (id = 1) => api.get(`/profile/${id}`),
  
// // //   // Update profile
// // //   updateProfile: (id = 1, data) => api.put(`/profile/${id}`, data),
  
// // //   // Skills
// // //   addSkill: (profileId = 1, data) => api.post(`/profile/${profileId}/skills`, data),
// // //   updateSkill: (skillId, data) => api.put(`/skills/${skillId}`, data),
// // //   deleteSkill: (skillId) => api.delete(`/skills/${skillId}`),
// // //   endorseSkill: (skillId) => api.post(`/skills/${skillId}/endorse`),
  
// // //   // Timeline
// // //   addTimelineItem: (profileId = 1, data) => api.post(`/profile/${profileId}/timeline`, data),
// // //   updateTimelineItem: (itemId, data) => api.put(`/timeline/${itemId}`, data),
// // //   deleteTimelineItem: (itemId) => api.delete(`/timeline/${itemId}`),
  
// // //   // Social Links
// // //   addSocialLink: (profileId = 1, data) => api.post(`/profile/${profileId}/social-links`, data),
// // //   updateSocialLink: (linkId, data) => api.put(`/social-links/${linkId}`, data),
// // //   deleteSocialLink: (linkId) => api.delete(`/social-links/${linkId}`),
  
// // //   // AI
// // //   generateBio: (data) => api.post('/ai/generate-bio', data),
// // // };

// // // export default api;
// // const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// // export const profileApi = {
// //   getProfile: async (id = 1) => {
// //     const res = await fetch(`${API_URL}/api/profile/${id}`);
// //     if (!res.ok) {
// //       throw new Error("Failed to fetch profile");
// //     }
// //     return res.json();
// //   },

// //   updateProfile: async (id, data) => {
// //     const res = await fetch(`${API_URL}/api/profile/${id}`, {
// //       method: "PUT",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(data),
// //     });

// //     if (!res.ok) {
// //       throw new Error("Failed to update profile");
// //     }

// //     return res.json();
// //   },
// // };

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// function getSessionId() {
//   let sessionId = localStorage.getItem("profile_sessionId");
//   if (!sessionId) {
//     sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
//     localStorage.setItem("profile_sessionId", sessionId);
//   }
//   return sessionId;
// }

// export const profileApi = {
//   getProfile: async (id = 1) => {
//     const res = await fetch(`${API_URL}/api/profile/${id}`);
//     if (!res.ok) throw new Error("Failed to fetch profile");
//     return res.json();
//   },

//   updateProfile: async (id, data) => {
//     const res = await fetch(`${API_URL}/api/profile/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });
//     if (!res.ok) throw new Error("Failed to update profile");
//     return res.json();
//   },

//   addSkill: async (profileId, skill) => {
//     const res = await fetch(`${API_URL}/api/profile/${profileId}/skills`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(skill),
//     });
//     if (!res.ok) throw new Error("Failed to add skill");
//     return res.json();
//   },

//   updateSkill: async (profileId, skillId, data) => {
//     const res = await fetch(`${API_URL}/api/profile/${profileId}/skills/${skillId}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });
//     if (!res.ok) throw new Error("Failed to update skill");
//     return res.json();
//   },

//   deleteSkill: async (profileId, skillId) => {
//     const res = await fetch(`${API_URL}/api/profile/${profileId}/skills/${skillId}`, {
//       method: "DELETE",
//     });
//     if (!res.ok) throw new Error("Failed to delete skill");
//     return res.json();
//   },

//   endorseSkill: async (skillId) => {
//     const res = await fetch(`${API_URL}/api/skills/${skillId}/endorse`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-session-id": getSessionId(),
//       },
//     });
//     if (!res.ok) {
//       const err = await res.json().catch(() => ({}));
//       const e = new Error(err.error || "Failed to endorse skill");
//       e.status = res.status;
//       e.error = err.error;
//       throw e;
//     }
//     return res.json();
//   },

//   addTimelineItem: async (profileId, item) => {
//     const body = {
//       title: item.title || null,
//       company: item.company || null,
//       description: item.description || null,
//       start_date: item.start_date || null,
//       end_date: item.end_date || null,
//       is_current: Boolean(item.is_current),
//       type: item.type || "work",
//     };
//     const res = await fetch(`${API_URL}/api/profile/${profileId}/timeline`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//     });
//     if (!res.ok) throw new Error("Failed to add timeline item");
//     return res.json();
//   },

//   updateTimelineItem: async (profileId, itemId, data) => {
//     const body = {
//       title: data.title || null,
//       company: data.company || null,
//       description: data.description || null,
//       start_date: data.start_date || null,
//       end_date: data.end_date || null,
//       is_current: Boolean(data.is_current),
//       type: data.type || "work",
//     };
//     const res = await fetch(`${API_URL}/api/profile/${profileId}/timeline/${itemId}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//     });
//     if (!res.ok) throw new Error("Failed to update timeline item");
//     return res.json();
//   },

//   deleteTimelineItem: async (profileId, itemId) => {
//     const res = await fetch(`${API_URL}/api/profile/${profileId}/timeline/${itemId}`, {
//       method: "DELETE",
//     });
//     if (!res.ok) throw new Error("Failed to delete timeline item");
//     return res.json();
//   },

//   addSocialLink: async (profileId, link) => {
//     const res = await fetch(`${API_URL}/api/profile/${profileId}/social-links`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(link),
//     });
//     if (!res.ok) throw new Error("Failed to add social link");
//     return res.json();
//   },

//   updateSocialLink: async (profileId, linkId, data) => {
//     const res = await fetch(`${API_URL}/api/profile/${profileId}/social-links/${linkId}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });
//     if (!res.ok) throw new Error("Failed to update social link");
//     return res.json();
//   },

//   deleteSocialLink: async (profileId, linkId) => {
//     const res = await fetch(`${API_URL}/api/profile/${profileId}/social-links/${linkId}`, {
//       method: "DELETE",
//     });
//     if (!res.ok) throw new Error("Failed to delete social link");
//     return res.json();
//   },

//   generateBio: async (data) => {
//     const res = await fetch(`${API_URL}/api/ai/generate-bio`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });
//     if (!res.ok) throw new Error("Failed to generate bio");
//     return res.json();
//   },
// };


























const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getSessionId() {
  let sessionId = localStorage.getItem("profile_sessionId");
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    localStorage.setItem("profile_sessionId", sessionId);
  }
  return sessionId;
}

export const profileApi = {
  // ========================================
  // PROFILE
  // ========================================
  
  getProfile: async (id = 1) => {
    const res = await fetch(`${API_URL}/api/profile/${id}`);
    if (!res.ok) throw new Error("Failed to fetch profile");
    return res.json();
  },

  updateProfile: async (id, data) => {
    const res = await fetch(`${API_URL}/api/profile/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update profile");
    return res.json();
  },

  // ========================================
  // CAREER VISION
  // ========================================

  getCareerVision: async (profileId) => {
    const res = await fetch(`${API_URL}/api/profile/${profileId}/career-vision`);
    if (!res.ok) throw new Error("Failed to fetch career vision");
    return res.json();
  },

  upsertCareerVision: async (profileId, data) => {
    const res = await fetch(`${API_URL}/api/profile/${profileId}/career-vision`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to save career vision");
    return res.json();
  },

  // ========================================
  // EDUCATION
  // ========================================

  addEducation: async (profileId, data) => {
    const res = await fetch(`${API_URL}/api/profile/${profileId}/education`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to add education");
    return res.json();
  },

  updateEducation: async (profileId, educationId, data) => {
    const res = await fetch(`${API_URL}/api/profile/${profileId}/education/${educationId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update education");
    return res.json();
  },

  deleteEducation: async (profileId, educationId) => {
    const res = await fetch(`${API_URL}/api/profile/${profileId}/education/${educationId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete education");
    return res.json();
  },

  // ========================================
  // CERTIFICATES
  // ========================================

  addCertificate: async (profileId, data) => {
    const res = await fetch(`${API_URL}/api/profile/${profileId}/certificates`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to add certificate");
    return res.json();
  },

  updateCertificate: async (profileId, certificateId, data) => {
    const res = await fetch(`${API_URL}/api/profile/${profileId}/certificates/${certificateId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update certificate");
    return res.json();
  },

  deleteCertificate: async (profileId, certificateId) => {
    const res = await fetch(`${API_URL}/api/profile/${profileId}/certificates/${certificateId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete certificate");
    return res.json();
  },

  // ========================================
  // SKILLS
  // ========================================

  addSkill: async (profileId, skill) => {
    const res = await fetch(`${API_URL}/api/profile/${profileId}/skills`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(skill),
    });
    if (!res.ok) throw new Error("Failed to add skill");
    return res.json();
  },

  updateSkill: async (profileId, skillId, data) => {
    const res = await fetch(`${API_URL}/api/profile/${profileId}/skills/${skillId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update skill");
    return res.json();
  },

  deleteSkill: async (profileId, skillId) => {
    const res = await fetch(`${API_URL}/api/profile/${profileId}/skills/${skillId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete skill");
    return res.json();
  },

  endorseSkill: async (skillId) => {
    const res = await fetch(`${API_URL}/api/skills/${skillId}/endorse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-session-id": getSessionId(),
      },
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const e = new Error(err.error || "Failed to endorse skill");
      e.status = res.status;
      e.error = err.error;
      throw e;
    }
    return res.json();
  },

  // ========================================
  // TIMELINE
  // ========================================

  addTimelineItem: async (profileId, item) => {
    const body = {
      title: item.title || null,
      company: item.company || null,
      description: item.description || null,
      start_date: item.start_date || null,
      end_date: item.end_date || null,
      is_current: Boolean(item.is_current),
      type: item.type || "work",
    };
    const res = await fetch(`${API_URL}/api/profile/${profileId}/timeline`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Failed to add timeline item");
    return res.json();
  },

  updateTimelineItem: async (profileId, itemId, data) => {
    const body = {
      title: data.title || null,
      company: data.company || null,
      description: data.description || null,
      start_date: data.start_date || null,
      end_date: data.end_date || null,
      is_current: Boolean(data.is_current),
      type: data.type || "work",
    };
    const res = await fetch(`${API_URL}/api/profile/${profileId}/timeline/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Failed to update timeline item");
    return res.json();
  },

  deleteTimelineItem: async (profileId, itemId) => {
    const res = await fetch(`${API_URL}/api/profile/${profileId}/timeline/${itemId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete timeline item");
    return res.json();
  },

  // ========================================
  // SOCIAL LINKS
  // ========================================

  addSocialLink: async (profileId, link) => {
    const res = await fetch(`${API_URL}/api/profile/${profileId}/social-links`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(link),
    });
    if (!res.ok) throw new Error("Failed to add social link");
    return res.json();
  },

  updateSocialLink: async (profileId, linkId, data) => {
    const res = await fetch(`${API_URL}/api/profile/${profileId}/social-links/${linkId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update social link");
    return res.json();
  },

  deleteSocialLink: async (profileId, linkId) => {
    const res = await fetch(`${API_URL}/api/profile/${profileId}/social-links/${linkId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete social link");
    return res.json();
  },

  // ========================================
  // AI BIO GENERATION
  // ========================================

  generateBio: async (data) => {
    const res = await fetch(`${API_URL}/api/ai/generate-bio`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to generate bio");
    return res.json();
  },

  // ========================================
  // ATS RESUME ANALYZER
  // ========================================

  analyzeResume: async (data) => {
    const res = await fetch(`${API_URL}/api/ats/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to analyze resume");
    return res.json();
  },

  saveResume: async (profileId, data) => {
    const res = await fetch(`${API_URL}/api/profile/${profileId}/resume`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to save resume");
    return res.json();
  },

  getResume: async (profileId) => {
    const res = await fetch(`${API_URL}/api/profile/${profileId}/resume`);
    if (!res.ok) throw new Error("Failed to fetch resume");
    return res.json();
  },
};