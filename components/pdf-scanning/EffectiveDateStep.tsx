'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calendar, AlertTriangle, CheckCircle } from 'lucide-react'

interface EffectiveDateStepProps {
  detectedDate: string
  effectiveDate: string
  onDateChange: (date: string) => void
  onConfirm: () => void
  isProcessing?: boolean
}

export default function EffectiveDateStep({
  detectedDate,
  effectiveDate,
  onDateChange,
  onConfirm,
  isProcessing = false
}: EffectiveDateStepProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const isDateChanged = detectedDate !== effectiveDate

  return (
    <div className="bg-white rounded-xl border border-blue-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <Calendar className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Confirm Effective Date
          </h3>
          <p className="text-sm text-gray-600">
            This date determines all other contract deadlines
          </p>
        </div>
      </div>

      {/* Detected Date Info */}
      {detectedDate && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">
                Detected from contract:
              </p>
              <p className="text-sm text-blue-700">
                {formatDate(detectedDate)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Date Input */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="effective-date" className="text-sm font-medium text-gray-700">
            Effective Date *
          </Label>
          <Input
            id="effective-date"
            type="date"
            value={effectiveDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="mt-1 text-base"
          />
          {effectiveDate && (
            <p className="text-sm text-gray-600 mt-2">
              {formatDate(effectiveDate)}
            </p>
          )}
        </div>

        {/* Warning for changed date */}
        {isDateChanged && (
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-900">
                  Date Modified
                </p>
                <p className="text-xs text-amber-700">
                  You've changed the date from what was detected in the contract. 
                  Make sure this is correct as it affects all deadlines.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Confirm Button */}
        <Button
          onClick={onConfirm}
          disabled={!effectiveDate || isProcessing}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating Timeline...
            </>
          ) : (
            'Confirm & Generate Timeline'
          )}
        </Button>
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">
          What happens next?
        </h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Tasks will be created based on contract terms</li>
          <li>• Deadlines will be calculated from the effective date</li>
          <li>• Timeline will be set up for the entire transaction</li>
          <li>• You can review and modify everything after setup</li>
        </ul>
      </div>
    </div>
  )
}