const Loading = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-gray-900 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-dashboard mx-auto px-6 space-y-6 animate-fade-in">
        <div className="flex gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <div className="h-40 bg-white dark:bg-gray-800 rounded-[16px] shadow-sm animate-pulse" />
            <div className="h-48 bg-white dark:bg-gray-800 rounded-[16px] shadow-sm animate-pulse" />
          </div>
          <div className="lg:col-span-4 space-y-6">
            <div className="h-36 bg-white dark:bg-gray-800 rounded-[16px] shadow-sm animate-pulse" />
            <div className="h-44 bg-white dark:bg-gray-800 rounded-[16px] shadow-sm animate-pulse" />
          </div>
        </div>
        <p className="text-center dashboard-muted">Loading…</p>
      </div>
    </div>
  );
};

export default Loading;
