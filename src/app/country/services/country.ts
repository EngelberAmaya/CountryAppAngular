import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class Country {
  private http = inject(HttpClient);

  searchByCapital(query: string) {
    query = query.toLowerCase().trim();

    return this.http.get(`${API_URL}/capital/${query}`);
  }
}
