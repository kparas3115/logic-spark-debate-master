import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Target, Clock, Trophy, Star, Brain, Zap } from 'lucide-react';
import { UserProgress } from '@/types/debate';

interface StatsDashboardProps {
  progress: UserProgress;
}

export function StatsDashboard({ progress }: StatsDashboardProps) {
  // Calculate statistics
  const completionRate = progress.completedLessons.length > 0 ? 
    (progress.completedLessons.length / 15) * 100 : 0; // Assuming 15 total lessons
  
  const earnedBadges = progress.badges.filter(badge => badge.earned).length;
  const badgeRate = (earnedBadges / progress.badges.length) * 100;
  
  const avgPointsPerLesson = progress.completedLessons.length > 0 ? 
    Math.round(progress.points / progress.completedLessons.length) : 0;

  // Simulated improvement data
  const improvementData = [
    { week: 'Week 1', score: 65, lessons: 2 },
    { week: 'Week 2', score: 72, lessons: 4 },
    { week: 'Week 3', score: 78, lessons: 6 },
    { week: 'Week 4', score: 85, lessons: 8 }
  ];

  const skillsData = [
    { skill: 'Argument Structure', level: 85, trend: 'up' },
    { skill: 'Evidence Usage', level: 72, trend: 'up' },
    { skill: 'Logical Reasoning', level: 90, trend: 'up' },
    { skill: 'Rebuttal Technique', level: 45, trend: 'down' },
    { skill: 'Fallacy Detection', level: 68, trend: 'up' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-2">Learning Analytics</h2>
        <p className="text-muted-foreground">Track your debate skills development and progress</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center hover-lift">
          <Trophy className="w-6 h-6 text-gold mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">{progress.points}</div>
          <div className="text-xs text-muted-foreground">Total Points</div>
        </Card>

        <Card className="p-4 text-center hover-lift">
          <Target className="w-6 h-6 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">{progress.completedLessons.length}</div>
          <div className="text-xs text-muted-foreground">Lessons Done</div>
        </Card>

        <Card className="p-4 text-center hover-lift">
          <Star className="w-6 h-6 text-accent mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">{earnedBadges}</div>
          <div className="text-xs text-muted-foreground">Badges Earned</div>
        </Card>

        <Card className="p-4 text-center hover-lift">
          <Zap className="w-6 h-6 text-warning mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">{avgPointsPerLesson}</div>
          <div className="text-xs text-muted-foreground">Avg Per Lesson</div>
        </Card>
      </div>

      {/* Progress Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-success" />
            Overall Progress
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Course Completion</span>
                <span className="text-sm font-medium">{Math.round(completionRate)}%</span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Badge Collection</span>
                <span className="text-sm font-medium">{Math.round(badgeRate)}%</span>
              </div>
              <Progress value={badgeRate} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Level Progress</span>
                <span className="text-sm font-medium">Level {progress.level + 1}</span>
              </div>
              <Progress value={((progress.level + 1) / 5) * 100} className="h-2" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Learning Velocity
          </h3>
          <div className="space-y-3">
            {improvementData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{data.week}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {data.lessons} lessons
                  </Badge>
                  <span className="text-sm font-medium">{data.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Skills Breakdown */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-accent" />
          Skills Analysis
        </h3>
        <div className="space-y-4">
          {skillsData.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{skill.skill}</span>
                <div className="flex items-center gap-2">
                  {skill.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-success" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-destructive" />
                  )}
                  <span className="text-sm">{skill.level}%</span>
                </div>
              </div>
              <Progress value={skill.level} className="h-2" />
            </div>
          ))}
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="p-6 bg-accent/10 border-accent/20">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Brain className="w-5 h-5 text-accent" />
          AI Recommendations
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-accent font-bold">•</span>
            <span>Focus on rebuttal techniques - this is your area for greatest improvement</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-accent font-bold">•</span>
            <span>Your logical reasoning skills are excellent - leverage this strength in debates</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-accent font-bold">•</span>
            <span>Practice with the Live Arena to improve real-time argumentation</span>
          </div>
        </div>
      </Card>

      {/* Achievement Timeline */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Recent Achievements
        </h3>
        <div className="space-y-3">
          {progress.badges
            .filter(badge => badge.earned)
            .slice(0, 3)
            .map((badge, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                <span className="text-2xl">{badge.icon}</span>
                <div>
                  <div className="font-medium">{badge.name}</div>
                  <div className="text-xs text-muted-foreground">{badge.description}</div>
                </div>
                <Badge variant="outline" className="ml-auto text-xs">
                  {badge.earnedAt ? 'Earned' : 'Recent'}
                </Badge>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
}