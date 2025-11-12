import { FileText, ChevronRight } from "lucide-react";

export default function Comprehensive() {
  return (
    <button className="flex cursor-pointer items-center justify-between w-full sm:w-auto bg-[#197B93] text-white font-medium rounded-md px-4 py-2.5 hover:bg-[#166c82] transition-all duration-200 shadow-sm text-sm">
      <div className="flex items-center gap-1.5">
        <FileText className="w-4 h-4 text-white" />
        <span className="text-xs">Read Comprehensive Paragraph</span>
      </div>
      <ChevronRight className="w-4 h-4 text-white ml-2" />
    </button>
  );
}
