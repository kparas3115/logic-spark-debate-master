import { DebateLevel, Badge } from '@/types/debate';

export const badges: Badge[] = [
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    earned: false
  },
  {
    id: 'logic-master',
    name: 'Logic Master',
    description: 'Score 80% or higher on 5 quizzes',
    icon: '🧠',
    earned: false
  },
  {
    id: 'rebuttal-expert',
    name: 'Rebuttal Expert',
    description: 'Master the art of rebuttals',
    icon: '⚔️',
    earned: false
  },
  {
    id: 'fallacy-hunter',
    name: 'Fallacy Hunter',
    description: 'Identify 20 logical fallacies correctly',
    icon: '🕵️',
    earned: false
  },
  {
    id: 'argument-architect',
    name: 'Argument Architect',
    description: 'Build 10 strong arguments',
    icon: '🏗️',
    earned: false
  },
  {
    id: 'debate-champion',
    name: 'Debate Champion',
    description: 'Complete all levels with excellence',
    icon: '👑',
    earned: false
  }
];

export const debateLevels: DebateLevel[] = [
  {
    id: 'basics',
    name: 'Debate Basics',
    description: 'Learn fundamental debate concepts and structure',
    unlocked: true,
    progress: 0,
    requiredPoints: 0,
    lessons: [
      {
        id: 'basics-1',
        title: 'What is Debate?',
        description: 'Introduction to debate and its importance',
        type: 'quiz',
        points: 20,
        completed: false,
        content: {
          instructions: 'Learn the fundamentals of debate and test your understanding.',
          activities: [
            {
              id: 'basics-1-q1',
              type: 'multiple-choice',
              question: 'What is the primary purpose of debate?',
              options: [
                'To win at all costs',
                'To explore different perspectives and reach better understanding',
                'To show off your knowledge',
                'To prove others wrong'
              ],
              correctAnswer: 'To explore different perspectives and reach better understanding',
              feedback: 'Correct! Debate is about exploring ideas and reaching better understanding through reasoned discussion.',
              points: 5
            },
            {
              id: 'basics-1-q2',
              type: 'multiple-choice',
              question: 'Which of these is NOT a key element of good debate?',
              options: [
                'Evidence and reasoning',
                'Respectful listening',
                'Personal attacks',
                'Clear structure'
              ],
              correctAnswer: 'Personal attacks',
              feedback: 'Right! Personal attacks have no place in constructive debate. Focus on ideas, not individuals.',
              points: 5
            },
            {
              id: 'basics-1-q3',
              type: 'multiple-choice',
              question: 'What makes an argument strong?',
              options: [
                'Speaking loudly',
                'Using complex words',
                'Providing evidence and logical reasoning',
                'Having the last word'
              ],
              correctAnswer: 'Providing evidence and logical reasoning',
              feedback: 'Excellent! Strong arguments are built on solid evidence and clear logical reasoning.',
              points: 10
            }
          ]
        }
      },
      {
        id: 'basics-2',
        title: 'Debate Formats',
        description: 'Explore different debate formats and their rules',
        type: 'quiz',
        points: 25,
        completed: false,
        content: {
          instructions: 'Learn about different debate formats used in schools and competitions.',
          activities: [
            {
              id: 'basics-2-q1',
              type: 'multiple-choice',
              question: 'In Parliamentary debate, how many speakers are there per team?',
              options: ['1', '2', '3', '4'],
              correctAnswer: '2',
              feedback: 'Correct! Parliamentary debate typically has 2 speakers per team.',
              points: 8
            },
            {
              id: 'basics-2-q2',
              type: 'multiple-choice',
              question: 'What is unique about Lincoln-Douglas debate?',
              options: [
                'It focuses on team collaboration',
                'It emphasizes values and philosophy',
                'It allows unlimited preparation time',
                'It requires visual aids'
              ],
              correctAnswer: 'It emphasizes values and philosophy',
              feedback: 'Right! Lincoln-Douglas debate focuses on values, philosophy, and ethical reasoning.',
              points: 8
            },
            {
              id: 'basics-2-q3',
              type: 'multiple-choice',
              question: 'What is the opening statement in debate called?',
              options: ['Rebuttal', 'Constructive', 'Cross-examination', 'Closing'],
              correctAnswer: 'Constructive',
              feedback: 'Perfect! The constructive speech presents your main arguments and evidence.',
              points: 9
            }
          ]
        }
      },
      {
        id: 'basics-3',
        title: 'Structure & Flow',
        description: 'Master the structure of arguments and debate flow',
        type: 'drag-drop',
        points: 30,
        completed: false,
        content: {
          instructions: 'Arrange the elements of a strong argument in the correct order.',
          activities: [
            {
              id: 'basics-3-structure',
              type: 'drag-drop',
              question: 'Put these argument components in the correct order:',
              options: ['Evidence', 'Claim', 'Reasoning', 'Impact'],
              correctAnswer: ['Claim', 'Evidence', 'Reasoning', 'Impact'],
              feedback: 'Excellent! A strong argument follows the CERI structure: Claim, Evidence, Reasoning, Impact.',
              points: 30
            }
          ]
        }
      }
    ]
  },
  {
    id: 'arguments',
    name: 'Building Arguments',
    description: 'Learn to construct compelling and logical arguments',
    unlocked: false,
    progress: 0,
    requiredPoints: 75,
    lessons: [
      {
        id: 'arguments-1',
        title: 'Evidence Types',
        description: 'Understand different types of evidence and their strength',
        type: 'quiz',
        points: 25,
        completed: false,
        content: {
          instructions: 'Learn about different types of evidence and when to use them.',
          activities: [
            {
              id: 'arguments-1-q1',
              type: 'multiple-choice',
              question: 'Which type of evidence is generally considered strongest?',
              options: [
                'Personal anecdotes',
                'Expert testimony',
                'Peer-reviewed research',
                'Popular opinion'
              ],
              correctAnswer: 'Peer-reviewed research',
              feedback: 'Correct! Peer-reviewed research provides the most reliable and credible evidence.',
              points: 8
            },
            {
              id: 'arguments-1-q2',
              type: 'multiple-choice',
              question: 'When is anecdotal evidence most appropriate?',
              options: [
                'As the sole support for major claims',
                'To illustrate or humanize data',
                'To replace statistical evidence',
                'Never - it should be avoided'
              ],
              correctAnswer: 'To illustrate or humanize data',
              feedback: 'Right! Anecdotes work best when they illustrate broader patterns supported by data.',
              points: 8
            },
            {
              id: 'arguments-1-q3',
              type: 'rating',
              question: 'Rate the credibility of this evidence: "A 2023 study from Harvard Medical School published in Nature Medicine found..."',
              feedback: 'This is high-quality evidence: recent, from a prestigious institution, published in a top journal.',
              points: 9
            }
          ]
        }
      },
      {
        id: 'arguments-2',
        title: 'Logical Reasoning',
        description: 'Master the principles of logical reasoning',
        type: 'ai-chat',
        points: 35,
        completed: false,
        content: {
          instructions: 'Practice building logical connections between evidence and conclusions.',
          activities: [
            {
              id: 'arguments-2-ai',
              type: 'text-input',
              question: 'Given this evidence: "Studies show that students who get 8+ hours of sleep score 15% higher on tests." Build a logical argument for later school start times.',
              feedback: 'Strong reasoning connects sleep research to academic performance and school policy.',
              points: 35
            }
          ]
        }
      },
      {
        id: 'arguments-3',
        title: 'Argument Architecture',
        description: 'Build complex multi-layered arguments',
        type: 'argument-builder',
        points: 40,
        completed: false,
        content: {
          instructions: 'Construct a complete argument using the drag-and-drop interface.',
          activities: [
            {
              id: 'arguments-3-builder',
              type: 'drag-drop',
              question: 'Build an argument for renewable energy investment:',
              options: [
                'Solar and wind costs have dropped 70% in 5 years',
                'Climate change threatens global stability',
                'Therefore, we must transition to renewable energy',
                'Renewable energy creates more jobs than fossil fuels',
                'Lower costs make renewables economically viable',
                'Job creation boosts the economy',
                'Avoiding climate disaster is essential for humanity'
              ],
              correctAnswer: [
                'Therefore, we must transition to renewable energy',
                'Solar and wind costs have dropped 70% in 5 years',
                'Lower costs make renewables economically viable',
                'Renewable energy creates more jobs than fossil fuels',
                'Job creation boosts the economy',
                'Climate change threatens global stability',
                'Avoiding climate disaster is essential for humanity'
              ],
              feedback: 'Excellent argument structure with multiple supporting pillars!',
              points: 40
            }
          ]
        }
      }
    ]
  },
  {
    id: 'rebuttals',
    name: 'Rebuttals & Refutation',
    description: 'Learn to effectively respond to opposing arguments',
    unlocked: false,
    progress: 0,
    requiredPoints: 175,
    lessons: []
  },
  {
    id: 'fallacies',
    name: 'Logical Fallacies',
    description: 'Identify and avoid common logical fallacies',
    unlocked: false,
    progress: 0,
    requiredPoints: 275,
    lessons: []
  },
  {
    id: 'advanced',
    name: 'Advanced Techniques',
    description: 'Master advanced debate strategies and techniques',
    unlocked: false,
    progress: 0,
    requiredPoints: 400,
    lessons: []
  }
];