import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Brain, BookOpen, Users } from "lucide-react";

interface TechnicalQuestion {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false';
  category: 'General Aptitude' | 'Prerequisite Knowledge' | 'Domain-Specific';
  options: string[];
  correct: number;
  explanation: string;
}

const technicalQuestions: TechnicalQuestion[] = [
  {
    id: "aptitude_1",
    text: "If a therapist sees 8 clients per day, 5 days a week, and each session is 50 minutes with a 10-minute break between sessions, how many total hours per week are dedicated to client sessions?",
    type: "multiple-choice",
    category: "General Aptitude",
    options: ["33.3 hours", "40 hours", "30 hours", "36.7 hours"],
    correct: 0,
    explanation: "8 clients × 50 minutes × 5 days = 2000 minutes = 33.3 hours"
  },
  {
    id: "knowledge_1",
    text: "The concept of 'transference' in therapy refers to:",
    type: "multiple-choice",
    category: "Prerequisite Knowledge", 
    options: [
      "When a client transfers their feelings about someone else onto the therapist",
      "When a therapist transfers their own feelings onto the client",
      "The process of transferring treatment records between providers",
      "Moving therapy sessions from one location to another"
    ],
    correct: 0,
    explanation: "Transference occurs when clients project feelings, attitudes, or desires from past relationships onto the therapist."
  },
  {
    id: "domain_1",
    text: "According to the APA Code of Ethics, what should a counselor do if they realize they lack competence to treat a client's specific condition?",
    type: "multiple-choice",
    category: "Domain-Specific",
    options: [
      "Continue treatment while researching the condition",
      "Refer the client to a specialist or seek supervision/consultation",
      "Terminate the therapeutic relationship immediately",
      "Inform the client they cannot help and discharge them"
    ],
    correct: 1,
    explanation: "Ethical practice requires seeking appropriate supervision, consultation, or making referrals when lacking competence."
  },
  {
    id: "aptitude_2",
    text: "A pattern shows: 2, 6, 18, 54, ... What is the next number?",
    type: "multiple-choice",
    category: "General Aptitude",
    options: ["108", "162", "216", "270"],
    correct: 1,
    explanation: "Each number is multiplied by 3: 2×3=6, 6×3=18, 18×3=54, 54×3=162"
  },
  {
    id: "knowledge_2",
    text: "Cognitive Behavioral Therapy (CBT) primarily focuses on the relationship between thoughts, feelings, and behaviors.",
    type: "true-false",
    category: "Prerequisite Knowledge",
    options: ["True", "False"],
    correct: 0,
    explanation: "CBT is based on the principle that thoughts, feelings, and behaviors are interconnected and influence each other."
  },
  {
    id: "domain_2",
    text: "Which therapeutic approach emphasizes the client's inherent capacity for growth and self-actualization?",
    type: "multiple-choice",
    category: "Domain-Specific",
    options: [
      "Psychoanalytic therapy",
      "Humanistic/Person-centered therapy", 
      "Behavioral therapy",
      "Cognitive therapy"
    ],
    correct: 1,
    explanation: "Humanistic therapy, developed by Carl Rogers, emphasizes the client's natural tendency toward growth and self-actualization."
  }
];

interface TechnicalSectionProps {
  onDataChange: (data: any) => void;
  assessmentData: any;
}

const TechnicalSection = ({ onDataChange, assessmentData }: TechnicalSectionProps) => {
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = technicalQuestions[currentQuestionIndex];

  const handleResponse = (questionId: string, value: number) => {
    const newResponses = { ...responses, [questionId]: value };
    setResponses(newResponses);
    setShowFeedback(true);
    
    // Calculate scores by category
    const scores = calculateScores(newResponses);
    onDataChange({ responses: newResponses, scores });
  };

  const calculateScores = (responses: Record<string, number>) => {
    const categories = ['General Aptitude', 'Prerequisite Knowledge', 'Domain-Specific'];
    const scores: Record<string, number> = {};
    
    categories.forEach(category => {
      const categoryQuestions = technicalQuestions.filter(q => q.category === category);
      const correctAnswers = categoryQuestions.filter(q => responses[q.id] === q.correct).length;
      scores[category] = (correctAnswers / categoryQuestions.length) * 100;
    });
    
    const totalCorrect = Object.keys(responses).filter(id => {
      const question = technicalQuestions.find(q => q.id === id);
      return question && responses[id] === question.correct;
    }).length;
    
    scores['Overall'] = (totalCorrect / technicalQuestions.length) * 100;
    return scores;
  };

  const handleNext = () => {
    if (currentQuestionIndex < technicalQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowFeedback(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowFeedback(responses[technicalQuestions[currentQuestionIndex - 1].id] !== undefined);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "General Aptitude": return Brain;
      case "Prerequisite Knowledge": return BookOpen;
      case "Domain-Specific": return Users;
      default: return Brain;
    }
  };

  const CategoryIcon = getCategoryIcon(currentQuestion.category);
  const isCorrect = responses[currentQuestion.id] === currentQuestion.correct;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-secondary p-2 rounded-lg">
          <CategoryIcon className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{currentQuestion.category}</h3>
          <p className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {technicalQuestions.length}
          </p>
        </div>
      </div>

      <Card className="p-6 shadow-soft">
        <h4 className="text-xl font-medium text-foreground mb-6">{currentQuestion.text}</h4>

        <RadioGroup
          value={responses[currentQuestion.id]?.toString()}
          onValueChange={(value) => handleResponse(currentQuestion.id, parseInt(value))}
          className="space-y-3"
        >
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <RadioGroupItem value={index.toString()} id={`${currentQuestion.id}_${index}`} />
              <Label 
                htmlFor={`${currentQuestion.id}_${index}`}
                className="flex-1 cursor-pointer font-medium"
              >
                {option}
              </Label>
              {showFeedback && responses[currentQuestion.id] === index && (
                index === currentQuestion.correct ? 
                  <CheckCircle className="h-5 w-5 text-success" /> :
                  <XCircle className="h-5 w-5 text-destructive" />
              )}
            </div>
          ))}
        </RadioGroup>

        {showFeedback && (
          <Card className={`mt-4 p-4 border-l-4 ${isCorrect ? 'border-l-success bg-success/5' : 'border-l-destructive bg-destructive/5'}`}>
            <div className="flex items-start space-x-3">
              {isCorrect ? 
                <CheckCircle className="h-5 w-5 text-success mt-0.5" /> :
                <XCircle className="h-5 w-5 text-destructive mt-0.5" />
              }
              <div>
                <p className="font-medium text-foreground mb-1">
                  {isCorrect ? "Correct!" : "Incorrect"}
                </p>
                <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
              </div>
            </div>
          </Card>
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
          disabled={currentQuestionIndex === technicalQuestions.length - 1 || !showFeedback}
          className="bg-gradient-secondary"
        >
          Next Question
        </Button>
      </div>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="font-semibold text-foreground mb-2">About This Section</h4>
        <p className="text-sm text-muted-foreground">
          This section evaluates your technical readiness for mental health counseling through general aptitude questions, 
          prerequisite knowledge assessment, and domain-specific concepts. These questions test logical reasoning, 
          foundational psychology knowledge, and understanding of counseling principles and ethics.
        </p>
      </div>
    </div>
  );
};

export default TechnicalSection;