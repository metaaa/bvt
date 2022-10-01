import { Request, Response } from 'express';
import { VALID_APP_LANGUAGES } from '@consts/appConsts';
import { listEvents } from "@modules/events/services/ListEventsService";

export default class EventController {
  /**
   * List all events by the given sport id
   *
   * @param request
   * @param response
   */
  public async index(request: Request, response: Response): Promise<Response> {
    const apiLanguage: string|null = request.query?.lang as string || VALID_APP_LANGUAGES.en;
    const { sportId } = request.params;

    return response.json(await listEvents(sportId, apiLanguage));
  }
}
