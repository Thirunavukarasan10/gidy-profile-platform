// import { Github, Linkedin, Twitter, Globe, Link as LinkIcon, Plus, X, Save, Trash2 } from 'lucide-react';
// import { useState } from 'react';
// import { profileApi } from '../utils/api';

// const SocialLinks = ({ socialLinks, setSocialLinks, isEditing }) => {
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [formData, setFormData] = useState({ platform: '', url: '', icon: '' });

//   const getIcon = (iconName) => {
//     const icons = {
//       github: Github,
//       linkedin: Linkedin,
//       twitter: Twitter,
//       globe: Globe,
//       default: LinkIcon
//     };
//     return icons[iconName?.toLowerCase()] || icons.default;
//   };

//   const handleAdd = async () => {
//     if (!formData.platform.trim() || !formData.url.trim()) return;

//     try {
//       const response = await profileApi.addSocialLink(1, formData);
//       setSocialLinks([...socialLinks, response.data]);
//       setFormData({ platform: '', url: '', icon: '' });
//       setShowAddForm(false);
//     } catch (error) {
//       console.error('Error adding social link:', error);
//       alert('Failed to add social link');
//     }
//   };

//   const handleDelete = async (linkId) => {
//     try {
//       await profileApi.deleteSocialLink(linkId);
//       setSocialLinks(socialLinks.filter(link => link.id !== linkId));
//     } catch (error) {
//       console.error('Error deleting social link:', error);
//       alert('Failed to delete social link');
//     }
//   };

//   return (
//     <div className="card animate-slide-up">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-2xl font-bold mb-1">Connect With Me</h2>
//           <p className="text-sm text-gray-600 dark:text-gray-400">Find me on social platforms</p>
//         </div>
//         {isEditing && (
//           <button
//             onClick={() => setShowAddForm(!showAddForm)}
//             className="btn-primary flex items-center gap-2"
//           >
//             {showAddForm ? <X size={18} /> : <Plus size={18} />}
//             {showAddForm ? 'Cancel' : 'Add Link'}
//           </button>
//         )}
//       </div>

//       {showAddForm && (
//         <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-2">Platform</label>
//               <input
//                 type="text"
//                 value={formData.platform}
//                 onChange={(e) => setFormData({ ...formData, platform: e.target.value, icon: e.target.value.toLowerCase() })}
//                 className="input-field"
//                 placeholder="e.g., GitHub, LinkedIn"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">URL</label>
//               <input
//                 type="url"
//                 value={formData.url}
//                 onChange={(e) => setFormData({ ...formData, url: e.target.value })}
//                 className="input-field"
//                 placeholder="https://..."
//               />
//             </div>

//             <button onClick={handleAdd} className="btn-primary flex items-center gap-2">
//               <Save size={18} />
//               Add Link
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {socialLinks.length === 0 ? (
//           <p className="col-span-full text-gray-500 dark:text-gray-400">No social links added yet.</p>
//         ) : (
//           socialLinks.map((link) => {
//             const Icon = getIcon(link.icon);
//             return (
//               <div key={link.id} className="group relative">
//                 <a
//                   href={link.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl hover:from-primary-50 hover:to-primary-100 dark:hover:from-primary-900/20 dark:hover:to-primary-800/20 transition-all duration-200 hover:shadow-lg hover:scale-105"
//                 >
//                   <Icon size={32} className="mb-2 text-gray-700 dark:text-gray-300" />
//                   <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                     {link.platform}
//                   </span>
//                 </a>
                
//                 {isEditing && (
//                   <button
//                     onClick={() => handleDelete(link.id)}
//                     className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
//                   >
//                     <Trash2 size={14} />
//                   </button>
//                 )}
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default SocialLinks;
import { Github, Linkedin, Twitter, Globe, Link as LinkIcon, Plus, X, Save, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { profileApi } from '../utils/api';

const SocialLinks = ({ socialLinks, setSocialLinks, isEditing }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ platform: '', url: '', icon: '' });

  const getIcon = (iconName) => {
    const icons = {
      github: Github,
      linkedin: Linkedin,
      twitter: Twitter,
      globe: Globe,
      default: LinkIcon
    };
    return icons[iconName?.toLowerCase()] || icons.default;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.platform.trim() || !formData.url.trim()) return;

    try {
      const added = await profileApi.addSocialLink(1, formData);
      setSocialLinks([...socialLinks, added]);
      setFormData({ platform: '', url: '', icon: '' });
      setShowAddForm(false);
    } catch (err) {
      alert('Failed to add social link');
    }
  };

  const handleDelete = async (linkId) => {
    try {
      await profileApi.deleteSocialLink(1, linkId);
      setSocialLinks(socialLinks.filter(link => link.id !== linkId));
    } catch (err) {
      alert('Failed to delete social link');
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">Connect With Me</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Find me on social platforms</p>
        </div>
        {isEditing && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-linkedin hover:bg-linkedin-hover text-white rounded-full transition-colors flex items-center gap-2 font-medium"
          >
            {showAddForm ? <X size={18} /> : <Plus size={18} />}
            {showAddForm ? 'Cancel' : 'Add Link'}
          </button>
        )}
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Platform</label>
              <input
                type="text"
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value, icon: e.target.value.toLowerCase() })}
                className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 focus:border-transparent text-neutral-900 dark:text-white"
                placeholder="e.g., GitHub, LinkedIn"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">URL</label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 focus:border-transparent text-neutral-900 dark:text-white"
                placeholder="https://..."
                required
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-linkedin hover:bg-linkedin-hover text-white rounded-full transition-colors flex items-center gap-2 font-medium"
            >
              <Save size={18} />
              Add Link
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {socialLinks.length === 0 ? (
          <p className="col-span-full text-neutral-500 dark:text-neutral-400">No social links added yet.</p>
        ) : (
          socialLinks.map((link) => {
            const Icon = getIcon(link.icon);
            return (
              <div key={link.id} className="group relative">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-200 hover:shadow-md"
                >
                  <Icon size={32} className="mb-2 text-neutral-700 dark:text-neutral-300" />
                  <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {link.platform}
                  </span>
                </a>
                
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => handleDelete(link.id)}
                    className="absolute top-2 right-2 p-1.5 bg-linkedin text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow hover:bg-linkedin-hover"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default SocialLinks;