import { Badge } from '@/types/debate';
import { Card } from '@/components/ui/card';

interface BadgeDisplayProps {
  badge: Badge;
  size?: 'sm' | 'md' | 'lg';
}

export function BadgeDisplay({ badge, size = 'md' }: BadgeDisplayProps) {
  const sizeClasses = {
    sm: 'w-16 h-16 text-2xl',
    md: 'w-20 h-20 text-3xl',
    lg: 'w-24 h-24 text-4xl'
  };

  return (
    <Card className={`${sizeClasses[size]} flex flex-col items-center justify-center p-2 transition-smooth hover-lift ${
      badge.earned ? 'badge-earned animate-gold-glow' : 'badge-locked'
    }`}>
      <div className="text-center">
        <div className="mb-1">{badge.icon}</div>
        <div className="text-xs font-semibold leading-tight">{badge.name}</div>
      </div>
    </Card>
  );
}