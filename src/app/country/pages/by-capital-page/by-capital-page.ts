import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { List } from '../../components/list/list';
import { Country } from '../../services/country';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, List],
  templateUrl: './by-capital-page.html',
  styleUrl: './by-capital-page.css',
})
export class ByCapitalPage {

  countryService = inject(Country);
  query = signal('');

  countryResource = resource({
    params: () => ({ query: this.query() }),
    loader: async({params}) => {

      if(!params.query) return [];

      return await firstValueFrom(
        this.countryService.searchByCapital(params.query)
      );
    }
  });
}
