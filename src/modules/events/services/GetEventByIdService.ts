import redisCache from '@providers/redisProvider';
import { listAllEvents } from '@modules/events/services/ListAllEventsService';
import { EVENTS_TTL } from '@consts/cacheConsts';

/**
 * Returns all event data for the given event id
 *
 * @param language
 * @param eventId
 */
export const getEventById = async (language: string, eventId: number): Promise<Array<any>> => {
  const singleEventCacheKey = `event-${eventId}-${language}`;

  const eventData: string|null = await redisCache.getItem(singleEventCacheKey);

  if (eventData) {
    return JSON.parse(eventData);
  }

  const eventsList: Array<any> = await listAllEvents(language, false);
  const singleEvent = eventsList.filter((event) => event.id === eventId);

  try {
    await redisCache.setItem(singleEventCacheKey, JSON.stringify(singleEvent), EVENTS_TTL);
  } catch (e) {
    console.error(e);
  }

  return singleEvent;
}
