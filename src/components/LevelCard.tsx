import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, CheckCircle, Play } from 'lucide-react';
import { DebateLevel } from '@/types/debate';
import { ProgressBar } from './ProgressBar';

interface LevelCardProps {
  level: DebateLevel;
  userPoints: number;
  onEnterLevel: (levelId: string) => void;
}

export function LevelCard({ level, userPoints, onEnterLevel }: LevelCardProps) {
  const isUnlocked = level.unlocked || userPoints >= level.requiredPoints;
  const completedLessons = level.lessons.filter(lesson => lesson.completed).length;
  const totalLessons = level.lessons.length;
  const isCompleted = completedLessons === totalLessons && totalLessons > 0;

  return (
    <Card className={`p-6 transition-smooth hover-lift ${
      isUnlocked ? 'bg-card border-border' : 'bg-muted border-muted-foreground/20'
    } ${isCompleted ? 'ring-2 ring-gold shadow-gold' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className={`text-xl font-bold ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
              {level.name}
            </h3>
            {isCompleted && <CheckCircle className="w-5 h-5 text-success" />}
            {!isUnlocked && <Lock className="w-5 h-5 text-muted-foreground" />}
          </div>
          <p className={`text-sm ${isUnlocked ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>
            {level.description}
          </p>
        </div>
      </div>

      {level.requiredPoints > 0 && (
        <div className="mb-4">
          <Badge variant={isUnlocked ? "default" : "secondary"} className="text-xs">
            {isUnlocked ? "Unlocked" : `Requires ${level.requiredPoints} points`}
          </Badge>
        </div>
      )}

      {totalLessons > 0 && (
        <div className="mb-4">
          <ProgressBar
            current={completedLessons}
            total={totalLessons}
            label="Lessons Progress"
            variant={isCompleted ? 'gold' : 'default'}
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {totalLessons} lessons • {level.lessons.reduce((sum, lesson) => sum + lesson.points, 0)} points total
        </div>
        <Button
          onClick={() => onEnterLevel(level.id)}
          disabled={!isUnlocked}
          size="sm"
          variant={isCompleted ? "default" : "outline"}
          className={isCompleted ? "bg-gradient-gold hover:bg-gradient-gold/90" : ""}
        >
          {isCompleted ? "Review" : "Enter"}
          <Play className="ml-1 w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}