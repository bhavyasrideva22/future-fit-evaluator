import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import PsychometricSection from "./assessment/PsychometricSection";
import TechnicalSection from "./assessment/TechnicalSection";
import WiscarAnalysis from "./assessment/WiscarAnalysis";
import ResultsSection from "./assessment/ResultsSection";

interface AssessmentStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
  estimatedTime: string;
}

const assessmentSteps: AssessmentStep[] = [
  {
    id: "psychometric",
    title: "Personality & Interest Assessment",
    description: "Evaluate your psychological fit for mental health counseling",
    component: PsychometricSection,
    estimatedTime: "8-10 min"
  },
  {
    id: "technical",
    title: "Technical & Aptitude Evaluation",
    description: "Test your foundational knowledge and cognitive abilities",
    component: TechnicalSection,
    estimatedTime: "10-12 min"
  },
  {
    id: "wiscar",
    title: "WISCAR Framework Analysis",
    description: "Comprehensive readiness assessment across 6 key dimensions",
    component: WiscarAnalysis,
    estimatedTime: "5-8 min"
  },
  {
    id: "results",
    title: "Results & Recommendations",
    description: "Your personalized career guidance and next steps",
    component: ResultsSection,
    estimatedTime: "Review"
  }
];

const AssessmentFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [assessmentData, setAssessmentData] = useState({});

  const progress = ((currentStep + 1) / assessmentSteps.length) * 100;
  const CurrentStepComponent = assessmentSteps[currentStep].component;

  const handleNext = () => {
    setCompletedSteps(prev => new Set(prev).add(currentStep));
    if (currentStep < assessmentSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepData = (stepId: string, data: any) => {
    setAssessmentData(prev => ({
      ...prev,
      [stepId]: data
    }));
  };

  return (
    <section className="py-16 bg-gradient-subtle min-h-screen">
      <div className="container mx-auto px-4">
        {/* Progress Header */}
        <Card className="p-6 mb-8 shadow-medium">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Mental Health Counselor Assessment
              </h1>
              <p className="text-muted-foreground">
                Step {currentStep + 1} of {assessmentSteps.length}: {assessmentSteps[currentStep].title}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Estimated time</p>
              <p className="font-semibold text-primary">{assessmentSteps[currentStep].estimatedTime}</p>
            </div>
          </div>
          <Progress value={progress} className="h-2 mb-4" />
          <div className="flex justify-between text-xs text-muted-foreground">
            {assessmentSteps.map((step, index) => (
              <div key={step.id} className="flex items-center space-x-1">
                {completedSteps.has(index) ? (
                  <CheckCircle className="h-3 w-3 text-success" />
                ) : (
                  <div className={`w-3 h-3 rounded-full ${index <= currentStep ? 'bg-primary' : 'bg-muted'}`} />
                )}
                <span className={index <= currentStep ? 'text-foreground font-medium' : ''}>{step.title}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Assessment Content */}
        <Card className="p-8 shadow-medium">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {assessmentSteps[currentStep].title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {assessmentSteps[currentStep].description}
            </p>
          </div>

          <CurrentStepComponent 
            onDataChange={(data: any) => handleStepData(assessmentSteps[currentStep].id, data)}
            assessmentData={assessmentData}
          />

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={currentStep === assessmentSteps.length - 1}
              className="bg-gradient-primary flex items-center space-x-2"
            >
              <span>{currentStep === assessmentSteps.length - 2 ? "View Results" : "Next"}</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default AssessmentFlow;