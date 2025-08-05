'use client'

import React from 'react'
import { FileText, Download, ZoomIn, ZoomOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PDFPreviewProps {
  pdfUrl: string | null
  fileName?: string
  fileSize?: string
}

export default function PDFPreview({ pdfUrl, fileName, fileSize }: PDFPreviewProps) {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* PDF Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">
                {fileName || 'Sales Contract'}
              </h3>
              <p className="text-xs text-gray-600">
                {fileSize || 'PDF Document'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 p-4 bg-gray-100">
        {pdfUrl ? (
          <div className="w-full h-full bg-white rounded-lg shadow-sm overflow-hidden">
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
              className="w-full h-full border-0"
              title="Contract PDF Preview"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Loading PDF preview...</p>
              <p className="text-sm text-gray-500 mt-1">Please wait while we prepare your document</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}