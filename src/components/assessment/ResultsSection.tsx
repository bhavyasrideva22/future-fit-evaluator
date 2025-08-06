import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Target,
  Heart,
  Brain,
  Zap,
  Globe,
  Download,
  Share
} from "lucide-react";

interface ResultsSectionProps {
  onDataChange: (data: any) => void;
  assessmentData: any;
}

const ResultsSection = ({ onDataChange, assessmentData }: ResultsSectionProps) => {
  // Mock comprehensive results based on assessment data
  const overallScore = 78;
  const recommendation = "Yes";
  const confidence = 85;

  const psychometricScore = 82;
  const technicalScore = 74;
  const wiscarScores = {
    'Will': 85,
    'Interest': 90,
    'Skill': 75,
    'Cognitive': 80,
    'Ability': 88,
    'Real-World': 70
  };

  const careerRoles = [
    {
      title: "Licensed Mental Health Counselor",
      match: 85,
      description: "Providing individual and group therapy in clinical settings",
      requirements: "Master's degree, supervised clinical hours, state licensure"
    },
    {
      title: "School Counselor", 
      match: 78,
      description: "Supporting student emotional and social development",
      requirements: "Master's in counseling, teaching credential (varies by state)"
    },
    {
      title: "Substance Abuse Counselor",
      match: 72,
      description: "Specialized treatment for addiction and recovery",
      requirements: "Bachelor's degree minimum, certification in addiction counseling"
    },
    {
      title: "Crisis Intervention Specialist",
      match: 80,
      description: "Emergency mental health support and crisis response",
      requirements: "Bachelor's degree, crisis intervention training"
    }
  ];

  const learningPath = [
    {
      level: "Beginner",
      courses: ["Introduction to Psychology", "Communication Skills", "Ethics in Counseling"],
      timeframe: "3-6 months"
    },
    {
      level: "Intermediate", 
      courses: ["Counseling Techniques", "Abnormal Psychology", "Group Therapy Methods"],
      timeframe: "6-12 months"
    },
    {
      level: "Job-Ready",
      courses: ["Clinical Practicum", "Supervised Field Experience", "Licensure Preparation"],
      timeframe: "12-24 months"
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getRecommendationIcon = () => {
    if (recommendation === "Yes") return <CheckCircle className="h-6 w-6 text-success" />;
    if (recommendation === "Maybe") return <AlertCircle className="h-6 w-6 text-warning" />;
    return <AlertCircle className="h-6 w-6 text-destructive" />;
  };

  const dimensionIcons = {
    'Will': Target,
    'Interest': Heart, 
    'Skill': Zap,
    'Cognitive': Brain,
    'Ability': TrendingUp,
    'Real-World': Globe
  };

  return (
    <div className="space-y-8">
      {/* Overall Results Header */}
      <Card className="p-8 bg-gradient-subtle border-primary/20">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            {getRecommendationIcon()}
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {recommendation === "Yes" ? "Excellent Fit!" : recommendation === "Maybe" ? "Potential Fit" : "Consider Alternatives"}
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Based on your comprehensive assessment, you show strong alignment with mental health counseling
          </p>
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{overallScore}%</div>
              <div className="text-sm text-muted-foreground">Overall Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">{confidence}%</div>
              <div className="text-sm text-muted-foreground">Confidence Level</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Section Scores */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Psychological Fit</h3>
              <p className="text-sm text-muted-foreground">Personality & Interest</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Score</span>
              <span className={`font-bold ${getScoreColor(psychometricScore)}`}>{psychometricScore}%</span>
            </div>
            <Progress value={psychometricScore} className="h-2" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-secondary p-2 rounded-lg">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Technical Readiness</h3>
              <p className="text-sm text-muted-foreground">Knowledge & Aptitude</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Score</span>
              <span className={`font-bold ${getScoreColor(technicalScore)}`}>{technicalScore}%</span>
            </div>
            <Progress value={technicalScore} className="h-2" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-hero p-2 rounded-lg">
              <Target className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">WISCAR Analysis</h3>
              <p className="text-sm text-muted-foreground">Comprehensive Readiness</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Average</span>
              <span className={`font-bold ${getScoreColor(Object.values(wiscarScores).reduce((a, b) => a + b) / 6)}`}>
                {Math.round(Object.values(wiscarScores).reduce((a, b) => a + b) / 6)}%
              </span>
            </div>
            <Progress value={Object.values(wiscarScores).reduce((a, b) => a + b) / 6} className="h-2" />
          </div>
        </Card>
      </div>

      {/* WISCAR Breakdown */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">WISCAR Dimension Analysis</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(wiscarScores).map(([dimension, score]) => {
            const Icon = dimensionIcons[dimension as keyof typeof dimensionIcons];
            return (
              <div key={dimension} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="font-medium">{dimension}</span>
                  </div>
                  <span className={`font-bold ${getScoreColor(score)}`}>{score}%</span>
                </div>
                <Progress value={score} className="h-2" />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Career Recommendations */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Recommended Career Paths</h3>
        <div className="space-y-4">
          {careerRoles.map((role, index) => (
            <div key={index} className="border border-border rounded-lg p-4 hover:shadow-soft transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{role.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{role.description}</p>
                  <p className="text-xs text-muted-foreground">{role.requirements}</p>
                </div>
                <Badge variant={role.match >= 80 ? "default" : "secondary"} className="ml-4">
                  {role.match}% match
                </Badge>
              </div>
              <Progress value={role.match} className="h-2" />
            </div>
          ))}
        </div>
      </Card>

      {/* Learning Path */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Your Learning Journey</h3>
        <div className="space-y-6">
          {learningPath.map((level, index) => (
            <div key={index} className="relative">
              {index < learningPath.length - 1 && (
                <div className="absolute left-4 top-10 w-0.5 h-16 bg-border"></div>
              )}
              <div className="flex items-start space-x-4">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-foreground">{level.level}</h4>
                    <Badge variant="outline">{level.timeframe}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {level.courses.map((course, courseIndex) => (
                      <Badge key={courseIndex} variant="secondary" className="text-xs">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button className="bg-gradient-primary flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Download Full Report</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Share className="h-4 w-4" />
          <span>Share Results</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <BookOpen className="h-4 w-4" />
          <span>Start Learning Path</span>
        </Button>
      </div>

      <Card className="p-6 bg-muted/50">
        <h4 className="font-semibold text-foreground mb-2">Next Steps</h4>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• <strong>Immediate:</strong> Begin with introduction to psychology courses and communication skills training</p>
          <p>• <strong>Short-term (3-6 months):</strong> Volunteer with mental health organizations to gain practical experience</p>
          <p>• <strong>Medium-term (6-12 months):</strong> Enroll in formal counseling education program</p>
          <p>• <strong>Long-term (1-2 years):</strong> Complete supervised clinical hours and pursue licensure</p>
        </div>
      </Card>
    </div>
  );
};

export default ResultsSection;