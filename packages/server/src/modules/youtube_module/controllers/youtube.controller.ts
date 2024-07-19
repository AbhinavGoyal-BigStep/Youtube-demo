import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  httpPatch,
  httpPost,
  httpDelete,
  requestParam,
  BaseHttpController,
} from 'inversify-express-utils';

import { YoutubeService } from '../services/youtube.service';
import { YoutubePolicy } from '../policies/youtube.policy';
import { SearchDto, TYPES } from '../types';
import { LogTypes, LoggerFactory } from 'logger';
import { ValidationMiddleware } from '../../../shared/middlewares/validator.middleware';
import {
  idParamValidation,
  postCreate,
  youtubeSearchValidation,
} from '../validators/index.chain';
import { ApiOperationGet, ApiOperationPost, ApiPath } from 'swagger-express-ts';
import openAPI from './youtube.openapi';
import { Redis } from '../../../shared/utils/redis';
import { redis } from '../../../main';

@ApiPath({
  path: '/youtube',
  name: 'Youtube',
  security: { basicAuth: [] },
})
@controller('/youtube')
export class YoutubeController extends BaseHttpController {
  private youtubeService: YoutubeService;
  private youtubePolicy: YoutubePolicy;
  private logger;
  private redis = redis;
  constructor(
    @inject(TYPES.YoutubeService)
    youtubeService: YoutubeService,
    @inject(TYPES.YoutubePolicy)
    youtubePolicy: YoutubePolicy,
    @inject(LogTypes.LoggerFactory) loggerFactory: LoggerFactory
  ) {
    super();
    this.youtubeService = youtubeService;
    this.youtubePolicy = youtubePolicy;
    this.logger = loggerFactory.createLogger('YoutubeController');
  }

  /*
    API to fetch the list of videos from the youtube API
    @param {req}    type - the type of searches (playlist, video, channel) ,
                    maxResults - no. of results (0 - 50),
                    part - the data we get from youtube api(snippet),
                    q - search keywords (array of string),
                    pageToken - page token (used for the next page and previous page)

    @returns list of youtube videos matching the search params
  */
  @httpPost('/search', ValidationMiddleware.validate(youtubeSearchValidation))
  public async searchByPlaylist(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const searchDto: SearchDto = this.youtubePolicy.searchDto(req);
      const cacheKey = `search:${JSON.stringify(searchDto)}`;
      const cacheData = await this.redis.getJSON(cacheKey);

      if (cacheData) {
        return cacheData;
      }

      const searchResult = await this.youtubeService.search(searchDto);
      const result = this.createResponse(searchResult);
      this.redis.setJSON(cacheKey, result);
      return this.json(result, 200);
    } catch (error) {
      next(error);
    }
  }
  /*
    method used to transform the data received from the youtube API
    @param {data}
    @return transformed data
  */
  createResponse(data) {
    return {
      length: data.items.length,
      result: {
        nextPageToken: data.nextPageToken,
        prevPageToken: data.prevPageToken,
        items: data.items.map(item => {
          return {
            title: item.snippet.title,
            description: item.snippet.description,
            channelName: item.snippet.channelTitle,
            publishDate: item.snippet.publishedAt,
            thumbnails: {
              default: item.snippet.thumbnails.default.url,
              medium: item.snippet.thumbnails.medium.url,
              high: item.snippet.thumbnails.high.url,
            },
          };
        }),
      },
    };
  }
}
