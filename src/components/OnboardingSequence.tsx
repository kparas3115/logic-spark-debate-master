import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Brain, Target, Users, Trophy, ArrowRight, Play } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    icon: Brain,
    title: "Welcome to Debate Master",
    content: "The revolutionary platform that transforms debate learning into an engaging, gamified experience.",
    animation: "animate-bounce-in"
  },
  {
    icon: Target,
    title: "Master Critical Thinking",
    content: "Learn to construct powerful arguments, identify logical fallacies, and think critically about complex issues.",
    animation: "animate-slide-in-left"
  },
  {
    icon: Users,
    title: "AI-Powered Coaching",
    content: "Meet Coach Maya, your intelligent debate mentor who provides personalized feedback and guidance.",
    animation: "animate-fade-in"
  },
  {
    icon: Trophy,
    title: "Compete & Achieve",
    content: "Progress through tournaments, earn badges, and compete against AI opponents in real-time debates.",
    animation: "animate-gold-glow"
  }
];

export function OnboardingSequence({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 800);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setIsAnimating(true);
    } else {
      onComplete();
    }
  };

  const step = onboardingSteps[currentStep];
  const IconComponent = step.icon;
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Progress bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2 bg-white/20" />
          <div className="flex justify-between mt-2 text-white/80 text-sm">
            <span>Step {currentStep + 1} of {onboardingSteps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        {/* Main content card */}
        <Card className={`p-12 text-center bg-white/95 backdrop-blur-sm ${step.animation} ${isAnimating ? '' : 'animate-none'}`}>
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <IconComponent className="w-12 h-12 text-accent-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-primary mb-4">{step.title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{step.content}</p>
          </div>

          <div className="flex justify-center gap-4">
            {currentStep > 0 && (
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-8"
              >
                Previous
              </Button>
            )}
            <Button 
              onClick={handleNext}
              className="bg-gradient-primary hover:bg-gradient-primary/90 px-8"
            >
              {currentStep === onboardingSteps.length - 1 ? (
                <>
                  Start Learning
                  <Play className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* Skip option */}
          <button
            onClick={onComplete}
            className="text-sm text-muted-foreground hover:text-foreground transition-smooth mt-6 underline"
          >
            Skip introduction
          </button>
        </Card>

        {/* Feature highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {onboardingSteps.map((item, index) => (
            <div
              key={index}
              className={`text-center text-white/80 transition-smooth ${
                index <= currentStep ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <item.icon className="w-6 h-6 mx-auto mb-2" />
              <div className="text-xs font-medium">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}