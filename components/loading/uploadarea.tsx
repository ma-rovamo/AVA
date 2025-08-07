import { UploadAreaProps } from "@/types";
import { FileText, Trash2, Upload } from "lucide-react";

export const UploadArea: React.FC<UploadAreaProps> = ({ onFileUpload, fileMeta, onRemoveFile }) => (
  <div>
    <p className="text-sm text-gray-600 mb-3">
      2. Upload the signed purchase agreement and any counter-offers or addenda.
    </p>
    <p className="text-xs text-gray-500 mb-4">
      I'll create the file, timeline, and starter task list for you to review.
    </p>

    {/* Upload Area */}
    <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-gray-300 transition-colors">
      <input
        type="file"
        id="file-upload"
        name="pdf"
        className="hidden"
        onChange={onFileUpload}
        accept=".pdf,.doc,.docx"
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <Upload className="mx-auto mb-3 text-blue-500" size={32} />
        <p className="text-blue-500 font-medium mb-1">Click to Upload or drag and drop</p>
        <p className="text-xs text-gray-500">(Max. File Size: 25MB)</p>
      </label>
    </div>

    {/* Uploaded File */}
    {fileMeta && (
      <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="text-gray-500" size={20} />
          <div>
            <p className="text-sm font-medium text-gray-900">{fileMeta.name}</p>
            <p className="text-xs text-gray-500">{fileMeta.size}</p>
          </div>
        </div>
        <button
          onClick={onRemoveFile}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    )}
  </div>
);