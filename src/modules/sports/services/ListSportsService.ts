import { axiosClient } from '@providers/axiosProvider';
import { getApiUrlByLanguage } from '@providers/apiProvider';
import redisCache from '@providers/redisProvider';
import { VALID_APP_LANGUAGES } from '@consts/appConsts';

type ParsedObject = {
  [key: string]: any;
  pos: number;
};

/**
 * Returns sports by language (returns all languages if lang not set) sorted by 'pos' key
 */
export const listSports = async (language: string|null) => {
  let languagesToUse: Array<string> = [];
  if (!language) {
    languagesToUse = Object.values(VALID_APP_LANGUAGES);
  } else {
    languagesToUse.push(language);
  }

  try {
    return Promise.all(languagesToUse.map(async (languageToUse: string) => {
      const sportsCacheKey = `sports-${languageToUse}`;
      const hasCache = await redisCache.getItem(sportsCacheKey);
      if (hasCache) {
        return {
          language: languageToUse,
          sports: JSON.parse(await redisCache.getItem(sportsCacheKey) as string),
        }
      }

      const apiUrl = getApiUrlByLanguage(languageToUse);
      const {data: {result: {sports}}} = await axiosClient.get(apiUrl);

      const sortedData = {
          ...sports
            .sort((a: ParsedObject, b: ParsedObject) => a.pos.toString()
              .localeCompare(b.pos.toString(), 'en', { numeric: true })
            ),
      };

      await redisCache.setItem(sportsCacheKey, JSON.stringify(sortedData));

      return {
        language: languageToUse,
        sports: { ...sports },
      };
    }));
  } catch (e) {
    console.error(e);
  }
}
