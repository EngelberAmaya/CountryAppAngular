import { Component, inject, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { List } from '../../components/list/list';
import { Country } from '../../services/country';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, List],
  templateUrl: './by-capital-page.html',
  styleUrl: './by-capital-page.css',
})
export class ByCapitalPage {

  countryService = inject(Country);
  query = signal('');

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({params}) => {

      if(!params.query) return of([]);

      return this.countryService.searchByCapital(params.query);
    }
  });
}
