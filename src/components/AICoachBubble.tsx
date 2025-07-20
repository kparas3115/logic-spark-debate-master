import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Brain, MessageCircle } from 'lucide-react';

interface AICoachBubbleProps {
  message: string;
  isTyping?: boolean;
  onClose?: () => void;
}

export function AICoachBubble({ message, isTyping = false, onClose }: AICoachBubbleProps) {
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isTyping && currentIndex < message.length) {
      const timer = setTimeout(() => {
        setDisplayedMessage(prev => prev + message[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30);
      return () => clearTimeout(timer);
    } else if (!isTyping) {
      setDisplayedMessage(message);
    }
  }, [message, isTyping, currentIndex]);

  return (
    <Card className="coach-bubble relative max-w-md animate-slide-in-left">
      <div className="flex items-start gap-3">
        <div className="bg-gradient-gold rounded-full p-2 flex-shrink-0">
          <Brain className="w-4 h-4 text-accent-foreground" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm">Coach Maya</span>
            <MessageCircle className="w-3 h-3 opacity-70" />
          </div>
          <p className="text-sm leading-relaxed">
            {displayedMessage}
            {isTyping && currentIndex < message.length && (
              <span className="animate-pulse">|</span>
            )}
          </p>
        </div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 bg-background border rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-muted transition-smooth"
        >
          ×
        </button>
      )}
    </Card>
  );
}