import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Brain, Shield, Lightbulb, Users, Target } from "lucide-react";

const skillsData = [
  {
    skill: "Empathy & Active Listening",
    description: "Understanding and responding to client emotions with genuine care",
    importance: 95,
    icon: Heart,
    color: "text-red-500"
  },
  {
    skill: "Emotional Intelligence",
    description: "Managing your own emotions while supporting others",
    importance: 90,
    icon: Brain,
    color: "text-primary"
  },
  {
    skill: "Problem-solving & Critical Thinking",
    description: "Analyzing complex situations and developing effective interventions",
    importance: 85,
    icon: Lightbulb,
    color: "text-accent"
  },
  {
    skill: "Ethical Standards & Confidentiality",
    description: "Maintaining professional boundaries and client trust",
    importance: 100,
    icon: Shield,
    color: "text-success"
  },
  {
    skill: "Stress Management & Resilience",
    description: "Handling difficult cases and preventing burnout",
    importance: 80,
    icon: Target,
    color: "text-secondary"
  },
  {
    skill: "Communication & Interpersonal Skills",
    description: "Building rapport and facilitating therapeutic relationships",
    importance: 88,
    icon: Users,
    color: "text-primary"
  }
];

const SkillsTraitsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Essential Skills & Personality Traits for Success
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Mental health counseling requires a unique combination of interpersonal skills, 
            emotional intelligence, and professional competencies. Here's what matters most:
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-medium transition-all duration-300 border-l-4 border-l-primary">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="bg-gradient-primary p-2 rounded-lg">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{skill.skill}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{skill.description}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Importance Level</span>
                    <span className="text-sm font-bold text-foreground">{skill.importance}%</span>
                  </div>
                  <Progress value={skill.importance} className="h-2" />
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="mt-12 p-8 bg-gradient-subtle">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Discover Your Fit?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our comprehensive assessment will evaluate how well your personality, skills, and interests 
              align with these critical success factors in mental health counseling.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span>Personality Assessment</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <span>Skills Evaluation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span>Career Alignment</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span>Learning Recommendations</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default SkillsTraitsSection;