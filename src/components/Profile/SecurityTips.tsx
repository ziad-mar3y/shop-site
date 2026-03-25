import { Lock } from "lucide-react";

export default function SecurityTips() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
      <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
        <Lock size={18} />
        Security Tips
      </h3>
      <ul className="space-y-2 text-sm text-blue-800">
        <li className="flex items-start gap-2">
          <span className="text-blue-500 mt-1">•</span>
          Use a strong password with at least 6 characters
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-500 mt-1">•</span>
          Include numbers, letters, and special characters
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-500 mt-1">•</span>
          Don't reuse passwords from other accounts
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-500 mt-1">•</span>
          Change your password regularly
        </li>
      </ul>
    </div>
  );
}
