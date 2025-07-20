import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Users, Trophy, Target, Zap, Play, CheckCircle } from 'lucide-react';

interface HowItWorksProps {
  onStartDemo?: () => void;
}

const steps = [
  {
    icon: Target,
    title: "Personalized Learning Path",
    description: "Start with fundamentals and progress through 5 carefully designed levels",
    details: ["Adaptive difficulty based on performance", "Unlock new levels by earning points", "Track progress with detailed analytics"]
  },
  {
    icon: Brain,
    title: "AI-Powered Coaching", 
    description: "Get real-time feedback from Coach Maya, your intelligent debate mentor",
    details: ["Analyze argument strength and structure", "Identify logical fallacies", "Receive personalized improvement tips"]
  },
  {
    icon: Users,
    title: "Interactive Practice",
    description: "Engage in live debates, tournaments, and skill-building exercises",
    details: ["Real-time debate simulations", "Tournament bracket competitions", "Drag-and-drop argument building"]
  },
  {
    icon: Trophy,
    title: "Achievement System",
    description: "Earn badges, accumulate points, and track your debate mastery",
    details: ["Unlock special achievements", "Compare progress with peers", "Celebrate learning milestones"]
  }
];

const features = [
  "🎯 Progressive skill building from basics to advanced techniques",
  "🤖 AI coach provides instant, personalized feedback",
  "🏆 Gamified system with points, badges, and tournaments", 
  "📊 Detailed analytics track learning progress",
  "🎤 Speech analysis for verbal argument practice",
  "📱 Mobile-responsive design for learning anywhere",
  "♿ Fully accessible with keyboard navigation support",
  "🌟 Evidence-based curriculum aligned with educational standards"
];

export function HowItWorks({ onStartDemo }: HowItWorksProps) {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-primary mb-4">How Debate Master Works</h2>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Our revolutionary platform transforms debate education through AI-powered coaching, 
          gamified learning, and real-time practice opportunities.
        </p>
      </div>

      {/* Process Steps */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <Card key={index} className="p-6 text-center hover-lift animate-bounce-in" style={{ animationDelay: `${index * 0.2}s` }}>
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <step.icon className="w-8 h-8 text-primary-foreground" />
            </div>
            <Badge variant="outline" className="mb-3">Step {index + 1}</Badge>
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
            <div className="space-y-1">
              {step.details.map((detail, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle className="w-3 h-3 text-success" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Feature Highlights */}
      <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-primary mb-2">Platform Features</h3>
          <p className="text-muted-foreground">Everything you need to master the art of debate</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-background rounded-lg hover-lift">
              <span className="text-lg">{feature.split(' ')[0]}</span>
              <span className="text-sm">{feature.substring(feature.indexOf(' ') + 1)}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Learning Journey Visualization */}
      <Card className="p-8">
        <h3 className="text-2xl font-bold text-center text-primary mb-8">Your Learning Journey</h3>
        
        <div className="relative">
          {/* Journey path */}
          <div className="absolute top-8 left-8 right-8 h-1 bg-gradient-primary rounded-full"></div>
          
          <div className="grid grid-cols-5 gap-4 relative z-10">
            {['Basics', 'Arguments', 'Rebuttals', 'Fallacies', 'Advanced'].map((level, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                  index === 0 ? 'bg-gradient-gold animate-pulse' : 
                  index === 1 ? 'bg-gradient-primary' : 'bg-muted'
                }`}>
                  <span className="text-xl font-bold text-white">{index + 1}</span>
                </div>
                <h4 className="font-semibold text-sm">{level}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {index === 0 && "Learn fundamentals"}
                  {index === 1 && "Build strong arguments"}
                  {index === 2 && "Master rebuttals"}
                  {index === 3 && "Spot fallacies"}
                  {index === 4 && "Advanced techniques"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Educational Impact */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 text-center hover-lift">
          <div className="text-4xl font-bold text-success mb-2">95%</div>
          <div className="text-sm text-muted-foreground">Student Engagement Rate</div>
        </Card>
        
        <Card className="p-6 text-center hover-lift">
          <div className="text-4xl font-bold text-primary mb-2">87%</div>
          <div className="text-sm text-muted-foreground">Improvement in Critical Thinking</div>
        </Card>
        
        <Card className="p-6 text-center hover-lift">
          <div className="text-4xl font-bold text-gold mb-2">92%</div>
          <div className="text-sm text-muted-foreground">Teacher Satisfaction</div>
        </Card>
      </div>

      {/* Call to Action */}
      <Card className="p-8 text-center bg-gradient-primary text-primary-foreground">
        <h3 className="text-2xl font-bold mb-4">Ready to Transform Debate Education?</h3>
        <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
          Join thousands of students already mastering critical thinking and argumentation skills 
          through our innovative platform.
        </p>
        
        <div className="flex justify-center gap-4">
          {onStartDemo && (
            <Button
              onClick={onStartDemo}
              size="lg"
              className="bg-gradient-gold hover:bg-gradient-gold/90 text-accent-foreground"
            >
              <Play className="w-5 h-5 mr-2" />
              Try Interactive Demo
            </Button>
          )}
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
          >
            <Zap className="w-5 h-5 mr-2" />
            Get Started Free
          </Button>
        </div>
      </Card>
    </div>
  );
}