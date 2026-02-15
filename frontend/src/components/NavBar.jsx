import { User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function NavBar({ profile }) {
  const name = profile
    ? [profile.first_name, profile.last_name].filter(Boolean).join(' ') || 'Portfolio'
    : 'Portfolio';

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-dashboard mx-auto px-6 h-14 flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-900 dark:text-white truncate">
          {name}
        </span>
        <div className="flex items-center gap-2">
          <ThemeToggle inline />
          <div
            className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center"
            aria-hidden
          >
            <User size={18} className="text-gray-500 dark:text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
