import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { CountryInterface } from '../interfaces/country-interface';
import { CountryMapper } from '../mappers/country-mapper';
import { Region } from '../interfaces/region.type';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Country {

  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, CountryInterface[]>();
  private queryCacheCountry = new Map<string, CountryInterface[]>();
  private queryCacheRegion = new Map<Region, CountryInterface[]>();

  searchByCapital(query: string): Observable<CountryInterface[]> {
    query = query.toLowerCase().trim();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http.get<RESTCountry>(`${environment.API_URL}/capitals?q=${query}`,
      { headers: { 'Authorization': `Bearer ${environment.API_KEY}` } }
    )
      .pipe(
        map((restCountries) => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        tap((countries) => this.queryCacheCapital.set(query, countries)),
        catchError(error => {
          console.log('Error fetching', error);
          return throwError(() => new Error(`No se pudo obtener países con esa capital: ${query}`));
        })
      )
  }

  searchByCountry(query: string): Observable<CountryInterface[]> {
    query = query.toLowerCase().trim();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    return this.http.get<RESTCountry>(`${environment.API_URL}/names.common/${query}`,
      { headers: { 'Authorization': `Bearer ${environment.API_KEY}` } }
    )
      .pipe(
        map((restCountries) => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        tap((countries) => this.queryCacheCountry.set(query, countries)),
        delay(1000),
        catchError(error => {
          console.log('Error fetching', error);
          return throwError(() => new Error(`No se pudo obtener el país con ese nombre: ${query}`));
        })
      )
  }

  searchCountryByAlphaCode(code: string) {

    return this.http.get<RESTCountry>(`${environment.API_URL}/codes.alpha_2/${code}`,
      { headers: { 'Authorization': `Bearer ${environment.API_KEY}` } }
    )
      .pipe(
        map((restCountries) => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        map((countries) => countries.at(0)),
        delay(500),
        catchError(error => {
          console.log('Error fetching', error);
          return throwError(() => new Error(`No se pudo obtener el país con ese código: ${code}`));
        })
      )
  }

  searchByRegion(region: Region) {

    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }

    return this.http.get<RESTCountry>(`${environment.API_URL}?region=${region}`,
      { headers: { 'Authorization': `Bearer ${environment.API_KEY}` } }
    )
      .pipe(
        map((restCountries) => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        tap((countries) => this.queryCacheRegion.set(region, countries)),
        catchError(error => {
          console.log('Error fetching', error);
          return throwError(() => new Error(`No se pudo obtener los países con la región: ${region}`));
        })
      )
  }

}
