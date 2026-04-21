import { Component, inject, resource, signal } from '@angular/core';
import { List } from "../../components/list/list";
import { SearchInput } from "../../components/search-input/search-input";
import { Country } from '../../services/country';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  imports: [List, SearchInput],
  templateUrl: './by-country-page.html',
  styleUrl: './by-country-page.css',
})
export class ByCountryPage {

  countryService = inject(Country);
  query = signal('');

  countryResource = resource({
    params: () => ({ query: this.query() }),
    loader: async({params}) => {

      if(!params.query) return [];

      return await firstValueFrom(
        this.countryService.searchByCountry(params.query)
      );
    }
  });
}
