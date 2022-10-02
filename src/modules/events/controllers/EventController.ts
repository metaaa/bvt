import { Request, Response } from 'express';
import { listAllEvents } from '@modules/events/services/ListAllEventsService';
import { getEventById } from '@modules/events/services/GetEventByIdService';
import { isNumeric } from '@helpers/dataHelper';
import { VALID_APP_LANGUAGES } from "@consts/appConsts";

export default class EventController {
  /**
   * Returns all data for requested event
   *
   * @param request
   * @param response
   */
  public async index(request: Request, response: Response): Promise<Response> {
    const apiLanguage: string|null = request.query?.lang as string || null;
    const { eventId } = request.params;

    if (!apiLanguage) {
      return response.status(400).json({
        status: 400,
        message: `Bad request: at least one language must be specified by query.`,
      });
    } else if (!Object.values(VALID_APP_LANGUAGES).includes(apiLanguage)) {
      return response.status(400).json({
        status: 400,
        message: `Bad request: invalid language given.`,
      });
    } else if (!isNumeric(eventId)) {
      return response.status(400).json({
        status: 400,
        message: `Bad request: invalid id given.`,
      });
    }

    return response.status(200).json(await getEventById(apiLanguage, Number.parseInt(eventId)));
  }

  /**
   * List all events.
   * If sportId is specified only events of the given sportId will be listed.
   *
   * @param request
   * @param response
   */
  public async listAll(request: Request, response: Response): Promise<Response> {
    const apiLanguage: string|null = request.query?.lang as string || null;
    const groupEvents = request.query['group-events'] as string || null;
    const shouldGroupBySportId = groupEvents === 'yes'

    if (!apiLanguage) {
      return response.status(400).json({
        status: 400,
        message: `Bad request: at least one language must be specified by query.`,
      });
    } else if (!Object.values(VALID_APP_LANGUAGES).includes(apiLanguage)) {
      return response.status(400).json({
        status: 400,
        message: `Bad request: invalid language given.`,
      });
    }

      return response.status(200).json(await listAllEvents(apiLanguage, shouldGroupBySportId));
  }
}
