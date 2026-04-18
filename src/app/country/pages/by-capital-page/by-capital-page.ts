import { Component, inject, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { List } from '../../components/list/list';
import { Country } from '../../services/country';
import { CountryInterface } from '../../interfaces/country-interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, List],
  templateUrl: './by-capital-page.html',
  styleUrl: './by-capital-page.css',
})
export class ByCapitalPage {

  isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<CountryInterface[]>([]);

  countryService = inject(Country);

  onSearch(query: string) {

    if(this.isLoading()) return;

    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService.searchByCapital(query).subscribe({
      next: (countries) => {
        this.isLoading.set(false);
        this.countries.set(countries);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.isError.set(err);
        this.countries.set([]);
      }
    })
  }
}
