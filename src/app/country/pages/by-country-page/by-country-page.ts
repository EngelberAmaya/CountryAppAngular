import { Component, inject, signal } from '@angular/core';
import { List } from "../../components/list/list";
import { SearchInput } from "../../components/search-input/search-input";
import { Country } from '../../services/country';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  imports: [List, SearchInput],
  templateUrl: './by-country-page.html',
  styleUrl: './by-country-page.css',
})
export class ByCountryPage {

  countryService = inject(Country);
  query = signal('');

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({params}) => {

      if(!params.query) return of([]);

      return this.countryService.searchByCountry(params.query);
    }
  });
}
