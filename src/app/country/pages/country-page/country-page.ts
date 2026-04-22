import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../../services/country';
import { rxResource } from '@angular/core/rxjs-interop';
import { NotFound } from '../../../shared/components/not-found/not-found';
import { CountryInformation } from './country-information/country-information';

@Component({
  selector: 'app-country-page',
  imports: [NotFound, CountryInformation],
  templateUrl: './country-page.html',
  styleUrl: './country-page.css',
})
export class CountryPage {

  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(Country);

  countryResource = rxResource({
    params: () => ({ code: this.countryCode }),
    stream: ({params}) => {
      return this.countryService.searchCountryByAlphaCode(params.code);
    }
  })
}
