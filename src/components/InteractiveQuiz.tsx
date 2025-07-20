import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { Activity } from '@/types/debate';

interface InteractiveQuizProps {
  activities: Activity[];
  onComplete: (totalPoints: number) => void;
}

export function InteractiveQuiz({ activities, onComplete }: InteractiveQuizProps) {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const activity = activities[currentActivity];
  const isLastActivity = currentActivity === activities.length - 1;
  const isCorrect = selectedAnswer === activity.correctAnswer;

  const handleAnswerSelect = (answer: string) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    setShowFeedback(true);
    setAnswers([...answers, selectedAnswer]);
    
    if (isCorrect) {
      setEarnedPoints(prev => prev + activity.points);
    }
  };

  const handleNext = () => {
    if (isLastActivity) {
      onComplete(earnedPoints);
    } else {
      setCurrentActivity(prev => prev + 1);
      setSelectedAnswer('');
      setShowFeedback(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-6">
        {activities.map((_, index) => (
          <div
            key={index}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              index < currentActivity ? 'bg-success text-success-foreground' :
              index === currentActivity ? 'bg-primary text-primary-foreground' :
              'bg-muted text-muted-foreground'
            }`}
          >
            {index < currentActivity ? <CheckCircle className="w-4 h-4" /> : index + 1}
          </div>
        ))}
      </div>

      {/* Question card */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary">Question {currentActivity + 1} of {activities.length}</Badge>
          <Badge variant="outline">{activity.points} points</Badge>
        </div>

        <h3 className="text-xl font-semibold mb-6">{activity.question}</h3>

        {/* Answer options */}
        <div className="space-y-3 mb-6">
          {activity.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              disabled={showFeedback}
              className={`w-full p-4 text-left rounded-lg border-2 transition-smooth ${
                selectedAnswer === option
                  ? showFeedback
                    ? isCorrect
                      ? 'border-success bg-success/10 text-success-foreground'
                      : 'border-destructive bg-destructive/10 text-destructive-foreground'
                    : 'border-primary bg-primary/10'
                  : showFeedback && option === activity.correctAnswer
                    ? 'border-success bg-success/10 text-success-foreground'
                    : 'border-border hover:border-primary/50 hover:bg-primary/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showFeedback && selectedAnswer === option && (
                  isCorrect ? <CheckCircle className="w-5 h-5 text-success" /> : <XCircle className="w-5 h-5 text-destructive" />
                )}
                {showFeedback && option === activity.correctAnswer && selectedAnswer !== option && (
                  <CheckCircle className="w-5 h-5 text-success" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <Card className={`p-4 ${isCorrect ? 'bg-success/10 border-success' : 'bg-warning/10 border-warning'}`}>
            <div className="flex items-start gap-3">
              <Lightbulb className={`w-5 h-5 mt-0.5 ${isCorrect ? 'text-success' : 'text-warning'}`} />
              <div>
                <p className="font-medium mb-1">
                  {isCorrect ? `Excellent! +${activity.points} points` : 'Not quite right, but keep learning!'}
                </p>
                <p className="text-sm">{activity.feedback}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Action buttons */}
        <div className="flex justify-between mt-6">
          <div className="text-sm text-muted-foreground">
            Points earned: {earnedPoints}
          </div>
          <div className="space-x-2">
            {!showFeedback ? (
              <Button onClick={handleSubmit} disabled={!selectedAnswer}>
                Submit Answer
              </Button>
            ) : (
              <Button onClick={handleNext} className="bg-gradient-primary">
                {isLastActivity ? 'Complete Lesson' : 'Next Question'}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}