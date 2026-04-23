import { Component, input, linkedSignal, output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.html',
  styleUrl: './search-input.css',
})
export class SearchInput {

  value = output<string>();
  placeholder = input.required<string>();

  initialValue = input<string>();

  inputValue = linkedSignal<string>(() => this.initialValue() || '');
}
