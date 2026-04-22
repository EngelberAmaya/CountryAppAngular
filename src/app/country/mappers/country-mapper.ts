import { CountryInterface } from "../interfaces/country-interface";
import { RESTCountry } from "../interfaces/rest-countries";

export class CountryMapper {

  static mapRestCountryToCountry(restCountry: RESTCountry): CountryInterface {

    const spanishName = restCountry.translations?.['spa']?.common
      ?? restCountry.name?.common
      ?? 'No Spanish name';

    const spanishLanguage = restCountry.languages?.['spa']
      ?? Object.values(restCountry.languages ?? {})[0]
      ?? 'No language available';

    return {
      cca2: restCountry.cca2,
      cca3: restCountry.cca3,
      languages: spanishLanguage,
      coatOfArmsSvg: restCountry.coatOfArms?.svg ?? '',
      flagSvg: restCountry.flags?.svg ?? '',
      name: spanishName,
      capital: restCountry.capital?.length > 0 ? restCountry.capital.join(', ') : 'No capital',
      population: restCountry.population,
      region: restCountry.region ?? 'No region',
      subRegion: restCountry.subregion ?? 'No subregion'
    }
  }

  static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[]): CountryInterface[] {
    return restCountries.map(this.mapRestCountryToCountry);
  }
}
