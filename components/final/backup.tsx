// 'use client';

// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Upload, X, FileText, Trash2, Loader2 } from 'lucide-react';
// import { uploadPDFMain } from '@/lib/actions/addpdf.action';
// import { useRouter } from 'next/navigation';

// const TransactionModalComponent = () => {
//   const [selectedSide, setSelectedSide] = useState('Both');
//   const [uploadedFile, setUploadedFile] = useState<File | null>(null);
//   const [fileMeta, setFileMeta] = useState<{ name: string; size: string } | null>(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<any>(null);
//   const router = useRouter()

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file && file.size <= 25 * 1024 * 1024) {
//       setUploadedFile(file);
//       setFileMeta({
//         name: file.name,
//         size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
//       });
//     }
//   };

//   const removeFile = () => {
//     setUploadedFile(null);
//     setFileMeta(null);
//   };

//   const handleStartIntake = async () => {
//     if (!uploadedFile) return;

//     setLoading(true);
//     setResult(null);

//     try {
//       const formData = new FormData();
//       formData.append('pdf', uploadedFile);
//       const res = await uploadPDFMain(formData);
//       if(res.success){
//         setResult(res.structuredData);
//       }
//       console.log('Success:', res.structuredData);
//     } catch (err) {
//       console.error('Upload failed:', err);
//       alert('Error processing the PDF');
//     } finally {
//       setLoading(false);
//       setIsOpen(false);
//     }
//   };

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
