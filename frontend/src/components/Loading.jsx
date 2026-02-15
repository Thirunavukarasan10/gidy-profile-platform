// const Loading = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//       <div className="text-center">
//         <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
//         <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
//       </div>
//     </div>
//   );
// };

// export default Loading;
const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-neutral-200 dark:border-neutral-700 border-t-neutral-600 dark:border-t-neutral-400 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-neutral-600 dark:text-neutral-400">Loading profile...</p>
      </div>
    </div>
  );
};

export default Loading;