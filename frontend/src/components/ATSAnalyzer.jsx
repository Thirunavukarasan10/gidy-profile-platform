import { useState, useCallback } from 'react';
import { FileText, Upload, TrendingUp, AlertCircle, CheckCircle, X, Trash2 } from 'lucide-react';
import { profileApi } from '../utils/api';

const ATSAnalyzer = ({ profileId, resume, onUpdate }) => {
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [fileName, setFileName] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      alert('Please paste or upload your resume text.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysis(null);
    try {
      const result = await profileApi.analyzeResume({
        profileId,
        resumeText,
        targetRole,
      });
      setAnalysis(result);
    } catch (error) {
      alert('Failed to analyze resume');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = useCallback(() => {
    setResumeText('');
    setFileName('');
    setAnalysis(null);
  }, []);

  const readFileAsText = (file) => {
    if (!file) return;
    const isText = file.type === 'text/plain' || /\.(txt|md)$/i.test(file.name);
    if (!isText) {
      alert('Please use a .txt or .md file, or paste your resume text.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setResumeText(reader.result);
      setFileName(file.name);
    };
    reader.readAsText(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer?.files?.[0];
    readFileAsText(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onFileInput = (e) => {
    const file = e.target.files?.[0];
    readFileAsText(file);
    e.target.value = '';
  };

  const getScoreColor = (score) => {
    if (score >= 80) return { text: 'text-gray-900 dark:text-white', stroke: 'stroke-gray-700 dark:stroke-gray-300' };
    if (score >= 60) return { text: 'text-gray-700 dark:text-gray-200', stroke: 'stroke-gray-500 dark:stroke-gray-400' };
    return { text: 'text-gray-600 dark:text-gray-400', stroke: 'stroke-gray-400 dark:stroke-gray-500' };
  };

  const getScoreBg = (_score) => 'bg-gray-50 dark:bg-gray-800/50';

  const getStrengthLabel = (score) => {
    if (score >= 80) return 'Strong';
    if (score >= 60) return 'Moderate';
    return 'Needs work';
  };

  if (!showAnalyzer) {
    return (
      <div className="card-dashboard animate-fade-in-up">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-primary/10">
            <FileText className="text-primary w-5 h-5" aria-hidden />
          </div>
          <div>
            <h2 className="dashboard-title">Resume & ATS</h2>
            <p className="dashboard-muted mt-0.5">Check compatibility and get suggestions</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowAnalyzer(true)}
          className="btn-primary-dash w-full flex items-center justify-center gap-2"
        >
          <Upload size={18} aria-hidden />
          Analyze resume
        </button>
      </div>
    );
  }

  return (
    <div className="card-dashboard animate-fade-in-up">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <FileText className="text-primary w-5 h-5" aria-hidden />
          <h2 className="dashboard-title">ATS Resume Analyzer</h2>
        </div>
        <button
          type="button"
          onClick={() => { setShowAnalyzer(false); handleClear(); setTargetRole(''); }}
          className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
          aria-label="Close analyzer"
        >
          <X size={20} />
        </button>
      </div>

      {/* Target role */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target role (optional)</label>
        <input
          type="text"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          className="input-dashboard"
          placeholder="e.g., Full Stack Developer"
        />
      </div>

      {/* Drag & drop + paste */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Resume text</label>
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className={`
            border-2 border-dashed rounded-xl p-6 text-center transition-colors
            ${isDragging ? 'border-gray-500 bg-gray-100 dark:bg-gray-800' : 'border-gray-200 dark:border-gray-600'}
          `}
        >
          {fileName && (
            <div className="flex items-center justify-center gap-2 mb-2">
              <FileText size={18} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{fileName}</span>
              <button
                type="button"
                onClick={handleClear}
                className="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded"
                aria-label="Remove file"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
          <input
            type="file"
            accept=".txt,.md,text/plain"
            onChange={onFileInput}
            className="sr-only"
            id="ats-file-input"
          />
          <label htmlFor="ats-file-input" className="cursor-pointer text-sm text-gray-700 dark:text-gray-200 hover:underline font-medium">
            Upload .txt or .md
          </label>
          <span className="text-gray-500 dark:text-gray-400 mx-2">or paste below</span>
        </div>
        <textarea
          value={resumeText}
          onChange={(e) => { setResumeText(e.target.value); if (!e.target.value) setFileName(''); }}
          className="input-dashboard mt-2"
          rows={6}
          placeholder="Paste your resume text here..."
        />
      </div>

      <button
        type="button"
        onClick={handleAnalyze}
        disabled={!resumeText.trim() || isAnalyzing}
        className="btn-primary-dash w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAnalyzing ? (
          <>
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Analyzing…
          </>
        ) : (
          <>
            <TrendingUp size={18} />
            Analyze resume
          </>
        )}
      </button>

      {analysis && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-6 animate-fade-in">
          {/* Circular score + strength */}
          <div className={`rounded-2xl p-6 ${getScoreBg(analysis.score)}`}>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-28 h-28 flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200 dark:text-gray-600"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.5 a 15.5 15.5 0 0 1 0 31 a 15.5 15.5 0 0 1 0 -31"
                  />
                  <path
                    className={getScoreColor(analysis.score).stroke}
                    strokeWidth="3"
                    strokeDasharray={`${analysis.score} 100`}
                    strokeLinecap="round"
                    fill="none"
                    pathLength="100"
                    d="M18 2.5 a 15.5 15.5 0 0 1 0 31 a 15.5 15.5 0 0 1 0 -31"
                  />
                </svg>
                <span className={`absolute inset-0 flex items-center justify-center text-2xl font-bold ${getScoreColor(analysis.score).text}`}>
                  {analysis.score}
                </span>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">ATS score</p>
                <p className={`text-lg font-semibold ${getScoreColor(analysis.score).text}`}>
                  {getStrengthLabel(analysis.score)}
                </p>
                {analysis.summary && (
                  <p className="text-[13px] text-gray-600 dark:text-gray-400 mt-1 max-w-xs">{analysis.summary}</p>
                )}
              </div>
            </div>
          </div>

          {/* Strength areas (keywords found) */}
          {analysis.foundKeywords && (analysis.foundKeywords.technical?.length > 0 || analysis.foundKeywords.actionVerbs?.length > 0) && (
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <CheckCircle size={18} className="text-gray-600 dark:text-gray-400" />
                Strength areas
              </h3>
              <div className="space-y-3">
                {analysis.foundKeywords.technical?.length > 0 && (
                  <div>
                    <p className="text-[13px] font-medium text-gray-600 dark:text-gray-400 mb-1.5">Technical</p>
                    <div className="flex flex-wrap gap-2">
                      {analysis.foundKeywords.technical.map((kw, i) => (
                        <span key={i} className="px-2.5 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-sm">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {analysis.foundKeywords.actionVerbs?.length > 0 && (
                  <div>
                    <p className="text-[13px] font-medium text-gray-600 dark:text-gray-400 mb-1.5">Action verbs</p>
                    <div className="flex flex-wrap gap-2">
                      {analysis.foundKeywords.actionVerbs.map((v, i) => (
                        <span key={i} className="px-2.5 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-sm">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Missing keywords */}
          {analysis.missingKeywords?.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <AlertCircle size={18} className="text-gray-600 dark:text-gray-400" />
                Consider adding
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysis.missingKeywords.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Issues */}
          {analysis.issues?.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <AlertCircle size={18} className="text-gray-600 dark:text-gray-400" />
                Issues
              </h3>
              <ul className="space-y-1.5">
                {analysis.issues.map((issue, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-gray-500 mt-0.5">•</span>
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Suggestions */}
          {analysis.suggestions?.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <CheckCircle size={18} className="text-gray-600 dark:text-gray-400" />
                Suggestions
              </h3>
              <ul className="space-y-1.5">
                {analysis.suggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-gray-700 dark:text-gray-200 mt-0.5">✓</span>
                    {s}
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
