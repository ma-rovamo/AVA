'use client'

import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Check, Loader2, FileText, Calendar, AlertCircle, ChevronRight } from 'lucide-react'
import { uploadPDFMain } from '@/lib/actions/addpdf.action'
import ScanProgress from './ScanProgress'
import PDFPreview from './PDFPreview'
import EffectiveDateStep from './EffectiveDateStep'

interface PDFScanningModalProps {
  isOpen: boolean
  onClose: () => void
  uploadedFile: File | null
  onComplete: (data: any) => void
}

interface ScanStep {
  id: string
  title: string
  description: string
  status: 'pending' | 'processing' | 'completed' | 'error'
}

export default function PDFScanningModal({ 
  isOpen, 
  onClose, 
  uploadedFile, 
  onComplete 
}: PDFScanningModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [extractedData, setExtractedData] = useState<any>(null)
  const [effectiveDate, setEffectiveDate] = useState('')
  const [detectedDate, setDetectedDate] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showDateConfirmation, setShowDateConfirmation] = useState(false)

  const scanSteps: ScanStep[] = [
    {
      id: 'upload',
      title: 'Document Upload',
      description: 'Uploading and validating PDF document',
      status: 'pending'
    },
    {
      id: 'extract',
      title: 'Text Extraction',
      description: 'Extracting text content from PDF',
      status: 'pending'
    },
    {
      id: 'analyze',
      title: 'Contract Analysis',
      description: 'Analyzing contract terms and identifying key information',
      status: 'pending'
    },
    {
      id: 'effective-date',
      title: 'Effective Date Detection',
      description: 'Identifying contract effective date',
      status: 'pending'
    },
    {
      id: 'confirm-date',
      title: 'Date Confirmation',
      description: 'Confirming effective date with user',
      status: 'pending'
    },
    {
      id: 'generate',
      title: 'Timeline Generation',
      description: 'Creating tasks and deadlines based on contract terms',
      status: 'pending'
    }
  ]

  const [steps, setSteps] = useState(scanSteps)

  useEffect(() => {
    if (isOpen && uploadedFile) {
      // Create PDF URL for preview
      const url = URL.createObjectURL(uploadedFile)
      setPdfUrl(url)
      
      // Start scanning process
      startScanning()
    }

    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl)
      }
    }
  }, [isOpen, uploadedFile])

  const updateStepStatus = (stepId: string, status: ScanStep['status']) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, status } : step
    ))
  }

  const startScanning = async () => {
    if (!uploadedFile) return

    setIsProcessing(true)
    
    try {
      // Step 1: Upload
      setCurrentStep(0)
      updateStepStatus('upload', 'processing')
      await new Promise(resolve => setTimeout(resolve, 1000))
      updateStepStatus('upload', 'completed')

      // Step 2: Extract
      setCurrentStep(1)
      updateStepStatus('extract', 'processing')
      await new Promise(resolve => setTimeout(resolve, 1500))
      updateStepStatus('extract', 'completed')

      // Step 3: Analyze
      setCurrentStep(2)
      updateStepStatus('analyze', 'processing')
      await new Promise(resolve => setTimeout(resolve, 2000))
      updateStepStatus('analyze', 'completed')

      // Step 4: Effective Date Detection
      setCurrentStep(3)
      updateStepStatus('effective-date', 'processing')
      
      // Process PDF and extract data
      const formData = new FormData()
      formData.append('pdf', uploadedFile)
      
      const result = await uploadPDFMain(formData)
      setExtractedData(result.structuredData)
      
      // Simulate detecting effective date from contract
      const mockDetectedDate = '2025-07-26' // This would come from AI analysis
      setDetectedDate(mockDetectedDate)
      setEffectiveDate(mockDetectedDate)
      
      updateStepStatus('effective-date', 'completed')

      // Step 5: Show date confirmation
      setCurrentStep(4)
      updateStepStatus('confirm-date', 'processing')
      setShowDateConfirmation(true)

    } catch (error) {
      console.error('Scanning error:', error)
      updateStepStatus(steps[currentStep]?.id || 'upload', 'error')
    }
  }

  const confirmEffectiveDate = async () => {
    if (!effectiveDate) return

    updateStepStatus('confirm-date', 'completed')
    
    // Step 6: Generate timeline
    setCurrentStep(5)
    updateStepStatus('generate', 'processing')
    setShowDateConfirmation(false)
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    updateStepStatus('generate', 'completed')
    
    setIsProcessing(false)
    
    // Complete the process
    setTimeout(() => {
      onComplete({
        ...extractedData,
        effectiveDate,
        contractUrl: pdfUrl
      })
      onClose()
    }, 1000)
  }

  const getStepIcon = (step: ScanStep, index: number) => {
    if (step.status === 'completed') {
      return <Check className="w-5 h-5 text-white" />
    } else if (step.status === 'processing') {
      return <Loader2 className="w-5 h-5 text-white animate-spin" />
    } else if (step.status === 'error') {
      return <AlertCircle className="w-5 h-5 text-white" />
    } else {
      return <span className="text-white font-semibold">{index + 1}</span>
    }
  }

  const getStepColor = (step: ScanStep) => {
    switch (step.status) {
      case 'completed': return 'bg-green-500'
      case 'processing': return 'bg-blue-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-gray-300'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-0 overflow-hidden">
        <div className="flex h-full">
          {/* Left Panel - Progress */}
          <div className="w-1/2 bg-gray-50 p-8 overflow-y-auto">
            <div className="max-w-md mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Scanning Contract
                </h2>
                <p className="text-gray-600">
                  Analyzing your real estate contract to set up the transaction
                </p>
              </div>

              <ScanProgress steps={steps} currentStep={currentStep} />

              {/* Effective Date Confirmation */}
              {showDateConfirmation && (
                <div className="mt-8">
                  <EffectiveDateStep
                    detectedDate={detectedDate}
                    effectiveDate={effectiveDate}
                    onDateChange={setEffectiveDate}
                    onConfirm={confirmEffectiveDate}
                    isProcessing={isProcessing}
                  />
                </div>
              )}

              {/* Completion Message */}
              {steps.every(step => step.status === 'completed') && (
                <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Check className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg font-semibold text-green-900">
                      Contract Processed Successfully!
                    </h3>
                  </div>
                  <p className="text-green-700">
                    Your transaction has been set up with tasks and deadlines based on the contract terms.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - PDF Preview */}
          <div className="w-1/2 border-l border-gray-200">
            <PDFPreview
              pdfUrl={pdfUrl}
              fileName={uploadedFile?.name}
              fileSize={uploadedFile ? `${(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB` : undefined}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}