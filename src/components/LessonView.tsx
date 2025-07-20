import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookOpen, Trophy } from 'lucide-react';
import { Lesson } from '@/types/debate';
import { InteractiveQuiz } from './InteractiveQuiz';
import { DragDropActivity } from './DragDropActivity';
import { AIChat } from './AIChat';

interface LessonViewProps {
  lesson: Lesson;
  onComplete: (lessonId: string, pointsEarned: number) => void;
  onBack: () => void;
}

export function LessonView({ lesson, onComplete, onBack }: LessonViewProps) {
  const [pointsEarned, setPointsEarned] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);

  const handleActivityComplete = (points: number) => {
    setPointsEarned(points);
    setShowCompletion(true);
  };

  const handleLessonComplete = () => {
    onComplete(lesson.id, pointsEarned);
  };

  if (showCompletion) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 text-center bg-gradient-primary text-primary-foreground">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-gold animate-bounce-in" />
          <h2 className="text-3xl font-bold mb-4">Lesson Complete!</h2>
          <p className="text-xl mb-6">
            You earned <span className="text-gold font-bold">{pointsEarned} points</span> in this lesson!
          </p>
          <div className="space-y-3">
            <p className="text-primary-foreground/80">
              "{lesson.title}" has been completed successfully.
            </p>
            <Button
              onClick={handleLessonComplete}
              size="lg"
              className="bg-gradient-gold hover:bg-gradient-gold/90 text-accent-foreground"
            >
              Continue Your Journey
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold">{lesson.title}</h1>
          </div>
          <p className="text-muted-foreground">{lesson.description}</p>
        </div>
        <Badge variant="outline" className="text-lg px-3 py-1">
          {lesson.points} points available
        </Badge>
      </div>

      {/* Instructions */}
      <Card className="p-6 bg-accent/10 border-accent/20">
        <div className="flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-accent mt-0.5" />
          <div>
            <h3 className="font-semibold text-accent mb-2">Instructions</h3>
            <p className="text-sm">{lesson.content.instructions}</p>
          </div>
        </div>
      </Card>

      {/* Activity based on lesson type */}
      {lesson.type === 'quiz' && (
        <InteractiveQuiz
          activities={lesson.content.activities}
          onComplete={handleActivityComplete}
        />
      )}

      {lesson.type === 'drag-drop' && lesson.content.activities.length > 0 && (
        <DragDropActivity
          activity={lesson.content.activities[0]}
          onComplete={handleActivityComplete}
        />
      )}

      {lesson.type === 'ai-chat' && lesson.content.activities.length > 0 && (
        <AIChat
          activity={lesson.content.activities[0]}
          onComplete={handleActivityComplete}
        />
      )}
    </div>
  );
}