import { CountryInterface } from "../interfaces/country-interface";
import { RESTCountry } from "../interfaces/rest-countries";

export class CountryMapper {

  static mapRestCountryToCountry(restCountry: RESTCountry): CountryInterface {
    return {
      cca2: restCountry.cca2,
      cca3: restCountry.cca3,
      area: restCountry.area,
      languages: restCountry.languages.spa ?? 'No Spanish language',
      maps: restCountry.maps.openStreetMaps,
      coatOfArmsSvg: restCountry.coatOfArms.svg,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No Spanish name',
      capital: restCountry.capital?.length > 0 ? restCountry.capital.join(', ') : 'No capital',
      population: restCountry.population,
      region: restCountry.region,
      subRegion: restCountry.subregion
    }
  }

  static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[]): CountryInterface[] {
    return restCountries.map(this.mapRestCountryToCountry);
  }
}
