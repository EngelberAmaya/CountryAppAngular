import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries';
import { map, Observable } from 'rxjs';
import { CountryInterface } from '../interfaces/country-interface';
import { CountryMapper } from '../mappers/country-mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class Country {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<CountryInterface[]> {
    query = query.toLowerCase().trim();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((restCountries) => CountryMapper.mapRestCountryArrayToCountryArray(restCountries))
      )
  }
}
