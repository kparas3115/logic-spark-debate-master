import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, RotateCcw, Lightbulb } from 'lucide-react';
import { Activity } from '@/types/debate';

interface DragDropActivityProps {
  activity: Activity;
  onComplete: (points: number) => void;
}

export function DragDropActivity({ activity, onComplete }: DragDropActivityProps) {
  const [draggedItems, setDraggedItems] = useState<string[]>([]);
  const [availableItems, setAvailableItems] = useState<string[]>(activity.options || []);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleDragStart = (e: React.DragEvent, item: string) => {
    e.dataTransfer.setData('text/plain', item);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, target: 'available' | 'arranged') => {
    e.preventDefault();
    const item = e.dataTransfer.getData('text/plain');
    
    if (target === 'arranged' && availableItems.includes(item)) {
      setAvailableItems(prev => prev.filter(i => i !== item));
      setDraggedItems(prev => [...prev, item]);
    } else if (target === 'available' && draggedItems.includes(item)) {
      setDraggedItems(prev => prev.filter(i => i !== item));
      setAvailableItems(prev => [...prev, item]);
    }
  };

  const handleRemoveFromArranged = (item: string) => {
    setDraggedItems(prev => prev.filter(i => i !== item));
    setAvailableItems(prev => [...prev, item]);
  };

  const handleSubmit = () => {
    const correct = JSON.stringify(draggedItems) === JSON.stringify(activity.correctAnswer);
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const handleReset = () => {
    setDraggedItems([]);
    setAvailableItems(activity.options || []);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  const handleComplete = () => {
    onComplete(isCorrect ? activity.points : Math.floor(activity.points * 0.5));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary">Drag & Drop Activity</Badge>
          <Badge variant="outline">{activity.points} points</Badge>
        </div>

        <h3 className="text-xl font-semibold mb-6">{activity.question}</h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Available items */}
          <div>
            <h4 className="font-medium mb-3 text-muted-foreground">Available Items</h4>
            <div
              className="drop-zone min-h-[200px]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'available')}
            >
              {availableItems.map((item, index) => (
                <Card
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  className="p-3 mb-2 cursor-move hover:shadow-primary transition-smooth bg-secondary"
                >
                  {item}
                </Card>
              ))}
            </div>
          </div>

          {/* Arranged items */}
          <div>
            <h4 className="font-medium mb-3 text-muted-foreground">Your Arrangement</h4>
            <div
              className="drop-zone min-h-[200px] border-primary/50"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'arranged')}
            >
              {draggedItems.map((item, index) => (
                <Card
                  key={index}
                  className="p-3 mb-2 cursor-pointer hover:shadow-primary transition-smooth bg-primary/10 border-primary/30"
                  onClick={() => handleRemoveFromArranged(item)}
                >
                  <div className="flex items-center justify-between">
                    <span>{item}</span>
                    <span className="text-sm text-muted-foreground">#{index + 1}</span>
                  </div>
                </Card>
              ))}
              {draggedItems.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  Drag items here to arrange them
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && (
          <Card className={`p-4 mt-6 ${isCorrect ? 'bg-success/10 border-success' : 'bg-warning/10 border-warning'}`}>
            <div className="flex items-start gap-3">
              <Lightbulb className={`w-5 h-5 mt-0.5 ${isCorrect ? 'text-success' : 'text-warning'}`} />
              <div>
                <p className="font-medium mb-1">
                  {isCorrect ? `Perfect arrangement! +${activity.points} points` : `Good try! +${Math.floor(activity.points * 0.5)} points for effort`}
                </p>
                <p className="text-sm">{activity.feedback}</p>
                {!isCorrect && activity.correctAnswer && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Correct order:</p>
                    <p className="text-sm">{(activity.correctAnswer as string[]).join(' → ')}</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Action buttons */}
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={handleReset} disabled={showFeedback}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <div className="space-x-2">
            {!showFeedback ? (
              <Button onClick={handleSubmit} disabled={draggedItems.length === 0}>
                Submit Arrangement
              </Button>
            ) : (
              <Button onClick={handleComplete} className="bg-gradient-primary">
                Continue
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}