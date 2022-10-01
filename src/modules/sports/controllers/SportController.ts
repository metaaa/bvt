import { Request, Response } from 'express';
import { listSports } from '../services/ListSportsService'
import {VALID_APP_LANGUAGES} from '../../../consts/appConsts';

export default class SportController {
  /**
   * List all sports by the given language
   *
   * @param request
   * @param response
   */
  public async index(request: Request, response: Response): Promise<Response> {
    const apiLanguage: string|null = request.query?.lang as string || VALID_APP_LANGUAGES.en;

    return response.json(await listSports(apiLanguage));
  }

  /**
   * List all sports in all languages
   *
   * @param request
   * @param response
   */
  public async listAll(request: Request, response: Response): Promise<Response> {
    return response.json(await listSports(null));
  }
}
