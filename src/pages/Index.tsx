import { useState, useEffect } from 'react';
import { Hero } from '@/components/Hero';
import { UserProfile } from '@/components/UserProfile';
import { LevelCard } from '@/components/LevelCard';
import { LevelView } from '@/components/LevelView';
import { LessonView } from '@/components/LessonView';
import { AICoachBubble } from '@/components/AICoachBubble';
import { useProgress } from '@/hooks/useProgress';
import { debateLevels } from '@/lib/debateData';
import { DebateLevel, Lesson } from '@/types/debate';
import { AICoach } from '@/lib/aiCoach';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Home, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type ViewMode = 'hero' | 'dashboard' | 'level' | 'lesson';

const Index = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('hero');
  const [selectedLevel, setSelectedLevel] = useState<DebateLevel | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [levels, setLevels] = useState(debateLevels);
  const [showCoachTip, setShowCoachTip] = useState(false);
  const { progress, addPoints, completeLesson, unlockLevel, checkBadgeEligibility } = useProgress();
  const { toast } = useToast();
  const aiCoach = new AICoach();

  useEffect(() => {
    // Show coach tip after user starts learning
    if (viewMode === 'dashboard' && progress.completedLessons.length === 0) {
      const timer = setTimeout(() => setShowCoachTip(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [viewMode, progress.completedLessons.length]);

  const handleStartLearning = () => {
    setViewMode('dashboard');
  };

  const handleEnterLevel = (levelId: string) => {
    const level = levels.find(l => l.id === levelId);
    if (level) {
      setSelectedLevel(level);
      setViewMode('level');
    }
  };

  const handleLessonSelect = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setViewMode('lesson');
  };

  const handleLessonComplete = (lessonId: string, pointsEarned: number) => {
    // Add points and mark lesson as complete
    addPoints(pointsEarned);
    completeLesson(lessonId);

    // Update lesson completion in levels
    setLevels(prevLevels => 
      prevLevels.map(level => ({
        ...level,
        lessons: level.lessons.map(lesson => 
          lesson.id === lessonId ? { ...lesson, completed: true } : lesson
        )
      }))
    );

    // Check for level unlocks
    const newPoints = progress.points + pointsEarned;
    const levelsToUnlock = levels.filter(level => 
      !level.unlocked && newPoints >= level.requiredPoints
    );

    levelsToUnlock.forEach(level => {
      unlockLevel(levels.indexOf(level));
      setLevels(prevLevels =>
        prevLevels.map(l => 
          l.id === level.id ? { ...l, unlocked: true } : l
        )
      );
    });

    // Check badge eligibility
    checkBadgeEligibility();

    // Show success toast
    toast({
      title: "Lesson Complete! 🎉",
      description: `You earned ${pointsEarned} points!`,
    });

    // Return to level view
    setViewMode('level');
    setSelectedLesson(null);
  };

  const handleBackToLevels = () => {
    setViewMode('dashboard');
    setSelectedLevel(null);
  };

  const handleBackToLevel = () => {
    setViewMode('level');
    setSelectedLesson(null);
  };

  if (viewMode === 'hero') {
    return <Hero onStartLearning={handleStartLearning} />;
  }

  if (viewMode === 'lesson' && selectedLesson) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto">
          <LessonView
            lesson={selectedLesson}
            onComplete={handleLessonComplete}
            onBack={handleBackToLevel}
          />
        </div>
      </div>
    );
  }

  if (viewMode === 'level' && selectedLevel) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto">
          <LevelView
            level={selectedLevel}
            onLessonSelect={handleLessonSelect}
            onBack={handleBackToLevels}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => setViewMode('hero')}
                className="font-semibold text-primary"
              >
                <Home className="w-4 h-4 mr-2" />
                Debate Master
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {progress.points} points
              </span>
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* User Profile Sidebar */}
          <div className="lg:col-span-1">
            <UserProfile progress={progress} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">Learning Path</h2>
              <p className="text-muted-foreground mb-6">
                Progress through 5 levels to master the art of debate. Each level builds on the previous one.
              </p>
            </div>

            {/* Levels Grid */}
            <div className="space-y-4">
              {levels.map((level) => (
                <LevelCard
                  key={level.id}
                  level={level}
                  userPoints={progress.points}
                  onEnterLevel={handleEnterLevel}
                />
              ))}
            </div>
          </div>
        </div>

        {/* AI Coach Tip */}
        {showCoachTip && (
          <div className="fixed bottom-6 right-6 z-20">
            <AICoachBubble
              message={aiCoach.generatePersonalizedTip(progress.level, 7)}
              onClose={() => setShowCoachTip(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
