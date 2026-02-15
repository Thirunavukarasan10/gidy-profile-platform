// // import { useState, useEffect } from 'react';
// // import { Edit2, Eye } from 'lucide-react';
// // import ProfileHeader from './components/ProfileHeader';
// // import SkillsSection from './components/SkillsSection';
// // import Timeline from './components/Timeline';
// // import SocialLinks from './components/SocialLinks';
// // import BioGenerator from './components/BioGenerator';
// // import Achievements from './components/Achievements';
// // import ThemeToggle from './components/ThemeToggle';
// // import Loading from './components/Loading';
// // import { profileApi } from './utils/api';
// // import { ThemeProvider } from './context/ThemeContext';

// // function AppContent() {
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [isEditing, setIsEditing] = useState(false);
  
// //   const [profile, setProfile] = useState(null);
// //   const [skills, setSkills] = useState([]);
// //   const [timeline, setTimeline] = useState([]);
// //   const [socialLinks, setSocialLinks] = useState([]);
// //   const [achievements, setAchievements] = useState([]);

// //   useEffect(() => {
// //     loadProfile();
// //   }, []);

// //   // const loadProfile = async () => {
// //   //   try {
// //   //     setLoading(true);
// //   //     const response = await profileApi.getProfile();
// //   //     setProfile(response.data.profile);
// //   //     setSkills(response.data.skills || []);
// //   //     setTimeline(response.data.timeline || []);
// //   //     setSocialLinks(response.data.socialLinks || []);
// //   //     setAchievements(response.data.achievements || []);
// //   //     setError(null);
// //   //   } catch (err) {
// //   //     console.error('Error loading profile:', err);
// //   //     setError('Failed to load profile. Please try again later.');
// //   //   } finally {
// //   //     setLoading(false);
// //   //   }
// //   // };
// //   const loadProfile = async () => {
// //   try {
// //     setLoading(true);
// //     const response = await profileApi.getProfile();

// //     setProfile(response.profile);
// //     setSkills(response.skills || []);
// //     setTimeline(response.timeline || []);
// //     setSocialLinks(response.socialLinks || []);
// //     setAchievements(response.achievements || []);
// //     setError(null);
// //   } catch (err) {
// //     console.error('Error loading profile:', err);
// //     setError('Failed to load profile. Please try again later.');
// //   } finally {
// //     setLoading(false);
// //   }
// // };


// //   const handleProfileUpdate = async (updatedData) => {
// //     try {
// //       const response = await profileApi.updateProfile(1, updatedData);
// //       setProfile(response.data);
      
// //       // Reload full profile to get updated achievements
// //       await loadProfile();
// //     } catch (err) {
// //       console.error('Error updating profile:', err);
// //       alert('Failed to update profile');
// //     }
// //   };

// //   const handleBioGenerated = async (bio) => {
// //     try {
// //       const response = await profileApi.updateProfile(1, { bio });
// //       setProfile(response.data);
// //     } catch (err) {
// //       console.error('Error updating bio:', err);
// //       alert('Failed to update bio');
// //     }
// //   };

// //   if (loading) {
// //     return <Loading />;
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
// //         <div className="text-center">
// //           <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
// //           <button onClick={loadProfile} className="btn-primary">
// //             Retry
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!profile) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
// //         <p className="text-gray-600 dark:text-gray-400">No profile found</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
// //       <ThemeToggle />

// //       {/* Edit Mode Toggle */}
// //       <div className="fixed top-6 left-6 z-50">
// //         <button
// //           onClick={() => setIsEditing(!isEditing)}
// //           className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all duration-200 ${
// //             isEditing
// //               ? 'bg-primary-600 text-white hover:bg-primary-700'
// //               : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:shadow-xl'
// //           }`}
// //         >
// //           {isEditing ? (
// //             <>
// //               <Eye size={18} />
// //               <span className="font-medium">View Mode</span>
// //             </>
// //           ) : (
// //             <>
// //               <Edit2 size={18} />
// //               <span className="font-medium">Edit Mode</span>
// //             </>
// //           )}
// //         </button>
// //       </div>

// //       {/* Main Content */}
// //       <div className="container mx-auto px-4 py-20 max-w-6xl">
// //         <div className="space-y-8">
// //           {/* Profile Header */}
// //           <ProfileHeader
// //             profile={profile}
// //             onUpdate={handleProfileUpdate}
// //             isEditing={isEditing}
// //             setIsEditing={setIsEditing}
// //           />

// //           {/* AI Bio Generator (only in edit mode) */}
// //           {isEditing && (
// //             <BioGenerator
// //               skills={skills}
// //               onBioGenerated={handleBioGenerated}
// //             />
// //           )}

// //           {/* Achievements */}
// //           <Achievements achievements={achievements} />

// //           {/* Skills */}
// //           <SkillsSection
// //             skills={skills}
// //             setSkills={setSkills}
// //             isEditing={isEditing}
// //           />

// //           {/* Timeline */}
// //           <Timeline
// //             timeline={timeline}
// //             setTimeline={setTimeline}
// //             isEditing={isEditing}
// //           />

// //           {/* Social Links */}
// //           <SocialLinks
// //             socialLinks={socialLinks}
// //             setSocialLinks={setSocialLinks}
// //             isEditing={isEditing}
// //           />
// //         </div>

// //         {/* Footer */}
// //         <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
// //           <p>Built with React, Node.js, PostgreSQL & 💙</p>
// //         </footer>
// //       </div>
// //     </div>
// //   );
// // }

// // function App() {
// //   return (
// //     <ThemeProvider>
// //       <AppContent />
// //     </ThemeProvider>
// //   );
// // }

// // export default App;
// import { useState, useEffect } from 'react';
// import { profileApi } from './utils/api';
// import ProfileHeader from './components/ProfileHeader';
// import SkillsSection from './components/SkillsSection';
// import Timeline from './components/Timeline';
// import SocialLinks from './components/SocialLinks';
// import Achievements from './components/Achievements';
// import BioGenerator from './components/BioGenerator';
// import ProfileStrength from './components/ProfileStrength';
// import ThemeToggle from './components/ThemeToggle';
// import Loading from './components/Loading';
// import { ThemeProvider } from './context/ThemeContext';

// function AppContent() {
//   const [profile, setProfile] = useState(null);
//   const [skills, setSkills] = useState([]);
//   const [timeline, setTimeline] = useState([]);
//   const [socialLinks, setSocialLinks] = useState([]);
//   const [achievements, setAchievements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     loadProfile();
//   }, []);

//   const loadProfile = async () => {
//     try {
//       const data = await profileApi.getProfile(1);
//       setProfile(data.profile);
//       setSkills(data.skills || []);
//       setTimeline(data.timeline || []);
//       setSocialLinks(data.socialLinks || []);
//       setAchievements(data.achievements || []);
//     } catch (err) {
//       alert("Failed to load profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateProfile = async (updatedData) => {
//     try {
//       const updated = await profileApi.updateProfile(1, updatedData);
//       setProfile(updated);
//       await loadProfile();
//     } catch (err) {
//       alert("Failed to update profile");
//     }
//   };

//   const handleBioGenerated = async (bioText) => {
//     if (!bioText || typeof bioText !== "string") return;
//     const trimmedBio = bioText.trim();
//     if (!trimmedBio) return;
//     setProfile((prev) => (prev ? { ...prev, bio: trimmedBio } : prev));
//     try {
//       const updated = await profileApi.updateProfile(1, { bio: trimmedBio });
//       setProfile((prev) => (prev ? { ...prev, ...updated, bio: updated.bio ?? trimmedBio } : prev));
//     } catch (err) {
//       setProfile((prev) => (prev ? { ...prev, bio: trimmedBio } : prev));
//       alert("Failed to save bio");
//     }
//   };

//   if (loading) {
//     return <Loading />;
//   }

//   if (!profile) {
//     return (
//       <div className="min-h-screen bg-[#f3f2ef] dark:bg-neutral-900 flex items-center justify-center p-4">
//         <ThemeToggle />
//         <div className="text-center max-w-md">
//           <p className="text-neutral-600 dark:text-neutral-400 mb-4">
//             Failed to load profile. Make sure the backend is running on port 5000 and the database is set up.
//           </p>
//           <button
//             onClick={() => {
//               setLoading(true);
//               loadProfile();
//             }}
//             className="px-4 py-2 bg-linkedin hover:bg-linkedin-hover text-white rounded-full font-medium transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f3f2ef] dark:bg-neutral-900 transition-colors duration-200">
//       <ThemeToggle />
//       <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
//         {/* 1. Profile Header */}
//         <ProfileHeader
//           profile={profile}
//           onUpdate={handleUpdateProfile}
//           isEditing={isEditing}
//           setIsEditing={setIsEditing}
//         />

//         {/* 2. AI Bio Generator (only in edit mode) */}
//         {isEditing && (
//           <BioGenerator
//             skills={skills}
//             onBioGenerated={handleBioGenerated}
//           />
//         )}

//         {/* 3. Achievements */}
//         <Achievements achievements={achievements} />

//         {/* 4. Skills */}
//         <SkillsSection
//           skills={skills}
//           setSkills={setSkills}
//           isEditing={isEditing}
//         />

//         {/* 5. Profile Strength Analyzer */}
//         <ProfileStrength
//           profile={profile}
//           skills={skills}
//           timeline={timeline}
//           socialLinks={socialLinks}
//           achievements={achievements}
//         />

//         {/* 6. Timeline */}
//         <Timeline
//           timeline={timeline}
//           setTimeline={setTimeline}
//           isEditing={isEditing}
//         />

//         {/* 7. Social Links */}
//         <SocialLinks
//           socialLinks={socialLinks}
//           setSocialLinks={setSocialLinks}
//           isEditing={isEditing}
//         />

//         <footer className="text-center pt-8 pb-4 text-sm text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-700">
//           <p>Professional Profile • React, Node.js, PostgreSQL</p>
//         </footer>
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <ThemeProvider>
//       <AppContent />
//     </ThemeProvider>
//   );
// }

// export default App;














import { useState, useEffect } from 'react';
import { profileApi } from './utils/api';
import ProfileHeader from './components/ProfileHeader';
import BioGenerator from './components/BioGenerator';
import Achievements from './components/Achievements';
import CareerVision from './components/CareerVision';
import Education from './components/Education';
import Certificates from './components/Certificates';
import SkillsSection from './components/SkillsSection';
import ATSAnalyzer from './components/ATSAnalyzer';
import ProfileStrength from './components/Profilestrength';
import Timeline from './components/Timeline';
import SocialLinks from './components/SocialLinks';
import ThemeToggle from './components/ThemeToggle';
import Loading from './components/Loading';
import { ThemeProvider } from './context/ThemeContext';

function AppContent() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [education, setEducation] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [careerVision, setCareerVision] = useState(null);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await profileApi.getProfile(1);
      setProfile(data.profile);
      setSkills(data.skills || []);
      setTimeline(data.timeline || []);
      setSocialLinks(data.socialLinks || []);
      setAchievements(data.achievements || []);
      setEducation(data.education || []);
      setCertificates(data.certificates || []);
      setCareerVision(data.careerVision || null);
      setResume(data.resume || null);
    } catch (err) {
      console.error('Failed to load profile:', err);
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (updatedData) => {
    try {
      const updated = await profileApi.updateProfile(1, updatedData);
      setProfile(updated);
      await loadProfile(); // Reload to get new achievements
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  const handleBioGenerated = async (bioText) => {
    if (!bioText || typeof bioText !== "string") return;
    const trimmedBio = bioText.trim();
    if (!trimmedBio) return;
    
    // Immediately update UI
    setProfile((prev) => (prev ? { ...prev, bio: trimmedBio } : prev));
    
    try {
      // Save to backend
      const updated = await profileApi.updateProfile(1, { bio: trimmedBio });
      // Update profile with backend response
      setProfile((prev) => (prev ? { ...prev, ...updated } : prev));
    } catch (err) {
      console.error('Failed to save bio:', err);
      // Keep the UI updated even if save fails
      alert("Bio updated in UI but failed to save to server");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#f3f2ef] dark:bg-neutral-900 flex items-center justify-center p-4">
        <ThemeToggle />
        <div className="text-center max-w-md">
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Failed to load profile. Make sure the backend is running on port 5000 and the database is set up.
          </p>
          <button
            onClick={() => {
              setLoading(true);
              loadProfile();
            }}
            className="px-4 py-2 bg-linkedin hover:bg-linkedin-hover text-white rounded-full font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f2ef] dark:bg-neutral-900 transition-colors duration-200">
      <ThemeToggle />
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        {/* 1. Profile Header */}
        <ProfileHeader
          profile={profile}
          onUpdate={handleUpdateProfile}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />

        {/* 2. AI Bio Generator (only in edit mode) */}
        {isEditing && (
          <BioGenerator
            skills={skills}
            onBioGenerated={handleBioGenerated}
          />
        )}

        {/* 3. Achievements */}
        <Achievements achievements={achievements} />

        {/* 4. Career Vision */}
        <CareerVision
          careerVision={careerVision}
          profileId={1}
          isEditing={isEditing}
          onUpdate={loadProfile}
        />

        {/* 5. Education */}
        <Education
          education={education}
          profileId={1}
          isEditing={isEditing}
          onUpdate={loadProfile}
        />

        {/* 6. Certificates */}
        <Certificates
          certificates={certificates}
          profileId={1}
          isEditing={isEditing}
          onUpdate={loadProfile}
        />

        {/* 7. Skills */}
        <SkillsSection
          skills={skills}
          setSkills={setSkills}
          isEditing={isEditing}
        />

        {/* 8. Resume + ATS Analyzer */}
        <ATSAnalyzer
          profileId={1}
          resume={resume}
          onUpdate={loadProfile}
        />

        {/* 9. Profile Strength Analyzer */}
        <ProfileStrength
          profile={profile}
          skills={skills}
          timeline={timeline}
          socialLinks={socialLinks}
          achievements={achievements}
        />

        {/* 10. Timeline */}
        <Timeline
          timeline={timeline}
          setTimeline={setTimeline}
          isEditing={isEditing}
        />

        {/* 11. Social Links */}
        <SocialLinks
          socialLinks={socialLinks}
          setSocialLinks={setSocialLinks}
          isEditing={isEditing}
        />

        <footer className="text-center pt-8 pb-4 text-sm text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-700">
          <p>Professional Profile • React, Node.js, PostgreSQL</p>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;