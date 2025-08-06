import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SkillsTraitsSection from "@/components/SkillsTraitsSection";
import AssessmentFlow from "@/components/AssessmentFlow";
import Footer from "@/components/Footer";

const Index = () => {
  const [showAssessment, setShowAssessment] = useState(false);

  if (showAssessment) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <AssessmentFlow />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <SkillsTraitsSection />
      <Footer />
    </div>
  );
};

export default Index;
