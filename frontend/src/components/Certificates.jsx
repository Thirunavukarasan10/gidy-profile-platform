import { useState } from 'react';
import { Award, Plus, Edit2, Trash2, Save, X, ExternalLink } from 'lucide-react';
import { profileApi } from '../utils/api';

const Certificates = ({ certificates, profileId, isEditing, onUpdate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    issue_date: '',
    expiry_date: '',
    credential_id: '',
    credential_url: '',
    file_url: ''
  });

  const resetForm = () => {
    setFormData({
      title: '',
      issuer: '',
      issue_date: '',
      expiry_date: '',
      credential_id: '',
      credential_url: '',
      file_url: ''
    });
  };

  const handleAdd = () => {
    resetForm();
    setIsAdding(true);
    setEditingId(null);
  };

  const handleEdit = (cert) => {
    setFormData({
      title: cert.title || '',
      issuer: cert.issuer || '',
      issue_date: cert.issue_date ? cert.issue_date.split('T')[0] : '',
      expiry_date: cert.expiry_date ? cert.expiry_date.split('T')[0] : '',
      credential_id: cert.credential_id || '',
      credential_url: cert.credential_url || '',
      file_url: cert.file_url || ''
    });
    setEditingId(cert.id);
    setIsAdding(false);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.issuer) {
      alert('Title and issuer are required');
      return;
    }

    try {
      if (editingId) {
        await profileApi.updateCertificate(profileId, editingId, formData);
      } else {
        await profileApi.addCertificate(profileId, formData);
      }
      onUpdate();
      resetForm();
      setIsAdding(false);
      setEditingId(null);
    } catch (error) {
      alert('Failed to save certificate');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return;

    try {
      await profileApi.deleteCertificate(profileId, id);
      onUpdate();
    } catch (error) {
      alert('Failed to delete certificate');
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

  const sortedCertificates = [...certificates].sort((a, b) => {
    const dateA = new Date(a.issue_date || 0);
    const dateB = new Date(b.issue_date || 0);
    return dateB - dateA;
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="card-dashboard">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Award className="text-primary" size={20} />
          <h2 className="dashboard-title">Certificates</h2>
        </div>
        {isEditing && !isAdding && !editingId && (
          <button onClick={handleAdd} className={btnPrimary}>
            <Plus size={18} />
            Add Certificate
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <div className="mb-6 p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-neutral-900 dark:text-white">
              {editingId ? 'Edit Certificate' : 'Add Certificate'}
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
                Certificate Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={inputClass}
                placeholder="e.g., AWS Certified Solutions Architect"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Issuing Organization *
              </label>
              <input
                type="text"
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                className={inputClass}
                placeholder="e.g., Amazon Web Services"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Issue Date
              </label>
              <input
                type="date"
                value={formData.issue_date}
                onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Expiry Date (if applicable)
              </label>
              <input
                type="date"
                value={formData.expiry_date}
                onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Credential ID
              </label>
              <input
                type="text"
                value={formData.credential_id}
                onChange={(e) => setFormData({ ...formData, credential_id: e.target.value })}
                className={inputClass}
                placeholder="e.g., ABC123XYZ"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Credential URL
              </label>
              <input
                type="url"
                value={formData.credential_url}
                onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })}
                className={inputClass}
                placeholder="https://..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Certificate File URL (optional)
              </label>
              <input
                type="url"
                value={formData.file_url}
                onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                className={inputClass}
                placeholder="https://... (link to PDF or image)"
              />
            </div>
          </div>
        </div>
      )}

      {sortedCertificates.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400 text-center py-8">
          No certificates added yet
        </p>
      ) : (
        <div className="space-y-4">
          {sortedCertificates.map((cert) => (
            <div
              key={cert.id}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 dark:text-white">
                    {cert.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {cert.issuer}
                  </p>
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(cert)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(cert.id)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-neutral-500 dark:text-neutral-500 mb-2">
                <span>Issued {formatDate(cert.issue_date)}</span>
                {cert.expiry_date && (
                  <span>• Expires {formatDate(cert.expiry_date)}</span>
                )}
              </div>

              {cert.credential_id && (
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                  Credential ID: {cert.credential_id}
                </p>
              )}

              <div className="flex gap-2 flex-wrap">
                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-700 dark:text-gray-200 hover:underline flex items-center gap-1"
                  >
                    View Credential
                    <ExternalLink size={14} />
                  </a>
                )}
                {cert.file_url && (
                  <a
                    href={cert.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-700 dark:text-gray-200 hover:underline flex items-center gap-1"
                  >
                    View Certificate
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Certificates;