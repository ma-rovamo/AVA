import { AccordionItemProps } from "@/types";
import { ChevronDown, ChevronRight } from "lucide-react";

export const AccordionItem: React.FC<AccordionItemProps> = ({ id, title, icon: Icon, children, isExpanded, onToggle }) => (
  <div className="border border-gray-200 rounded-lg mb-4">
    <button
      onClick={() => onToggle(id)}
      className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-blue-600" />
        <span className="font-medium text-gray-900">{title}</span>
      </div>
      {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
    </button>
    {isExpanded && (
      <div className="p-4 pt-0 border-t border-gray-100">
        {children}
      </div>
    )}
  </div>
);