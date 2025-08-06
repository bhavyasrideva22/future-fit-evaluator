import { Button } from "@/components/ui/button";
import { Brain, Heart, Users } from "lucide-react";

interface HeaderProps {
  onStartAssessment?: () => void;
}

const Header = ({ onStartAssessment }: HeaderProps) => {
  return (
    <header className="bg-gradient-hero shadow-soft border-b border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">MindPath Assessment</h1>
              <p className="text-white/80 text-sm">Professional Mental Health Career Guidance</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-white/90">
              <Heart className="h-4 w-4" />
              <span className="text-sm">Trusted by 10,000+ professionals</span>
            </div>
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={onStartAssessment}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;