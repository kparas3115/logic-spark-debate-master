import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, SkipForward, RotateCcw, Monitor } from 'lucide-react';

interface DemoModeProps {
  onExit: () => void;
}

const demoSteps = [
  {
    title: "Welcome to Debate Master",
    component: "hero",
    description: "Professional landing page with animated hero section",
    duration: 3000
  },
  {
    title: "User Onboarding",
    component: "onboarding", 
    description: "Guided introduction to debate fundamentals",
    duration: 4000
  },
  {
    title: "Learning Dashboard", 
    component: "dashboard",
    description: "Gamified progress tracking and level system",
    duration: 3000
  },
  {
    title: "Interactive Lessons",
    component: "lesson",
    description: "Multiple choice quizzes with instant feedback",
    duration: 4000
  },
  {
    title: "AI Coach Integration",
    component: "ai-chat",
    description: "Personalized feedback and improvement suggestions",
    duration: 4000
  },
  {
    title: "Live Practice Arena",
    component: "arena",
    description: "Real-time debates with AI opponents",
    duration: 5000
  },
  {
    title: "Tournament System",
    component: "tournament", 
    description: "Bracket-style competitions with celebrations",
    duration: 4000
  },
  {
    title: "Analytics Dashboard",
    component: "analytics",
    description: "Detailed progress tracking and insights",
    duration: 3000
  }
];

export function DemoMode({ onExit }: DemoModeProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const step = demoSteps[currentStep];
    const interval = 50; // Update every 50ms for smooth progress
    const totalUpdates = step.duration / interval;
    let currentUpdate = 0;

    const timer = setInterval(() => {
      currentUpdate++;
      setProgress((currentUpdate / totalUpdates) * 100);

      if (currentUpdate >= totalUpdates) {
        if (currentStep < demoSteps.length - 1) {
          setCurrentStep(prev => prev + 1);
          setProgress(0);
        } else {
          setIsPlaying(false);
          setProgress(100);
        }
      }
    }, interval);

    return () => clearInterval(timer);
  }, [currentStep, isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setProgress(0);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsPlaying(true);
  };

  const currentStepData = demoSteps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Demo Controls */}
      <Card className="m-6 p-4 bg-white/95 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="default" className="bg-gradient-gold">
              <Monitor className="w-3 h-3 mr-1" />
              Demo Mode
            </Badge>
            <div>
              <h3 className="font-semibold text-sm">{currentStepData.title}</h3>
              <p className="text-xs text-muted-foreground">{currentStepData.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handlePlayPause}>
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button size="sm" variant="outline" onClick={handleNext} disabled={currentStep >= demoSteps.length - 1}>
              <SkipForward className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleRestart}>
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button size="sm" onClick={onExit}>
              Exit Demo
            </Button>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Step {currentStep + 1} of {demoSteps.length}</span>
            <span>{Math.round((currentStep + 1) / demoSteps.length * 100)}% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-gradient-primary h-2 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Demo Content */}
      <div className="flex-1 p-6">
        <Card className="h-full p-8 bg-white/90 backdrop-blur-sm">
          {currentStepData.component === 'hero' && (
            <div className="text-center space-y-6">
              <div className="animate-bounce-in">
                <h1 className="text-5xl font-bold text-primary mb-4">Master the Art of Debate</h1>
                <p className="text-xl text-muted-foreground">Revolutionary AI-powered learning platform</p>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-8">
                {['AI Coach', 'Gamified Learning', 'Real-time Practice'].map((feature, i) => (
                  <div key={i} className="p-4 bg-gradient-primary text-primary-foreground rounded-lg">
                    <h3 className="font-bold">{feature}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStepData.component === 'onboarding' && (
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-gradient-gold rounded-full flex items-center justify-center mx-auto animate-pulse">
                <span className="text-3xl">🎯</span>
              </div>
              <h2 className="text-3xl font-bold text-primary">Welcome to Debate Master</h2>
              <p className="text-lg text-muted-foreground">Let's start your journey to debate excellence!</p>
              <div className="flex justify-center gap-2">
                {[1,2,3,4].map((step, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    i === 0 ? 'bg-gradient-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStepData.component === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary">Learning Dashboard</h2>
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4 bg-gradient-primary text-primary-foreground">
                  <div className="text-2xl font-bold">Level 2</div>
                  <div className="text-sm">Current Level</div>
                </Card>
                <Card className="p-4">
                  <div className="text-2xl font-bold text-gold">150</div>
                  <div className="text-sm text-muted-foreground">Total Points</div>
                </Card>
                <Card className="p-4">
                  <div className="text-2xl font-bold text-success">5</div>
                  <div className="text-sm text-muted-foreground">Badges Earned</div>
                </Card>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {['Debate Basics', 'Building Arguments'].map((level, i) => (
                  <Card key={i} className={`p-4 ${i === 0 ? 'ring-2 ring-success' : ''}`}>
                    <h3 className="font-bold">{level}</h3>
                    <p className="text-sm text-muted-foreground">3/3 lessons complete</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {currentStepData.component === 'lesson' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary">Interactive Quiz</h2>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">What is the primary purpose of debate?</h3>
                <div className="space-y-2">
                  {[
                    'To win at all costs',
                    'To explore different perspectives and reach better understanding', 
                    'To show off knowledge',
                    'To prove others wrong'
                  ].map((option, i) => (
                    <button
                      key={i}
                      className={`w-full p-3 text-left rounded border-2 transition-smooth ${
                        i === 1 ? 'border-success bg-success/10' : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {currentStepData.component === 'ai-chat' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary">AI Coach Feedback</h2>
              <div className="space-y-4">
                <Card className="p-4 bg-gradient-primary text-primary-foreground max-w-md">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🤖</span>
                    <span className="font-bold">Coach Maya</span>
                  </div>
                  <p className="text-sm">Excellent argument structure! Your evidence is compelling and your reasoning is clear. Consider addressing potential counterarguments to make it even stronger.</p>
                </Card>
                <Card className="p-4 bg-accent/10 border-accent/20">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">Argument Score</span>
                    <span className="text-2xl font-bold text-success">8/10</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div className="bg-gradient-to-r from-success to-gold h-2 rounded-full" style={{width: '80%'}}></div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {currentStepData.component === 'arena' && (
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold text-primary">Live Practice Arena</h2>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl mb-2">👤</div>
                  <h3 className="font-bold">You</h3>
                  <Badge variant="default">Ready</Badge>
                </div>
                <div>
                  <div className="text-4xl mb-2">🤖</div>
                  <h3 className="font-bold">AI Opponent</h3>
                  <Badge variant="secondary">Level 2</Badge>
                </div>
              </div>
              <Card className="p-4 bg-accent/10">
                <p className="font-medium">Debate Topic: "Should schools require uniforms?"</p>
              </Card>
              <div className="animate-pulse">
                <div className="text-primary">🎤 Recording your argument...</div>
              </div>
            </div>
          )}

          {currentStepData.component === 'tournament' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary">Tournament Bracket</h2>
              <div className="grid grid-cols-4 gap-4">
                {['Alex Chen', 'Sarah Miller', 'Marcus Johnson', 'Dr. Williams'].map((opponent, i) => (
                  <Card key={i} className={`p-4 text-center ${i === 0 ? 'bg-success/20 border-success' : ''}`}>
                    <div className="text-2xl mb-1">
                      {i === 0 ? '🤓' : i === 1 ? '📚' : i === 2 ? '⚔️' : '🎓'}
                    </div>
                    <div className="font-bold text-sm">{opponent}</div>
                    {i === 0 && <Badge variant="default" className="mt-1">Won</Badge>}
                  </Card>
                ))}
              </div>
              <Card className="p-6 text-center bg-gradient-gold text-accent-foreground">
                <div className="text-4xl mb-2 animate-bounce">🏆</div>
                <h3 className="text-xl font-bold">Round Victory!</h3>
                <p>You defeated Alex Chen with strong arguments!</p>
              </Card>
            </div>
          )}

          {currentStepData.component === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary">Learning Analytics</h2>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Total Points', value: '350', icon: '🏆' },
                  { label: 'Lessons Done', value: '12', icon: '🎯' },
                  { label: 'Badges Earned', value: '7', icon: '⭐' },
                  { label: 'Win Rate', value: '85%', icon: '📈' }
                ].map((stat, i) => (
                  <Card key={i} className="p-4 text-center">
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </Card>
                ))}
              </div>
              <Card className="p-4">
                <h3 className="font-bold mb-3">Skills Progress</h3>
                {['Argument Structure', 'Evidence Usage', 'Logical Reasoning'].map((skill, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{skill}</span>
                      <span className="text-sm">{85 + i * 5}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-gradient-primary h-2 rounded-full" style={{width: `${85 + i * 5}%`}}></div>
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}