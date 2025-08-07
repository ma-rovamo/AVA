export interface LayoutProps {
    children:React.ReactNode
}

export interface Task {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  category: string;
  description?: string;
}

export interface TransactionDetails {
  address: string;
  district: string;
  propertyType: string;
  squareFootage: string;
  purchasePrice: string;
  downPayment: string;
  loanAmount: string;
  closingDate: string;
}

export interface Document {
  name: string;
  status: 'Complete' | 'Pending' | 'In Progress';
  date: string;
}

export interface HistoryEntry {
  action: string;
  date: string;
}




export interface FileMeta {
  name: string;
  size: string;
}

export interface AccordionItemProps {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: (id: string) => void;
}

export interface UploadAreaProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileMeta: FileMeta | null;
  onRemoveFile: () => void;
}

export interface SideSelectionProps {
  selectedSide: string;
  onSideChange: (side: string) => void;
}

export interface OnboardingStepProps {
  currentStep: number;
  result?:any
  onStepChange: (step: number) => void;
  onComplete: () => void;
  onToggleAccordion: (section: string) => void;
  expandedAccordion: string;

}

export interface PDFPreviewProps {
  pdfUrl: string | null;
  fileMeta: FileMeta | null;
}

export interface OnboardingLayoutProps {
  children: React.ReactNode;
  pdfUrl: string | null;
  fileMeta: FileMeta | null;
  currentStep?:any
}