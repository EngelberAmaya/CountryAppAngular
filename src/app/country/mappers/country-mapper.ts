import { CountryInterface } from "../interfaces/country-interface";
import { RESTCountry } from "../interfaces/rest-countries";

export class CountryMapper {

  static mapRestCountryToCountry(restCountry: RESTCountry['data']['objects'][0]): CountryInterface {

    const spanishName = restCountry.names?.translations?.['spa']?.common
      ?? restCountry.names?.common
      ?? 'No Spanish name';

    const spanishLanguage = restCountry.languages?.find(language => language.bcp47 === 'spa')?.name
      ?? restCountry.languages?.[0]?.name
      ?? 'No language available';

    return {
      cca2: restCountry.codes.alpha_2,
      cca3: restCountry.codes.alpha_3,
      languages: spanishLanguage,
      coatOfArmsSvg: restCountry.flag.url_png ?? '',
      flagSvg: restCountry.flag.url_svg ?? '',
      name: spanishName,
      capital: restCountry.capitals.filter((capital) => capital.attributes.primary)
        .map((capital) => capital.name).join(', ') || 'No capital',
      population: restCountry.population,
      region: restCountry.region ?? 'No region',
      subRegion: restCountry.subregion ?? 'No subregion'
    }
  }

  static mapRestCountryArrayToCountryArray(restCountry: RESTCountry): CountryInterface[] {
    return restCountry.data.objects.map((obj) => CountryMapper.mapRestCountryToCountry(obj));
  }
}
