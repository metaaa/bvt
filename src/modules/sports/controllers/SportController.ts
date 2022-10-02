import { Request, Response } from 'express';
import { listSports } from '../services/ListSportsService'
import { VALID_APP_LANGUAGES } from "@consts/appConsts";

export default class SportController {
  /**
   * List all sports by the given language
   *
   * @param request
   * @param response
   */
  public async index(request: Request, response: Response): Promise<Response> {
    const apiLanguage: string|null = request.query?.lang as string || null;

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
    } else if (Object.keys(request.query).length > 1) {
      return response.status(400).json({
        status: 400,
        message: `Bad request: api doesn't support any additional query parameter, but language.`,
      });
    }

    return response.status(200).json({
      language: apiLanguage,
      sports: await listSports(apiLanguage),
    });
  }

  /**
   * List all sports in all languages
   *
   * @param request
   * @param response
   */
  public async listAll(request: Request, response: Response): Promise<Response> {
    if (Object.keys(request.query).length !== 0) {
      return response.status(400).json({
        status: 400,
        message: `Bad request: api doesn't support any additional query parameter.`
      });
    }

    const ret: Array<any> = await Promise.all(Object.values(VALID_APP_LANGUAGES).map(async (language) => ({
      language,
      sports: await listSports(language),
    })));

    return response.status(200).json(ret);
  }
}
