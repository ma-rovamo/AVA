'use client'

import React from 'react'
import { Check, Loader2, AlertCircle } from 'lucide-react'

interface ScanStep {
  id: string
  title: string
  description: string
  status: 'pending' | 'processing' | 'completed' | 'error'
}

interface ScanProgressProps {
  steps: ScanStep[]
  currentStep: number
}

export default function ScanProgress({ steps, currentStep }: ScanProgressProps) {
  const getStepIcon = (step: ScanStep, index: number) => {
    if (step.status === 'completed') {
      return <Check className="w-5 h-5 text-white" />
    } else if (step.status === 'processing') {
      return <Loader2 className="w-5 h-5 text-white animate-spin" />
    } else if (step.status === 'error') {
      return <AlertCircle className="w-5 h-5 text-white" />
    } else {
      return <span className="text-white font-semibold text-sm">{index + 1}</span>
    }
  }

  const getStepColor = (step: ScanStep) => {
    switch (step.status) {
      case 'completed': return 'bg-green-500 shadow-green-200'
      case 'processing': return 'bg-blue-500 shadow-blue-200'
      case 'error': return 'bg-red-500 shadow-red-200'
      default: return 'bg-gray-300'
    }
  }

  const getConnectorColor = (index: number) => {
    if (index >= currentStep) return 'bg-gray-200'
    return steps[index].status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
  }

  return (
    <div className="space-y-1">
      {steps.map((step, index) => (
        <div key={step.id} className="relative">
          <div className="flex items-start gap-4">
            {/* Step Icon */}
            <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${getStepColor(step)} transition-all duration-500 shadow-lg`}>
              {getStepIcon(step, index)}
            </div>
            
            {/* Step Content */}
            <div className="flex-1 min-w-0 pb-8">
              <h3 className={`font-semibold transition-colors duration-300 ${
                step.status === 'processing' ? 'text-blue-600' : 
                step.status === 'completed' ? 'text-green-600' :
                step.status === 'error' ? 'text-red-600' :
                'text-gray-900'
              }`}>
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                {step.description}
              </p>
              
              {/* Status indicator */}
              {step.status === 'processing' && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-blue-600 font-medium">Processing...</span>
                </div>
              )}
              
              {step.status === 'completed' && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600 font-medium">Completed</span>
                </div>
              )}
              
              {step.status === 'error' && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-red-600 font-medium">Error occurred</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div 
              className={`absolute left-5 top-10 w-0.5 h-8 transition-colors duration-500 ${getConnectorColor(index)}`}
            ></div>
          )}
        </div>
      ))}
    </div>
  )
}