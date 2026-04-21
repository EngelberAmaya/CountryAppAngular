import { Component, input } from '@angular/core';
import { CountryInterface } from '../../interfaces/country-interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [ DecimalPipe ],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {

  noImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
  // countries = input.required<CountryInterface[]>();
  countries = input<CountryInterface[]>();
}
