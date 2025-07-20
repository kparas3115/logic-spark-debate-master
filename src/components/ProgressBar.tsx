import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  showNumbers?: boolean;
  variant?: 'default' | 'gold';
}

export function ProgressBar({ current, total, label, showNumbers = true, variant = 'default' }: ProgressBarProps) {
  const percentage = Math.min((current / total) * 100, 100);
  
  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-foreground">{label}</span>
          {showNumbers && (
            <span className="text-sm text-muted-foreground">
              {current}/{total}
            </span>
          )}
        </div>
      )}
      <Progress 
        value={percentage} 
        className={`h-2 ${variant === 'gold' ? 'bg-gold/20' : ''}`}
      />
    </div>
  );
}