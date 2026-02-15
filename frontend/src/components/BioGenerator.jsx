// import { Sparkles, Wand2 } from 'lucide-react';
// import { useState } from 'react';
// import { profileApi } from '../utils/api';

// const BioGenerator = ({ skills, onBioGenerated }) => {
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     interests: ''
//   });
//   const [generatedBio, setGeneratedBio] = useState('');
//   const [showGenerator, setShowGenerator] = useState(false);

//   const handleGenerate = async () => {
//     if (skills.length === 0) {
//       alert('Please add at least one skill first!');
//       return;
//     }

//     setIsGenerating(true);
//     setGeneratedBio('');

//     try {
//       const response = await profileApi.generateBio({
//         skills: skills.map(s => s.skill_name),
//         title: formData.title,
//         interests: formData.interests
//       });

//       setGeneratedBio(response.data.bio);
//     } catch (error) {
//       console.error('Error generating bio:', error);
//       alert('Failed to generate bio. Please try again.');
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleUseBio = () => {
//     onBioGenerated(generatedBio);
//     setShowGenerator(false);
//     setGeneratedBio('');
//     setFormData({ title: '', interests: '' });
//   };

//   if (!showGenerator) {
//     return (
//       <button
//         onClick={() => setShowGenerator(true)}
//         className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
//       >
//         <Sparkles size={20} />
//         Generate AI Bio
//       </button>
//     );
//   }

//   return (
//     <div className="card border-2 border-purple-200 dark:border-purple-800 animate-slide-up">
//       <div className="flex items-center gap-2 mb-4">
//         <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
//           <Wand2 size={20} className="text-white" />
//         </div>
//         <h3 className="text-xl font-bold">AI Bio Generator</h3>
//       </div>

//       <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
//         Let AI craft a professional bio based on your skills and interests
//       </p>

//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium mb-2">Your Title (Optional)</label>
//           <input
//             type="text"
//             value={formData.title}
//             onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//             className="input-field"
//             placeholder="e.g., Full Stack Developer"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-2">Interests (Optional)</label>
//           <input
//             type="text"
//             value={formData.interests}
//             onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
//             className="input-field"
//             placeholder="e.g., open source, hiking, photography"
//           />
//         </div>

//         <button
//           onClick={handleGenerate}
//           disabled={isGenerating}
//           className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isGenerating ? (
//             <>
//               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               Generating...
//             </>
//           ) : (
//             <>
//               <Sparkles size={18} />
//               Generate Bio
//             </>
//           )}
//         </button>

//         {generatedBio && (
//           <div className="mt-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
//             <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Generated Bio:
//             </p>
//             <p className="text-gray-900 dark:text-gray-100 leading-relaxed mb-4">
//               {generatedBio}
//             </p>
//             <div className="flex gap-2">
//               <button onClick={handleUseBio} className="btn-primary flex-1">
//                 Use This Bio
//               </button>
//               <button onClick={handleGenerate} className="btn-secondary">
//                 Regenerate
//               </button>
//             </div>
//           </div>
//         )}

//         <button
//           onClick={() => setShowGenerator(false)}
//           className="btn-secondary w-full"
//         >
//           Close Generator
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BioGenerator;
import { Sparkles, Wand2 } from 'lucide-react';
import { useState } from 'react';
import { profileApi } from '../utils/api';

const BioGenerator = ({ skills, onBioGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    interests: ''
  });
  const [generatedBio, setGeneratedBio] = useState('');
  const [showGenerator, setShowGenerator] = useState(false);

  const handleGenerate = async () => {
    if (skills.length === 0) {
      alert('Please add at least one skill first!');
      return;
    }

    setIsGenerating(true);
    setGeneratedBio('');

    try {
      const response = await profileApi.generateBio({
        skills: skills.map(s => s.skill_name),
        title: formData.title,
        interests: formData.interests
      });

      setGeneratedBio(response.bio);
    } catch (err) {
      alert('Failed to generate bio. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseBio = async () => {
    if (!generatedBio?.trim()) return;
    await onBioGenerated(generatedBio.trim());
    setShowGenerator(false);
    setGeneratedBio('');
    setFormData({ title: '', interests: '' });
  };

  if (!showGenerator) {
    return (
      <button
        onClick={() => setShowGenerator(true)}
        className="w-full py-3 px-4 bg-linkedin hover:bg-linkedin-hover text-white font-medium rounded-full transition-colors flex items-center justify-center gap-2 shadow-sm"
      >
        <Sparkles size={20} />
        Generate AI Bio
      </button>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-linkedin rounded-lg">
          <Wand2 size={20} className="text-white" />
        </div>
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">AI Bio Generator</h3>
      </div>

      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        Let AI craft a professional bio based on your skills and interests
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Your Title (Optional)</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-linkedin focus:border-transparent text-neutral-900 dark:text-white"
            placeholder="e.g., Full Stack Developer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Interests (Optional)</label>
          <input
            type="text"
            value={formData.interests}
            onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
            className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-linkedin focus:border-transparent text-neutral-900 dark:text-white"
            placeholder="e.g., open source, hiking, photography"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full px-4 py-2 bg-linkedin hover:bg-linkedin-hover text-white rounded-full transition-colors flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white dark:border-neutral-800 border-t-transparent rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Generate Bio
            </>
          )}
        </button>

        {generatedBio && (
            <div className="mt-4 p-4 bg-neutral-50 dark:bg-neutral-800/80 rounded-lg border border-neutral-200 dark:border-neutral-600">
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Generated Bio:
            </p>
            <p className="text-neutral-900 dark:text-neutral-100 leading-relaxed mb-4">
              {generatedBio}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleUseBio}
                className="flex-1 px-4 py-2 bg-linkedin hover:bg-linkedin-hover text-white rounded-full transition-colors font-medium"
              >
                Use This Bio
              </button>
              <button
                type="button"
                onClick={handleGenerate}
                className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors font-medium"
              >
                Regenerate
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setShowGenerator(false)}
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium"
        >
          Close Generator
        </button>
      </div>
    </div>
  );
};

export default BioGenerator;