import { Mail, MapPin, Edit2, Save, X, Camera } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const ACCEPT_IMAGE = 'image/jpeg,image/jpg,image/png';
const MAX_SIZE_MB = 5;
const AVATAR_SIZE = 132;

function ProfileHeader({ profile, onUpdate, isEditing, setIsEditing }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    title: '',
    bio: '',
    email: '',
    location: '',
    profile_picture_url: ''
  });

  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileInputRef = useRef(null);

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

  const openPhotoEditor = () => {
    setPhotoPreview(null);
    setPhotoFile(null);
    setShowPhotoModal(true);
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
      alert('Please choose a JPEG or PNG image.');
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(`Image must be under ${MAX_SIZE_MB}MB.`);
      return;
    }
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const savePhoto = async () => {
    if (!photoPreview || !photoFile) return;
    setUploadingPhoto(true);
    try {
      await onUpdate({ profile_picture_url: photoPreview });
      setShowPhotoModal(false);
      setPhotoPreview(null);
      setPhotoFile(null);
    } catch (err) {
      alert('Failed to update photo');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const closePhotoModal = () => {
    setShowPhotoModal(false);
    setPhotoPreview(null);
    setPhotoFile(null);
  };

  const avatarSrc = profile.profile_picture_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.id || 'default'}`;

  if (isEditing) {
    return (
      <div className="card-dashboard-full animate-fade-in-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="dashboard-title">Edit Profile</h2>
          <div className="flex gap-2">
            <button type="button" onClick={handleCancel} className="btn-secondary-dash flex items-center gap-2">
              <X size={18} />
              Cancel
            </button>
            <button type="button" onClick={handleSubmit} className="btn-primary-dash flex items-center gap-2">
              <Save size={18} />
              Save
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">First Name</label>
            <input type="text" value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} className="input-dashboard" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Last Name</label>
            <input type="text" value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} className="input-dashboard" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Title</label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="input-dashboard" placeholder="e.g., Senior Developer" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Email</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="input-dashboard" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Location</label>
            <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="input-dashboard" placeholder="e.g., San Francisco" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Bio</label>
            <textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} className="input-dashboard" rows={4} placeholder="Short bio..." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="card-dashboard-full animate-fade-in-up">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="flex-shrink-0">
            <button
              type="button"
              onClick={openPhotoEditor}
              className="relative block w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600 transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 group"
              aria-label="Change profile photo"
            >
              <img src={avatarSrc} alt={`${profile.first_name} ${profile.last_name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <span className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white w-8 h-8" aria-hidden />
              </span>
            </button>
          </div>
          <div className="flex-grow min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
              <div>
                <h1 className="text-[32px] font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
                  {profile.first_name} {profile.last_name}
                </h1>
                {profile.title && <p className="dashboard-muted mt-1">{profile.title}</p>}
              </div>
              <button type="button" onClick={() => setIsEditing(true)} className="btn-secondary-dash flex items-center gap-2 flex-shrink-0">
                <Edit2 size={16} />
                Edit profile
              </button>
            </div>
            {profile.bio && String(profile.bio).trim() && (
              <p className="dashboard-body text-[15px] mt-2 line-clamp-2">{profile.bio}</p>
            )}
            <div className="flex flex-wrap gap-4 mt-3 dashboard-muted text-[14px]">
              {profile.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} aria-hidden />
                  {profile.location}
                </span>
              )}
              {profile.email && (
                <span className="flex items-center gap-1.5">
                  <Mail size={14} aria-hidden />
                  {profile.email}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile photo edit modal – SaaS-style: choose then upload */}
      {showPhotoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="photo-modal-title"
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scale-in border border-gray-200 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="photo-modal-title" className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              Change profile photo
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Choose an image from your device. JPEG or PNG, max 5MB.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPT_IMAGE}
              onChange={onFileChange}
              className="sr-only"
              id="profile-photo-file"
              aria-label="Choose image file"
            />

            {photoPreview ? (
              <div className="mb-6">
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-3 font-medium truncate px-4">
                  {photoFile?.name}
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full mt-2 btn-secondary-dash text-sm"
                >
                  Choose different image
                </button>
              </div>
            ) : (
              <div className="mb-6 flex flex-col items-center justify-center py-10 px-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <Camera className="w-14 h-14 text-gray-400 dark:text-gray-500 mb-3" aria-hidden />
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                  Click below to choose a photo from your device or gallery.
                </p>
                <label
                  htmlFor="profile-photo-file"
                  className="btn-primary-dash cursor-pointer inline-flex items-center justify-center gap-2 w-full max-w-xs"
                >
                  <Camera size={18} aria-hidden />
                  Choose from device
                </label>
              </div>
            )}

            <div className="flex gap-3">
                <button type="button" onClick={closePhotoModal} className="btn-secondary-dash flex-1">
                Cancel
              </button>
              <button
                type="button"
                onClick={savePhoto}
                disabled={!photoPreview || uploadingPhoto}
                className="btn-primary-dash flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploadingPhoto ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white dark:border-gray-900 border-t-transparent rounded-full animate-spin" />
                    Saving…
                  </span>
                ) : (
                  'Save photo'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileHeader;
