import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Brain, Clock, Users, Star } from "lucide-react";

interface HeroSectionProps {
  onStartAssessment?: () => void;
}

const HeroSection = ({ onStartAssessment }: HeroSectionProps) => {
  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Comprehensive Readiness & Fit Assessment for{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Mental Health Counselor
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover if Mental Health Counseling aligns with your personality, skills, and career aspirations. 
            Our scientifically-validated assessment provides personalized insights and career guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary shadow-medium hover:shadow-strong transition-all duration-300"
              onClick={onStartAssessment}
            >
              Start Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5">
              Learn More
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center hover:shadow-medium transition-all duration-300">
            <div className="bg-gradient-primary w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">20-30 Minutes</h3>
            <p className="text-muted-foreground">Comprehensive assessment covering all key dimensions</p>
          </Card>
          <Card className="p-6 text-center hover:shadow-medium transition-all duration-300">
            <div className="bg-gradient-secondary w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Scientifically Valid</h3>
            <p className="text-muted-foreground">Based on Big Five, RIASEC, and WISCAR frameworks</p>
          </Card>
          <Card className="p-6 text-center hover:shadow-medium transition-all duration-300">
            <div className="bg-accent w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Star className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Personalized Results</h3>
            <p className="text-muted-foreground">Detailed insights and career recommendations</p>
          </Card>
        </div>

        <Card className="p-8 bg-gradient-subtle border-primary/20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">What Mental Health Counseling Involves</h2>
              <p className="text-muted-foreground mb-6">
                Mental Health Counseling focuses on diagnosing, treating, and supporting individuals with mental health issues. 
                This field encompasses therapy, crisis intervention, community support, and preventive mental health care.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Individual and group therapy sessions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Crisis intervention and emergency support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Assessment and treatment planning</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Community mental health programs</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Typical Career Paths</h3>
              <div className="space-y-3">
                {[
                  "Licensed Mental Health Counselor",
                  "Clinical Therapist",
                  "School Counselor",
                  "Substance Abuse Counselor",
                  "Psychiatric Rehabilitation Specialist"
                ].map((career, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-soft">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="font-medium">{career}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default HeroSection;