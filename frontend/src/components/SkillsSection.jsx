// import { ThumbsUp, Plus, X, Save } from 'lucide-react';
// import { useState } from 'react';
// import { profileApi } from '../utils/api';

// const SkillsSection = ({ skills, setSkills, isEditing }) => {
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [newSkill, setNewSkill] = useState({ skill_name: '', category: '' });
//   const [endorsingSkills, setEndorsingSkills] = useState(new Set());
//   const [endorsedSkills, setEndorsedSkills] = useState(() => {
//     const saved = localStorage.getItem('endorsedSkills');
//     return saved ? new Set(JSON.parse(saved)) : new Set();
//   });

//   // const handleAddSkill = async (e) => {
//   //   if (!newSkill.skill_name.trim()) return;

//   //   try {
//   //     const response = await profileApi.addSkill(1, newSkill);
//   //     setSkills([...skills, response.data]);
//   //     setNewSkill({ skill_name: '', category: '' });
//   //     setShowAddForm(false);
//   //   } catch (error) {
//   //     console.error('Error adding skill:', error);
//   //     alert('Failed to add skill');
//   //   }
//   // };
//   const handleAddSkill = async () => {
//   if (!newSkill.skill_name.trim()) return;

//   try {
//     const response = await profileApi.addSkill(1, newSkill);

//     // update UI without reload
//     setSkills([...skills, response]);
//     setNewSkill({ skill_name: '', category: '' });
//     setShowAddForm(false);
//   } catch (error) {
//     console.error('Error adding skill:', error);
//     alert('Failed to add skill');
//   }
// };


//   // const handleDeleteSkill = async (skillId) => {
//   //   try {
//   //     await profileApi.deleteSkill(skillId);
//   //     setSkills(skills.filter(s => s.id !== skillId));
//   //   } catch (error) {
//   //     console.error('Error deleting skill:', error);
//   //     alert('Failed to delete skill');
//   //   }
//   // };
//   const handleDeleteSkill = async (skillId) => {
//   try {
//     await profileApi.deleteSkill(1, skillId);
//     setSkills(skills.filter(s => s.id !== skillId));
//   } catch (error) {
//     console.error('Error deleting skill:', error);
//     alert('Failed to delete skill');
//   }
// };


//   const handleEndorse = async (skillId) => {
//     if (endorsedSkills.has(skillId) || endorsingSkills.has(skillId)) return;

//     setEndorsingSkills(new Set([...endorsingSkills, skillId]));

//     try {
//       const response = await profileApi.endorseSkill(skillId);
//       setSkills(skills.map(s => s.id === skillId ? response.data : s));
      
//       const newEndorsed = new Set([...endorsedSkills, skillId]);
//       setEndorsedSkills(newEndorsed);
//       localStorage.setItem('endorsedSkills', JSON.stringify([...newEndorsed]));
//     } catch (error) {
//       console.error('Error endorsing skill:', error);
//       if (error.response?.data?.error === 'Already endorsed this skill') {
//         const newEndorsed = new Set([...endorsedSkills, skillId]);
//         setEndorsedSkills(newEndorsed);
//         localStorage.setItem('endorsedSkills', JSON.stringify([...newEndorsed]));
//       }
//     } finally {
//       setEndorsingSkills(new Set([...endorsingSkills].filter(id => id !== skillId)));
//     }
//   };

//   const getSkillColor = (index) => {
//     const colors = [
//       'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
//       'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
//       'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
//       'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
//       'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
//       'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
//     ];
//     return colors[index % colors.length];
//   };

//   return (
//     <div className="card animate-slide-up">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-2xl font-bold mb-1">Skills & Expertise</h2>
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             Click 👍 to endorse skills you recognize
//           </p>
//         </div>
//         {isEditing && (
//           <button
//             onClick={() => setShowAddForm(!showAddForm)}
//             className="btn-primary flex items-center gap-2"
//           >
//             {showAddForm ? <X size={18} /> : <Plus size={18} />}
//             {showAddForm ? 'Cancel' : 'Add Skill'}
//           </button>
//         )}
//       </div>

//       {showAddForm && (
//         <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
//           <div className="grid md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-2">Skill Name</label>
//               <input
//                 type="text"
//                 value={newSkill.skill_name}
//                 onChange={(e) => setNewSkill({ ...newSkill, skill_name: e.target.value })}
//                 className="input-field"
//                 placeholder="e.g., React"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-2">Category</label>
//               <input
//                 type="text"
//                 value={newSkill.category}
//                 onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
//                 className="input-field"
//                 placeholder="e.g., Frontend"
//               />
//             </div>
//           </div>
//           <button
//             onClick={handleAddSkill}
//             className="btn-primary mt-4 flex items-center gap-2"
//           >
//             <Save size={18} />
//             Add Skill
//           </button>
//         </div>
//       )}

//       <div className="flex flex-wrap gap-3">
//         {skills.length === 0 ? (
//           <p className="text-gray-500 dark:text-gray-400">No skills added yet.</p>
//         ) : (
//           skills.map((skill, index) => (
//             <div
//               key={skill.id}
//               className={`flex items-center gap-3 px-4 py-2 rounded-full ${getSkillColor(index)} transition-all duration-200 hover:shadow-md group`}
//             >
//               <span className="font-medium">{skill.skill_name}</span>
              
//               <button
//                 onClick={() => handleEndorse(skill.id)}
//                 disabled={endorsedSkills.has(skill.id) || endorsingSkills.has(skill.id)}
//                 className={`flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-200 ${
//                   endorsedSkills.has(skill.id)
//                     ? 'bg-white/50 dark:bg-black/20 cursor-not-allowed'
//                     : 'bg-white/80 dark:bg-black/30 hover:bg-white dark:hover:bg-black/40 cursor-pointer'
//                 }`}
//                 title={endorsedSkills.has(skill.id) ? 'Already endorsed' : 'Click to endorse'}
//               >
//                 <ThumbsUp
//                   size={14}
//                   className={endorsedSkills.has(skill.id) ? 'fill-current' : ''}
//                 />
//                 <span className="text-xs font-semibold">{skill.endorsement_count || 0}</span>
//               </button>

//               {isEditing && (
//                 <button
//                   onClick={() => handleDeleteSkill(skill.id)}
//                   className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//                 >
//                   <X size={16} />
//                 </button>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default SkillsSection;
import { ThumbsUp, Plus, X, Save } from 'lucide-react';
import { useState } from 'react';
import { profileApi } from '../utils/api';

const SkillsSection = ({ skills, setSkills, isEditing }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSkill, setNewSkill] = useState({ skill_name: '', category: '' });
  const [endorsingSkills, setEndorsingSkills] = useState(new Set());
  const [endorsedSkills, setEndorsedSkills] = useState(() => {
    const saved = localStorage.getItem('endorsedSkills');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.skill_name.trim()) return;

    try {
      const addedSkill = await profileApi.addSkill(1, newSkill);
      setSkills([...skills, addedSkill]);
      setNewSkill({ skill_name: '', category: '' });
      setShowAddForm(false);
    } catch (err) {
      alert('Failed to add skill');
    }
  };

  const handleDeleteSkill = async (skillId) => {
    try {
      await profileApi.deleteSkill(1, skillId);
      setSkills(skills.filter(s => s.id !== skillId));
    } catch (err) {
      alert('Failed to delete skill');
    }
  };

  const handleEndorse = async (skillId) => {
    if (endorsedSkills.has(skillId) || endorsingSkills.has(skillId)) return;

    setEndorsingSkills(new Set([...endorsingSkills, skillId]));

    try {
      const updatedSkill = await profileApi.endorseSkill(skillId);
      setSkills(skills.map(s => s.id === skillId ? updatedSkill : s));
      
      const newEndorsed = new Set([...endorsedSkills, skillId]);
      setEndorsedSkills(newEndorsed);
      localStorage.setItem('endorsedSkills', JSON.stringify([...newEndorsed]));
    } catch (err) {
      if (err.error === 'Already endorsed this skill' || err.message?.includes('Already endorsed')) {
        const newEndorsed = new Set([...endorsedSkills, skillId]);
        setEndorsedSkills(newEndorsed);
        localStorage.setItem('endorsedSkills', JSON.stringify([...newEndorsed]));
      }
    } finally {
      setEndorsingSkills(new Set([...endorsingSkills].filter(id => id !== skillId)));
    }
  };

  const getSkillColor = (index) => {
    const colors = [
      'bg-neutral-100 text-neutral-800 border-neutral-300 dark:bg-neutral-700/50 dark:text-neutral-200 dark:border-neutral-600',
      'bg-neutral-100 text-neutral-800 border-neutral-300 dark:bg-neutral-700/50 dark:text-neutral-200 dark:border-neutral-600',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">Skills & Expertise</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Click 👍 to endorse skills you recognize
          </p>
        </div>
        {isEditing && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-linkedin text-white rounded-full hover:bg-linkedin-hover transition-colors flex items-center gap-2 font-medium"
          >
            {showAddForm ? <X size={18} /> : <Plus size={18} />}
            {showAddForm ? 'Cancel' : 'Add Skill'}
          </button>
        )}
      </div>

      {showAddForm && (
        <form onSubmit={handleAddSkill} className="mb-6 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Skill Name</label>
              <input
                type="text"
                value={newSkill.skill_name}
                onChange={(e) => setNewSkill({ ...newSkill, skill_name: e.target.value })}
                className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-linkedin focus:border-transparent text-neutral-900 dark:text-white"
                placeholder="e.g., React"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Category</label>
              <input
                type="text"
                value={newSkill.category}
                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-linkedin focus:border-transparent text-neutral-900 dark:text-white"
                placeholder="e.g., Frontend"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-linkedin text-white rounded-full hover:bg-linkedin-hover transition-colors flex items-center gap-2 font-medium"
          >
            <Save size={18} />
            Add Skill
          </button>
        </form>
      )}

      <div className="flex flex-wrap gap-3">
        {skills.length === 0 ? (
          <p className="text-blue-500 dark:text-blue-400">No skills added yet.</p>
        ) : (
          skills.map((skill, index) => (
            <div
              key={skill.id}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border ${getSkillColor(index)} transition-all duration-200 hover:shadow-md group`}
            >
              <span className="font-medium">{skill.skill_name}</span>
              
              <button
                onClick={() => handleEndorse(skill.id)}
                disabled={endorsedSkills.has(skill.id) || endorsingSkills.has(skill.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all duration-200 ${
                  endorsedSkills.has(skill.id)
                    ? 'bg-white/60 dark:bg-black/20 cursor-not-allowed'
                    : 'bg-white/90 dark:bg-black/30 hover:bg-white dark:hover:bg-black/40 cursor-pointer shadow-sm'
                }`}
                title={endorsedSkills.has(skill.id) ? 'Already endorsed' : 'Click to endorse'}
              >
                <ThumbsUp
                  size={14}
                  className={endorsedSkills.has(skill.id) ? 'fill-current' : ''}
                />
                <span className="text-xs font-semibold">{skill.endorsement_count || 0}</span>
              </button>

              {isEditing && (
                <button
                  onClick={() => handleDeleteSkill(skill.id)}
                  className="ml-1 p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                >
                  <X size={16} className="text-red-600 dark:text-red-400" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SkillsSection;