import { Trophy, Award, Star, Zap, Target, Medal, GraduationCap, BookOpen, Lightbulb } from 'lucide-react';
import { useState, useEffect } from 'react';

const ALL_BADGES = [
  { key: 'profile_complete', name: 'Profile Perfectionist', description: 'Complete all basic profile fields', icon: Trophy },
  { key: 'skilled_professional', name: 'Skilled Professional', description: 'Add 5+ skills', icon: Star },
  { key: 'career_builder', name: 'Career Builder', description: 'Add 3+ experiences', icon: Target },
  { key: 'social_butterfly', name: 'Social Butterfly', description: 'Connect 3+ social profiles', icon: Zap },
  { key: 'highly_endorsed', name: 'Highly Endorsed', description: 'Receive 10+ endorsements', icon: Award },
  { key: 'expert_level', name: 'Expert Level', description: 'Receive 50+ endorsements', icon: Medal },
  { key: 'educated', name: 'Well Educated', description: 'Add education', icon: GraduationCap },
  { key: 'certified', name: 'Certified Professional', description: 'Add a certificate', icon: BookOpen },
  { key: 'visionary', name: 'Visionary', description: 'Define your career vision', icon: Lightbulb },
];

function getLevel(percent) {
  if (percent >= 95) return 10;
  if (percent >= 85) return 9;
  if (percent >= 75) return 8;
  if (percent >= 65) return 7;
  if (percent >= 55) return 6;
  if (percent >= 45) return 5;
  if (percent >= 35) return 4;
  if (percent >= 25) return 3;
  if (percent >= 15) return 2;
  return 1;
}

function computeCompletion(profile, skills, timeline, socialLinks, achievements) {
  let score = 0;
  const weights = {
    hasName: 8,
    hasTitle: 8,
    hasBio: 12,
    hasEmail: 5,
    hasLocation: 5,
    hasPhoto: 8,
    skills: 15,
    timeline: 15,
    social: 10,
    achievements: 14,
  };

  if (profile?.first_name && profile?.last_name) score += weights.hasName;
  if (profile?.title) score += weights.hasTitle;
  if (profile?.bio && String(profile.bio).trim().length > 30) score += weights.hasBio;
  if (profile?.email) score += weights.hasEmail;
  if (profile?.location) score += weights.hasLocation;
  if (profile?.profile_picture_url) score += weights.hasPhoto;

  const skillScore = Math.min((skills?.length || 0) / 5, 1) * weights.skills;
  score += skillScore;

  const timelineScore = Math.min((timeline?.length || 0) / 3, 1) * weights.timeline;
  score += timelineScore;

  const socialScore = Math.min((socialLinks?.length || 0) / 3, 1) * weights.social;
  score += socialScore;

  const achievementScore = Math.min((achievements?.length || 0) / ALL_BADGES.length, 1) * weights.achievements;
  score += achievementScore;

  return Math.round(Math.min(score, 100));
}

const Achievements = ({ achievements = [], profile, skills = [], timeline = [], socialLinks = [] }) => {
  const [showAll, setShowAll] = useState(false);
  const [newSeen, setNewSeen] = useState(new Set());

  const unlockedKeys = new Set((achievements || []).map((a) => a.achievement_key));
  const percent = computeCompletion(profile, skills, timeline, socialLinks, achievements);
  const level = getLevel(percent);

  useEffect(() => {
    const saved = localStorage.getItem('seenAchievements');
    const seen = saved ? new Set(JSON.parse(saved)) : new Set();
    const newIds = (achievements || [])
      .filter((a) => !seen.has(a.id))
      .map((a) => a.id);
    if (newIds.length) {
      setNewSeen(new Set(newIds));
      const merged = new Set([...seen, ...newIds]);
      const t = setTimeout(() => {
        localStorage.setItem('seenAchievements', JSON.stringify([...merged]));
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [achievements]);

  const displayedBadges = showAll ? ALL_BADGES : ALL_BADGES.slice(0, 6);

  return (
    <div className="card-dashboard animate-fade-in-up">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-primary/10">
          <Trophy className="text-primary w-5 h-5" aria-hidden />
        </div>
        <div>
          <h2 className="dashboard-title">Achievements</h2>
          <p className="dashboard-muted mt-0.5">
            Level {level} • {achievements.length} of {ALL_BADGES.length} unlocked
          </p>
        </div>
      </div>

      <div className="mb-6 p-4 rounded-xl bg-gray-50/80 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Profile completion</span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{percent}%</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-1.5">
          Level {level}/10 — {level >= 10 ? 'Complete!' : 'Fill more sections to level up'}
        </p>
      </div>

      {/* Badges grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedBadges.map((badge) => {
          const unlocked = unlockedKeys.has(badge.key);
          const unlockRecord = (achievements || []).find((a) => a.achievement_key === badge.key);
          const isNew = unlockRecord && newSeen.has(unlockRecord.id);
          const Icon = badge.icon;

          return (
            <div
              key={badge.key}
              className={`
                relative p-4 rounded-xl border transition-all duration-300
                ${unlocked
                  ? `bg-gray-50 dark:bg-gray-800/80 border-gray-200 dark:border-gray-600 ${isNew ? 'ring-2 ring-primary/40 animate-scale-in' : ''}`
                  : 'bg-gray-50/50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700 opacity-80'
                }
              `}
            >
              {isNew && (
                <span className="absolute -top-1 -right-1 px-2 py-0.5 bg-primary text-white text-xs font-semibold rounded-full">
                  NEW
                </span>
              )}
              <div className="flex items-start gap-3">
                <div
                  className={`
                    p-2 rounded-lg shrink-0 transition-all
                    ${unlocked ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500'}
                  `}
                >
                  <Icon size={20} aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className={`font-semibold text-sm ${unlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                    {badge.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{badge.description}</p>
                  {unlockRecord?.unlocked_at && (
                    <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-2">
                      Unlocked {new Date(unlockRecord.unlocked_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {ALL_BADGES.length > 6 && (
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-xl transition-colors"
        >
          {showAll ? 'Show less' : `View all ${ALL_BADGES.length} achievements`}
        </button>
      )}

      <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">How to unlock more</h4>
        <ul className="text-[13px] text-gray-600 dark:text-gray-400 space-y-1">
          <li>• Complete profile, title, and bio</li>
          <li>• Add skills and get endorsed</li>
          <li>• Add work experience and education</li>
          <li>• Connect social links and add career vision</li>
        </ul>
      </div>
    </div>
  );
};

export default Achievements;
