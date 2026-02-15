import { useState } from 'react';
import { FileText, Upload, TrendingUp, AlertCircle, CheckCircle, X } from 'lucide-react';
import { profileApi } from '../utils/api';

const ATSAnalyzer = ({ profileId, resume, onUpdate }) => {
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      alert('Please paste your resume text');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await profileApi.analyzeResume({
        profileId,
        resumeText,
        targetRole
      });
      setAnalysis(result);
    } catch (error) {
      alert('Failed to analyze resume');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900/30';
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900/30';
    return 'bg-red-100 dark:bg-red-900/30';
  };

  const inputClass = "w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-linkedin focus:border-transparent text-neutral-900 dark:text-white";

  if (!showAnalyzer) {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-linkedin/10 rounded-lg">
            <FileText className="text-linkedin" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
              Resume & ATS Analyzer
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Check your resume's ATS compatibility score
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAnalyzer(true)}
          className="w-full px-4 py-3 bg-linkedin hover:bg-linkedin-hover text-white rounded-full transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <Upload size={18} />
          Analyze Your Resume
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FileText className="text-linkedin" size={24} />
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
            ATS Resume Analyzer
          </h2>
        </div>
        <button
          onClick={() => {
            setShowAnalyzer(false);
            setAnalysis(null);
            setResumeText('');
            setTargetRole('');
          }}
          className="p-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Target Role (Optional)
          </label>
          <input
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className={inputClass}
            placeholder="e.g., Full Stack Developer, Data Scientist"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Paste Your Resume Text
          </label>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className={inputClass}
            rows={8}
            placeholder="Paste your complete resume text here..."
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="w-full px-4 py-2 bg-linkedin hover:bg-linkedin-hover text-white rounded-full transition-colors flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <TrendingUp size={18} />
              Analyze Resume
            </>
          )}
        </button>
      </div>

      {analysis && (
        <div className="space-y-6 border-t border-neutral-200 dark:border-neutral-700 pt-6">
          {/* Score Display */}
          <div className={`${getScoreBgColor(analysis.score)} rounded-lg p-6 text-center`}>
            <div className={`text-5xl font-bold ${getScoreColor(analysis.score)} mb-2`}>
              {analysis.score}
            </div>
            <div className="text-sm text-neutral-700 dark:text-neutral-300 font-medium mb-1">
              ATS Compatibility Score
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {analysis.summary}
            </p>
          </div>

          {/* Found Keywords */}
          {analysis.foundKeywords && (
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                <CheckCircle size={18} className="text-green-600" />
                Keywords Found
              </h3>
              <div className="space-y-3">
                {analysis.foundKeywords.technical?.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Technical Skills:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {analysis.foundKeywords.technical.map((keyword, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {analysis.foundKeywords.actionVerbs?.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Action Verbs:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {analysis.foundKeywords.actionVerbs.map((verb, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                        >
                          {verb}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Missing Keywords */}
          {analysis.missingKeywords?.length > 0 && (
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                <AlertCircle size={18} className="text-yellow-600" />
                Consider Adding
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysis.missingKeywords.map((keyword, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Issues */}
          {analysis.issues?.length > 0 && (
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                <AlertCircle size={18} className="text-red-600" />
                Issues Detected
              </h3>
              <ul className="space-y-2">
                {analysis.issues.map((issue, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300"
                  >
                    <span className="text-red-600 mt-0.5">•</span>
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Suggestions */}
          {analysis.suggestions?.length > 0 && (
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                <CheckCircle size={18} className="text-linkedin" />
                Suggestions
              </h3>
              <ul className="space-y-2">
                {analysis.suggestions.map((suggestion, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300"
                  >
                    <span className="text-linkedin mt-0.5">✓</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ATSAnalyzer;