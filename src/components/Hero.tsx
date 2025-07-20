import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain, Trophy, Users, Zap } from 'lucide-react';

interface HeroProps {
  onStartLearning: () => void;
}

export function Hero({ onStartLearning }: HeroProps) {
  return (
    <div className="relative min-h-screen bg-gradient-hero flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gold rounded-full animate-float" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-primary-glow rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-gold-light rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main hero content */}
          <div className="mb-8 animate-bounce-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Master the Art of
              <span className="bg-gradient-gold bg-clip-text text-transparent block">
                Debate
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Develop critical thinking, build powerful arguments, and become a confident speaker 
              with our gamified learning platform designed for high school students.
            </p>
          </div>

          {/* Call to action */}
          <div className="mb-12 animate-bounce-in" style={{ animationDelay: '0.2s' }}>
            <Button
              onClick={onStartLearning}
              size="lg"
              className="bg-gradient-gold hover:bg-gradient-gold/90 text-accent-foreground font-bold px-8 py-4 text-lg hover-lift shadow-gold"
            >
              Start Your Journey
              <Zap className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-white p-6 hover-lift animate-bounce-in" style={{ animationDelay: '0.4s' }}>
              <div className="bg-gradient-gold rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <Brain className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Coach</h3>
              <p className="text-white/80">
                Get personalized feedback and guidance from Coach Maya, your intelligent debate mentor.
              </p>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-white p-6 hover-lift animate-bounce-in" style={{ animationDelay: '0.6s' }}>
              <div className="bg-gradient-gold rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <Trophy className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gamified Learning</h3>
              <p className="text-white/80">
                Earn points, unlock badges, and progress through levels as you master debate skills.
              </p>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-white p-6 hover-lift animate-bounce-in" style={{ animationDelay: '0.8s' }}>
              <div className="bg-gradient-gold rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Exercises</h3>
              <p className="text-white/80">
                Practice with drag-and-drop activities, quizzes, and real-time feedback systems.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}