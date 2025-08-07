import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}






// backup code 
// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Upload, X, FileText, Trash2, Loader2, ChevronDown, ChevronRight, Home, Calendar, CheckCircle, Clock, DollarSign, User, MapPin, Check, Edit, MessageSquare } from 'lucide-react';

// const TransactionModalComponent = () => {
//   const [selectedSide, setSelectedSide] = useState('Both');
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [fileMeta, setFileMeta] = useState<any>(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<any>(null);
//   const [showOnboarding, setShowOnboarding] = useState(false);
//   const [pdfUrl, setPdfUrl] = useState(null);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [expandedAccordion, setExpandedAccordion] = useState('');
//   const [loadingSteps, setLoadingSteps] = useState([]);
//   const [completedSteps, setCompletedSteps] = useState([]);
//   const [currentAnalysisStep, setCurrentAnalysisStep] = useState(0);

//   // AI Analysis Steps
//   const analysisSteps:any = [
//     "Analyzing earnest money terms...",
//     "Earnest money amount defined in contract...",
//     "Confirming buyer financing contingency period...",
//     "Buyer to provide loan approval by specified date...",
//     "Reviewing seller's default and remedies...",
//     "Seller's remedies for buyer's default identified...",
//     "Examining mediation and arbitration clauses...",
//     "Mediation required before litigation...",
//     "Identifying critical dates and deadlines...",
//     "Closing date set as per agreement...",
//     "Survey problems to be addressed before closing...",
//     "Title search report timeline specified...",
//     "Inspection period and repair negotiations confirmed...",
//     "Terminating rights and obligations reviewed...",
//     "Observing arbitration exclusions for specific legal actions...",
//     "Checking governing law jurisdiction as New Jersey...",
//     "Enforcing offer expiration terms in contract..."
//   ];

//   // Mock result data for demonstration
//   const mockResult = {
//     summary: "Purchase agreement for 279A N Route 9, Ocean View, NJ 08230. Single-family home transaction between Maria and Daniel Gonzalez (buyers) and Robert and Susan Smith (sellers). Includes refrigerator, washer, dryer, all window treatments, and existing light fixtures.",
//     transactionDetails: {
//       address: "279A N Route 9",
//       city: "Ocean View",
//       state: "NJ",
//       zip: "08230",
//       country: "USA",
//       propertyType: "Single-Family Home",
//       includedPersonalProperty: "Refrigerator, Washer, Dryer, all window treatments, and existing light fixtures"
//     },
//     parties: [
//       { name: "Maria and Daniel Gonzalez", role: "BUYER" },
//       { name: "Robert and Susan Smith", role: "SELLER" },
//       { name: "Emily Hart", role: "BUYER AGENT" },
//       { name: "Daniel Lee", role: "LISTING AGENT" }
//     ],
//     accordion: [
//       {
//         question: "What is the earnest money amount?",
//         answer: "The earnest money deposit is $5,000, to be held in escrow by the title company.",
//         page: 1
//       },
//       {
//         question: "What is the financing contingency period?",
//         answer: "Buyer has 21 days from the acceptance date to obtain loan approval and provide written confirmation to seller.",
//         page: 2
//       },
//       {
//         question: "What are the seller's remedies for buyer default?",
//         answer: "In case of buyer default, seller may retain the earnest money as liquidated damages or pursue specific performance through legal action.",
//         page: 3
//       }
//     ],
//     tables: [
//       {
//         title: "Purchase Price Breakdown",
//         headers: ["Item", "Amount", "Due Date"],
//         rows: [
//           ["Purchase Price", "$485,000", "At Closing"],
//           ["Earnest Money", "$5,000", "Upon Acceptance"],
//           ["Down Payment", "$97,000", "At Closing"]
//         ],
//         page: 1
//       }
//     ],
//     timeline: [
//       {
//         milestone: "Contract Acceptance",
//         description: "Purchase agreement signed by all parties",
//         date: "March 15, 2024",
//         page: 1
//       },
//       {
//         milestone: "Inspection Period Ends",
//         description: "Buyer must complete all inspections",
//         date: "March 25, 2024",
//         page: 2
//       },
//       {
//         milestone: "Financing Contingency",
//         description: "Loan approval deadline",
//         date: "April 5, 2024",
//         page: 2
//       },
//       {
//         milestone: "Closing Date",
//         description: "Final transaction completion",
//         date: "April 30, 2024",
//         page: 1
//       }
//     ],
//     tasks: [
//       {
//         title: "Order Home Inspection",
//         dueDate: "March 20, 2024",
//         priority: "High",
//         page: 2
//       },
//       {
//         title: "Submit Loan Application",
//         dueDate: "March 18, 2024",
//         priority: "High",
//         page: 2
//       },
//       {
//         title: "Review Title Report",
//         dueDate: "April 1, 2024",
//         priority: "Medium",
//         page: 3
//       }
//     ],
//     deadlines: [
//       {
//         name: "Inspection Period",
//         relatedTask: "Complete all property inspections",
//         deadline: "March 25, 2024",
//         page: 2
//       },
//       {
//         name: "Loan Approval",
//         relatedTask: "Provide written loan commitment",
//         deadline: "April 5, 2024",
//         page: 2
//       }
//     ]
//   };

//   const handleFileUpload = (event:any) => {
//     const file = event.target.files?.[0];
//     if (file && file.size <= 25 * 1024 * 1024) {
//       setUploadedFile(file);
//       setFileMeta({
//         name: file.name,
//         size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
//       });
      
//       // Create URL for PDF preview
//       const url:any = URL.createObjectURL(file);
//       setPdfUrl(url);
//     }
//   };

//   const removeFile = () => {
//     setUploadedFile(null);
//     setFileMeta(null);
//     if (pdfUrl) {
//       URL.revokeObjectURL(pdfUrl);
//       setPdfUrl(null);
//     }
//   };

//   const simulateAnalysisSteps = () => {
//     return new Promise((resolve) => {
//       let stepIndex = 0;
//       const interval = setInterval(() => {
//         if (stepIndex < analysisSteps.length) {
//           // @ts-ignore
//           setLoadingSteps(prev => [...prev, analysisSteps[stepIndex]]);
//           setCurrentAnalysisStep(stepIndex);
          
//           // Mark previous step as completed after a short delay
//           setTimeout(() => {
//             // @ts-ignore
//             setCompletedSteps(prev => [...prev, analysisSteps[stepIndex]]);
//           }, 800);
          
//           stepIndex++;
//         } else {
//           clearInterval(interval);
//           setTimeout(() => {
//             // @ts-ignore
//             resolve();
//           }, 1000);
//         }
//       }, 1200);
//     });
//   };

//   const handleStartIntake = async () => {
//     if (!uploadedFile) return;
    
//     setLoading(true);
//     setShowOnboarding(true);
//     setResult(null);
//     setLoadingSteps([]);
//     setCompletedSteps([]);
//     setCurrentAnalysisStep(0);

//     try {
//       // Simulate the step-by-step analysis
//       await simulateAnalysisSteps();
      
//       // Set the mock result after analysis is complete
//       setResult(mockResult);
      
//     } catch (err) {
//       console.error('Upload failed:', err);
//       alert('Error processing the PDF');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleAccordion = (section:any) => {
//     setExpandedAccordion(expandedAccordion === section ? '' : section);
//   };

//   const handleElementClick = (pageNumber:any) => {
//     // Simulate scrolling to specific page in PDF
//     console.log(`Scrolling to page ${pageNumber}`);
//     // In real implementation, you would scroll the PDF iframe to the specific page
//   };

//   const AccordionItem = ({ id, title, icon: Icon, children, isExpanded }:any) => (
//     <div className="border border-gray-200 rounded-lg mb-4">
//       <button
//         onClick={() => toggleAccordion(id)}
//         className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
//       >
//         <div className="flex items-center gap-3">
//           <Icon className="w-5 h-5 text-blue-600" />
//           <span className="font-medium text-gray-900">{title}</span>
//         </div>
//         {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
//       </button>
//       {isExpanded && (
//         <div className="p-4 pt-0 border-t border-gray-100">
//           {children}
//         </div>
//       )}
//     </div>
//   );

//   // Full screen onboarding view
//   if (showOnboarding) {
//     return (
//       <div className="fixed inset-0 bg-white z-50 flex">
//         {/* Left Side - AI Generated Response */}
//         <div className="w-1/2 p-6 overflow-y-auto border-r border-gray-200">
//           <div className="max-w-2xl mx-auto">
//             {/* Header */}
//             <div className="mb-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-2">
//                 {loading ? "AI Analysis in Progress" : "Transaction Analysis Complete"}
//               </h2>
//               <p className="text-gray-600">
//                 {loading ? "Analyzing your purchase agreement..." : "Review the extracted information from your purchase agreement"}
//               </p>
//             </div>

//             {loading ? (
//               <div className="space-y-4">
//                 <div className="space-y-2 max-h-96 overflow-y-auto">
//                   {analysisSteps.map((step:any, index:any) => {
//                     // @ts-ignore
//                     const isLoading = index === currentAnalysisStep && loadingSteps.includes(step) && !completedSteps.includes(step);
//                     // @ts-ignore
//                     const isCompleted = completedSteps.includes(step);
//                     // @ts-ignore
//                     const isPending = !loadingSteps.includes(step);
                    
//                     return (
//                       <div key={index} className="flex items-center gap-3 p-2 rounded">
//                         {isCompleted ? (
//                           <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
//                         ) : isLoading ? (
//                           <Loader2 className="w-4 h-4 text-blue-600 animate-spin flex-shrink-0" />
//                         ) : (
//                           <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0" />
//                         )}
//                         <span className={`text-sm ${
//                           isCompleted ? 'text-green-700' : 
//                           isLoading ? 'text-blue-700' : 
//                           'text-gray-500'
//                         }`}>
//                           {step}
//                         </span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             ) : result ? (
//               <div className="space-y-4">
//                 {/* Document Summary */}
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//                   <h3 className="font-semibold text-blue-900 mb-2">Document Summary</h3>
//                   <p className="text-sm text-blue-800">{result.summary}</p>
//                 </div>

//                 {/* Transaction Details Table */}
//                 <div className="bg-white border border-gray-200 rounded-lg mb-6">
//                   <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
//                     <h3 className="font-semibold text-gray-900 flex items-center gap-2">
//                       <Home className="w-5 h-5 text-blue-600" />
//                       Review Transaction Details
//                     </h3>
//                     <p className="text-sm text-gray-600 mt-1">
//                       Take a look a moment to review the key details I pulled from your document. 
//                       You can make any edits before we finalize your file.
//                     </p>
//                   </div>
//                   <div className="p-4">
//                     <div className="grid grid-cols-1 gap-4">
//                       <div className="grid grid-cols-3 gap-4 text-sm">
//                         <div className="font-medium text-gray-500 bg-green-100 px-2 py-1">Name</div>
//                         <div className="font-medium text-gray-500 bg-green-100 px-2 py-1">Value</div>
//                         <div className="font-medium text-gray-500 bg-green-100 px-2 py-1"></div>
//                       </div>
                      
//                       {Object.entries(result.transactionDetails).map(([key, value]) => (
//                         <div key={key} className="grid grid-cols-3 gap-4 text-sm border-b border-gray-100 pb-2">
//                           <div className="capitalize text-gray-700">
//                             {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
//                           </div>
//                           {/* @ts-ignore */}
//                           <div className="text-gray-900">{value}</div>
//                           <div className="flex gap-2">
//                             <button className="text-gray-400 hover:text-gray-600">
//                               <Edit className="w-4 h-4" />
//                             </button>
//                             <button 
//                               className="text-gray-400 hover:text-gray-600"
//                               onClick={() => handleElementClick(1)}
//                             >
//                               <MessageSquare className="w-4 h-4" />
//                             </button>
//                             <ChevronDown className="w-4 h-4 text-gray-400" />
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Parties Table */}
//                 <div className="bg-white border border-gray-200 rounded-lg mb-6">
//                   <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
//                     <h3 className="font-semibold text-gray-900">Parties</h3>
//                   </div>
//                   <div className="p-4">
//                     <div className="space-y-3">
//                       {result.parties.map((party:any, index:any) => (
//                         <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
//                           <div>
//                             <div className="font-medium text-gray-900">{party.name}</div>
//                             <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded inline-block mt-1">
//                               {party.role}
//                             </div>
//                           </div>
//                           <div className="flex gap-2">
//                             <button className="text-gray-400 hover:text-gray-600">
//                               <Edit className="w-4 h-4" />
//                             </button>
//                             <button 
//                               className="text-gray-400 hover:text-gray-600"
//                               onClick={() => handleElementClick(1)}
//                             >
//                               <MessageSquare className="w-4 h-4" />
//                             </button>
//                             <ChevronDown className="w-4 h-4 text-gray-400" />
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Accordion Items */}
//                 <AccordionItem
//                   id="accordion"
//                   title="Q&A Analysis"
//                   icon={FileText}
//                   isExpanded={expandedAccordion === 'accordion'}
//                 >
//                   <div className="space-y-3">
//                     {result.accordion?.map((item:any, index:any) => (
//                       <div key={index} className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100" 
//                            onClick={() => handleElementClick(item.page)}>
//                         <h4 className="font-medium text-gray-900 mb-2">{item.question}</h4>
//                         <p className="text-sm text-gray-700 mb-2">{item.answer}</p>
//                         <span className="text-xs text-gray-500">Page {item.page}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </AccordionItem>

//                 {/* Tables */}
//                 <AccordionItem
//                   id="tables"
//                   title="Document Tables"
//                   icon={DollarSign}
//                   isExpanded={expandedAccordion === 'tables'}
//                 >
//                   <div className="space-y-4">
//                     {result.tables?.map((table:any, index:any) => (
//                       <div key={index} className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100"
//                            onClick={() => handleElementClick(table.page)}>
//                         <h4 className="font-medium text-gray-900 mb-3">{table.title}</h4>
//                         <div className="overflow-x-auto">
//                           <table className="w-full text-sm">
//                             <thead>
//                               <tr className="border-b border-gray-200">
//                                 {table.headers.map((header:any, hIndex:any) => (
//                                   <th key={hIndex} className="text-left py-2 font-medium text-gray-700">
//                                     {header}
//                                   </th>
//                                 ))}
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {table.rows.map((row:any, rIndex:any) => (
//                                 <tr key={rIndex} className="border-b border-gray-100">
//                                   {row.map((cell:any, cIndex:any) => (
//                                     <td key={cIndex} className="py-2 text-gray-900">
//                                       {cell}
//                                     </td>
//                                   ))}
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </table>
//                         </div>
//                         <span className="text-xs text-gray-500 mt-2 block">Page {table.page}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </AccordionItem>

//                 {/* Timeline */}
//                 <AccordionItem
//                   id="timeline"
//                   title="Transaction Timeline"
//                   icon={Calendar}
//                   isExpanded={expandedAccordion === 'timeline'}
//                 >
//                   <div className="space-y-2">
//                     {result.timeline?.map((item:any, index:any) => (
//                       <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
//                            onClick={() => handleElementClick(item.page)}>
//                         <div className="flex items-center gap-3">
//                           <Calendar className="w-5 h-5 text-blue-600" />
//                           <div>
//                             <span className="font-medium text-gray-900 block">{item.milestone}</span>
//                             <span className="text-sm text-gray-600">{item.description}</span>
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <span className="text-sm font-medium text-gray-900 block">{item.date}</span>
//                           <span className="text-xs text-gray-500">Page {item.page}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </AccordionItem>

//                 {/* Tasks */}
//                 <AccordionItem
//                   id="tasks"
//                   title="Action Items"
//                   icon={CheckCircle}
//                   isExpanded={expandedAccordion === 'tasks'}
//                 >
//                   <div className="space-y-2">
//                     {result.tasks?.map((task:any, index:any) => (
//                       <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
//                            onClick={() => handleElementClick(task.page)}>
//                         <div className="flex items-center gap-3">
//                           <div className={`w-2 h-2 rounded-full ${
//                             task.priority === 'High' ? 'bg-red-500' :
//                             task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
//                           }`} />
//                           <div>
//                             <span className="font-medium text-gray-900 block">{task.title}</span>
//                             <span className="text-sm text-gray-600">Due: {task.dueDate}</span>
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                             task.priority === 'High' ? 'bg-red-100 text-red-800' :
//                             task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
//                             'bg-green-100 text-green-800'
//                           }`}>
//                             {task.priority}
//                           </span>
//                           <span className="text-xs text-gray-500 block mt-1">Page {task.page}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </AccordionItem>

//                 {/* Deadlines */}
//                 <AccordionItem
//                   id="deadlines"
//                   title="Critical Deadlines"
//                   icon={Clock}
//                   isExpanded={expandedAccordion === 'deadlines'}
//                 >
//                   <div className="space-y-2">
//                     {result.deadlines?.map((deadline:any, index:any) => (
//                       <div key={index} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg cursor-pointer hover:bg-red-100"
//                            onClick={() => handleElementClick(deadline.page)}>
//                         <div className="flex items-center gap-3">
//                           <Clock className="w-5 h-5 text-red-600" />
//                           <div>
//                             <span className="font-medium text-gray-900 block">{deadline.name}</span>
//                             <span className="text-sm text-gray-600">{deadline.relatedTask}</span>
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <span className="text-sm font-medium text-red-700 block">{deadline.deadline}</span>
//                           <span className="text-xs text-gray-500">Page {deadline.page}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </AccordionItem>
//               </div>
//             ) : null}

//             {/* Navigation Buttons */}
//             {result && (
//               <div className="mt-8 flex justify-between">
//                 <Button
//                   onClick={() => setShowOnboarding(false)}
//                   variant="outline"
//                 >
//                   Back to Upload
//                 </Button>
//                 <Button
//                   onClick={() => setCurrentStep(2)}
//                   className="bg-blue-600 hover:bg-blue-700"
//                 >
//                   Continue to Next Step
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right Side - PDF Preview */}
//         <div className="w-1/2 p-6">
//           <div className="h-full flex flex-col">
//             <div className="mb-4">
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">Purchase Agreement</h3>
//               <p className="text-sm text-gray-600">
//                 {fileMeta ? `${fileMeta.name} (${fileMeta.size})` : 'No document uploaded'}
//               </p>
//             </div>
            
//             {pdfUrl ? (
//               <div className="flex-1 border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50">
//                 <iframe
//                   src={pdfUrl}
//                   className="w-full h-full"
//                   title="PDF Preview"
//                 />
//               </div>
//             ) : (
//               <div className="flex-1 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center bg-gray-50">
//                 <div className="text-center text-gray-500">
//                   <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
//                   <p>PDF preview will appear here</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Steps 2-5 remain the same as placeholders */}
//         {currentStep === 2 && (
//           <div className="absolute inset-0 bg-white flex items-center justify-center">
//             <div className="text-center max-w-md">
//               <Calendar className="w-16 h-16 mx-auto mb-4 text-blue-600" />
//               <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 2: Timeline Review</h2>
//               <p className="text-gray-600 mb-8">Review and adjust your transaction timeline and key milestones</p>
//               <div className="flex gap-4 justify-center">
//                 <Button
//                   onClick={() => setCurrentStep(1)}
//                   variant="outline"
//                 >
//                   Back to Step 1
//                 </Button>
//                 <Button
//                   onClick={() => setCurrentStep(3)}
//                   className="bg-blue-600 hover:bg-blue-700"
//                 >
//                   Continue to Step 3
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}

//         {currentStep === 3 && (
//           <div className="absolute inset-0 bg-white flex items-center justify-center">
//             <div className="text-center max-w-md">
//               <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
//               <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 3: Task Assignment</h2>
//               <p className="text-gray-600 mb-8">Assign tasks to team members and set up notifications</p>
//               <div className="flex gap-4 justify-center">
//                 <Button
//                   onClick={() => setCurrentStep(2)}
//                   variant="outline"
//                 >
//                   Back to Step 2
//                 </Button>
//                 <Button
//                   onClick={() => setCurrentStep(4)}
//                   className="bg-blue-600 hover:bg-blue-700"
//                 >
//                   Continue to Step 4
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}

//         {currentStep === 4 && (
//           <div className="absolute inset-0 bg-white flex items-center justify-center">
//             <div className="text-center max-w-md">
//               <User className="w-16 h-16 mx-auto mb-4 text-purple-600" />
//               <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 4: Contact Setup</h2>
//               <p className="text-gray-600 mb-8">Set up contact information and communication preferences</p>
//               <div className="flex gap-4 justify-center">
//                 <Button
//                   onClick={() => setCurrentStep(3)}
//                   variant="outline"
//                 >
//                   Back to Step 3
//                 </Button>
//                 <Button
//                   onClick={() => setCurrentStep(5)}
//                   className="bg-blue-600 hover:bg-blue-700"
//                 >
//                   Continue to Step 5
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}

//         {currentStep === 5 && (
//           <div className="absolute inset-0 bg-white flex items-center justify-center">
//             <div className="text-center max-w-md">
//               <FileText className="w-16 h-16 mx-auto mb-4 text-orange-600" />
//               <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 5: Final Review</h2>
//               <p className="text-gray-600 mb-8">Review all information and complete the transaction setup</p>
//               <div className="flex gap-4 justify-center">
//                 <Button
//                   onClick={() => setCurrentStep(4)}
//                   variant="outline"
//                 >
//                   Back to Step 4
//                 </Button>
//                 <Button
//                   onClick={() => setShowOnboarding(false)}
//                   className="bg-green-600 hover:bg-green-700"
//                 >
//                   Complete Setup
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Dialog open={isOpen} onOpenChange={setIsOpen}>
//         <DialogTrigger asChild>
//           <Button
//             onClick={() => setIsOpen(true)}
//             className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2"
//           >
//             <span className="text-lg">+</span>
//             <span>New Transaction</span>
//           </Button>
//         </DialogTrigger>

//         <DialogContent className="max-w-md mx-auto bg-white rounded-xl shadow-xl border-0 p-0 overflow-hidden">
//           <DialogHeader className="p-6 pb-4 relative">
//             <button
//               onClick={() => setIsOpen(false)}
//               className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
//             >
//               <X size={20} />
//             </button>
//             <DialogTitle className="text-xl font-semibold text-gray-900 pr-8">
//               Welcome back, Dave! Ready for your next transaction?
//             </DialogTitle>
//           </DialogHeader>

//           <div className="px-6 pb-6 space-y-6">
//             {/* Step 1 */}
//             <div>
//               <p className="text-sm text-gray-600 mb-3">
//                 1. Tell me which side you represent (buying, listing, or both)
//               </p>

//               <div className="flex gap-2">
//                 {['Buying', 'Listing', 'Both'].map((option) => (
//                   <button
//                     key={option}
//                     onClick={() => setSelectedSide(option)}
//                     className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                       selectedSide === option
//                         ? 'bg-black text-white'
//                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                     }`}
//                   >
//                     {option}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Step 2 */}
//             <div>
//               <p className="text-sm text-gray-600 mb-3">
//                 2. Upload the signed purchase agreement and any counter-offers or addenda.
//               </p>
//               <p className="text-xs text-gray-500 mb-4">
//                 I'll create the file, timeline, and starter task list for you to review.
//               </p>

//               {/* Upload Area */}
//               <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-gray-300 transition-colors">
//                 <input
//                   type="file"
//                   id="file-upload"
//                   name="pdf"
//                   className="hidden"
//                   onChange={handleFileUpload}
//                   accept=".pdf,.doc,.docx"
//                 />
//                 <label htmlFor="file-upload" className="cursor-pointer">
//                   <Upload className="mx-auto mb-3 text-blue-500" size={32} />
//                   <p className="text-blue-500 font-medium mb-1">Click to Upload or drag and drop</p>
//                   <p className="text-xs text-gray-500">(Max. File Size: 25MB)</p>
//                 </label>
//               </div>

//               {/* Uploaded File */}
//               {fileMeta && (
//                 <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <FileText className="text-gray-500" size={20} />
//                     <div>
//                       <p className="text-sm font-medium text-gray-900">{fileMeta.name}</p>
//                       <p className="text-xs text-gray-500">{fileMeta.size}</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={removeFile}
//                     className="text-red-500 hover:text-red-700 transition-colors"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Start Button */}
//             <Button
//               onClick={handleStartIntake}
//               disabled={!uploadedFile || loading}
//               className="float-end bg-blue-600 text-white hover:bg-blue-700 py-3 text-base font-medium rounded-lg flex items-center gap-2"
//             >
//               {loading && <Loader2 className="w-4 h-4 animate-spin" />}
//               {loading ? 'Processing...' : 'Start Intake'}
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default TransactionModalComponent;