import { Component } from '@angular/core';
import { List } from "../../components/list/list";
import { SearchInput } from "../../components/search-input/search-input";

@Component({
  selector: 'app-by-country-page',
  imports: [List, SearchInput],
  templateUrl: './by-country-page.html',
  styleUrl: './by-country-page.css',
})
export class ByCountryPage {

}
