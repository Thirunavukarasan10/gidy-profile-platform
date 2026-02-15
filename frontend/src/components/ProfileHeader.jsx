// import { Mail, MapPin, Edit2, Save, X } from 'lucide-react';
// import { useState } from 'react';

// const ProfileHeader = ({ profile, onUpdate, isEditing, setIsEditing }) => {
//   const safeProfile = profile || {};
//   const [formData, setFormData] = useState({
//     first_name: safeProfile.first_name || '',
//     last_name: safeProfile.last_name || '',
//     title: safeProfile.title || '',
//     bio: safeProfile.bio || '',
//     email: safeProfile.email || '',
//     location: safeProfile.location || '',
//     profile_picture_url: safeProfile.profile_picture_url || ''
//   });

//   if (!profile) return null;

//   const handleSubmit = () => {
//     onUpdate(formData);
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setFormData({
//       first_name: safeProfile.first_name || '',
//       last_name: safeProfile.last_name || '',
//       title: safeProfile.title || '',
//       bio: safeProfile.bio || '',
//       email: safeProfile.email || '',
//       location: safeProfile.location || '',
//       profile_picture_url: safeProfile.profile_picture_url || ''
//     });
//     setIsEditing(false);
//   };

//   const inputClass = "w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-linkedin focus:border-transparent text-neutral-900 dark:text-white";
//   const btnSecondary = "px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors flex items-center gap-2 font-medium";
//   const btnPrimary = "px-4 py-2 bg-linkedin hover:bg-linkedin-hover text-white rounded-full transition-colors flex items-center gap-2 font-medium";

//   if (isEditing) {
//     return (
//       <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Edit Profile</h2>
//           <div className="flex gap-2">
//             <button type="button" onClick={handleCancel} className={btnSecondary}>
//               <X size={18} />
//               Cancel
//             </button>
//             <button type="button" onClick={handleSubmit} className={btnPrimary}>
//               <Save size={18} />
//               Save
//             </button>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">First Name</label>
//             <input type="text" value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} className={inputClass} />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Last Name</label>
//             <input type="text" value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} className={inputClass} />
//           </div>
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Title</label>
//             <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inputClass} placeholder="e.g., Senior Full Stack Developer" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Email</label>
//             <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Location</label>
//             <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className={inputClass} placeholder="e.g., San Francisco, CA" />
//           </div>
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Profile Picture URL</label>
//             <input type="url" value={formData.profile_picture_url} onChange={(e) => setFormData({ ...formData, profile_picture_url: e.target.value })} className={inputClass} placeholder="https://..." />
//           </div>
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Bio</label>
//             <textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} className={inputClass} rows={4} placeholder="Tell us about yourself..." />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm p-6">
//       <div className="flex flex-col md:flex-row gap-6">
//         <div className="flex-shrink-0">
//           <div className="w-32 h-32 rounded-full overflow-hidden ring-2 ring-neutral-200 dark:ring-neutral-600">
//             <img
//               src={profile.profile_picture_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
//               alt={`${profile.first_name} ${profile.last_name}`}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>
//         <div className="flex-grow">
//           <div className="flex justify-between items-start mb-4">
//             <div>
//               <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">
//                 {profile.first_name} {profile.last_name}
//               </h1>
//               {profile.title && (
//                 <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-3">{profile.title}</p>
//               )}
//             </div>
//             <button type="button" onClick={() => setIsEditing(true)} className={btnSecondary}>
//               <Edit2 size={18} />
//               Edit Profile
//             </button>
//           </div>
//           <div className="flex flex-wrap gap-4 mb-4 text-sm text-neutral-600 dark:text-neutral-400">
//             {profile.email && (
//               <div className="flex items-center gap-2">
//                 <Mail size={16} />
//                 <span>{profile.email}</span>
//               </div>
//             )}
//             {profile.location && (
//               <div className="flex items-center gap-2">
//                 <MapPin size={16} />
//                 <span>{profile.location}</span>
//               </div>
//             )}
//           </div>
//           {(profile.bio != null && String(profile.bio).trim() !== '') && (
//             <section className="mt-4" aria-label="About">
//               <h2 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">About</h2>
//               <p key={String(profile.bio).slice(0, 50)} className="text-neutral-700 dark:text-neutral-200 leading-relaxed whitespace-pre-wrap">{profile.bio}</p>
//             </section>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ProfileHeader;



















// // export default ProfileHeader;
// // import { Mail, MapPin, Edit2, Save, X } from 'lucide-react';
// // import { useState } from 'react';

// // const ProfileHeader = ({ profile, onUpdate, isEditing, setIsEditing }) => {
// //   const [formData, setFormData] = useState({
// //     first_name: profile.first_name || '',
// //     last_name: profile.last_name || '',
// //     title: profile.title || '',
// //     bio: profile.bio || '',
// //     email: profile.email || '',
// //     location: profile.location || '',
// //     profile_picture_url: profile.profile_picture_url || ''
// //   });

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     onUpdate(formData);
// //     setIsEditing(false);
// //   };

// //   const handleCancel = () => {
// //     setFormData({
// //       first_name: profile.first_name || '',
// //       last_name: profile.last_name || '',
// //       title: profile.title || '',
// //       bio: profile.bio || '',
// //       email: profile.email || '',
// //       location: profile.location || '',
// //       profile_picture_url: profile.profile_picture_url || ''
// //     });
// //     setIsEditing(false);
// //   };

// //   if (isEditing) {
// //     return (
// //       <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
// //         <form onSubmit={handleSubmit}>
// //           <div className="flex justify-between items-center mb-6">
// //             <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Edit Profile</h2>
// //             <div className="flex gap-2">
// //               <button
// //                 type="button"
// //                 onClick={handleCancel}
// //                 className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 font-medium"
// //               >
// //                 <X size={18} />
// //                 Cancel
// //               </button>
// //               <button
// //                 type="submit"
// //                 className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-2 font-medium"
// //               >
// //                 <Save size={18} />
// //                 Save
// //               </button>
// //             </div>
// //           </div>

// //           <div className="grid md:grid-cols-2 gap-4">
// //             <div>
// //               <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">First Name</label>
// //               <input
// //                 type="text"
// //                 value={formData.first_name}
// //                 onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
// //                 className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-transparent text-slate-900 dark:text-white"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Last Name</label>
// //               <input
// //                 type="text"
// //                 value={formData.last_name}
// //                 onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
// //                 className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-transparent text-slate-900 dark:text-white"
// //               />
// //             </div>

// //             <div className="md:col-span-2">
// //               <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Title</label>
// //               <input
// //                 type="text"
// //                 value={formData.title}
// //                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
// //                 className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-transparent text-slate-900 dark:text-white"
// //                 placeholder="e.g., Senior Full Stack Developer"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Email</label>
// //               <input
// //                 type="email"
// //                 value={formData.email}
// //                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// //                 className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-transparent text-slate-900 dark:text-white"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Location</label>
// //               <input
// //                 type="text"
// //                 value={formData.location}
// //                 onChange={(e) => setFormData({ ...formData, location: e.target.value })}
// //                 className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-transparent text-slate-900 dark:text-white"
// //                 placeholder="e.g., San Francisco, CA"
// //               />
// //             </div>

// //             <div className="md:col-span-2">
// //               <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Profile Picture URL</label>
// //               <input
// //                 type="url"
// //                 value={formData.profile_picture_url}
// //                 onChange={(e) => setFormData({ ...formData, profile_picture_url: e.target.value })}
// //                 className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-transparent text-slate-900 dark:text-white"
// //                 placeholder="https://..."
// //               />
// //             </div>

// //             <div className="md:col-span-2">
// //               <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Bio</label>
// //               <textarea
// //                 value={formData.bio}
// //                 onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
// //                 className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-transparent text-slate-900 dark:text-white"
// //                 rows="4"
// //                 placeholder="Tell us about yourself..."
// //               />
// //             </div>
// //           </div>
// //         </form>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
// //       <div className="flex flex-col md:flex-row gap-6">
// //         {/* Profile Picture */}
// //         <div className="flex-shrink-0">
// //           <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-slate-100 dark:ring-slate-700">
// //             <img
// //               src={profile.profile_picture_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
// //               alt={`${profile.first_name} ${profile.last_name}`}
// //               className="w-full h-full object-cover"
// //             />
// //           </div>
// //         </div>

// //         {/* Profile Info */}
// //         <div className="flex-grow">
// //           <div className="flex justify-between items-start mb-4">
// //             <div>
// //               <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
// //                 {profile.first_name} {profile.last_name}
// //               </h1>
// //               {profile.title && (
// //                 <p className="text-xl text-slate-600 dark:text-slate-400 mb-3">
// //                   {profile.title}
// //                 </p>
// //               )}
// //             </div>
// //             <button
// //               onClick={() => setIsEditing(true)}
// //               className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 font-medium"
// //             >
// //               <Edit2 size={18} />
// //               Edit Profile
// //             </button>
// //           </div>

// //           <div className="flex flex-wrap gap-4 mb-4 text-sm text-slate-600 dark:text-slate-400">
// //             {profile.email && (
// //               <div className="flex items-center gap-2">
// //                 <Mail size={16} />
// //                 <span>{profile.email}</span>
// //               </div>
// //             )}
// //             {profile.location && (
// //               <div className="flex items-center gap-2">
// //                 <MapPin size={16} />
// //                 <span>{profile.location}</span>
// //               </div>
// //             )}
// //           </div>

// //           {profile.bio && (
// //             <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
// //               {profile.bio}
// //             </p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProfileHeader;











































import { Mail, MapPin, Edit2, Save, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const ProfileHeader = ({ profile, onUpdate, isEditing, setIsEditing }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    title: '',
    bio: '',
    email: '',
    location: '',
    profile_picture_url: ''
  });

  // Update form data when profile changes (including bio updates)
  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        title: profile.title || '',
        bio: profile.bio || '',
        email: profile.email || '',
        location: profile.location || '',
        profile_picture_url: profile.profile_picture_url || ''
      });
    }
  }, [profile]);

  if (!profile) return null;

  const handleSubmit = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to current profile values
    setFormData({
      first_name: profile.first_name || '',
      last_name: profile.last_name || '',
      title: profile.title || '',
      bio: profile.bio || '',
      email: profile.email || '',
      location: profile.location || '',
      profile_picture_url: profile.profile_picture_url || ''
    });
    setIsEditing(false);
  };

  const inputClass = "w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-linkedin focus:border-transparent text-neutral-900 dark:text-white";
  const btnSecondary = "px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors flex items-center gap-2 font-medium";
  const btnPrimary = "px-4 py-2 bg-linkedin hover:bg-linkedin-hover text-white rounded-full transition-colors flex items-center gap-2 font-medium";

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Edit Profile</h2>
          <div className="flex gap-2">
            <button type="button" onClick={handleCancel} className={btnSecondary}>
              <X size={18} />
              Cancel
            </button>
            <button type="button" onClick={handleSubmit} className={btnPrimary}>
              <Save size={18} />
              Save
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">First Name</label>
            <input 
              type="text" 
              value={formData.first_name} 
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} 
              className={inputClass} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Last Name</label>
            <input 
              type="text" 
              value={formData.last_name} 
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} 
              className={inputClass} 
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Title</label>
            <input 
              type="text" 
              value={formData.title} 
              onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
              className={inputClass} 
              placeholder="e.g., Senior Full Stack Developer" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Email</label>
            <input 
              type="email" 
              value={formData.email} 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
              className={inputClass} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Location</label>
            <input 
              type="text" 
              value={formData.location} 
              onChange={(e) => setFormData({ ...formData, location: e.target.value })} 
              className={inputClass} 
              placeholder="e.g., San Francisco, CA" 
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Profile Picture URL</label>
            <input 
              type="url" 
              value={formData.profile_picture_url} 
              onChange={(e) => setFormData({ ...formData, profile_picture_url: e.target.value })} 
              className={inputClass} 
              placeholder="https://..." 
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Bio</label>
            <textarea 
              value={formData.bio} 
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })} 
              className={inputClass} 
              rows={4} 
              placeholder="Tell us about yourself..." 
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="w-32 h-32 rounded-full overflow-hidden ring-2 ring-neutral-200 dark:ring-neutral-600">
            <img
              src={profile.profile_picture_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
              alt={`${profile.first_name} ${profile.last_name}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">
                {profile.first_name} {profile.last_name}
              </h1>
              {profile.title && (
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-3">{profile.title}</p>
              )}
            </div>
            <button type="button" onClick={() => setIsEditing(true)} className={btnSecondary}>
              <Edit2 size={18} />
              Edit Profile
            </button>
          </div>
          <div className="flex flex-wrap gap-4 mb-4 text-sm text-neutral-600 dark:text-neutral-400">
            {profile.email && (
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>{profile.email}</span>
              </div>
            )}
            {profile.location && (
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{profile.location}</span>
              </div>
            )}
          </div>
          {/* CRITICAL FIX: Display bio from profile, not formData */}
          {profile.bio && String(profile.bio).trim() !== '' && (
            <section className="mt-4" aria-label="About">
              <h2 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">
                About
              </h2>
              <p className="text-neutral-700 dark:text-neutral-200 leading-relaxed whitespace-pre-wrap">
                {profile.bio}
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;