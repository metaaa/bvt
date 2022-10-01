import {API_LOCALES, VALID_APP_LANGUAGES} from '../consts/appConsts'

class ApiProvider {
  /**
   * Returns the api url by the provided language
   *
   * @param language
   */
  getApiUrlByLocale (language: string): string {
    const localeToUse: string = Object.keys(VALID_APP_LANGUAGES).includes(language) // @ts-ignore
      ? API_LOCALES[language]
      : VALID_APP_LANGUAGES.en;
    return `https://partners.betvictor.mobi/${localeToUse}/in-play/1/events`
  }
}

export const getApiUrlByLanguage = (language: string) => new ApiProvider().getApiUrlByLocale(language);
