import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html'
})
export class SuggestionsComponent {
  @Input() suggestions: string[] = [];
}