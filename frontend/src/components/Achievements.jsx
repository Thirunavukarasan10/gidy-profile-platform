import { Trophy, Award, Star, Zap, Target, Medal } from 'lucide-react';
import { useState, useEffect } from 'react';

const Achievements = ({ achievements }) => {
  const [showAll, setShowAll] = useState(false);
  const [newAchievements, setNewAchievements] = useState(new Set());

  useEffect(() => {
    const savedIds = localStorage.getItem('seenAchievements');
    const seenIds = savedIds ? new Set(JSON.parse(savedIds)) : new Set();
    
    const newOnes = achievements
      .filter(a => !seenIds.has(a.id))
      .map(a => a.id);
    
    if (newOnes.length > 0) {
      setNewAchievements(new Set(newOnes));
      
      // Mark as seen after showing
      setTimeout(() => {
        const allSeen = new Set([...seenIds, ...newOnes]);
        localStorage.setItem('seenAchievements', JSON.stringify([...allSeen]));
      }, 3000);
    }
  }, [achievements]);

  const getAchievementIcon = (key) => {
    const icons = {
      profile_complete: Trophy,
      skilled_professional: Star,
      career_builder: Target,
      social_butterfly: Zap,
      highly_endorsed: Award,
      expert_level: Medal
    };
    return icons[key] || Trophy;
  };

  const getAchievementColor = (key) => {
    const colors = {
      profile_complete: 'from-yellow-400 to-orange-500',
      skilled_professional: 'from-blue-400 to-indigo-500',
      career_builder: 'from-green-400 to-emerald-500',
      social_butterfly: 'from-purple-400 to-pink-500',
      highly_endorsed: 'from-red-400 to-rose-500',
      expert_level: 'from-amber-400 to-yellow-500'
    };
    return colors[key] || 'from-gray-400 to-gray-500';
  };

  if (achievements.length === 0) {
    return null;
  }

  const displayedAchievements = showAll ? achievements : achievements.slice(0, 3);

  return (
    <div className="card animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg">
          <Trophy size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Achievements</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {achievements.length} milestone{achievements.length !== 1 ? 's' : ''} unlocked
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-4">
        {displayedAchievements.map((achievement) => {
          const Icon = getAchievementIcon(achievement.achievement_key);
          const gradient = getAchievementColor(achievement.achievement_key);
          const isNew = newAchievements.has(achievement.id);

          return (
            <div
              key={achievement.id}
              className={`relative p-4 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                isNew ? 'animate-pulse-slow ring-4 ring-yellow-300' : ''
              }`}
            >
              {isNew && (
                <div className="absolute -top-2 -right-2 px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full animate-bounce">
                  NEW!
                </div>
              )}
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Icon size={24} />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold mb-1">{achievement.achievement_name}</h3>
                  <p className="text-xs text-white/90 leading-relaxed">
                    {achievement.achievement_description}
                  </p>
                </div>
              </div>

              <div className="mt-3 text-xs text-white/80">
                Unlocked {new Date(achievement.unlocked_at).toLocaleDateString()}
              </div>
            </div>
          );
        })}
      </div>

      {achievements.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
        >
          {showAll ? 'Show Less' : `View All ${achievements.length} Achievements`}
        </button>
      )}

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <h4 className="font-semibold mb-2 text-sm">How to Unlock More:</h4>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>• Complete your profile information</li>
          <li>• Add skills to showcase your expertise</li>
          <li>• Build your work timeline</li>
          <li>• Connect your social profiles</li>
          <li>• Get endorsed by visitors</li>
        </ul>
      </div>
    </div>
  );
};

export default Achievements;
