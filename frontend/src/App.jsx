import { useState, useEffect } from 'react';
import { profileApi } from './utils/api';
import NavBar from './components/NavBar';
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
      await loadProfile();
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  const handleBioGenerated = async (bioText) => {
    if (!bioText || typeof bioText !== "string") return;
    const trimmedBio = bioText.trim();
    if (!trimmedBio) return;
    setProfile((prev) => (prev ? { ...prev, bio: trimmedBio } : prev));
    try {
      const updated = await profileApi.updateProfile(1, { bio: trimmedBio });
      setProfile((prev) => (prev ? { ...prev, ...updated } : prev));
    } catch (err) {
      console.error('Failed to save bio:', err);
      alert("Bio updated in UI but failed to save to server");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] dark:bg-gray-900">
        <NavBar profile={{ first_name: 'Portfolio', last_name: '' }} />
        <div className="max-w-dashboard mx-auto px-6 py-12 flex flex-col items-center justify-center">
          <p className="dashboard-muted mb-4 text-center">
            Failed to load profile. Make sure the backend is running on port 5000.
          </p>
          <button onClick={() => { setLoading(true); loadProfile(); }} className="btn-primary-dash">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-gray-900 transition-colors overflow-x-hidden">
      <NavBar profile={profile} />

      <main className="max-w-dashboard mx-auto px-6 py-6">
        {/* Edit mode bar */}
        <div className="flex justify-end mb-6">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className={isEditing ? 'btn-primary-dash' : 'btn-secondary-dash'}
            aria-label={isEditing ? 'Switch to view mode' : 'Switch to edit mode'}
          >
            {isEditing ? 'View mode' : 'Edit mode'}
          </button>
        </div>

        {/* Hero / Profile – full width card */}
        <section className="mb-6">
          <ProfileHeader
            profile={profile}
            onUpdate={handleUpdateProfile}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </section>

        {/* Main grid: 12 cols, 24px gap. Left 8, Right 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN – 8 cols */}
          <div className="lg:col-span-8 space-y-6 flex flex-col">
            {profile.bio != null && String(profile.bio).trim() !== '' && (
              <section className="card-dashboard animate-fade-in-up">
                <h2 className="dashboard-title mb-3">About</h2>
                <p className="dashboard-body whitespace-pre-wrap">{profile.bio}</p>
              </section>
            )}

            {isEditing && (
              <section className="animate-fade-in-up">
                <BioGenerator skills={skills} onBioGenerated={handleBioGenerated} />
              </section>
            )}

            <section className="animate-fade-in-up">
              <SkillsSection skills={skills} setSkills={setSkills} isEditing={isEditing} />
            </section>

            <section className="animate-fade-in-up">
              <Achievements
                achievements={achievements}
                profile={profile}
                skills={skills}
                timeline={timeline}
                socialLinks={socialLinks}
              />
            </section>

            <section className="animate-fade-in-up">
              <Timeline timeline={timeline} setTimeline={setTimeline} isEditing={isEditing} />
            </section>
          </div>

          {/* RIGHT COLUMN – 4 cols */}
          <div className="lg:col-span-4 space-y-6 flex flex-col">
            <section className="animate-fade-in-up">
              <CareerVision
                careerVision={careerVision}
                profileId={1}
                isEditing={isEditing}
                onUpdate={loadProfile}
              />
            </section>

            <section className="animate-fade-in-up">
              <Education
                education={education}
                profileId={1}
                isEditing={isEditing}
                onUpdate={loadProfile}
              />
            </section>

            <section className="animate-fade-in-up">
              <Certificates
                certificates={certificates}
                profileId={1}
                isEditing={isEditing}
                onUpdate={loadProfile}
              />
            </section>

            <section className="animate-fade-in-up">
              <ATSAnalyzer profileId={1} resume={resume} onUpdate={loadProfile} />
            </section>

            <section className="animate-fade-in-up">
              <ProfileStrength
                profile={profile}
                skills={skills}
                timeline={timeline}
                socialLinks={socialLinks}
                achievements={achievements}
              />
            </section>
          </div>
        </div>

        {/* Social Links – full width */}
        <section className="mt-6 animate-fade-in-up">
          <SocialLinks
            socialLinks={socialLinks}
            setSocialLinks={setSocialLinks}
            isEditing={isEditing}
          />
        </section>

        <footer className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 text-center dashboard-muted text-[13px]">
          <p className="font-medium text-gray-700 dark:text-gray-300">Portfolio Dashboard</p>
          <p className="mt-1">React · Node.js · PostgreSQL</p>
        </footer>
      </main>
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
