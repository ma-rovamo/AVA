import { SideSelectionProps } from "@/types";

export const SideSelection: React.FC<SideSelectionProps> = ({ selectedSide, onSideChange }) => (
  <div>
    <p className="text-sm text-gray-600 mb-3">
      1. Tell me which side you represent (buying, listing, or both)
    </p>
    <div className="flex gap-2">
      {['Buying', 'Listing', 'Both'].map((option) => (
        <button
          key={option}
          onClick={() => onSideChange(option)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedSide === option
              ? 'bg-black text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);