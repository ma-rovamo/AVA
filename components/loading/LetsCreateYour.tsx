'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Edit, Trash2, FileText, Clock, CheckCircle, Star, Menu, X, Calendar } from 'lucide-react';

interface TaskItem {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  dateLabel: string;
  tags: string[];
  starred?: boolean;
  completed?: boolean;
}

interface TimelineItem {
  id: string;
  title: string;
  date: string;
  completed?: boolean;
}

const TaskListUI = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleTasks, setVisibleTasks] = useState<TaskItem[]>([]);
  const [visibleTimeline, setVisibleTimeline] = useState<TimelineItem[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const tasksRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const tasks: TaskItem[] = [
    {
      id: 'task-1',
      title: 'Calendar Contract Deadlines and Key Dates',
      description: 'Record all critical transaction deadlines such as inspection period end (08/10/2025), deposit due dates (07/29/2025 and 08/10/2025), title evidence (08/05/2025), and closing (08/25/2025) for proactive task management and reminders.',
      dueDate: '07/26/2025',
      dateLabel: 'EFFECTIVE DATE',
      tags: ['EFFECTIVE DATE'],
      starred: true
    },
    {
      id: 'task-2',
      title: 'Submit Initial Escrow Deposit',
      description: 'Ensure the buyer (Jeff Eckert, Kimberly Eckert) delivers the $25,000 initial deposit to escrow with Josh Rudnick by 07/29/2025; confirm wire instructions and provide receipt to all parties.',
      dueDate: '07/29/2025',
      dateLabel: 'INITIAL DEPOSIT DUE DATE',
      tags: ['INITIAL DEPOSIT DUE DATE', 'INITIAL ESCROW DEPOSIT RECEIPT'],
      starred: true
    },
    {
      id: 'task-3',
      title: 'Confirm Receipt of Initial Deposit',
      description: 'Obtain written confirmation or escrow receipt for the $25,000 initial deposit from escrow officer Josh Rudnick and distribute to clients and transaction file.',
      dueDate: '07/29/2025',
      dateLabel: 'INITIAL DEPOSIT DUE DATE',
      tags: ['INITIAL DEPOSIT DUE DATE', 'INITIAL ESCROW DEPOSIT RECEIPT'],
      starred: true
    },
    {
      id: 'task-4',
      title: 'Submit Formal Loan Application',
      description: 'Assist buyers to complete and submit formal mortgage loan application for $1,400,000 financing by 07/31/2025, and collect lender\'s application acknowledgment.',
      dueDate: '07/31/2025',
      dateLabel: 'LOAN APPLICATION DEADLINE',
      tags: ['LOAN APPLICATION DEADLINE', 'LOAN APPLICATION SUBMISSION CONFIRMATION'],
      starred: true
    },
    {
      id: 'task-5',
      title: 'Send Buyer Information Package',
      description: 'Provide buyers with detailed information on the property, association, closing process, and reminders about next steps including inspection, deposits, and association approval.',
      dueDate: '07/27/2025',
      dateLabel: '',
      tags: [],
      starred: true
    },
    {
      id: 'task-6',
      title: 'Order and Review Title Evidence',
      description: 'Coordinate with title company to order title commitment and review for any issues or requirements that need to be addressed before closing.',
      dueDate: '08/05/2025',
      dateLabel: 'TITLE EVIDENCE DELIVERY',
      tags: ['TITLE EVIDENCE DELIVERY'],
      starred: false
    },
    {
      id: 'task-7',
      title: 'Schedule Property Inspection',
      description: 'Coordinate with buyer to schedule comprehensive property inspection within the inspection period. Ensure inspector is licensed and experienced with similar properties.',
      dueDate: '08/08/2025',
      dateLabel: 'INSPECTION PERIOD',
      tags: ['INSPECTION PERIOD'],
      starred: true
    },
    {
      id: 'task-8',
      title: 'Submit Additional Escrow Deposit',
      description: 'Ensure buyer submits the additional deposit of $135,000 to escrow within 15 days after effective date. Coordinate with escrow officer for wire instructions.',
      dueDate: '08/10/2025',
      dateLabel: 'ADDITIONAL DEPOSIT DUE DATE',
      tags: ['ADDITIONAL DEPOSIT DUE DATE'],
      starred: true
    },
    {
      id: 'task-9',
      title: 'Review HOA Documents',
      description: 'Obtain and review complete set of HOA governing documents, bylaws, financials, and disclosure summaries. Ensure buyer receives all required documentation.',
      dueDate: '08/12/2025',
      dateLabel: 'HOA REVIEW PERIOD',
      tags: ['HOA DOCUMENTS'],
      starred: false
    },
    {
      id: 'task-10',
      title: 'Coordinate Appraisal Inspection',
      description: 'Schedule and coordinate property appraisal with lender\'s approved appraiser. Ensure property access and provide any necessary documentation.',
      dueDate: '08/15/2025',
      dateLabel: 'APPRAISAL PERIOD',
      tags: ['LOAN PROCESSING'],
      starred: false
    },
    {
      id: 'task-11',
      title: 'Obtain Loan Commitment Letter',
      description: 'Follow up with lender to ensure timely delivery of loan commitment letter or notice of adverse action to satisfy financing contingency requirements.',
      dueDate: '08/20/2025',
      dateLabel: 'FINANCING CONTINGENCY',
      tags: ['FINANCING CONTINGENCY WAIVER DATE'],
      starred: true
    },
    {
      id: 'task-12',
      title: 'Final Walk-through Preparation',
      description: 'Schedule final walk-through with buyer 24-48 hours before closing. Verify property condition and ensure all agreed-upon repairs are completed.',
      dueDate: '08/23/2025',
      dateLabel: 'FINAL WALK-THROUGH',
      tags: ['CLOSING PREPARATION'],
      starred: false
    },
    {
      id: 'task-13',
      title: 'Review Closing Disclosure',
      description: 'Review closing disclosure with buyer at least 3 days before closing. Verify all terms, costs, and loan details match the purchase agreement.',
      dueDate: '08/22/2025',
      dateLabel: 'CLOSING DISCLOSURE REVIEW',
      tags: ['CLOSING PREPARATION'],
      starred: true
    },
    {
      id: 'task-14',
      title: 'Coordinate Closing Process',
      description: 'Finalize closing arrangements with all parties, confirm document signing appointments, and ensure all contingencies have been satisfied or waived.',
      dueDate: '08/25/2025',
      dateLabel: 'CLOSING DATE',
      tags: ['CLOSING DATE'],
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

  // Auto-add tasks with animation
  useEffect(() => {
    const timeouts = tasks.map((task, index) => {
      return setTimeout(() => {
        setVisibleTasks(prev => [...prev, task]);
        setTimeout(() => {
          if (tasksRef.current) {
            tasksRef.current.scrollTo({
              top: tasksRef.current.scrollHeight,
              behavior: 'smooth'
            });
          }
        }, 150);
      }, index * 600); // Increased delay for smoother appearance
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Auto-add timeline items with animation
  useEffect(() => {
    const timeouts = timelineItems.map((item, index) => {
      return setTimeout(() => {
        setVisibleTimeline(prev => [...prev, item]);
        setTimeout(() => {
          if (timelineRef.current) {
            timelineRef.current.scrollTo({
              top: timelineRef.current.scrollHeight,
              behavior: 'smooth'
            });
          }
        }, 150);
      }, index * 400); // Increased delay for smoother appearance
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const filteredTasks = visibleTasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTagColor = (tag: string) => {
    if (tag.includes('EFFECTIVE')) return 'bg-blue-100 text-blue-700 border border-blue-200';
    if (tag.includes('DEPOSIT')) return 'bg-orange-100 text-orange-700 border border-orange-200';
    if (tag.includes('LOAN')) return 'bg-blue-100 text-blue-700 border border-blue-200';
    if (tag.includes('FINANCING')) return 'bg-purple-100 text-purple-700 border border-purple-200';
    if (tag.includes('INSPECTION')) return 'bg-green-100 text-green-700 border border-green-200';
    if (tag.includes('TITLE')) return 'bg-indigo-100 text-indigo-700 border border-indigo-200';
    if (tag.includes('HOA')) return 'bg-blue-100 text-blue-700 border border-blue-200';
    if (tag.includes('CLOSING')) return 'bg-red-100 text-red-700 border border-red-200';
    if (tag.includes('RESIDENTIAL')) return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
    return 'bg-gray-100 text-gray-700 border border-gray-200';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Panel - Tasks */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4 shadow-sm">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Building Your Task List</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200"
              />
            </div>
            <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors shadow-sm">
              <Plus className="w-4 h-4" />
              Add Task
            </button>
            <button className="sm:hidden flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
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

        {/* Tasks List */}
        <div 
          ref={tasksRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {filteredTasks.length === 0 && searchTerm ? (
            <div className="text-center py-12 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No tasks found matching "{searchTerm}"</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={`task-${task.id}`}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 opacity-0 animate-fadeInUp"
                style={{
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  animationDelay: `${filteredTasks.indexOf(task) * 0.1}s`
                }}
              >
                {/* Due Date Header */}
                {task.dueDate && (
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Due: {task.dueDate}</span>
                    {task.dateLabel && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {task.dateLabel}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900 text-base leading-tight">{task.title}</h3>
                        {task.starred && (
                          <div className="flex-shrink-0">
                            <Star className="w-4 h-4 text-amber-500 fill-current" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">
                        {task.description}
                      </p>
                      
                      {/* Tags */}
                      {task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {task.tags.map((tag, index) => (
                            <span
                              key={`${task.id}-tag-${index}`}
                              className={`px-2 py-1 rounded text-xs font-medium ${getTagColor(tag)}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-4 flex-shrink-0">
                    <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded transition-colors">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded transition-colors">
                      Remove
                    </button>
                  </div>
                </div>
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
              <p className="text-xs text-gray-600 leading-relaxed">
                I am generating tasks based on the details of your transaction, your timeline, and documents.
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
                    animation: 'slideInRight 0.4s ease-out forwards',
                    animationDelay: `${index * 0.1}s`
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
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
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

export default TaskListUI;