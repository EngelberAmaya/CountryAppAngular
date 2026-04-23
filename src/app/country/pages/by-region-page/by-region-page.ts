import { Component, inject, linkedSignal, signal } from '@angular/core';
import { List } from "../../components/list/list";
import { Country } from '../../services/country';
import { Region } from '../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-region-page',
  imports: [List],
  templateUrl: './by-region-page.html',
  styleUrl: './by-region-page.css',
})
export class ByRegionPage {

  countryService = inject(Country);
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  queryParam = (this.activatedRoute.snapshot.queryParamMap.get('region') || '') as Region;

  selectedRegion = linkedSignal<Region | null>(() => this.queryParam ?? 'Americas');

  countryResource = rxResource({
    params: () => ({ region: this.selectedRegion() }),
    stream: ({params}) => {

      if(!params.region) return of([]);

      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: params.region
        }
      });

      return this.countryService.searchByRegion(params.region);
    }
  });

}
