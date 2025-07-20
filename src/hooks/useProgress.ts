import { useState, useEffect } from 'react';
import { UserProgress, Badge } from '@/types/debate';
import { badges as initialBadges } from '@/lib/debateData';

const STORAGE_KEY = 'debate-platform-progress';

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      level: 0,
      points: 0,
      badges: initialBadges,
      completedLessons: []
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const addPoints = (points: number) => {
    setProgress(prev => ({
      ...prev,
      points: prev.points + points
    }));
  };

  const completeLesson = (lessonId: string) => {
    setProgress(prev => ({
      ...prev,
      completedLessons: [...prev.completedLessons, lessonId]
    }));
  };

  const unlockLevel = (level: number) => {
    setProgress(prev => ({
      ...prev,
      level: Math.max(prev.level, level)
    }));
  };

  const earnBadge = (badgeId: string) => {
    setProgress(prev => ({
      ...prev,
      badges: prev.badges.map(badge => 
        badge.id === badgeId 
          ? { ...badge, earned: true, earnedAt: new Date() }
          : badge
      )
    }));
  };

  const checkBadgeEligibility = () => {
    // Check for first lesson completion
    if (progress.completedLessons.length >= 1 && !progress.badges.find(b => b.id === 'first-steps')?.earned) {
      earnBadge('first-steps');
    }

    // Check for points milestones
    if (progress.points >= 100 && !progress.badges.find(b => b.id === 'logic-master')?.earned) {
      earnBadge('logic-master');
    }
  };

  return {
    progress,
    addPoints,
    completeLesson,
    unlockLevel,
    earnBadge,
    checkBadgeEligibility
  };
}