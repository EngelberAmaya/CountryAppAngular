import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries';
import { catchError, map, Observable, throwError } from 'rxjs';
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
        map((restCountries) => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        catchError(error => {
          console.log('Error fetching', error);
          return throwError(() => new Error(`No se pudo obtener países con ese query ${query}`));
        })
      )
  }

  searchByCountry(query: string): Observable<CountryInterface[]> {
    query = query.toLowerCase().trim();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map((restCountries) => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        catchError(error => {
          console.log('Error fetching', error);
          return throwError(() => new Error(`No se pudo obtener el país con ese nombre ${query}`));
        })
      )
  }
}
