'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Edit, Trash2, FileText, Clock, CheckCircle, Star, Menu, X } from 'lucide-react';

interface DocumentItem {
  id: string;
  title: string;
  description: string;
  dateLabel: string;
  dateValue: string;
  status?: string;
  starred?: boolean;
}

interface TimelineItem {
  id: string;
  title: string;
  date: string;
  completed?: boolean;
}

const DocumentTimelineUI = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleDocuments, setVisibleDocuments] = useState<DocumentItem[]>([]);
  const [visibleTimeline, setVisibleTimeline] = useState<TimelineItem[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const documentsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const documents: DocumentItem[] = [
    {
      id: 'doc-1',
      title: 'Initial Deposit Due Date',
      description: '',
      dateLabel: 'INITIAL DEPOSIT DUE DATE',
      dateValue: '',
      status: 'info'
    },
    {
      id: 'doc-2',
      title: 'Additional Escrow Deposit Receipt',
      description: 'Receipt or confirmation of additional deposit ($135,000) made into escrow as required within 15 days after the effective date.',
      dateLabel: 'ADDITIONAL DEPOSIT DUE DATE',
      dateValue: '',
      starred: true
    },
    {
      id: 'doc-3',
      title: 'Loan Application Submission Confirmation',
      description: 'Proof that the buyer has made timely loan application with a lender, as contractually required within 5 days after the effective date.',
      dateLabel: 'LOAN APPLICATION DEADLINE',
      dateValue: '',
      starred: true
    },
    {
      id: 'doc-4',
      title: 'Loan Commitment or Lender Notice of Adverse Action',
      description: 'Written loan commitment from lender or notice of loan denial/adverse action documenting result of mortgage application; required to waive the finance contingency or to terminate contract if buyer cannot obtain a loan.',
      dateLabel: 'FINANCING CONTINGENCY WAIVER DATE',
      dateValue: '',
      starred: true
    },
    {
      id: 'doc-5',
      title: 'Condominium and Homeowners\' Association Documents',
      description: 'Complete current set of association (condominium and homeowners) governing documents, bylaws, rules, financials, and mandatory disclosure summaries; must include budgets, reserves, and resale/disclosure summaries as required by law.',
      dateLabel: '',
      dateValue: '',
      starred: true
    },
    {
      id: 'doc-6',
      title: 'Association Estoppel Letter',
      description: 'Letter from the condominium/homeowners association(s) stating assessments, fees, violations, pending special assessments, and financial status of the subject property/unit as of closing.',
      dateLabel: '',
      dateValue: '',
      starred: true
    },
    {
      id: 'doc-7',
      title: 'Home Inspection Report',
      description: 'Comprehensive Inspection report by',
      dateLabel: '',
      dateValue: '',
      starred: true
    }
  ];

  const timelineItems: TimelineItem[] = [
    { id: 'timeline-1', title: 'Effective Date', date: 'Jul 26, 2025', completed: true },
    { id: 'timeline-2', title: 'Counteroffer Expiration Date', date: 'Jul 28, 2025', completed: true },
    { id: 'timeline-3', title: 'Initial Deposit Due Date', date: 'Jul 29, 2025', completed: true },
    { id: 'timeline-4', title: 'Loan Application Deadline', date: 'Jul 31, 2025', completed: true },
    { id: 'timeline-5', title: 'Title Evidence Delivery Deadline', date: 'Aug 5, 2025', completed: true },
    { id: 'timeline-6', title: 'Additional Deposit Due Date', date: 'Aug 10, 2025', completed: true },
    { id: 'timeline-7', title: 'Inspection Period End Date', date: 'Aug 10, 2025', completed: true },
    { id: 'timeline-8', title: 'Closing Date', date: 'Aug 25, 2025', completed: false },
    { id: 'timeline-9', title: 'Examination Period End Date', date: 'Aug 25, 2025', completed: false },
    { id: 'timeline-10', title: 'Financing Contingency Waiver', date: 'Sep 3, 2025', completed: false }
  ];

  // Auto-add documents with improved animation timing
  useEffect(() => {
    const timeouts = documents.map((doc, index) => {
      return setTimeout(() => {
        setVisibleDocuments(prev => [...prev, doc]);
        // Auto-scroll to bottom
        setTimeout(() => {
          if (documentsRef.current) {
            documentsRef.current.scrollTo({
              top: documentsRef.current.scrollHeight,
              behavior: 'smooth'
            });
          }
        }, 150);
      }, index * 400); // Increased delay for more dramatic effect
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Auto-add timeline items with improved animation timing
  useEffect(() => {
    const timeouts = timelineItems.map((item, index) => {
      return setTimeout(() => {
        setVisibleTimeline(prev => [...prev, item]);
        // Auto-scroll to bottom
        setTimeout(() => {
          if (timelineRef.current) {
            timelineRef.current.scrollTo({
              top: timelineRef.current.scrollHeight,
              behavior: 'smooth'
            });
          }
        }, 120);
      }, index * 300); // Increased delay for more spaced timing
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const filteredDocuments = visibleDocuments.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Panel - Documents */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4 shadow-sm">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Planning Your Document Checklist</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200"
              />
            </div>
            <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              <Plus className="w-4 h-4" />
              Add Document
            </button>
            <button className="sm:hidden flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
            <button 
              className="lg:hidden flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Documents List */}
        <div 
          ref={documentsRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {filteredDocuments.length === 0 && searchTerm ? (
            <div className="text-center py-12 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No documents found matching "{searchTerm}"</p>
            </div>
          ) : (
            filteredDocuments.map((doc, index) => (
              <div
                key={`document-${doc.id}`}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 opacity-0 animate-fadeInUp"
                style={{
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  animationDelay: `${index * 0.15}s` // Increased delay for more visible staggering
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight">{doc.title}</h3>
                        {doc.starred && (
                          <div className="flex-shrink-0">
                            <Star className="w-4 h-4 text-amber-500 fill-current" />
                          </div>
                        )}
                      </div>
                      {doc.description && (
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                          {doc.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-4 flex-shrink-0">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                {doc.dateLabel && (
                  <div className="bg-blue-50 rounded-lg p-3 mt-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span className="text-xs font-medium text-blue-700 uppercase tracking-wide truncate">
                          {doc.dateLabel}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                        <button className="p-1 hover:bg-blue-100 rounded transition-colors">
                          <Edit className="w-3 h-3 text-blue-600" />
                        </button>
                        <button className="px-2 py-1 text-xs text-blue-600 hover:bg-blue-100 rounded transition-colors hidden sm:block">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Right Panel - Timeline */}
      <div className={`
        ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} 
        lg:translate-x-0 lg:relative
        fixed inset-y-0 right-0 z-50
        w-80 sm:w-96 lg:w-80 
        bg-white border-l border-gray-200 flex flex-col
        transition-transform duration-300 ease-in-out lg:transition-none
        shadow-xl lg:shadow-none
      `}>
        {/* AI Assistant Header */}
        <div className="px-4 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 text-sm mb-1">AI Assistant</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                I'm reviewing your timeline, contingencies, brokerage, and state requirements to figure out which documents you'll need. I'll also suggest deadlines for when they should be collected to keep you on track for closing.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Header */}
        <div className="px-4 py-3 border-b border-gray-200 bg-white">
          <h3 className="font-semibold text-gray-900 text-base">Transaction Timeline</h3>
        </div>

        {/* Timeline Items */}
        <div 
          ref={timelineRef}
          className="flex-1 overflow-y-auto px-4 py-4"
        >
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-4">
              {visibleTimeline.map((item, index) => (
                <div
                  key={`timeline-${item.id}`}
                  className="relative flex items-start gap-4 opacity-0 animate-slideInRight"
                  style={{
                    animation: 'slideInRight 0.3s ease-out forwards',
                    animationDelay: `${index * 0.12}s` // Increased delay for smoother cascade effect
                  }}
                >
                  <div className={`relative z-10 w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                    item.completed 
                      ? 'bg-blue-500 border-blue-500' 
                      : 'bg-white border-gray-300'
                  }`}>
                    {item.completed && (
                      <CheckCircle className="w-4 h-4 text-white absolute -inset-0" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0 pb-4">
                    <div className={`rounded-lg p-3 ${
                      item.completed 
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'bg-gray-50 border border-gray-200'
                    }`}>
                      <p className={`text-sm font-medium mb-1 ${
                        item.completed ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {item.title}
                      </p>
                      <p className={`text-xs ${
                        item.completed ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                        {item.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(15px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default DocumentTimelineUI;