import { Component, inject, linkedSignal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { List } from '../../components/list/list';
import { Country } from '../../services/country';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, List],
  templateUrl: './by-capital-page.html',
  styleUrl: './by-capital-page.css',
})
export class ByCapitalPage {

  countryService = inject(Country);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') || '';

  query = linkedSignal(() => this.queryParam);

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({params}) => {

      if(!params.query) return of([]);

      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: params.query
        }
      });

      return this.countryService.searchByCapital(params.query);
    }
  });
}
