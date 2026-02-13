import { useState, useEffect } from 'react';
import { Edit2, Eye } from 'lucide-react';
import ProfileHeader from './components/ProfileHeader';
import SkillsSection from './components/SkillsSection';
import Timeline from './components/Timeline';
import SocialLinks from './components/SocialLinks';
import BioGenerator from './components/BioGenerator';
import Achievements from './components/Achievements';
import ThemeToggle from './components/ThemeToggle';
import Loading from './components/Loading';
import { profileApi } from './utils/api';
import { ThemeProvider } from './context/ThemeContext';

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    loadProfile();
  }, []);

  // const loadProfile = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await profileApi.getProfile();
  //     setProfile(response.data.profile);
  //     setSkills(response.data.skills || []);
  //     setTimeline(response.data.timeline || []);
  //     setSocialLinks(response.data.socialLinks || []);
  //     setAchievements(response.data.achievements || []);
  //     setError(null);
  //   } catch (err) {
  //     console.error('Error loading profile:', err);
  //     setError('Failed to load profile. Please try again later.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const loadProfile = async () => {
  try {
    setLoading(true);
    const response = await profileApi.getProfile();

    setProfile(response.profile);
    setSkills(response.skills || []);
    setTimeline(response.timeline || []);
    setSocialLinks(response.socialLinks || []);
    setAchievements(response.achievements || []);
    setError(null);
  } catch (err) {
    console.error('Error loading profile:', err);
    setError('Failed to load profile. Please try again later.');
  } finally {
    setLoading(false);
  }
};


  const handleProfileUpdate = async (updatedData) => {
    try {
      const response = await profileApi.updateProfile(1, updatedData);
      setProfile(response.data);
      
      // Reload full profile to get updated achievements
      await loadProfile();
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile');
    }
  };

  const handleBioGenerated = async (bio) => {
    try {
      const response = await profileApi.updateProfile(1, { bio });
      setProfile(response.data);
    } catch (err) {
      console.error('Error updating bio:', err);
      alert('Failed to update bio');
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button onClick={loadProfile} className="btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400">No profile found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <ThemeToggle />

      {/* Edit Mode Toggle */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all duration-200 ${
            isEditing
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:shadow-xl'
          }`}
        >
          {isEditing ? (
            <>
              <Eye size={18} />
              <span className="font-medium">View Mode</span>
            </>
          ) : (
            <>
              <Edit2 size={18} />
              <span className="font-medium">Edit Mode</span>
            </>
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="space-y-8">
          {/* Profile Header */}
          <ProfileHeader
            profile={profile}
            onUpdate={handleProfileUpdate}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />

          {/* AI Bio Generator (only in edit mode) */}
          {isEditing && (
            <BioGenerator
              skills={skills}
              onBioGenerated={handleBioGenerated}
            />
          )}

          {/* Achievements */}
          <Achievements achievements={achievements} />

          {/* Skills */}
          <SkillsSection
            skills={skills}
            setSkills={setSkills}
            isEditing={isEditing}
          />

          {/* Timeline */}
          <Timeline
            timeline={timeline}
            setTimeline={setTimeline}
            isEditing={isEditing}
          />

          {/* Social Links */}
          <SocialLinks
            socialLinks={socialLinks}
            setSocialLinks={setSocialLinks}
            isEditing={isEditing}
          />
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Built with React, Node.js, PostgreSQL & 💙</p>
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
