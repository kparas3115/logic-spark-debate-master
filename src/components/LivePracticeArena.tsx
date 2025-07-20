import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Mic, MicOff, Play, Trophy, Zap, Timer } from 'lucide-react';
import { AICoachBubble } from './AICoachBubble';
import { AICoach } from '@/lib/aiCoach';

interface LiveArenaProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

const debateTopics = [
  "Should schools require students to wear uniforms?",
  "Is social media harmful to teenagers?",
  "Should homework be banned for students under 12?",
  "Are video games educational tools or distractions?",
  "Should students choose their own curriculum?"
];

export function LivePracticeArena({ onComplete, onBack }: LiveArenaProps) {
  const [currentTopic, setCurrentTopic] = useState('');
  const [phase, setPhase] = useState<'setup' | 'debate' | 'feedback'>('setup');
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [isRecording, setIsRecording] = useState(false);
  const [userArgument, setUserArgument] = useState('');
  const [aiCounter, setAiCounter] = useState('');
  const [score, setScore] = useState(0);
  const [showAIResponse, setShowAIResponse] = useState(false);

  const aiCoach = new AICoach();

  useEffect(() => {
    if (phase === 'setup') {
      const topic = debateTopics[Math.floor(Math.random() * debateTopics.length)];
      setCurrentTopic(topic);
    }
  }, [phase]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (phase === 'debate' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && phase === 'debate') {
      handleDebateEnd();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, phase]);

  const startDebate = () => {
    setPhase('debate');
    setTimeLeft(120);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Simulate speech recognition
    if (!isRecording) {
      setTimeout(() => {
        setUserArgument("Schools should require uniforms because they reduce peer pressure and create a more focused learning environment. Studies show that uniform policies lead to improved academic performance.");
        setIsRecording(false);
      }, 3000);
    }
  };

  const handleDebateEnd = async () => {
    setPhase('feedback');
    
    // Generate AI counter-argument
    const aiArguments = [
      "While uniforms may reduce some peer pressure, they also limit students' self-expression and creativity. Research indicates that allowing personal choice in clothing helps develop decision-making skills and individual identity.",
      "The evidence on academic improvement is mixed. Many successful schools without uniform policies achieve excellent results by focusing on teaching quality rather than dress codes.",
      "Uniforms can be costly for families and may create financial barriers. A better approach would be implementing clear dress code guidelines that are inclusive and respect cultural diversity."
    ];
    
    setAiCounter(aiArguments[Math.floor(Math.random() * aiArguments.length)]);
    
    // Evaluate user performance
    const response = await aiCoach.evaluateArgument(userArgument, currentTopic);
    setScore(response.score || 7);
    
    setTimeout(() => setShowAIResponse(true), 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-success';
    if (score >= 6) return 'text-warning';
    return 'text-destructive';
  };

  if (phase === 'setup') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-8 text-center bg-gradient-primary text-primary-foreground">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-gold animate-pulse" />
          <h2 className="text-3xl font-bold mb-4">Live Practice Arena</h2>
          <p className="text-xl mb-6 text-primary-foreground/90">
            Engage in real-time debates with AI opponents to sharpen your skills!
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Today's Debate Topic</h3>
          <Card className="p-6 bg-accent/10 border-accent/20">
            <p className="text-lg font-medium text-center">{currentTopic}</p>
          </Card>
          
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Your Position:</span>
              <Badge variant="default">Pro (Supporting)</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">AI Position:</span>
              <Badge variant="secondary">Con (Opposing)</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Time Limit:</span>
              <Badge variant="outline">2 minutes each</Badge>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <Button variant="outline" onClick={onBack}>
              Back to Dashboard
            </Button>
            <Button onClick={startDebate} className="bg-gradient-gold hover:bg-gradient-gold/90">
              <Zap className="w-4 h-4 mr-2" />
              Start Debate
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (phase === 'debate') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Timer and status */}
        <Card className="p-4 bg-primary text-primary-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Timer className="w-5 h-5" />
              <span className="font-semibold">Your Turn</span>
            </div>
            <div className="text-2xl font-bold">{formatTime(timeLeft)}</div>
          </div>
          <Progress value={(timeLeft / 120) * 100} className="mt-2 h-2" />
        </Card>

        {/* Topic reminder */}
        <Card className="p-4 bg-accent/10 border-accent/20">
          <p className="text-center font-medium">{currentTopic}</p>
          <p className="text-center text-sm text-muted-foreground mt-1">Defend the PRO position</p>
        </Card>

        {/* Recording interface */}
        <Card className="p-8 text-center">
          <div className="mb-6">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4 transition-smooth ${
              isRecording ? 'bg-destructive animate-pulse' : 'bg-muted'
            }`}>
              {isRecording ? (
                <MicOff className="w-16 h-16 text-destructive-foreground" />
              ) : (
                <Mic className="w-16 h-16 text-muted-foreground" />
              )}
            </div>
            
            <Button
              onClick={toggleRecording}
              size="lg"
              variant={isRecording ? "destructive" : "default"}
              className="px-8"
            >
              {isRecording ? 'Stop Recording' : 'Start Speaking'}
            </Button>
          </div>

          {userArgument && (
            <Card className="p-4 bg-secondary text-left">
              <h4 className="font-semibold mb-2">Your Argument (Transcribed):</h4>
              <p className="text-sm">{userArgument}</p>
            </Card>
          )}

          {isRecording && (
            <div className="text-sm text-muted-foreground animate-pulse">
              🎤 Listening... Speak clearly into your microphone
            </div>
          )}
        </Card>

        <div className="text-center">
          <Button onClick={handleDebateEnd} variant="outline" size="sm">
            End Turn Early
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Results header */}
      <Card className="p-6 text-center bg-gradient-primary text-primary-foreground">
        <h2 className="text-2xl font-bold mb-2">Debate Round Complete!</h2>
        <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
          {score}/10
        </div>
        <p className="text-primary-foreground/80">Performance Score</p>
      </Card>

      {/* User argument */}
      <Card className="p-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Badge variant="default">Your Argument</Badge>
        </h3>
        <p className="text-sm bg-secondary p-4 rounded-lg">{userArgument}</p>
      </Card>

      {/* AI counter-argument */}
      <Card className="p-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Badge variant="secondary">AI Counter-Argument</Badge>
        </h3>
        <p className="text-sm bg-accent/10 p-4 rounded-lg border-accent/20 border">{aiCounter}</p>
      </Card>

      {/* AI Feedback */}
      {showAIResponse && (
        <div className="animate-slide-in-left">
          <AICoachBubble
            message={`Great debate round! Your argument showed solid reasoning. To improve, try adding more specific evidence and consider potential counterarguments. You're developing strong debate instincts!`}
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={onBack}>
          Return to Dashboard
        </Button>
        <Button 
          onClick={() => onComplete(score * 10)}
          className="bg-gradient-gold hover:bg-gradient-gold/90"
        >
          Continue Learning
          <Trophy className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}