'use client'

import { Calendar, CheckCircle, FileText, User, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { OnboardingStepProps } from "@/types";
import DeadLinesMain from "./deadlines";
import TransactionTabs from "./TransactionDetails";
import DocumentTimelineUI from "./PlanYouWorkflow";
import TaskListUI from "./LetsCreateYour";

export const OnboardingSteps: React.FC<OnboardingStepProps> = ({
  currentStep,
  onStepChange,
  onComplete,
  result,
  expandedAccordion,
  onToggleAccordion,
}) => {
  const steps = [
    {
      icon: Calendar,
      title: 'Timeline Review',
      description: 'Review and adjust your transaction timeline and key milestones',
      color: 'slate',
      component: () => <DeadLinesMain />,
      nextButtonText: "View Transaction Summary", // ✅ Custom button text for this step
    },
    {
      icon: CheckCircle,
      title: 'Task Assignment',
      description: 'Assign tasks to team members and set up notifications',
      color: 'slate',
      component: () => <TransactionTabs />,
      nextButtonText: "Plan Your Workflow", // ✅ Custom button text for this step
    },
    {
      icon: User,
      title: 'Contact Setup',
      description: 'Set up contact information and communication preferences',
      color: 'slate',
      component: () => (
        <DocumentTimelineUI/>
      ),
      nextButtonText: "Let's Create Your Task",
    },
    {
      icon: User,
      title: 'Contact Setup',
      description: 'Set up contact information and communication preferences',
      color: 'slate',
      component: () => (
        <TaskListUI/>
      ),
      nextButtonText: "Open Transaction File",
    },
    {
      icon: FileText,
      title: 'Final Review',
      description: 'Review all information and complete the transaction setup',
      color: 'slate',
      component: () => (
        <div>
          <h3 className="text-lg font-semibold mb-2">Final Check</h3>
          <p className="text-sm text-gray-700">Review and confirm all the details before submission.</p>
        </div>
      ),
      nextButtonText: "Complete Setup",
    },
  ];

  if (currentStep < 2 || currentStep > 5) return null;

  const stepIndex = currentStep - 2;
  const step = steps[stepIndex];
  const StepComponent = step.component;

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="mb-8 w-full">
          <StepComponent />
        </div>

        <div className="flex gap-4 justify-between">
          <Button
            onClick={() => onStepChange(currentStep - 1)}
            variant="outline"
          >
            Back
          </Button>

          <Button
            onClick={() =>
              currentStep === 5 ? onComplete() : onStepChange(currentStep + 1)
            }
            className={`bg-${step.color}-800 hover:bg-${step.color}-700 cursor-pointer text-white group transition-all duration-200`}
          >
            <span className="flex items-center gap-2">
              {step.nextButtonText ??
                (currentStep === 5
                  ? 'Complete Setup'
                  : `Continue to Step ${currentStep + 1}`)}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};
