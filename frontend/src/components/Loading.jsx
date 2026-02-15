const Loading = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-900 flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <div className="w-10 h-10 border-2 border-[#E5E7EB] dark:border-gray-700 border-t-[#2563EB] dark:border-t-primary rounded-full animate-spin" />
        <p className="text-[14px] text-[#6B7280] dark:text-gray-400">Loading profile…</p>
      </div>
    </div>
  );
};

export default Loading;
