import { Component, inject, linkedSignal } from '@angular/core';
import { List } from "../../components/list/list";
import { SearchInput } from "../../components/search-input/search-input";
import { Country } from '../../services/country';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [List, SearchInput],
  templateUrl: './by-country-page.html',
  styleUrl: './by-country-page.css',
})
export class ByCountryPage {

  countryService = inject(Country);
  activatedRoute = inject(ActivatedRoute);

  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') || '';

  query = linkedSignal(() => this.queryParam);

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({params}) => {

      if(!params.query) return of([]);

      this.router.navigate(['/country/by-country'], {
        queryParams: {
          query: params.query
        }
      });

      return this.countryService.searchByCountry(params.query);
    }
  });
}
