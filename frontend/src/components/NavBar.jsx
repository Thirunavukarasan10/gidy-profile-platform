import { Edit2, Eye } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function NavBar({ isEditing, onEditToggle }) {
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-[#E5E7EB] dark:border-gray-800">
      <div className="max-w-dashboard mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-lg font-semibold text-[#111827] dark:text-white">
          Profile Project
        </span>
        <div className="flex items-center gap-2">
          <ThemeToggle inline />
          {onEditToggle && (
            <button
              type="button"
              onClick={onEditToggle}
              className="inline-flex items-center gap-2 px-3 py-2 text-[14px] font-medium rounded-lg border border-[#E5E7EB] dark:border-gray-600 text-[#111827] dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors duration-200 active:scale-[0.98]"
              aria-label={isEditing ? 'Switch to view mode' : 'Switch to edit mode'}
            >
              {isEditing ? (
                <>
                  <Eye size={16} />
                  View
                </>
              ) : (
                <>
                  <Edit2 size={16} />
                  Edit
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
