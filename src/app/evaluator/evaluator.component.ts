import { Component } from '@angular/core';
import { EvaluatorService } from './evaluator.service';
import { EvaluationResult } from '../models/evaluation-result';

@Component({
  selector: 'app-evaluator',
  templateUrl: './evaluator.component.html',
  styleUrls: ['./evaluator.component.css']
})
export class EvaluatorComponent {
  functionInput: string = '';
  evaluationResult: EvaluationResult | null = null;
  showResult: boolean = false;

  constructor(private evaluatorService: EvaluatorService) {}

  evaluateFunction() {
    this.evaluationResult = this.evaluatorService.evaluate(this.functionInput);
    this.showResult = true;
    document.body.style.overflow = 'hidden'; // Prevent scroll
  }

  closeResult() {
    this.showResult = false;
    this.functionInput = '';
    this.evaluationResult = null;
    document.body.style.overflow = ''; // Restore scroll
  }

  approveEdit() {
    // You can implement your logic here, e.g., save or mark as approved
    alert('Function edit approved!');
  }
}