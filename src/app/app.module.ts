import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EvaluatorComponent } from './evaluator/evaluator.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';

@NgModule({
  declarations: [
    AppComponent,
    EvaluatorComponent,
    SuggestionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}