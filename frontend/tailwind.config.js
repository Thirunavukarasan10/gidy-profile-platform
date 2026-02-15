// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   darkMode: 'class',
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           50: '#f0f9ff',
//           100: '#e0f2fe',
//           200: '#bae6fd',
//           300: '#7dd3fc',
//           400: '#38bdf8',
//           500: '#0ea5e9',
//           600: '#0284c7',
//           700: '#0369a1',
//           800: '#075985',
//           900: '#0c4a6e',
//         },
//       },
//       animation: {
//         'fade-in': 'fadeIn 0.5s ease-in',
//         'slide-up': 'slideUp 0.4s ease-out',
//         'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
//       },
//       keyframes: {
//         fadeIn: {
//           '0%': { opacity: '0' },
//           '100%': { opacity: '1' },
//         },
//         slideUp: {
//           '0%': { transform: 'translateY(20px)', opacity: '0' },
//           '100%': { transform: 'translateY(0)', opacity: '1' },
//         },
//       },
//     },
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1d4ed8',
          light: '#eff6ff',
        },
        surface: '#F8F9FB',
        muted: '#6B7280',
      },
      maxWidth: {
        'dashboard': '1200px',
      },
      borderRadius: {
        'card': '16px',
      },
      spacing: {
        'section': '24px',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
      },
    },
  },
  plugins: [],
}