
'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, X, FileText, Trash2, Loader2 } from 'lucide-react';
import PDFScanningModal from '../pdf-scanning/PDFScanningModal';


import { uploadPDFMain } from "@/lib/actions/addpdf.action";
import { FileMeta } from "@/types";
import { OnboardingLayout } from "../loading/onboarding";
import PropertyProcessingLoader from "../loading/loading";
import { AnalysisResults } from "../loading/analized";
import { SideSelection } from "../loading/side-section";
import { UploadArea } from "../loading/uploadarea";
import { OnboardingSteps } from "../loading/onstep";



const TransactionModalComponent = () => {
  const [selectedSide, setSelectedSide] = useState('Both');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileMeta, setFileMeta] = useState<FileMeta | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [showScanningModal, setShowScanningModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedAccordion, setExpandedAccordion] = useState('accordion');



  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size <= 25 * 1024 * 1024) {
      setUploadedFile(file);
      setFileMeta({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      });
      
      // Create URL for PDF preview
      const url = URL.createObjectURL(file);
      setPdfUrl(url);

    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setFileMeta(null);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
  };

  const handleStartIntake = async () => {
    if (!uploadedFile) return;

    setIsOpen(false);
    setShowScanningModal(true);
  };

  const handleScanningComplete = async (data: any) => {
    console.log('Scanning completed:', data);
    setShowScanningModal(false);
    // Navigate to transaction dashboard or update app state

    
    setLoading(true);
    setShowOnboarding(true);
    setResult(null);

    try {
      const formData = new FormData();
      const res = await uploadPDFMain(formData);
      
      if (res.success) {
        setResult(res.structuredData);
        console.log('Success:', res.structuredData);
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Error processing the PDF');
    } finally {
      setLoading(false);
    }
  };

  const toggleAccordion = (section: string) => {
    setExpandedAccordion(expandedAccordion === section ? '' : section);
  };

  // Full screen onboarding view
if (showOnboarding) {
  return (
    <OnboardingLayout pdfUrl={pdfUrl} fileMeta={fileMeta} currentStep={currentStep}>
      {/* Header */}
      {/* <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Transaction Analysis Complete</h2>
        <p className="text-gray-600">Review the extracted information from your purchase agreement</p>
      </div> */}

      {loading ? (
        <PropertyProcessingLoader />
      ) : result ? (
        <>
          {/* Step 1: Show extracted data (FAQs, Tables) */}
        {currentStep === 1 && (
  <>
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Transaction Details</h2>
      <p className="text-gray-600 text-xs">
       Take a look a moment to review the key details I pulled from your document.

You can make any edits before we finalize your life.
      </p>
    </div>

    <AnalysisResults 
      result={result} 
      expandedAccordion={expandedAccordion} 
      onToggleAccordion={toggleAccordion} 
    />

    <div className="mt-8 flex justify-between">
      <Button onClick={() => setShowOnboarding(false)} variant="outline">
        Back to Upload
      </Button>
      <Button onClick={() => setCurrentStep(2)} className="cursor-pointer">
        Let's Review
      </Button>
    </div>
  </>
)}


          {/* Step 2+: Timeline, Summary, etc. */}
          {currentStep > 1 && (
            <OnboardingSteps 
              result={result}
              currentStep={currentStep}
              onStepChange={setCurrentStep}
              onComplete={() => setShowOnboarding(false)}
              expandedAccordion={expandedAccordion}
              onToggleAccordion={toggleAccordion}
            />
          )}
        </>
      ) : null}
    </OnboardingLayout>
  );
}


  return (
    <div>
      <PDFScanningModal
        isOpen={showScanningModal}
        onClose={() => setShowScanningModal(false)}
        uploadedFile={uploadedFile}
        onComplete={handleScanningComplete}
      />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-gray-900 cursor-pointer hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2"
          >
            <span className="text-lg">+</span>
            <span>New Transaction</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-md mx-auto bg-white rounded-xl shadow-xl border-0 p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-4 relative">
           
            <DialogTitle className="text-xl font-semibold text-gray-900 pr-8">
              Welcome back, Dave! Ready for your next transaction?
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 pb-6 space-y-6">
            <SideSelection selectedSide={selectedSide} onSideChange={setSelectedSide} />
            <UploadArea onFileUpload={handleFileUpload} fileMeta={fileMeta} onRemoveFile={removeFile} />

            {/* Start Button */}
            <Button
              onClick={handleStartIntake}

              disabled={!uploadedFile}
              className="float-end bg-blue-600 text-white hover:bg-blue-700 py-3 text-base font-medium rounded-lg flex items-center gap-2"
              // @ts-ignore
              disabled={!uploadedFile || loading}
              className="float-end bg-blue-600 text-white cursor-pointer hover:bg-blue-700 py-3 text-base font-medium rounded-lg flex items-center gap-2"
              disabled={!uploadedFile || loading}
              className="float-end bg-blue-600 text-white cursor-pointer hover:bg-blue-700 py-3 text-base font-medium rounded-lg flex items-center gap-2"
            >
              Start Intake
            </Button>
          </div>
        </DialogContent>
      </Dialog>


    </div>
  );
};

export default TransactionModalComponent;