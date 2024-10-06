import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function BackButton() {
  return (
    <Link
      to=".."
      relative="path"
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
    >
      <ChevronLeft className="w-4 h-4" />
      Back
    </Link>
  );
}
