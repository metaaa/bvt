import redisCache from '@providers/redisProvider';
import { sortDataByPos } from '@helpers/dataHelper';
import { EVENTS_TTL } from '@consts/cacheConsts';
import { listSports } from "@modules/sports/services/ListSportsService";

/**
 * Returns events by language sorted by 'pos' key
 * If grouping is true, returns a structured data instead of array of events
 */
export const listAllEvents = async (language: string, shouldGroupEvents: boolean): Promise<any> => {
  const eventsCacheKey = shouldGroupEvents
    ? `events-grouped-${language}`
    : `events-${language}`;

  const eventsData: string|null = await redisCache.getItem(eventsCacheKey);

  if (eventsData) {
    return JSON.parse(eventsData);
  }

  const sports : Array<any> = await listSports(language);

  let eventsToUse: any;
  if (shouldGroupEvents) {
    // list all events grouped by sports_id - structured
    let structuredData: any = {};
    sports.forEach((sport: any) => {
      sport.comp.forEach((competition: any) => {
        competition.events.forEach((event: any) => {
          if (!structuredData[event.sport_id]) {
            structuredData[event.sport_id] = [event];
          }
          structuredData[event.sport_id] = [
            ...structuredData[event.sport_id],
            event
          ];
        })
      })
    });

    // sort by position key
    Object.keys(structuredData).forEach((dataKey) => {
      structuredData[dataKey] = sortDataByPos(structuredData[dataKey]);
    });

    eventsToUse = structuredData;
  } else {
    // list all events - unstructured
    eventsToUse = [];
    sports.forEach((sport: any) => {
      sport.comp.forEach((competition: any) => {
        eventsToUse = [
          ...eventsToUse,
          ...competition.events,
        ];
      });
    });

    // sort by position key
    eventsToUse = sortDataByPos(eventsToUse);
  }

  try {
    await redisCache.setItem(eventsCacheKey, JSON.stringify(eventsToUse), EVENTS_TTL);
  } catch (e) {
    console.error(e);
  }

  return eventsToUse;
}
