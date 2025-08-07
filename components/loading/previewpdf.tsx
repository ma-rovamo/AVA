import { PDFPreviewProps } from "@/types";
import { FileText } from "lucide-react";
interface PDFPreviewPropsm {
  pdfUrl: string;
}
export const PDFPreview: React.FC<PDFPreviewPropsm> = ({ pdfUrl }) => (
  <div className="h-full flex flex-col">
    {/* <div className="mb-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Purchase Agreement</h3>
      <p className="text-sm text-gray-600">
        {fileMeta ? `${fileMeta.name} (${fileMeta.size})` : 'No document uploaded'}
      </p>
    </div> */}
    
    {pdfUrl ? (
      <div className="flex-1 border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50">
        <iframe
          src={pdfUrl}
          className="w-full h-full"
          title="PDF Preview"
        />
      </div>
    ) : (
      <div className="flex-1 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-500">
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>PDF preview will appear here</p>
        </div>
      </div>
    )}
  </div>
);
