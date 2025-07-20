import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, Play, Lock } from 'lucide-react';
import { DebateLevel, Lesson } from '@/types/debate';
import { ProgressBar } from './ProgressBar';

interface LevelViewProps {
  level: DebateLevel;
  onLessonSelect: (lesson: Lesson) => void;
  onBack: () => void;
}

export function LevelView({ level, onLessonSelect, onBack }: LevelViewProps) {
  const completedLessons = level.lessons.filter(lesson => lesson.completed).length;
  const totalLessons = level.lessons.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Levels
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-primary">{level.name}</h1>
          <p className="text-muted-foreground">{level.description}</p>
        </div>
      </div>

      {/* Progress overview */}
      <Card className="p-6 bg-gradient-primary text-primary-foreground">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold mb-1">Level Progress</h2>
            <p className="text-primary-foreground/80">
              {completedLessons} of {totalLessons} lessons completed
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              {level.lessons.reduce((sum, lesson) => sum + (lesson.completed ? lesson.points : 0), 0)}
            </div>
            <div className="text-sm text-primary-foreground/80">points earned</div>
          </div>
        </div>
        <ProgressBar
          current={completedLessons}
          total={totalLessons}
          showNumbers={false}
        />
      </Card>

      {/* Lessons grid */}
      <div className="grid gap-4">
        {level.lessons.map((lesson, index) => {
          const isUnlocked = index === 0 || level.lessons[index - 1].completed;
          
          return (
            <Card
              key={lesson.id}
              className={`p-6 transition-smooth hover-lift ${
                lesson.completed ? 'ring-2 ring-success shadow-primary' : 
                !isUnlocked ? 'bg-muted border-muted' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      lesson.completed ? 'bg-success text-success-foreground' :
                      !isUnlocked ? 'bg-muted-foreground text-muted' :
                      'bg-primary text-primary-foreground'
                    }`}>
                      {lesson.completed ? <CheckCircle className="w-4 h-4" /> :
                       !isUnlocked ? <Lock className="w-4 h-4" /> :
                       index + 1}
                    </div>
                    <h3 className={`text-xl font-semibold ${!isUnlocked ? 'text-muted-foreground' : ''}`}>
                      {lesson.title}
                    </h3>
                    <Badge variant="outline">{lesson.points} pts</Badge>
                  </div>
                  <p className={`mb-3 ${!isUnlocked ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                    {lesson.description}
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {lesson.type === 'quiz' ? 'Quiz' :
                       lesson.type === 'drag-drop' ? 'Interactive' :
                       lesson.type === 'ai-chat' ? 'AI Coach' : 
                       lesson.type}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {lesson.content.activities.length} {lesson.content.activities.length === 1 ? 'activity' : 'activities'}
                    </Badge>
                  </div>
                </div>
                <Button
                  onClick={() => onLessonSelect(lesson)}
                  disabled={!isUnlocked}
                  variant={lesson.completed ? "default" : "outline"}
                  className={lesson.completed ? "bg-gradient-gold hover:bg-gradient-gold/90" : ""}
                >
                  {lesson.completed ? 'Review' : 'Start'}
                  <Play className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Level completion message */}
      {completedLessons === totalLessons && totalLessons > 0 && (
        <Card className="p-6 bg-gradient-gold text-accent-foreground text-center">
          <h3 className="text-xl font-bold mb-2">🎉 Level Complete!</h3>
          <p>Congratulations! You've mastered {level.name}. Ready for the next challenge?</p>
        </Card>
      )}
    </div>
  );
}