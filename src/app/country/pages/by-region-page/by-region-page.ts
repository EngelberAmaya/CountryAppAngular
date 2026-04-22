import { Component, inject, signal } from '@angular/core';
import { List } from "../../components/list/list";
import { Country } from '../../services/country';
import { Region } from '../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

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

  selectedRegion = signal<Region | null>(null);

  countryResource = rxResource({
    params: () => ({ region: this.selectedRegion() }),
    stream: ({params}) => {

      if(!params.region) return of([]);

      return this.countryService.searchByRegion(params.region);
    }
  });

}
