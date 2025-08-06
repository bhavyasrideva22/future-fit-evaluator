import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Heart, Brain, Users, Target, BookOpen } from "lucide-react";

interface Question {
  id: string;
  text: string;
  type: 'likert' | 'scale' | 'binary';
  category: string;
  options?: string[];
}

const psychometricQuestions: Question[] = [
  {
    id: "interest_1",
    text: "I am genuinely interested in understanding human behavior and mental processes",
    type: "likert",
    category: "Interest Scale"
  },
  {
    id: "interest_2", 
    text: "I find myself naturally drawn to helping others work through their problems",
    type: "likert",
    category: "Interest Scale"
  },
  {
    id: "personality_1",
    text: "I remain calm and composed even in emotionally charged situations",
    type: "likert",
    category: "Personality Compatibility"
  },
  {
    id: "personality_2",
    text: "I am comfortable with ambiguous situations where there may not be clear answers",
    type: "likert",
    category: "Personality Compatibility"
  },
  {
    id: "cognitive_1",
    text: "I prefer working with people's emotional needs rather than technical problems",
    type: "binary",
    category: "Cognitive Style",
    options: ["Strongly prefer people-focused work", "Strongly prefer technical work"]
  },
  {
    id: "motivation_1",
    text: "My primary motivation for considering mental health counseling is:",
    type: "binary",
    category: "Motivation",
    options: ["Making a meaningful impact on people's lives", "Job security and stable career prospects"]
  }
];

const likertOptions = [
  { value: "1", label: "Strongly Disagree" },
  { value: "2", label: "Disagree" },
  { value: "3", label: "Neutral" },
  { value: "4", label: "Agree" },
  { value: "5", label: "Strongly Agree" }
];

interface PsychometricSectionProps {
  onDataChange: (data: any) => void;
  assessmentData: any;
}

const PsychometricSection = ({ onDataChange, assessmentData }: PsychometricSectionProps) => {
  const [responses, setResponses] = useState<Record<string, string | number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = psychometricQuestions[currentQuestionIndex];

  const handleResponse = (questionId: string, value: string | number) => {
    const newResponses = { ...responses, [questionId]: value };
    setResponses(newResponses);
    onDataChange(newResponses);
  };

  const handleNext = () => {
    if (currentQuestionIndex < psychometricQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Interest Scale": return Heart;
      case "Personality Compatibility": return Brain;
      case "Cognitive Style": return Target;
      case "Motivation": return BookOpen;
      default: return Users;
    }
  };

  const CategoryIcon = getCategoryIcon(currentQuestion.category);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-primary p-2 rounded-lg">
          <CategoryIcon className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{currentQuestion.category}</h3>
          <p className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {psychometricQuestions.length}
          </p>
        </div>
      </div>

      <Card className="p-6 shadow-soft">
        <h4 className="text-xl font-medium text-foreground mb-6">{currentQuestion.text}</h4>

        {currentQuestion.type === "likert" && (
          <RadioGroup
            value={responses[currentQuestion.id]?.toString()}
            onValueChange={(value) => handleResponse(currentQuestion.id, parseInt(value))}
            className="space-y-3"
          >
            {likertOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={option.value} id={`${currentQuestion.id}_${option.value}`} />
                <Label 
                  htmlFor={`${currentQuestion.id}_${option.value}`}
                  className="flex-1 cursor-pointer font-medium"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {currentQuestion.type === "binary" && currentQuestion.options && (
          <RadioGroup
            value={responses[currentQuestion.id]?.toString()}
            onValueChange={(value) => handleResponse(currentQuestion.id, value)}
            className="space-y-3"
          >
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={option} id={`${currentQuestion.id}_${index}`} />
                <Label 
                  htmlFor={`${currentQuestion.id}_${index}`}
                  className="flex-1 cursor-pointer font-medium"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {currentQuestion.type === "scale" && (
          <div className="space-y-4">
            <div className="px-3">
              <Slider
                value={[responses[currentQuestion.id] as number || 50]}
                onValueChange={(value) => handleResponse(currentQuestion.id, value[0])}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Not at all</span>
              <span className="font-medium text-foreground">
                {responses[currentQuestion.id] || 50}%
              </span>
              <span>Extremely</span>
            </div>
          </div>
        )}
      </Card>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous Question
        </Button>
        <Button 
          onClick={handleNext}
          disabled={currentQuestionIndex === psychometricQuestions.length - 1 || !responses[currentQuestion.id]}
          className="bg-gradient-primary"
        >
          Next Question
        </Button>
      </div>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="font-semibold text-foreground mb-2">About This Section</h4>
        <p className="text-sm text-muted-foreground">
          This section evaluates your psychological fit for mental health counseling using validated scales 
          including the Big Five Personality Inventory, Holland Codes (RIASEC), and measures of intrinsic motivation. 
          Your responses help determine how well your personality and interests align with the demands of mental health counseling.
        </p>
      </div>
    </div>
  );
};

export default PsychometricSection;