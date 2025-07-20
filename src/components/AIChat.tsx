import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Send, Lightbulb, Star } from 'lucide-react';
import { AICoachBubble } from './AICoachBubble';
import { AICoach } from '@/lib/aiCoach';
import { Activity } from '@/types/debate';

interface AIChatProps {
  activity: Activity;
  onComplete: (points: number) => void;
}

export function AIChat({ activity, onComplete }: AIChatProps) {
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState<number>(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const aiCoach = new AICoach();

  const handleSubmit = async () => {
    if (!userInput.trim()) return;

    setIsLoading(true);
    setHasSubmitted(true);

    try {
      const response = await aiCoach.evaluateArgument(userInput, activity.question);
      setAiResponse(response.message);
      setScore(response.score || 0);
      setSuggestions(response.suggestions || []);
    } catch (error) {
      setAiResponse("I'm having trouble analyzing your argument right now. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = () => {
    const earnedPoints = Math.floor((score / 10) * activity.points);
    onComplete(earnedPoints);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-success';
    if (score >= 6) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary">AI Coach Activity</Badge>
          <Badge variant="outline">{activity.points} points</Badge>
        </div>

        <h3 className="text-xl font-semibold mb-4">{activity.question}</h3>
        <p className="text-muted-foreground mb-6">{activity.feedback}</p>

        {/* Initial coach message */}
        <div className="mb-6">
          <AICoachBubble
            message="Hi! I'm Coach Maya. I'm excited to help you build a strong argument. Take your time to think through your response, and I'll provide detailed feedback to help you improve!"
          />
        </div>

        {/* User input area */}
        <div className="space-y-4">
          <Textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your argument here... Remember to include evidence, reasoning, and clear structure!"
            className="min-h-[120px] resize-none"
            disabled={hasSubmitted}
          />

          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {userInput.length}/500 characters
            </div>
            <Button
              onClick={handleSubmit}
              disabled={!userInput.trim() || isLoading || hasSubmitted}
              className="bg-gradient-primary"
            >
              {isLoading ? 'Analyzing...' : 'Submit to Coach Maya'}
              <Send className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* AI Response */}
        {isLoading && (
          <div className="mt-6">
            <AICoachBubble
              message="Let me analyze your argument..."
              isTyping
            />
          </div>
        )}

        {aiResponse && !isLoading && (
          <div className="mt-6 space-y-4">
            <AICoachBubble message={aiResponse} />
            
            {/* Score display */}
            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-gold" />
                  <span className="font-semibold">Argument Score</span>
                </div>
                <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                  {score}/10
                </div>
              </div>
              
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    score >= 8 ? 'bg-gradient-to-r from-success to-gold' :
                    score >= 6 ? 'bg-gradient-to-r from-warning to-gold' :
                    'bg-gradient-to-r from-destructive to-warning'
                  }`}
                  style={{ width: `${score * 10}%` }}
                />
              </div>
            </Card>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <Card className="p-4 bg-accent/5 border-accent/20">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-accent" />
                  <span className="font-semibold">Ways to Improve</span>
                </div>
                <ul className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-accent font-bold">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            <div className="flex justify-center">
              <Button onClick={handleComplete} size="lg" className="bg-gradient-gold">
                Continue Learning
                <Star className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}