import { DecimalPipe, Location } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { CountryInterface } from '../../../interfaces/country-interface';

@Component({
  selector: 'app-country-information',
  imports: [DecimalPipe ],
  templateUrl: './country-information.html',
  styleUrl: './country-information.css',
})
export class CountryInformation {
  private location = inject(Location);

  country = input.required<CountryInterface>();

  currentYear = computed(() => new Date().getFullYear());

  goBack() {
    this.location.back();
  }
}
