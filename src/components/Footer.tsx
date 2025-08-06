import { Heart, Brain, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6" />
              <span className="text-xl font-bold">MindPath Assessment</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Scientifically-validated career assessments helping professionals 
              find their perfect fit in mental health counseling.
            </p>
            <div className="flex items-center space-x-2 text-primary-foreground/60">
              <Heart className="h-4 w-4" />
              <span className="text-sm">Trusted by 10,000+ professionals</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Assessment</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Scientific Validation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sample Report</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Frequently Asked Questions</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Careers</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-white transition-colors">Mental Health Counselor</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Clinical Therapist</a></li>
              <li><a href="#" className="hover:text-white transition-colors">School Counselor</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Crisis Intervention</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@mindpathassessment.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>1-800-MINDPATH</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Available Worldwide</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/60 text-sm">
              © 2024 MindPath Assessment. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-primary-foreground/80 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;