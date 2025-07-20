import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Crown, Zap, Target, Users } from 'lucide-react';

interface TournamentProps {
  onComplete: (points: number) => void;
  onBack: () => void;
}

interface Opponent {
  name: string;
  level: number;
  specialty: string;
  avatar: string;
}

const opponents: Opponent[] = [
  { name: "Alex Chen", level: 1, specialty: "Logic", avatar: "🤓" },
  { name: "Sarah Miller", level: 2, specialty: "Evidence", avatar: "📚" },
  { name: "Marcus Johnson", level: 3, specialty: "Rebuttals", avatar: "⚔️" },
  { name: "Dr. Williams", level: 4, specialty: "Philosophy", avatar: "🎓" }
];

export function TournamentSimulation({ onComplete, onBack }: TournamentProps) {
  const [currentRound, setCurrentRound] = useState(0);
  const [roundWins, setRoundWins] = useState<boolean[]>([]);
  const [isDebating, setIsDebating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);

  const currentOpponent = opponents[currentRound];
  const isLastRound = currentRound === opponents.length - 1;

  useEffect(() => {
    // Confetti effect for wins
    if (roundWins.length > 0 && roundWins[roundWins.length - 1]) {
      triggerConfetti();
    }
  }, [roundWins]);

  const triggerConfetti = () => {
    // Simulate confetti animation
    const confettiDiv = document.createElement('div');
    confettiDiv.className = 'fixed inset-0 pointer-events-none z-50';
    confettiDiv.innerHTML = Array.from({ length: 50 }, (_, i) => 
      `<div class="absolute animate-bounce" style="left: ${Math.random() * 100}%; top: -10px; animation-delay: ${Math.random() * 2}s; animation-duration: ${2 + Math.random() * 2}s;">🎉</div>`
    ).join('');
    document.body.appendChild(confettiDiv);
    
    setTimeout(() => document.body.removeChild(confettiDiv), 4000);
  };

  const startDebate = () => {
    setIsDebating(true);
    
    // Simulate debate round
    setTimeout(() => {
      const won = Math.random() > 0.3; // 70% win rate for demo
      const points = won ? 50 + (currentRound * 25) : 25;
      
      setRoundWins([...roundWins, won]);
      setTotalPoints(prev => prev + points);
      setIsDebating(false);
      
      if (isLastRound) {
        setTimeout(() => setShowResults(true), 2000);
      }
    }, 3000);
  };

  const nextRound = () => {
    if (!isLastRound) {
      setCurrentRound(prev => prev + 1);
    }
  };

  const getWinStreak = () => {
    let streak = 0;
    for (let i = roundWins.length - 1; i >= 0; i--) {
      if (roundWins[i]) streak++;
      else break;
    }
    return streak;
  };

  if (showResults) {
    const totalWins = roundWins.filter(win => win).length;
    const isChampion = totalWins === opponents.length;
    
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className={`p-8 text-center ${isChampion ? 'bg-gradient-gold text-accent-foreground' : 'bg-gradient-primary text-primary-foreground'}`}>
          <div className="mb-6">
            {isChampion ? (
              <Crown className="w-24 h-24 mx-auto mb-4 animate-bounce-in" />
            ) : (
              <Trophy className="w-24 h-24 mx-auto mb-4 animate-bounce-in" />
            )}
          </div>
          <h2 className="text-4xl font-bold mb-4">
            {isChampion ? "Tournament Champion!" : "Tournament Complete!"}
          </h2>
          <p className="text-xl mb-6">
            You won {totalWins} out of {opponents.length} rounds
          </p>
          <div className="text-3xl font-bold mb-2">{totalPoints} Points Earned</div>
          
          {isChampion && (
            <div className="animate-celebration">
              <p className="text-lg">🎉 Perfect performance! You've mastered debate fundamentals! 🎉</p>
            </div>
          )}
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Tournament Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Rounds:</span>
                <span className="font-bold">{opponents.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Rounds Won:</span>
                <span className="font-bold text-success">{totalWins}</span>
              </div>
              <div className="flex justify-between">
                <span>Win Rate:</span>
                <span className="font-bold">{Math.round((totalWins / opponents.length) * 100)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Win Streak:</span>
                <span className="font-bold text-gold">{getWinStreak()}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Achievements Unlocked</h3>
            <div className="space-y-2">
              {totalWins >= 1 && (
                <Badge variant="default" className="w-full justify-start">
                  🏆 First Victory
                </Badge>
              )}
              {totalWins >= 2 && (
                <Badge variant="default" className="w-full justify-start">
                  🔥 Winning Streak
                </Badge>
              )}
              {totalWins >= 3 && (
                <Badge variant="default" className="w-full justify-start">
                  ⭐ Tournament Star
                </Badge>
              )}
              {isChampion && (
                <Badge variant="default" className="w-full justify-start badge-earned">
                  👑 Perfect Champion
                </Badge>
              )}
            </div>
          </Card>
        </div>

        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={onBack}>
            Return to Dashboard
          </Button>
          <Button 
            onClick={() => onComplete(totalPoints)}
            className="bg-gradient-primary"
          >
            Claim Rewards
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Tournament Header */}
      <Card className="p-6 bg-gradient-primary text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Debate Tournament</h2>
            <p className="text-primary-foreground/80">
              Round {currentRound + 1} of {opponents.length}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{totalPoints}</div>
            <div className="text-sm text-primary-foreground/80">Total Points</div>
          </div>
        </div>
      </Card>

      {/* Tournament Bracket */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Tournament Bracket</h3>
        <div className="grid grid-cols-4 gap-4">
          {opponents.map((opponent, index) => (
            <Card
              key={index}
              className={`p-4 text-center transition-smooth ${
                index === currentRound
                  ? 'ring-2 ring-primary bg-primary/10'
                  : index < currentRound
                  ? roundWins[index]
                    ? 'bg-success/20 border-success'
                    : 'bg-destructive/20 border-destructive'
                  : 'bg-muted'
              }`}
            >
              <div className="text-2xl mb-2">{opponent.avatar}</div>
              <div className="font-semibold text-sm">{opponent.name}</div>
              <div className="text-xs text-muted-foreground">Level {opponent.level}</div>
              <div className="text-xs text-muted-foreground">{opponent.specialty}</div>
              
              {index < currentRound && (
                <Badge
                  variant={roundWins[index] ? "default" : "destructive"}
                  className="mt-2 text-xs"
                >
                  {roundWins[index] ? "Won" : "Lost"}
                </Badge>
              )}
            </Card>
          ))}
        </div>
      </Card>

      {/* Current Match */}
      {!isDebating && currentRound < opponents.length && !showResults && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Current Match</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">👤</div>
              <h4 className="font-semibold">You</h4>
              <p className="text-sm text-muted-foreground">Debate Student</p>
              <Badge variant="default" className="mt-2">Ready</Badge>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-2">{currentOpponent.avatar}</div>
              <h4 className="font-semibold">{currentOpponent.name}</h4>
              <p className="text-sm text-muted-foreground">Specializes in {currentOpponent.specialty}</p>
              <Badge variant="secondary" className="mt-2">Level {currentOpponent.level}</Badge>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-muted-foreground mb-4">
              Debate Topic: "Should schools implement 4-day work weeks?"
            </p>
            <Button
              onClick={startDebate}
              size="lg"
              className="bg-gradient-gold hover:bg-gradient-gold/90"
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Debate Round
            </Button>
          </div>
        </Card>
      )}

      {/* Debating Animation */}
      {isDebating && (
        <Card className="p-8 text-center">
          <div className="animate-pulse mb-6">
            <Target className="w-16 h-16 mx-auto mb-4 text-primary animate-spin" />
            <h3 className="text-xl font-semibold">Debate in Progress...</h3>
            <p className="text-muted-foreground">
              Engaging with {currentOpponent.name}
            </p>
          </div>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="animate-slide-in-left">💬 Presenting opening arguments...</div>
            <div className="animate-slide-in-left" style={{ animationDelay: '1s' }}>🎯 Analyzing opponent's position...</div>
            <div className="animate-slide-in-left" style={{ animationDelay: '2s' }}>⚡ Delivering final rebuttal...</div>
          </div>
        </Card>
      )}

      {/* Round Result */}
      {!isDebating && roundWins.length > currentRound && !showResults && (
        <Card className={`p-6 text-center ${roundWins[currentRound] ? 'bg-success/20 border-success' : 'bg-warning/20 border-warning'}`}>
          <div className="mb-4">
            {roundWins[currentRound] ? (
              <Trophy className="w-12 h-12 mx-auto text-success animate-bounce-in" />
            ) : (
              <Target className="w-12 h-12 mx-auto text-warning animate-bounce-in" />
            )}
          </div>
          <h3 className="text-xl font-semibold mb-2">
            {roundWins[currentRound] ? "Round Victory!" : "Round Complete"}
          </h3>
          <p className="text-muted-foreground mb-4">
            {roundWins[currentRound] 
              ? `You defeated ${currentOpponent.name} with strong arguments!`
              : `Good effort against ${currentOpponent.name}. Keep improving!`
            }
          </p>
          
          <div className="flex justify-center gap-4">
            {!isLastRound ? (
              <Button onClick={nextRound} className="bg-gradient-primary">
                Next Round
                <Zap className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={() => setShowResults(true)} className="bg-gradient-gold">
                View Results
                <Crown className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}