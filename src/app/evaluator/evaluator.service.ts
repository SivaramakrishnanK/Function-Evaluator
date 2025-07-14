import { Injectable } from '@angular/core';
import { EvaluationResult } from '../models/evaluation-result';
import { industryStandards, customRules } from './rules/industry-standards';

@Injectable({
  providedIn: 'root'
})
export class EvaluatorService {

  /**
   * Evaluates a pasted function against custom rules and industry standards.
   * @param pastedFunction: string - The function code to evaluate.
   * Returns an EvaluationResult object with score, compliance status, and suggestions.
   */
  evaluate(pastedFunction: string): EvaluationResult {
    const score = this.calculateScore(pastedFunction);
    const suggestions = this.generateSuggestions(pastedFunction);
    const complianceStatus = this.checkCompliance(score);

    return {
      score,
      complianceStatus,
      suggestions
    };
  }

  private calculateScore(pastedFunction: string): number {
    let score = 100;

    // Max lines per function rule
    const lines = pastedFunction.split('\n').length;
    if (lines > industryStandards.complexity.maxLinesPerFunction) {
        score -= 20;
    }

    // Max complexity per function rule (improved cyclomatic complexity estimation)
    const complexityKeywords = [
      { keyword: 'if', regex: /\bif\b/g },
      { keyword: 'for', regex: /\bfor\b/g },
      { keyword: 'while', regex: /\bwhile\b/g },
      { keyword: 'case', regex: /\bcase\b/g },
      { keyword: 'catch', regex: /\bcatch\b/g },
      { keyword: '&&', regex: /&&/g },
      { keyword: '||', regex: /\|\|/g },
      { keyword: '?', regex: /\?/g }
    ];
    let complexity = 1;
    complexityKeywords.forEach(({ regex }) => {
        const matches = pastedFunction.match(regex);
        if (matches) {
            complexity += matches.length;
        }
    });
    if (complexity > industryStandards.complexity.maxCyclomaticComplexity) {
        score -= 20;
    }

    // Existing rules
    if (!pastedFunction.includes('/**')) {
        score -= 10;
    }
    if ((pastedFunction.match(/function\s+\w+\(/g) || []).length > customRules.maxParameters) {
        score -= 10;
    }
    return Math.max(score, 0);
}

private generateSuggestions(pastedFunction: string): string[] {
    const suggestions: string[] = [];
    const lines = pastedFunction.split('\n').length;
    if (lines > industryStandards.complexity.maxLinesPerFunction) {
        suggestions.push(`Reduce lines per function (current: ${lines}, max allowed: ${industryStandards.complexity.maxLinesPerFunction}).`);
    }
    // Cyclomatic complexity suggestion (improved)
    const complexityKeywords = [
      { keyword: 'if', regex: /\bif\b/g },
      { keyword: 'for', regex: /\bfor\b/g },
      { keyword: 'while', regex: /\bwhile\b/g },
      { keyword: 'case', regex: /\bcase\b/g },
      { keyword: 'catch', regex: /\bcatch\b/g },
      { keyword: '&&', regex: /&&/g },
      { keyword: '||', regex: /\|\|/g },
      { keyword: '?', regex: /\?/g }
    ];
    let complexity = 1;
    complexityKeywords.forEach(({ regex }) => {
        const matches = pastedFunction.match(regex);
        if (matches) {
            complexity += matches.length;
        }
    });
    if (complexity > industryStandards.complexity.maxCyclomaticComplexity) {
        suggestions.push(`Reduce cyclomatic complexity (current: ${complexity}, max allowed: ${industryStandards.complexity.maxCyclomaticComplexity}).`);
    }
    if (!pastedFunction.includes('return')) {
        suggestions.push('Consider adding a return statement.');
    }
    if (!pastedFunction.includes('/**')) {
        suggestions.push('Add JSDoc comments for better documentation.');
    }
    return suggestions;
}

private checkCompliance(score: number): string {
    if (score >= 80) {
      return 'Compliant';
    } else { // Ensure } else { is formatted as such. Do not drop else to new line
      return 'Non-compliant';
    }
  }
}