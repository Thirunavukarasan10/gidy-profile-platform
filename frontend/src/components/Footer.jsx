import { Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 py-6 border-t border-[#E5E7EB] dark:border-gray-700/50 bg-white dark:bg-gray-900/50">
      <div className="max-w-dashboard mx-auto px-6 text-center">
        <p className="text-[14px] font-medium text-[#111827] dark:text-gray-200">
          Profile Project © 2026
        </p>
        <p className="text-[14px] text-[#6B7280] dark:text-gray-400 mt-1">
          Built as a Full-Stack Technical Challenge
        </p>
        <p className="text-[14px] text-[#6B7280] dark:text-gray-400 mt-3">Connect with us:</p>
        <a
          href="https://www.linkedin.com/company/gidy/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-1.5 text-[14px] text-[#2563EB] hover:text-[#1d4ed8] transition-colors"
        >
          <Linkedin size={18} strokeWidth={1.5} />
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
