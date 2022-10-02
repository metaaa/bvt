import redisCache from '@providers/redisProvider';
import { axiosClient } from '@providers/axiosProvider';
import { getApiUrlByLanguage } from '@providers/apiProvider';
import { sortDataByPos } from '@helpers/dataHelper';
import { SPORTS_TTL } from '@consts/cacheConsts';

/**
 * Returns sports by language (returns all languages if lang not set) sorted by 'pos' key
 */
export const listSports = async (language: string): Promise<any> => {
    const sportsCacheKey = `sports-${language}`;
    const sportsData: string|null = await redisCache.getItem(sportsCacheKey);

    if (sportsData) {
      return JSON.parse(sportsData);
    }

    const apiUrl = getApiUrlByLanguage(language);

    try {
      const { data: { result: { sports } } } = await axiosClient.get(apiUrl);
      const sortedData = sortDataByPos(sports);
      await redisCache.setItem(sportsCacheKey, JSON.stringify(sortedData), SPORTS_TTL);

      return sortedData;
    } catch (e) {
      console.error(e);
    }
}
