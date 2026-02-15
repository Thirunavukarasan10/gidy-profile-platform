import { useState } from 'react';
import { GraduationCap, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { profileApi } from '../utils/api';

const Education = ({ education, profileId, isEditing, onUpdate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    field_of_study: '',
    start_year: '',
    end_year: '',
    description: '',
    is_current: false
  });

  const resetForm = () => {
    setFormData({
      degree: '',
      institution: '',
      field_of_study: '',
      start_year: '',
      end_year: '',
      description: '',
      is_current: false
    });
  };

  const handleAdd = () => {
    resetForm();
    setIsAdding(true);
    setEditingId(null);
  };

  const handleEdit = (edu) => {
    setFormData({
      degree: edu.degree || '',
      institution: edu.institution || '',
      field_of_study: edu.field_of_study || '',
      start_year: edu.start_year || '',
      end_year: edu.end_year || '',
      description: edu.description || '',
      is_current: edu.is_current || false
    });
    setEditingId(edu.id);
    setIsAdding(false);
  };

  const handleSave = async () => {
    if (!formData.degree || !formData.institution) {
      alert('Degree and institution are required');
      return;
    }

    try {
      if (editingId) {
        await profileApi.updateEducation(profileId, editingId, formData);
      } else {
        await profileApi.addEducation(profileId, formData);
      }
      onUpdate();
      resetForm();
      setIsAdding(false);
      setEditingId(null);
    } catch (error) {
      alert('Failed to save education');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this education entry?')) return;

    try {
      await profileApi.deleteEducation(profileId, id);
      onUpdate();
    } catch (error) {
      alert('Failed to delete education');
    }
  };

  const handleCancel = () => {
    resetForm();
    setIsAdding(false);
    setEditingId(null);
  };

  const inputClass = "input-dashboard";
  const btnSecondary = "btn-secondary-dash flex items-center gap-2";
  const btnPrimary = "btn-primary-dash flex items-center gap-2";

  const sortedEducation = [...education].sort((a, b) => {
    if (a.is_current) return -1;
    if (b.is_current) return 1;
    return (b.start_year || 0) - (a.start_year || 0);
  });

  return (
    <div className="card-dashboard">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="text-primary" size={20} />
          <h2 className="dashboard-title">Education</h2>
        </div>
        {isEditing && !isAdding && !editingId && (
          <button onClick={handleAdd} className={btnPrimary}>
            <Plus size={18} />
            Add Education
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <div className="mb-6 p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-neutral-900 dark:text-white">
              {editingId ? 'Edit Education' : 'Add Education'}
            </h3>
            <div className="flex gap-2">
              <button onClick={handleCancel} className="text-sm px-3 py-1.5 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1">
                <X size={16} />
                Cancel
              </button>
              <button onClick={handleSave} className="text-sm px-3 py-1.5 btn-primary-dash flex items-center gap-1">
                <Save size={16} />
                Save
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Degree *
              </label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className={inputClass}
                placeholder="e.g., Bachelor of Science"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Institution *
              </label>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className={inputClass}
                placeholder="e.g., Stanford University"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Field of Study
              </label>
              <input
                type="text"
                value={formData.field_of_study}
                onChange={(e) => setFormData({ ...formData, field_of_study: e.target.value })}
                className={inputClass}
                placeholder="e.g., Computer Science"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Start Year
              </label>
              <input
                type="number"
                value={formData.start_year}
                onChange={(e) => setFormData({ ...formData, start_year: e.target.value })}
                className={inputClass}
                placeholder="2018"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                End Year
              </label>
              <input
                type="number"
                value={formData.end_year}
                onChange={(e) => setFormData({ ...formData, end_year: e.target.value })}
                className={inputClass}
                placeholder="2022"
                disabled={formData.is_current}
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_current}
                  onChange={(e) => setFormData({ ...formData, is_current: e.target.checked, end_year: e.target.checked ? '' : formData.end_year })}
                  className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                />
                Currently studying here
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={inputClass}
                rows={3}
                placeholder="Notable achievements, GPA, relevant coursework..."
              />
            </div>
          </div>
        </div>
      )}

      {sortedEducation.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400 text-center py-8">
          No education added yet
        </p>
      ) : (
        <div className="space-y-4">
          {sortedEducation.map((edu) => (
            <div
              key={edu.id}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white">
                    {edu.degree}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {edu.institution}
                  </p>
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(edu)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(edu.id)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>

              {edu.field_of_study && (
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                  {edu.field_of_study}
                </p>
              )}

              <p className="text-sm text-neutral-500 dark:text-neutral-500 mb-2">
                {edu.start_year} - {edu.is_current ? 'Present' : edu.end_year || 'N/A'}
              </p>

              {edu.description && (
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Education;