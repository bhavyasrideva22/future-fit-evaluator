import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SkillsTraitsSection from "@/components/SkillsTraitsSection";
import AssessmentFlow from "@/components/AssessmentFlow";
import Footer from "@/components/Footer";

const Index = () => {
  const [showAssessment, setShowAssessment] = useState(false);

  const handleStartAssessment = () => {
    setShowAssessment(true);
  };

  if (showAssessment) {
    return (
      <div className="min-h-screen bg-background">
        <Header onStartAssessment={handleStartAssessment} />
        <AssessmentFlow />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onStartAssessment={handleStartAssessment} />
      <HeroSection onStartAssessment={handleStartAssessment} />
      <SkillsTraitsSection />
      <Footer />
    </div>
  );
};

export default Index;
