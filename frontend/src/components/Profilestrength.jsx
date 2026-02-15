import { TrendingUp, CheckCircle, AlertCircle, Target, Award } from 'lucide-react';
import { useState, useEffect } from 'react';

/**
 * INNOVATIVE FEATURE: Profile Strength Analyzer
 * 
 * Purpose: Provides recruiter-friendly insights and profile optimization guidance
 * This feature analyzes the profile and gives a "recruiter readiness" score with
 * specific, actionable recommendations to improve visibility and appeal.
 * 
 * Why recruiters will find this valuable:
 * 1. Shows profile completeness at a glance
 * 2. Highlights missing critical sections
 * 3. Provides data-driven insights (endorsement velocity, skill diversity)
 * 4. Indicates professional credibility markers
 */

const ProfileStrength = ({ profile, skills, timeline, socialLinks, achievements }) => {
  const [strength, setStrength] = useState({ score: 0, insights: [], level: 'Starter' });
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    analyzeProfile();
  }, [profile, skills, timeline, socialLinks, achievements]);

  const analyzeProfile = () => {
    if (!profile) {
      setStrength({ score: 0, insights: [], level: 'Starter' });
      return;
    }
    let score = 0;
    const insights = [];
    const completedItems = [];
    const missingItems = [];

    // Core Profile Analysis (30 points)
    if (profile.first_name && profile.last_name) {
      score += 5;
      completedItems.push('Full name provided');
    } else {
      missingItems.push({ text: 'Complete your name', impact: 'high', points: 5 });
    }

    if (profile.bio && profile.bio.length > 50) {
      score += 10;
      completedItems.push('Compelling bio written');
    } else if (profile.bio) {
      score += 5;
      missingItems.push({ text: 'Expand bio to 50+ characters', impact: 'medium', points: 5 });
    } else {
      missingItems.push({ text: 'Add professional bio', impact: 'high', points: 10 });
    }

    if (profile.title) {
      score += 5;
      completedItems.push('Professional title set');
    } else {
      missingItems.push({ text: 'Add current job title', impact: 'high', points: 5 });
    }

    if (profile.location) {
      score += 5;
      completedItems.push('Location specified');
    } else {
      missingItems.push({ text: 'Add location', impact: 'low', points: 5 });
    }

    if (profile.email) {
      score += 5;
      completedItems.push('Contact email provided');
    } else {
      missingItems.push({ text: 'Add contact email', impact: 'medium', points: 5 });
    }

    // Skills Analysis (25 points)
    if (skills.length >= 8) {
      score += 15;
      completedItems.push(`${skills.length} skills listed (excellent diversity)`);
    } else if (skills.length >= 5) {
      score += 10;
      completedItems.push(`${skills.length} skills listed`);
      missingItems.push({ text: 'Add 3+ more skills for better visibility', impact: 'medium', points: 5 });
    } else if (skills.length >= 3) {
      score += 5;
      missingItems.push({ text: 'Add 2-5 more core skills', impact: 'high', points: 10 });
    } else {
      missingItems.push({ text: 'Add at least 5 core skills', impact: 'critical', points: 15 });
    }

    // Skill Categories Diversity
    const categories = new Set(skills.map(s => s.category));
    if (categories.size >= 3) {
      score += 5;
      insights.push({
        type: 'positive',
        text: `Skills span ${categories.size} categories - shows versatility`
      });
    }

    // Endorsement Strength
    const totalEndorsements = skills.reduce((sum, s) => sum + (s.endorsement_count || 0), 0);
    if (totalEndorsements >= 20) {
      score += 5;
      insights.push({
        type: 'positive',
        text: `${totalEndorsements} endorsements demonstrate peer validation`
      });
    } else if (totalEndorsements >= 10) {
      insights.push({
        type: 'neutral',
        text: 'Growing endorsement count - share profile to gain more'
      });
    }

    // Experience Timeline (25 points)
    if (timeline.length >= 3) {
      score += 15;
      completedItems.push(`${timeline.length} positions showcase career progression`);
    } else if (timeline.length >= 2) {
      score += 10;
      completedItems.push(`${timeline.length} positions listed`);
      missingItems.push({ text: 'Add 1-2 more experiences', impact: 'medium', points: 5 });
    } else if (timeline.length === 1) {
      score += 5;
      missingItems.push({ text: 'Add previous positions', impact: 'high', points: 10 });
    } else {
      missingItems.push({ text: 'Add work experience', impact: 'critical', points: 15 });
    }

    // Timeline Quality Check
    const experiencesWithDescription = timeline.filter(t => t.description && t.description.length > 30);
    if (experiencesWithDescription.length >= 2) {
      score += 5;
      insights.push({
        type: 'positive',
        text: 'Detailed experience descriptions help recruiters understand your impact'
      });
    } else if (timeline.length > 0) {
      missingItems.push({ text: 'Add descriptions to experiences', impact: 'medium', points: 5 });
    }

    // Current Role Indicator
    const hasCurrentRole = timeline.some(t => t.is_current);
    if (hasCurrentRole) {
      score += 5;
      completedItems.push('Current position marked');
    } else if (timeline.length > 0) {
      insights.push({
        type: 'neutral',
        text: 'Mark your current position or indicate you\'re seeking opportunities'
      });
    }

    // Social Presence (10 points)
    if (socialLinks.length >= 3) {
      score += 10;
      completedItems.push(`${socialLinks.length} social profiles connected`);
    } else if (socialLinks.length >= 2) {
      score += 7;
      missingItems.push({ text: 'Add 1-2 more social profiles', impact: 'low', points: 3 });
    } else if (socialLinks.length === 1) {
      score += 3;
      missingItems.push({ text: 'Connect LinkedIn and GitHub', impact: 'medium', points: 7 });
    } else {
      missingItems.push({ text: 'Add professional social links', impact: 'medium', points: 10 });
    }

    // Achievement Score (10 points)
    if (achievements.length >= 4) {
      score += 10;
      insights.push({
        type: 'positive',
        text: `${achievements.length} achievements unlocked - demonstrates engagement`
      });
    } else if (achievements.length >= 2) {
      score += 5;
    }

    // Determine Level (neutral/neutral only)
    let level = 'Starter';
    let levelColor = 'text-neutral-600 dark:text-neutral-400';
    let progressColor = 'bg-neutral-500';
    if (score >= 85) {
      level = 'Expert';
      levelColor = 'text-neutral-900 dark:text-neutral-100';
      progressColor = 'bg-neutral-700';
      insights.push({ type: 'positive', text: 'Your profile is recruiter-ready and highly competitive.' });
    } else if (score >= 70) {
      level = 'Advanced';
      levelColor = 'text-neutral-800 dark:text-neutral-200';
      progressColor = 'bg-linkedin';
      insights.push({ type: 'positive', text: 'Strong profile. A few improvements will make you stand out more.' });
    } else if (score >= 50) {
      level = 'Intermediate';
      levelColor = 'text-neutral-700 dark:text-neutral-300';
      progressColor = 'bg-linkedin';
      insights.push({ type: 'neutral', text: 'Good foundation. Focus on high-impact items below.' });
    } else {
      insights.push({ type: 'neutral', text: 'Complete the critical items below to improve recruiter discovery.' });
    }

    // Sort missing items by impact
    const impactOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    missingItems.sort((a, b) => impactOrder[a.impact] - impactOrder[b.impact]);

    setStrength({ 
      score, 
      insights, 
      level, 
      levelColor,
      progressColor,
      completedItems,
      missingItems: missingItems.slice(0, 5) // Top 5 recommendations
    });
  };

  const getImpactColor = (impact) => {
    switch(impact) {
      case 'critical': return 'text-neutral-900 dark:text-neutral-100';
      case 'high': return 'text-neutral-800 dark:text-neutral-200';
      case 'medium': return 'text-neutral-700 dark:text-neutral-300';
      default: return 'text-neutral-600 dark:text-neutral-400';
    }
  };

  const getImpactBadge = (impact) => {
    switch(impact) {
      case 'critical': return 'Critical';
      case 'high': return 'High Impact';
      case 'medium': return 'Medium';
      default: return 'Nice to Have';
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 p-6 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white dark:bg-neutral-700 rounded-lg shadow-sm">
              <Target size={24} className="text-neutral-700 dark:text-neutral-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Profile Strength</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Recruiter Readiness Score</p>
            </div>
          </div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            {showDetails ? 'Hide Details' : 'View Details'}
          </button>
        </div>

        {/* Score Display */}
        <div className="flex items-end gap-4 mb-3">
          <div className="text-5xl font-bold text-neutral-900 dark:text-white">
            {strength.score}
            <span className="text-2xl text-neutral-400">/100</span>
          </div>
          <div className={`mb-2 px-3 py-1 rounded-full text-sm font-semibold ${strength.levelColor} bg-white dark:bg-neutral-700`}>
            {strength.level}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full ${strength.progressColor} transition-all duration-1000 ease-out rounded-full`}
            style={{ width: `${strength.score}%` }}
          />
        </div>
      </div>

      {/* Insights */}
      {strength.insights.length > 0 && (
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
          <div className="space-y-2">
            {strength.insights.map((insight, idx) => (
              <div key={idx} className="flex items-start gap-2">
                {insight.type === 'positive' ? (
                  <CheckCircle size={16} className="text-neutral-600 dark:text-neutral-400 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle size={16} className="text-neutral-500 dark:text-neutral-400 mt-0.5 flex-shrink-0" />
                )}
                <p className="text-sm text-neutral-700 dark:text-neutral-300">{insight.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Recommendations */}
      {showDetails && (
        <div className="p-6 space-y-6">
          {/* Missing Items */}
          {strength.missingItems.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                <TrendingUp size={16} />
                Top Recommendations (+{strength.missingItems.reduce((sum, item) => sum + item.points, 0)} points)
              </h3>
              <div className="space-y-2">
                {strength.missingItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700"
                  >
                    <div className="flex items-start gap-2 flex-1">
                      <AlertCircle size={16} className={`mt-0.5 flex-shrink-0 ${getImpactColor(item.impact)}`} />
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">{item.text}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${getImpactColor(item.impact)} bg-white dark:bg-neutral-800`}>
                        {getImpactBadge(item.impact)}
                      </span>
                      <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                        +{item.points}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed Items */}
          {strength.completedItems.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                <Award size={16} />
                What's Working Well
              </h3>
              <div className="grid gap-2">
                {strength.completedItems.slice(0, 5).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"
                  >
                    <CheckCircle size={14} className="text-neutral-600 dark:text-neutral-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileStrength;