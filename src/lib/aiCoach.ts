import { AIResponse, DebateArgument } from '@/types/debate';

// Simulated AI Coach responses - in production, this would connect to a real AI service
export class AICoach {
  private encouragements = [
    "Great thinking! You're developing strong debate skills.",
    "I love how you're approaching this problem!",
    "Your reasoning is getting stronger with each attempt.",
    "Excellent work! You're mastering these concepts.",
    "Keep up the fantastic effort - you're improving rapidly!"
  ];

  private name = "Coach Maya";

  getRandomEncouragement(): string {
    return this.encouragements[Math.floor(Math.random() * this.encouragements.length)];
  }

  async evaluateArgument(argument: string, context: string = ""): Promise<AIResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simple scoring based on argument length and keywords
    const score = this.scoreArgument(argument);
    const suggestions = this.generateSuggestions(argument, score);

    return {
      message: this.generateFeedback(argument, score),
      score,
      suggestions,
      encouragement: this.getRandomEncouragement()
    };
  }

  private scoreArgument(argument: string): number {
    let score = 5; // Base score

    // Check for evidence indicators
    if (argument.match(/study|research|data|statistics|evidence/i)) score += 2;
    
    // Check for logical connectors
    if (argument.match(/because|therefore|thus|since|consequently/i)) score += 1;
    
    // Check for examples
    if (argument.match(/for example|such as|instance|specifically/i)) score += 1;
    
    // Check for structure
    if (argument.length > 50 && argument.length < 300) score += 1;
    
    // Penalty for being too short
    if (argument.length < 20) score -= 2;

    return Math.max(1, Math.min(10, score));
  }

  private generateFeedback(argument: string, score: number): string {
    if (score >= 8) {
      return `Excellent argument! You've included strong evidence and clear reasoning. Your structure is compelling and persuasive.`;
    } else if (score >= 6) {
      return `Good argument! You have a solid foundation, but there's room to strengthen your evidence or clarify your reasoning.`;
    } else if (score >= 4) {
      return `This is a decent start! Your main point comes through, but adding more evidence and explanation would make it much stronger.`;
    } else {
      return `I can see your main idea, but this argument needs more development. Try adding evidence, examples, or clearer reasoning.`;
    }
  }

  private generateSuggestions(argument: string, score: number): string[] {
    const suggestions: string[] = [];

    if (!argument.match(/study|research|data|statistics|evidence/i)) {
      suggestions.push("Add statistical evidence or research findings to support your claim");
    }

    if (!argument.match(/because|therefore|thus|since|consequently/i)) {
      suggestions.push("Use logical connectors to show how your evidence leads to your conclusion");
    }

    if (!argument.match(/for example|such as|instance|specifically/i)) {
      suggestions.push("Include a specific example to illustrate your point");
    }

    if (argument.length < 50) {
      suggestions.push("Expand your argument with more detailed explanation");
    }

    if (score < 6) {
      suggestions.push("Consider the opposing viewpoint and address potential counterarguments");
    }

    return suggestions.slice(0, 3); // Return max 3 suggestions
  }

  async identifyFallacy(argument: string): Promise<AIResponse> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const fallacies = [
      { name: "Ad Hominem", description: "Attacking the person instead of their argument" },
      { name: "Straw Man", description: "Misrepresenting someone's argument to make it easier to attack" },
      { name: "False Dichotomy", description: "Presenting only two options when more exist" },
      { name: "Appeal to Authority", description: "Using authority as evidence without proper qualification" },
      { name: "Slippery Slope", description: "Claiming one thing will lead to extreme consequences" }
    ];

    // Simple fallacy detection based on keywords
    let detectedFallacy = null;
    
    if (argument.match(/you are|you're stupid|you don't understand/i)) {
      detectedFallacy = fallacies[0]; // Ad Hominem
    } else if (argument.match(/either|only two|must choose/i)) {
      detectedFallacy = fallacies[2]; // False Dichotomy  
    } else if (argument.match(/famous person|expert says|authority/i)) {
      detectedFallacy = fallacies[3]; // Appeal to Authority
    }

    return {
      message: detectedFallacy 
        ? `I detected a ${detectedFallacy.name} fallacy: ${detectedFallacy.description}`
        : "I don't detect any obvious logical fallacies in this argument. Good logical reasoning!",
      suggestions: detectedFallacy 
        ? ["Focus on the argument's content rather than the person", "Provide evidence for your claims"]
        : ["Keep up the good logical reasoning!"],
      encouragement: this.getRandomEncouragement()
    };
  }

  async generatePracticeScenario(topic: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const scenarios = [
      `Here's a debate scenario: "Should schools require students to wear uniforms?" Take the position that uniforms improve learning environments. What's your strongest argument?`,
      `Practice scenario: "Should social media have age restrictions?" Argue in favor of stricter age limits. Focus on evidence and logical reasoning.`,
      `Debate challenge: "Should homework be banned?" Take the position against homework. What evidence would support your case?`,
      `Scenario: "Should students have more say in curriculum design?" Argue for increased student input. What would be your main points?`
    ];

    return scenarios[Math.floor(Math.random() * scenarios.length)];
  }

  generatePersonalizedTip(userLevel: number, recentPerformance: number): string {
    if (userLevel === 0 && recentPerformance < 7) {
      return "Focus on structure: Claim, Evidence, Reasoning, Impact. This foundation will serve you well!";
    } else if (userLevel === 1 && recentPerformance < 7) {
      return "Try to include more specific evidence in your arguments. Statistics and studies make your points more convincing!";
    } else if (recentPerformance >= 8) {
      return "You're doing excellently! Challenge yourself by considering counterarguments to make your position even stronger.";
    } else {
      return "Remember: good debaters listen as much as they speak. Understanding opposing views helps you respond better.";
    }
  }
}