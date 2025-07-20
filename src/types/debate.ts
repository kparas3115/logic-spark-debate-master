// Types for the debate learning platform

export interface UserProgress {
  level: number;
  points: number;
  badges: Badge[];
  completedLessons: string[];
  currentLesson?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: Date;
}

export interface DebateLevel {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  progress: number;
  lessons: Lesson[];
  requiredPoints: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'drag-drop' | 'fallacy-hunt' | 'argument-builder' | 'ai-chat';
  points: number;
  completed: boolean;
  content: LessonContent;
}

export interface LessonContent {
  instructions: string;
  activities: Activity[];
}

export interface Activity {
  id: string;
  type: 'multiple-choice' | 'drag-drop' | 'text-input' | 'rating';
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  feedback: string;
  points: number;
}

export interface AIResponse {
  message: string;
  score?: number;
  suggestions?: string[];
  encouragement: string;
}

export interface DebateArgument {
  id: string;
  text: string;
  strength: number;
  reasoning: string;
  fallacies?: string[];
}