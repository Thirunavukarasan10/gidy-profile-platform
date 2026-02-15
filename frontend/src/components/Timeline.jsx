// import { Briefcase, Calendar, Plus, X, Save, Edit2, Trash2 } from 'lucide-react';
// import { useState } from 'react';
// import { profileApi } from '../utils/api';

// const Timeline = ({ timeline, setTimeline, isEditing }) => {
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     company: '',
//     description: '',
//     start_date: '',
//     end_date: '',
//     is_current: false,
//     type: 'work'
//   });

//   const resetForm = () => {
//     setFormData({
//       title: '',
//       company: '',
//       description: '',
//       start_date: '',
//       end_date: '',
//       is_current: false,
//       type: 'work'
//     });
//     setEditingItem(null);
//     setShowAddForm(false);
//   };

//   const handleAdd = async () => {
//     if (!formData.title.trim()) return;

//     try {
//       const response = await profileApi.addTimelineItem(1, formData);
//       setTimeline([...timeline, response.data]);
//       resetForm();
//     } catch (error) {
//       console.error('Error adding timeline item:', error);
//       alert('Failed to add timeline item');
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       const response = await profileApi.updateTimelineItem(editingItem, formData);
//       setTimeline(timeline.map(item => item.id === editingItem ? response.data : item));
//       resetForm();
//     } catch (error) {
//       console.error('Error updating timeline item:', error);
//       alert('Failed to update timeline item');
//     }
//   };

//   const handleDelete = async (itemId) => {
//     if (!confirm('Are you sure you want to delete this item?')) return;

//     try {
//       await profileApi.deleteTimelineItem(itemId);
//       setTimeline(timeline.filter(item => item.id !== itemId));
//     } catch (error) {
//       console.error('Error deleting timeline item:', error);
//       alert('Failed to delete timeline item');
//     }
//   };

//   const startEdit = (item) => {
//     setFormData({
//       title: item.title,
//       company: item.company || '',
//       description: item.description || '',
//       start_date: item.start_date || '',
//       end_date: item.end_date || '',
//       is_current: item.is_current || false,
//       type: item.type || 'work'
//     });
//     setEditingItem(item.id);
//     setShowAddForm(true);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
//   };

//   const calculateDuration = (startDate, endDate, isCurrent) => {
//     if (!startDate) return '';
    
//     const start = new Date(startDate);
//     const end = isCurrent ? new Date() : (endDate ? new Date(endDate) : new Date());
    
//     const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
//     const years = Math.floor(months / 12);
//     const remainingMonths = months % 12;
    
//     if (years > 0 && remainingMonths > 0) {
//       return `${years} yr${years > 1 ? 's' : ''} ${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
//     } else if (years > 0) {
//       return `${years} yr${years > 1 ? 's' : ''}`;
//     } else {
//       return `${months} mo${months > 1 ? 's' : ''}`;
//     }
//   };

//   return (
//     <div className="card animate-slide-up">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-2xl font-bold mb-1">Work Experience</h2>
//           <p className="text-sm text-gray-600 dark:text-gray-400">Professional journey timeline</p>
//         </div>
//         {isEditing && !showAddForm && (
//           <button
//             onClick={() => setShowAddForm(true)}
//             className="btn-primary flex items-center gap-2"
//           >
//             <Plus size={18} />
//             Add Experience
//           </button>
//         )}
//       </div>

//       {showAddForm && (
//         <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
//           <h3 className="font-semibold mb-4">
//             {editingItem ? 'Edit Experience' : 'Add New Experience'}
//           </h3>
          
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-2">Title *</label>
//               <input
//                 type="text"
//                 value={formData.title}
//                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                 className="input-field"
//                 placeholder="e.g., Senior Developer"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Company</label>
//               <input
//                 type="text"
//                 value={formData.company}
//                 onChange={(e) => setFormData({ ...formData, company: e.target.value })}
//                 className="input-field"
//                 placeholder="e.g., Tech Corp"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Description</label>
//               <textarea
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                 className="input-field"
//                 rows="3"
//                 placeholder="Describe your role and achievements..."
//               />
//             </div>

//             <div className="grid md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-2">Start Date</label>
//                 <input
//                   type="date"
//                   value={formData.start_date}
//                   onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
//                   className="input-field"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">End Date</label>
//                 <input
//                   type="date"
//                   value={formData.end_date}
//                   onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
//                   className="input-field"
//                   disabled={formData.is_current}
//                 />
//               </div>
//             </div>

//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={formData.is_current}
//                 onChange={(e) => setFormData({ ...formData, is_current: e.target.checked, end_date: '' })}
//                 className="w-4 h-4 text-primary-600 rounded"
//               />
//               <span className="text-sm">I currently work here</span>
//             </label>

//             <div className="flex gap-2">
//               <button
//                 onClick={editingItem ? handleUpdate : handleAdd}
//                 className="btn-primary flex items-center gap-2"
//               >
//                 <Save size={18} />
//                 {editingItem ? 'Update' : 'Add'}
//               </button>
//               <button
//                 onClick={resetForm}
//                 className="btn-secondary flex items-center gap-2"
//               >
//                 <X size={18} />
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="relative">
//         {timeline.length === 0 ? (
//           <p className="text-gray-500 dark:text-gray-400">No experience added yet.</p>
//         ) : (
//           <div className="space-y-6">
//             {/* Timeline line */}
//             <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-primary-200 dark:from-primary-400 dark:to-primary-800" />

//             {timeline.map((item, index) => (
//               <div key={item.id} className="relative pl-20 group">
//                 {/* Timeline dot */}
//                 <div className="absolute left-6 top-2 w-4 h-4 rounded-full bg-primary-500 ring-4 ring-white dark:ring-gray-800 transition-all duration-200 group-hover:w-5 group-hover:h-5 group-hover:left-[22px] group-hover:top-[6px]" />

//                 <div className="bg-white dark:bg-gray-700/50 p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700">
//                   <div className="flex justify-between items-start mb-2">
//                     <div className="flex-grow">
//                       <h3 className="text-lg font-bold">{item.title}</h3>
//                       {item.company && (
//                         <p className="text-primary-600 dark:text-primary-400 font-medium">
//                           {item.company}
//                         </p>
//                       )}
//                     </div>
                    
//                     {isEditing && (
//                       <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                         <button
//                           onClick={() => startEdit(item)}
//                           className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
//                         >
//                           <Edit2 size={16} />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(item.id)}
//                           className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg transition-colors"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
//                     <Calendar size={14} />
//                     <span>
//                       {formatDate(item.start_date)} - {item.is_current ? 'Present' : formatDate(item.end_date)}
//                     </span>
//                     <span className="text-gray-400">•</span>
//                     <span>{calculateDuration(item.start_date, item.end_date, item.is_current)}</span>
//                   </div>

//                   {item.description && (
//                     <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
//                       {item.description}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Timeline;
import { Calendar, Plus, X, Save, Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { profileApi } from '../utils/api';

const Timeline = ({ timeline, setTimeline, isEditing }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    start_date: '',
    end_date: '',
    is_current: false,
    type: 'work'
  });

  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      description: '',
      start_date: '',
      end_date: '',
      is_current: false,
      type: 'work'
    });
    setEditingItem(null);
    setShowAddForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      if (editingItem) {
        const updated = await profileApi.updateTimelineItem(1, editingItem, formData);
        setTimeline(timeline.map(item => item.id === editingItem ? updated : item));
      } else {
        const added = await profileApi.addTimelineItem(1, formData);
        setTimeline([...timeline, added]);
      }
      resetForm();
    } catch (err) {
      alert('Failed to save timeline item');
    }
  };

  const handleDelete = async (itemId) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      await profileApi.deleteTimelineItem(1, itemId);
      setTimeline(timeline.filter(item => item.id !== itemId));
    } catch (err) {
      alert('Failed to delete timeline item');
    }
  };

  const startEdit = (item) => {
    setFormData({
      title: item.title,
      company: item.company || '',
      description: item.description || '',
      start_date: item.start_date || '',
      end_date: item.end_date || '',
      is_current: item.is_current || false,
      type: item.type || 'work'
    });
    setEditingItem(item.id);
    setShowAddForm(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const calculateDuration = (startDate, endDate, isCurrent) => {
    if (!startDate) return '';
    
    const start = new Date(startDate);
    const end = isCurrent ? new Date() : (endDate ? new Date(endDate) : new Date());
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years > 0 && remainingMonths > 0) {
      return `${years} yr${years > 1 ? 's' : ''} ${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
    } else if (years > 0) {
      return `${years} yr${years > 1 ? 's' : ''}`;
    } else {
      return `${months} mo${months > 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">Work Experience</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Professional journey timeline</p>
        </div>
        {isEditing && !showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-linkedin hover:bg-linkedin-hover text-white rounded-full transition-colors flex items-center gap-2 font-medium"
          >
            <Plus size={18} />
            Add Experience
          </button>
        )}
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">
            {editingItem ? 'Edit Experience' : 'Add New Experience'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-linkedin focus:border-transparent text-neutral-900 dark:text-white"
                placeholder="e.g., Senior Developer"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-linkedin focus:border-transparent text-neutral-900 dark:text-white"
                placeholder="e.g., Tech Corp"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-linkedin focus:border-transparent text-neutral-900 dark:text-white"
                rows="3"
                placeholder="Describe your role and achievements..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Start Date</label>
                <input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-linkedin focus:border-transparent text-neutral-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">End Date</label>
                <input
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-linkedin focus:border-transparent text-neutral-900 dark:text-white disabled:opacity-50"
                  disabled={formData.is_current}
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_current}
                onChange={(e) => setFormData({ ...formData, is_current: e.target.checked, end_date: '' })}
                className="w-4 h-4 text-neutral-600 rounded focus:ring-2 focus:ring-neutral-500"
              />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">I currently work here</span>
            </label>

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-linkedin hover:bg-linkedin-hover text-white rounded-full transition-colors flex items-center gap-2 font-medium"
              >
                <Save size={18} />
                {editingItem ? 'Update' : 'Add'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors flex items-center gap-2 font-medium"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="relative">
        {timeline.length === 0 ? (
          <p className="text-neutral-500 dark:text-neutral-400">No experience added yet.</p>
        ) : (
          <div className="space-y-6">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-700" />

            {timeline.map((item) => (
              <div key={item.id} className="relative pl-20 group">
                {/* Timeline dot */}
                <div className="absolute left-6 top-2 w-4 h-4 rounded-full bg-neutral-600 dark:bg-neutral-400 ring-4 ring-white dark:ring-neutral-800 transition-all duration-200 group-hover:w-5 group-hover:h-5 group-hover:left-[22px] group-hover:top-[6px]" />

                <div className="bg-neutral-50 dark:bg-neutral-900 p-5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-200">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{item.title}</h3>
                      {item.company && (
                        <p className="text-neutral-700 dark:text-neutral-300 font-medium">
                          {item.company}
                        </p>
                      )}
                    </div>
                    
                    {isEditing && (
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => startEdit(item)}
                          className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                        >
                          <Edit2 size={16} className="text-neutral-600 dark:text-neutral-400" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} className="text-red-600 dark:text-red-400" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                    <Calendar size={14} />
                    <span>
                      {formatDate(item.start_date)} - {item.is_current ? 'Present' : formatDate(item.end_date)}
                    </span>
                    {item.start_date && (
                      <>
                        <span className="text-neutral-400">•</span>
                        <span>{calculateDuration(item.start_date, item.end_date, item.is_current)}</span>
                      </>
                    )}
                  </div>

                  {item.description && (
                    <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;