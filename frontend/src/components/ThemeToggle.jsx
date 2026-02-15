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

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 p-3 bg-white dark:bg-neutral-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-50 border border-neutral-200 dark:border-neutral-700"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon size={20} className="text-neutral-700" />
      ) : (
        <Sun size={20} className="text-neutral-400" />
      )}
    </button>
  );
};

export default ThemeToggle;