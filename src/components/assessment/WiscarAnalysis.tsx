import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Target, Heart, Zap, Brain, TrendingUp, Globe } from "lucide-react";

interface WiscarQuestion {
  id: string;
  text: string;
  dimension: 'Will' | 'Interest' | 'Skill' | 'Cognitive' | 'Ability' | 'Real-World';
  type: 'likert' | 'scale' | 'multiple-choice';
  options?: string[];
}

const wiscarQuestions: WiscarQuestion[] = [
  {
    id: "will_1",
    text: "When I commit to helping someone, I persist even when progress is slow or difficult",
    dimension: "Will",
    type: "likert"
  },
  {
    id: "will_2", 
    text: "I have demonstrated long-term commitment to challenging goals in the past",
    dimension: "Will",
    type: "likert"
  },
  {
    id: "interest_1",
    text: "How much time do you spend reading about mental health topics or watching related content?",
    dimension: "Interest",
    type: "scale"
  },
  {
    id: "interest_2",
    text: "I find myself naturally curious about what motivates people's behavior",
    dimension: "Interest", 
    type: "likert"
  },
  {
    id: "skill_1",
    text: "People often come to me for advice when they're going through difficult times",
    dimension: "Skill",
    type: "likert"
  },
  {
    id: "skill_2",
    text: "Rate your current ability to listen empathetically without immediately offering solutions",
    dimension: "Skill",
    type: "scale"
  },
  {
    id: "cognitive_1",
    text: "When faced with a complex problem, I prefer to:",
    dimension: "Cognitive",
    type: "multiple-choice",
    options: [
      "Break it down into smaller, manageable parts",
      "Look for patterns and underlying themes",
      "Consider multiple perspectives before deciding",
      "Trust my intuition and emotional understanding"
    ]
  },
  {
    id: "cognitive_2",
    text: "I can effectively analyze complex emotional situations and identify key issues",
    dimension: "Cognitive",
    type: "likert"
  },
  {
    id: "ability_1",
    text: "I actively seek feedback on my interpersonal skills and am open to changing my approach",
    dimension: "Ability",
    type: "likert"
  },
  {
    id: "ability_2",
    text: "When I don't understand something, I persist in learning until I grasp the concept",
    dimension: "Ability",
    type: "likert"
  },
  {
    id: "realworld_1",
    text: "Which aspect of mental health counseling appeals to you most?",
    dimension: "Real-World",
    type: "multiple-choice",
    options: [
      "One-on-one therapy sessions helping individuals work through personal challenges",
      "Crisis intervention and providing support during mental health emergencies", 
      "Group therapy and community mental health programs",
      "Specialized treatment for specific conditions (addiction, trauma, etc.)"
    ]
  },
  {
    id: "realworld_2",
    text: "I understand the day-to-day realities of working as a mental health counselor",
    dimension: "Real-World",
    type: "likert"
  }
];

const likertOptions = [
  { value: "1", label: "Strongly Disagree" },
  { value: "2", label: "Disagree" },
  { value: "3", label: "Neutral" },
  { value: "4", label: "Agree" },
  { value: "5", label: "Strongly Agree" }
];

interface WiscarAnalysisProps {
  onDataChange: (data: any) => void;
  assessmentData: any;
}

const WiscarAnalysis = ({ onDataChange, assessmentData }: WiscarAnalysisProps) => {
  const [responses, setResponses] = useState<Record<string, string | number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = wiscarQuestions[currentQuestionIndex];

  const handleResponse = (questionId: string, value: string | number) => {
    const newResponses = { ...responses, [questionId]: value };
    setResponses(newResponses);
    
    // Calculate WISCAR scores
    const scores = calculateWiscarScores(newResponses);
    onDataChange({ responses: newResponses, scores });
  };

  const calculateWiscarScores = (responses: Record<string, string | number>) => {
    const dimensions = ['Will', 'Interest', 'Skill', 'Cognitive', 'Ability', 'Real-World'];
    const scores: Record<string, number> = {};
    
    dimensions.forEach(dimension => {
      const dimensionQuestions = wiscarQuestions.filter(q => q.dimension === dimension);
      let total = 0;
      let count = 0;
      
      dimensionQuestions.forEach(question => {
        if (responses[question.id] !== undefined) {
          let score = 0;
          if (question.type === 'likert') {
            score = (parseInt(responses[question.id] as string) / 5) * 100;
          } else if (question.type === 'scale') {
            score = responses[question.id] as number;
          } else if (question.type === 'multiple-choice') {
            score = 75; // Base score for selecting an option
          }
          total += score;
          count++;
        }
      });
      
      scores[dimension] = count > 0 ? total / count : 0;
    });
    
    // Calculate overall confidence score
    const avgScore = Object.values(scores).reduce((a, b) => a + b, 0) / dimensions.length;
    scores['Overall Confidence'] = avgScore;
    
    return scores;
  };

  const handleNext = () => {
    if (currentQuestionIndex < wiscarQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const getDimensionInfo = (dimension: string) => {
    const info = {
      'Will': { icon: Target, color: 'text-primary', description: 'Inner drive and determination' },
      'Interest': { icon: Heart, color: 'text-red-500', description: 'Genuine curiosity and engagement' },
      'Skill': { icon: Zap, color: 'text-secondary', description: 'Current capabilities and talents' },
      'Cognitive': { icon: Brain, color: 'text-accent', description: 'Thinking and problem-solving style' },
      'Ability': { icon: TrendingUp, color: 'text-success', description: 'Capacity to learn and grow' },
      'Real-World': { icon: Globe, color: 'text-warning', description: 'Understanding of practical applications' }
    };
    return info[dimension as keyof typeof info] || info['Will'];
  };

  const dimensionInfo = getDimensionInfo(currentQuestion.dimension);
  const DimensionIcon = dimensionInfo.icon;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-hero p-2 rounded-lg">
          <DimensionIcon className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {currentQuestion.dimension} - {dimensionInfo.description}
          </h3>
          <p className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {wiscarQuestions.length}
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
              <span>Very little</span>
              <span className="font-medium text-foreground">
                {responses[currentQuestion.id] || 50}%
              </span>
              <span>Extensively</span>
            </div>
          </div>
        )}

        {currentQuestion.type === "multiple-choice" && currentQuestion.options && (
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
          disabled={currentQuestionIndex === wiscarQuestions.length - 1 || !responses[currentQuestion.id]}
          className="bg-gradient-hero"
        >
          Next Question
        </Button>
      </div>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="font-semibold text-foreground mb-2">WISCAR Framework</h4>
        <p className="text-sm text-muted-foreground mb-3">
          The WISCAR framework provides a comprehensive analysis of your readiness across six key dimensions:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          {['Will', 'Interest', 'Skill', 'Cognitive', 'Ability', 'Real-World'].map(dimension => {
            const info = getDimensionInfo(dimension);
            const Icon = info.icon;
            return (
              <div key={dimension} className="flex items-center space-x-2">
                <Icon className={`h-3 w-3 ${info.color}`} />
                <span className="font-medium">{dimension}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WiscarAnalysis;