import { useState } from 'react';
import { FileText, Upload, TrendingUp, AlertCircle, CheckCircle, X, Trash2 } from 'lucide-react';
import { profileApi } from '../utils/api';

const ATSAnalyzer = ({ profileId }) => {
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      alert('Please paste your resume text.');
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

  const handleClear = () => {
    setResumeText('');
    setAnalysis(null);
  };

  if (!showAnalyzer) {
    return (
      <div className="card-dashboard">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="text-primary w-5 h-5" />
          <div>
            <h2 className="dashboard-title">Resume & ATS</h2>
            <p className="dashboard-muted mt-0.5">
              Check compatibility and get suggestions
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowAnalyzer(true)}
          className="btn-primary-dash w-full flex items-center justify-center gap-2"
        >
          <Upload size={18} />
          Analyze resume
        </button>
      </div>
    );
  }

  return (
    <div className="card-dashboard">
      <div className="flex justify-between items-center mb-4">
        <h2 className="dashboard-title">ATS Resume Analyzer</h2>
        <button
          onClick={() => { setShowAnalyzer(false); handleClear(); }}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl"
        >
          <X size={20} />
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Target role (optional)</label>
        <input
          type="text"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          placeholder="e.g., Senior Full Stack Developer"
          className="input-dashboard"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Paste your resume text</label>
        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          className="input-dashboard"
          rows={8}
          placeholder="Paste your resume content here..."
        />
      </div>

      {resumeText && (
        <button
          onClick={handleClear}
          className="text-sm text-gray-500 hover:text-gray-700 mb-4 flex items-center gap-2"
        >
          <Trash2 size={16} />
          Clear text
        </button>
      )}

      <button
        onClick={handleAnalyze}
        disabled={!resumeText.trim() || isAnalyzing}
        className="btn-primary-dash w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
      </button>

      {analysis && (
        <div className="mt-6 space-y-4">
          {/* Display analysis results here */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Analysis Results</h3>
            <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
              {JSON.stringify(analysis, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSAnalyzer;