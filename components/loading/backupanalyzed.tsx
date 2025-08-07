// import React from 'react';
// import { Calendar, Clock, FileText, DollarSign, CheckCircle, ChevronDown, ChevronRight } from "lucide-react";

// interface AnalysisResultsProps {
//   result: any;
//   expandedAccordion: string;
//   onToggleAccordion: (section: string) => void;
// }

// // Custom Accordion Item Component (to avoid conflicts with shadcn/ui)
// interface CustomAccordionItemProps {
//   id: string;
//   title: string;
//   icon: React.ComponentType<{ className?: string }>;
//   children: React.ReactNode;
//   isExpanded: boolean;
//   onToggle: (id: string) => void;
// }

// const CustomAccordionItem: React.FC<CustomAccordionItemProps> = ({ 
//   id, 
//   title, 
//   icon: Icon, 
//   children, 
//   isExpanded, 
//   onToggle 
// }) => (
//   <div className="border border-gray-200 rounded-xl shadow-sm bg-white overflow-hidden">
//     <button
//       onClick={() => onToggle(id)}
//       className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
//       type="button"
//     >
//       <div className="flex items-center gap-3">
//         <Icon className="w-5 h-5 text-blue-600" />
//         <span className="font-semibold text-gray-900 text-base">{title}</span>
//       </div>
//       {isExpanded ? <ChevronDown className="w-5 h-5 text-gray-500" /> : <ChevronRight className="w-5 h-5 text-gray-500" />}
//     </button>
//     {isExpanded && (
//       <div className="px-5 pb-5 pt-2 border-t border-gray-100 bg-gray-50">
//         {children}
//       </div>
//     )}
//   </div>
// );

// // Analysis Results Component
// export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ 
//   result, 
//   expandedAccordion, 
//   onToggleAccordion 
// }) => {
//   if (!result) {
//     return <div className="text-center text-gray-500">No results to display</div>;
//   }

//   return (
//     <div className="space-y-6">
//       {/* Q&A Analysis */}
//       <CustomAccordionItem
//         id="accordion"
//         title="Q&A Analysis"
//         icon={FileText}
//         isExpanded={expandedAccordion === 'accordion'}
//         onToggle={onToggleAccordion}
//       >
//         <div className="space-y-3">
//           {result.accordion?.map((item: any, index: number) => (
//             <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
//               <h4 className="font-semibold text-gray-800 mb-2">{item.question || 'No question'}</h4>
//               <p className="text-sm text-gray-700 mb-1">{item.answer || 'No answer'}</p>
//               <span className="text-xs text-gray-500">Page {item.page || 'N/A'}</span>
//             </div>
//           )) || <div className="text-sm text-gray-500">No Q&A data available</div>}
//         </div>
//       </CustomAccordionItem>

//       {/* Document Tables */}
//       <CustomAccordionItem
//         id="tables"
//         title="Document Tables"
//         icon={DollarSign}
//         isExpanded={expandedAccordion === 'tables'}
//         onToggle={onToggleAccordion}
//       >
//         <div className="space-y-4">
//           {result.tables?.map((table: any, index: number) => (
//             <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
//               <h4 className="font-semibold text-gray-800 mb-3">{table.title || 'Table'}</h4>
//               <div className="overflow-x-auto rounded-md border">
//                 <table className="w-full text-sm table-auto">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       {(table.headers || []).map((header: string, hIndex: number) => (
//                         <th key={hIndex} className="text-left p-2 font-semibold text-gray-700">
//                           {header}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {(table.rows || []).map((row: string[], rIndex: number) => (
//                       <tr key={rIndex} className="border-t border-gray-100">
//                         {(row || []).map((cell: string, cIndex: number) => (
//                           <td key={cIndex} className="p-2 text-gray-900">
//                             {cell}
//                           </td>
//                         ))}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <span className="text-xs text-gray-500 mt-2 block">Page {table.page || 'N/A'}</span>
//             </div>
//           )) || <div className="text-sm text-gray-500">No table data available</div>}
//         </div>
//       </CustomAccordionItem>

//       {/* Transaction Timeline */}
//       <CustomAccordionItem
//         id="timeline"
//         title="Transaction Timeline"
//         icon={Calendar}
//         isExpanded={expandedAccordion === 'timeline'}
//         onToggle={onToggleAccordion}
//       >
//         <div className="space-y-2">
//           {result.timeline?.map((item: any, index: number) => (
//             <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
//               <div className="flex items-center gap-3">
//                 <Calendar className="w-5 h-5 text-blue-600" />
//                 <div>
//                   <span className="font-semibold text-gray-900 block">{item.milestone || 'Milestone'}</span>
//                   <span className="text-sm text-gray-600">{item.description || 'No description'}</span>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <span className="text-sm font-medium text-gray-900 block">{item.date || 'No date'}</span>
//                 <span className="text-xs text-gray-500">Page {item.page || 'N/A'}</span>
//               </div>
//             </div>
//           )) || <div className="text-sm text-gray-500">No timeline data available</div>}
//         </div>
//       </CustomAccordionItem>

//       {/* Action Items */}
//       <CustomAccordionItem
//         id="tasks"
//         title="Action Items"
//         icon={CheckCircle}
//         isExpanded={expandedAccordion === 'tasks'}
//         onToggle={onToggleAccordion}
//       >
//         <div className="space-y-2">
//           {result.tasks?.map((task: any, index: number) => (
//             <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
//               <div className="flex items-center gap-3">
//                 <div className={`w-2.5 h-2.5 rounded-full mt-0.5 ${
//                   task.priority === 'High' ? 'bg-red-500' :
//                   task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
//                 }`} />
//                 <div>
//                   <span className="font-semibold text-gray-900 block">{task.title || 'Task'}</span>
//                   <span className="text-sm text-gray-600">Due: {task.dueDate || 'No due date'}</span>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                   task.priority === 'High' ? 'bg-red-100 text-red-800' :
//                   task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
//                   'bg-green-100 text-green-800'
//                 }`}>
//                   {task.priority || 'Low'}
//                 </span>
//                 <span className="text-xs text-gray-500 block mt-1">Page {task.page || 'N/A'}</span>
//               </div>
//             </div>
//           )) || <div className="text-sm text-gray-500">No task data available</div>}
//         </div>
//       </CustomAccordionItem>

//       {/* Critical Deadlines */}
//       <CustomAccordionItem
//         id="deadlines"
//         title="Critical Deadlines"
//         icon={Clock}
//         isExpanded={expandedAccordion === 'deadlines'}
//         onToggle={onToggleAccordion}
//       >
//         <div className="space-y-2">
//           {result.deadlines?.map((deadline: any, index: number) => (
//             <div key={index} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm">
//               <div className="flex items-center gap-3">
//                 <Clock className="w-5 h-5 text-red-600" />
//                 <div>
//                   <span className="font-semibold text-gray-900 block">{deadline.name || 'Deadline'}</span>
//                   <span className="text-sm text-gray-600">{deadline.relatedTask || 'No related task'}</span>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <span className="text-sm font-semibold text-red-700 block">{deadline.deadline || 'No deadline'}</span>
//                 <span className="text-xs text-gray-500">Page {deadline.page || 'N/A'}</span>
//               </div>
//             </div>
//           )) || <div className="text-sm text-gray-500">No deadline data available</div>}
//         </div>
//       </CustomAccordionItem>
//     </div>
//   );
// };
