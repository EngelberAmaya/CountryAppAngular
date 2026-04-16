import { Component, input } from '@angular/core';
import { RESTCountry } from '../../interfaces/rest-countries';
import { CountryInterface } from '../../interfaces/country-interface';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {
  countries = input.required<CountryInterface[]>();
}
