'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import clsx from 'clsx';

const steps = [
  "Identifying property details...",
  "The property is located in New Jersey, USA...",
  "Confirming type of property as Single-Family Home...",
  "Identifying key parties and representation...",
  "Buyer identified for further processing...",
  "Seller identified for further processing...",
  "Checking purchase price structure...",
  "Purchase price set as specified in agreement...",
  "Analyzing earnest money terms...",
  "Earnest money amount defined in contract...",
  "Confirming buyer financing contingency period...",
  "Buyer to provide loan approval by specified date...",
  "Reviewing seller's default and remedies...",
  "Seller's remedies for buyer's default identified...",
  "Examining mediation and arbitration clauses...",
  "Mediation required before litigation...",
  "Identifying critical dates and deadlines...",
];

export default function PropertyProcessingLoader() {
  const [currentStep, setCurrentStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentStep]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div
        ref={scrollRef}
        className="h-[420px] overflow-y-auto pr-4 scroll-smooth space-y-4 hide-scrollbar"
      >
        {steps.slice(0, currentStep).map((step, index) => {
          const isLast = index === currentStep - 1;
          const isDone = index < currentStep - 1;

          return (
            <div key={index} className="flex items-start space-x-3 animate-fade-in-up">
              <div className="relative z-10 flex-shrink-0">
                {isDone ? (
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center animate-pop">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                ) : isLast ? (
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center animate-spin">
                    <Loader2 className="w-3 h-3 text-white" />
                  </div>
                ) : null}
              </div>
              <div
                className={clsx(
                  'text-sm transition-opacity duration-500',
                  isDone
                    ? 'text-green-700 font-medium'
                    : 'text-blue-700 font-medium'
                )}
              >
                {step}
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes pop {
          0% {
            transform: scale(0.6);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-pop {
          animation: pop 0.3s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
