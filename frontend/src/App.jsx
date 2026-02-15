import { useState, useEffect, useCallback } from 'react';
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
import Footer from './components/Footer';
import Toast from './components/Toast';
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
  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = useCallback((message) => {
    setToast({ visible: true, message });
  }, []);

  const hideToast = useCallback(() => {
    setToast((p) => ({ ...p, visible: false }));
  }, []);

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
      showToast('Profile saved successfully');
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
      showToast('Bio updated');
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
      <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-900">
        <NavBar />
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
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-900 transition-colors overflow-x-hidden">
      <NavBar isEditing={isEditing} onEditToggle={() => setIsEditing(!isEditing)} />

      <main className="max-w-dashboard mx-auto px-6 py-8 animate-fade-in-up">
        {/* Hero / Profile card */}
        <section className="mb-8">
          <ProfileHeader
            profile={profile}
            onUpdate={handleUpdateProfile}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            socialLinks={socialLinks}
          />
        </section>

        {/* Main grid: Left 8, Right 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN – About, Skills, Experience */}
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

          {/* RIGHT COLUMN – Education, Certificates, Resume */}
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
              <SocialLinks
                socialLinks={socialLinks}
                setSocialLinks={setSocialLinks}
                isEditing={isEditing}
              />
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

        <Footer />
      </main>

      <Toast message={toast.message} visible={toast.visible} onClose={hideToast} />
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
