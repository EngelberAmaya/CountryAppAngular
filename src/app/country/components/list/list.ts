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

  noImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
  countries = input.required<CountryInterface[]>();
}
