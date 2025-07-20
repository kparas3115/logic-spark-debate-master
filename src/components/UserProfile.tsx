import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserProgress } from '@/types/debate';
import { BadgeDisplay } from './BadgeDisplay';
import { Trophy, Star, Target } from 'lucide-react';

interface UserProfileProps {
  progress: UserProgress;
}

export function UserProfile({ progress }: UserProfileProps) {
  const earnedBadges = progress.badges.filter(badge => badge.earned);
  const nextLevelPoints = [0, 75, 175, 275, 400][progress.level + 1] || 500;
  const progressToNext = progress.level < 4 ? 
    ((progress.points - [0, 0, 75, 175, 275][progress.level]) / (nextLevelPoints - [0, 0, 75, 175, 275][progress.level])) * 100 : 100;

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <Card className="p-6 bg-gradient-primary text-primary-foreground">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, Debater!</h2>
            <p className="text-primary-foreground/80">Level {progress.level + 1} • {progress.completedLessons.length} lessons completed</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{progress.points}</div>
            <div className="text-sm text-primary-foreground/80">total points</div>
          </div>
        </div>

        {progress.level < 4 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Level {progress.level + 2}</span>
              <span>{nextLevelPoints - progress.points} points needed</span>
            </div>
            <div className="w-full bg-primary-foreground/20 rounded-full h-2">
              <div 
                className="bg-gradient-gold h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${Math.min(progressToNext, 100)}%` }}
              />
            </div>
          </div>
        )}
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center hover-lift">
          <Trophy className="w-6 h-6 text-gold mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">{earnedBadges.length}</div>
          <div className="text-sm text-muted-foreground">Badges Earned</div>
        </Card>

        <Card className="p-4 text-center hover-lift">
          <Star className="w-6 h-6 text-accent mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">{progress.level + 1}</div>
          <div className="text-sm text-muted-foreground">Current Level</div>
        </Card>

        <Card className="p-4 text-center hover-lift">
          <Target className="w-6 h-6 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">{progress.completedLessons.length}</div>
          <div className="text-sm text-muted-foreground">Lessons Done</div>
        </Card>
      </div>

      {/* Badges Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-gold" />
          Achievement Badges
        </h3>
        
        {earnedBadges.length > 0 ? (
          <div className="grid grid-cols-4 gap-3 mb-4">
            {earnedBadges.map(badge => (
              <BadgeDisplay key={badge.id} badge={badge} size="sm" />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground mb-4">Complete lessons to earn your first badge!</p>
        )}

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Available Badges</h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            {progress.badges.filter(b => !b.earned).map(badge => (
              <div key={badge.id} className="flex items-center gap-2">
                <span>{badge.icon}</span>
                <span>{badge.name}: {badge.description}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}