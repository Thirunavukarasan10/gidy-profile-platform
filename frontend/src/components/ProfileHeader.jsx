import { Mail, MapPin, Edit2, Save, X } from 'lucide-react';
import { useState } from 'react';

const ProfileHeader = ({ profile, onUpdate, isEditing, setIsEditing }) => {
  const [formData, setFormData] = useState({
    first_name: profile.first_name || '',
    last_name: profile.last_name || '',
    title: profile.title || '',
    bio: profile.bio || '',
    email: profile.email || '',
    location: profile.location || '',
    profile_picture_url: profile.profile_picture_url || ''
  });

  const handleSubmit = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
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

  if (isEditing) {
    return (
      <div className="card animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <div className="flex gap-2">
            <button onClick={handleCancel} className="btn-secondary flex items-center gap-2">
              <X size={18} />
              Cancel
            </button>
            <button onClick={handleSubmit} className="btn-primary flex items-center gap-2">
              <Save size={18} />
              Save
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">First Name</label>
            <input
              type="text"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Last Name</label>
            <input
              type="text"
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              className="input-field"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
              placeholder="e.g., Senior Full Stack Developer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="input-field"
              placeholder="e.g., San Francisco, CA"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Profile Picture URL</label>
            <input
              type="url"
              value={formData.profile_picture_url}
              onChange={(e) => setFormData({ ...formData, profile_picture_url: e.target.value })}
              className="input-field"
              placeholder="https://..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="input-field"
              rows="4"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary-100 dark:ring-primary-900">
            <img
              src={profile.profile_picture_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
              alt={`${profile.first_name} ${profile.last_name}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {profile.first_name} {profile.last_name}
              </h1>
              {profile.title && (
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-3">
                  {profile.title}
                </p>
              )}
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="btn-secondary flex items-center gap-2"
            >
              <Edit2 size={18} />
              Edit Profile
            </button>
          </div>

          <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
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

          {profile.bio && (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {profile.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
