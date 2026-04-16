import { CountryInterface } from "../interfaces/country-interface";
import { RESTCountry } from "../interfaces/rest-countries";

export class CountryMapper {

  static mapRestCountryToCountry(restCountry: RESTCountry): CountryInterface {
    return {
      cca2: restCountry.cca2,
      coatOfArmsSvg: restCountry.coatOfArms.svg,
      flagSvg: restCountry.flags.svg,
      name: restCountry.name.common,
      capital: restCountry.capital.join(', '),
      population: restCountry.population
    }
  }

  static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[]): CountryInterface[] {
    return restCountries.map(this.mapRestCountryToCountry);
  }
}
