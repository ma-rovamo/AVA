import { OnboardingLayoutProps } from "@/types";
import { PDFPreview } from "./previewpdf";

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ children, pdfUrl, fileMeta, currentStep }) => {
  const showPDF = pdfUrl && currentStep < 3;

  return (
    <div className="fixed inset-0 bg-white z-50 flex">
      {/* Left Side - Dynamic Width */}
      <div className={`${showPDF ? "w-1/2" : "w-full"} p-6 overflow-y-auto border-r border-gray-200`}>
        <div className=" mx-auto">
          {children}
        </div>
      </div>

      {/* Right Side - PDF Preview */}
      {showPDF && (
        <div className="w-1/2 p-6">
          <PDFPreview pdfUrl={pdfUrl} />
        </div>
      )}
    </div>
  );
};
