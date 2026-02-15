// import { Moon, Sun } from 'lucide-react';
// import { useTheme } from '../context/ThemeContext';

// const ThemeToggle = () => {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <button
//       onClick={toggleTheme}
//       className="fixed top-6 right-6 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-50"
//       aria-label="Toggle theme"
//     >
//       {theme === 'light' ? (
//         <Moon size={20} className="text-gray-700" />
//       ) : (
//         <Sun size={20} className="text-yellow-400" />
//       )}
//     </button>
//   );
// };

// export default ThemeToggle;
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ inline }) => {
  const { theme, toggleTheme } = useTheme();

  const baseClass = 'p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors active:scale-[0.98]';
  const positionClass = inline ? '' : 'fixed top-6 right-6 z-50 shadow-sm';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`${baseClass} ${positionClass}`}
      aria-label="Toggle dark mode"
    >
      {theme === 'light' ? (
        <Moon size={18} className="text-gray-600 dark:text-gray-400" />
      ) : (
        <Sun size={18} className="text-gray-500 dark:text-gray-300" />
      )}
    </button>
  );
};

export default ThemeToggle;