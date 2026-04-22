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

  noImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'

  goBack() {
    this.location.back();
  }
}
