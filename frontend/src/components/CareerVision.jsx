import { useState } from 'react';
import { Target, Edit2, Save, X, Lightbulb } from 'lucide-react';
import { profileApi } from '../utils/api';

const CareerVision = ({ careerVision, profileId, isEditing, onUpdate }) => {
  const [isEditingVision, setIsEditingVision] = useState(false);
  const [formData, setFormData] = useState({
    current_role: careerVision?.current_role || '',
    long_term_aspiration: careerVision?.long_term_aspiration || '',
    target_field: careerVision?.target_field || '',
    inspiration: careerVision?.inspiration || '',
    current_focus: careerVision?.current_focus || ''
  });

  const handleSave = async () => {
    try {
      await profileApi.upsertCareerVision(profileId, formData);
      onUpdate();
      setIsEditingVision(false);
    } catch (error) {
      alert('Failed to save career vision');
    }
  };

  const handleCancel = () => {
    setFormData({
      current_role: careerVision?.current_role || '',
      long_term_aspiration: careerVision?.long_term_aspiration || '',
      target_field: careerVision?.target_field || '',
      inspiration: careerVision?.inspiration || '',
      current_focus: careerVision?.current_focus || ''
    });
    setIsEditingVision(false);
  };

  const inputClass = "input-dashboard";
  const btnSecondary = "btn-secondary-dash flex items-center gap-2";
  const btnPrimary = "btn-primary-dash flex items-center gap-2";

  if (!careerVision && !isEditing) {
    return null;
  }

  if (isEditingVision || (!careerVision && isEditing)) {
    return (
      <div className="card-dashboard">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Target className="text-primary" size={20} />
            <h2 className="dashboard-title">Career Vision</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={handleCancel} className={btnSecondary}>
              <X size={18} />
              Cancel
            </button>
            <button onClick={handleSave} className={btnPrimary}>
              <Save size={18} />
              Save
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Current Role
            </label>
            <textarea
              value={formData.current_role}
              onChange={(e) => setFormData({ ...formData, current_role: e.target.value })}
              className={inputClass}
              rows={2}
              placeholder="What are you currently doing?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Long-term Aspiration
            </label>
            <textarea
              value={formData.long_term_aspiration}
              onChange={(e) => setFormData({ ...formData, long_term_aspiration: e.target.value })}
              className={inputClass}
              rows={2}
              placeholder="Where do you see yourself in 5-10 years?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Target Field
            </label>
            <input
              type="text"
              value={formData.target_field}
              onChange={(e) => setFormData({ ...formData, target_field: e.target.value })}
              className={inputClass}
              placeholder="e.g., Cloud Infrastructure, AI/ML, Product Management"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              What Inspires You
            </label>
            <textarea
              value={formData.inspiration}
              onChange={(e) => setFormData({ ...formData, inspiration: e.target.value })}
              className={inputClass}
              rows={2}
              placeholder="What drives your career goals?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Current Focus
            </label>
            <textarea
              value={formData.current_focus}
              onChange={(e) => setFormData({ ...formData, current_focus: e.target.value })}
              className={inputClass}
              rows={2}
              placeholder="What are you learning or working on right now?"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-dashboard">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Target className="text-primary" size={20} />
          <h2 className="dashboard-title">Career Vision</h2>
        </div>
        {isEditing && (
          <button onClick={() => setIsEditingVision(true)} className={btnSecondary}>
            <Edit2 size={18} />
            Edit
          </button>
        )}
      </div>

      <div className="space-y-4">
        {careerVision.current_role && (
          <div>
            <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">
              Current Role
            </h3>
            <p className="text-neutral-700 dark:text-neutral-200 leading-relaxed">
              {careerVision.current_role}
            </p>
          </div>
        )}

        {careerVision.long_term_aspiration && (
          <div>
            <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">
              Long-term Aspiration
            </h3>
            <p className="text-neutral-700 dark:text-neutral-200 leading-relaxed">
              {careerVision.long_term_aspiration}
            </p>
          </div>
        )}

        {careerVision.target_field && (
          <div>
            <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">
              Target Field
            </h3>
            <p className="text-neutral-700 dark:text-neutral-200">
              {careerVision.target_field}
            </p>
          </div>
        )}

        {careerVision.inspiration && (
          <div>
            <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2 flex items-center gap-2">
              <Lightbulb size={16} />
              What Inspires Me
            </h3>
            <p className="text-neutral-700 dark:text-neutral-200 leading-relaxed">
              {careerVision.inspiration}
            </p>
          </div>
        )}

        {careerVision.current_focus && (
          <div>
            <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">
              Current Focus
            </h3>
            <p className="text-neutral-700 dark:text-neutral-200 leading-relaxed">
              {careerVision.current_focus}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerVision;