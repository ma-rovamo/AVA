import React from 'react';
import { Calendar, Clock, FileText, DollarSign, CheckCircle, ChevronDown, ChevronRight } from "lucide-react";

interface AnalysisResultsProps {
  result: any;
  expandedAccordion: string;
  onToggleAccordion: (section: string) => void;
}

interface CustomAccordionItemProps {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  rightContent?: React.ReactNode;
}

const CustomAccordionItem: React.FC<CustomAccordionItemProps> = ({ 
  id, 
  title, 
  icon: Icon, 
  children, 
  isExpanded, 
  onToggle,
  rightContent
}) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <button
      onClick={() => onToggle(id)}
      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      type="button"
    >
      <div className="flex items-center gap-3">
        <span className="font-semibold text-gray-900 text-base">{title}</span>
      </div>
      <div className="flex items-center gap-4">
        {rightContent}
        {isExpanded ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
      </div>
    </button>
    {isExpanded && (
      <div className="px-6 pb-6 border-t border-gray-100">
        {children}
      </div>
    )}
  </div>
);

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ 
  result, 
  expandedAccordion, 
  onToggleAccordion 
}) => {
  if (!result) {
    return <div className="text-center text-gray-500">No results to display</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="space-y-4">
        
        {/* Document Tables */}
        {result.tables && result.tables.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 bg-blue-600">
              <h2 className="text-lg font-semibold text-white flex items-center gap-3">
             
              Property Details
              </h2>
            </div>
            <div className="overflow-hidden">
              {result.tables.map((table: any, index: number) => (
                <div key={index} className="border-b border-gray-100 last:border-b-0">
                  {table.title && (
                    <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
                      <h4 className="font-semibold text-gray-800">{table.title}</h4>
                    </div>
                  )}
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        {(table.headers || []).map((header: string, hIndex: number) => (
                          <th key={hIndex} className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(table.rows || []).map((row: string[], rIndex: number) => (
                        <tr key={rIndex} className="border-b border-gray-100 last:border-b-0">
                          {(row || []).map((cell: string, cIndex: number) => (
                            <td key={cIndex} className="px-6 py-3 text-sm text-gray-900">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="px-6 py-2 bg-gray-50 text-xs text-gray-500">
                    Page {table.page || 'N/A'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Financing History Table */}
        {result.financingHistory && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 bg-blue-600">
              <h2 className="text-lg font-semibold text-white flex items-center gap-3">
                <DollarSign className="w-5 h-5" />
                Financing History
              </h2>
            </div>
            <div className="overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {result.financingHistory.map((item: any, index: number) => (
                    <tr key={index} className="border-b border-gray-100 last:border-b-0">
                      <td className="px-6 py-3 text-sm text-gray-900">{item.date}</td>
                      <td className="px-6 py-3 text-sm text-gray-900">{item.amount}</td>
                      <td className="px-6 py-3 text-sm text-gray-900">{item.type}</td>
                      <td className="px-6 py-3 text-sm text-gray-900">{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Terms Section */}
        {result.terms && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600" />
                Terms & Conditions
              </h3>
            </div>
            <div className="p-6">
              <div className="text-sm text-gray-700 whitespace-pre-line">
                {result.terms}
              </div>
            </div>
          </div>
        )}

        {/* Individual Timeline Items - Each as separate collapsible */}
        {result.timeline && result.timeline.map((item: any, index: number) => (
          <CustomAccordionItem
            key={`timeline-${index}`}
            id={`timeline-${index}`}
            title={item.milestone || 'Milestone'}
            icon={Calendar}
            isExpanded={expandedAccordion === `timeline-${index}`}
            onToggle={onToggleAccordion}
            rightContent={
              <div className="text-right mr-4">
                <div className="text-sm font-medium text-gray-900">{item.date || 'TBD'}</div>
                <div className="text-xs text-gray-500">Page {item.page || 'N/A'}</div>
              </div>
            }
          >
            <div className="mt-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
                <p className="text-sm text-gray-700">{item.description || 'No description available'}</p>
              </div>
            </div>
          </CustomAccordionItem>
        ))}

        {/* Critical Deadlines */}
        {result.deadlines && result.deadlines.length > 0 && (
          <CustomAccordionItem
            id="deadlines"
            title="Critical Deadlines"
            icon={Clock}
            isExpanded={expandedAccordion === 'deadlines'}
            onToggle={onToggleAccordion}
          >
            <div className="mt-4 space-y-3">
              {result.deadlines.map((deadline: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-red-600" />
                    <div>
                      <span className="font-semibold text-gray-900 block">{deadline.name || 'Deadline'}</span>
                      <span className="text-sm text-gray-600">{deadline.relatedTask || 'No related task'}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-red-700 block">{deadline.deadline || 'TBD'}</span>
                    <span className="text-xs text-gray-500">Page {deadline.page || 'N/A'}</span>
                  </div>
                </div>
              ))}
            </div>
          </CustomAccordionItem>
        )}

        {/* Action Items */}
        {result.tasks && result.tasks.length > 0 && (
          <CustomAccordionItem
            id="tasks"
            title="Action Items"
            icon={CheckCircle}
            isExpanded={expandedAccordion === 'tasks'}
            onToggle={onToggleAccordion}
          >
            <div className="mt-4 space-y-3">
              {result.tasks.map((task: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      task.priority === 'High' ? 'bg-red-500' :
                      task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                    <div>
                      <span className="font-semibold text-gray-900 block">{task.title || 'Task'}</span>
                      <span className="text-sm text-gray-600">Due: {task.dueDate || 'No due date'}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.priority === 'High' ? 'bg-red-100 text-red-800' :
                      task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority || 'Low'}
                    </span>
                    <span className="text-xs text-gray-500 block mt-1">Page {task.page || 'N/A'}</span>
                  </div>
                </div>
              ))}
            </div>
          </CustomAccordionItem>
        )}

        {/* Q&A Analysis */}
        {result.accordion && result.accordion.length > 0 && (
          <CustomAccordionItem
            id="accordion"
            title="Q&A Analysis"
            icon={FileText}
            isExpanded={expandedAccordion === 'accordion'}
            onToggle={onToggleAccordion}
          >
            <div className="mt-4 space-y-4">
              {result.accordion.map((item: any, index: number) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">{item.question || 'No question'}</h4>
                  <p className="text-sm text-gray-700 mb-2">{item.answer || 'No answer'}</p>
                  <span className="text-xs text-gray-500">Page {item.page || 'N/A'}</span>
                </div>
              ))}
            </div>
          </CustomAccordionItem>
        )}

      </div>
    </div>
  );
};