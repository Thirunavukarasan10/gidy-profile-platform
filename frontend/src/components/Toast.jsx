import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

export default function Toast({ message, onClose, visible }) {
  useEffect(() => {
    if (!visible || !onClose) return;
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-3 bg-[#111827] dark:bg-gray-800 text-white rounded-lg shadow-lg animate-fade-in"
      role="status"
    >
      <CheckCircle size={20} className="text-emerald-400 shrink-0" />
      <span className="text-[14px] font-medium">{message}</span>
    </div>
  );
}
