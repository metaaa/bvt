import redisCache from '@providers/redisProvider';
import { axiosClient } from '@providers/axiosProvider';
import { getApiUrlByLanguage } from "@providers/apiProvider";
import { VALID_APP_LANGUAGES } from "@consts/appConsts";

type ParsedObject = {
  [key: string]: any;
  pos: number;
};

/**
 * Returns events by language (returns all languages if lang not set) sorted by 'pos' key
 */
export const listEvents = async (language: string, sportId: string) => {
  const languageToUse: string = language || VALID_APP_LANGUAGES.en;
}
