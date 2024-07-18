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
  // @httpPost('/', ValidationMiddleware.validate(postCreate))
  // public async create(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const dto = this.youtubePolicy.createDto(req);
  //     const result = await this.youtubeService.create(dto);
  //     return this.json(result, 200);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // @httpPatch('/:id', ValidationMiddleware.validate(idParamValidation))
  // public async update(
  //   @requestParam('id') id: string,
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   try {
  //     const dto = this.youtubePolicy.updateDto(req);
  //     const result = await this.youtubeService.update(id, dto);

  //     return this.json(result, 200);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // @httpGet('/:id', ValidationMiddleware.validate(idParamValidation))
  // public async getById(
  //   @requestParam('id') id: string,
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   try {
  //     const result = await this.youtubeService.findById(id);

  //     return this.json(result, 200);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // @httpDelete('/:id', ValidationMiddleware.validate(idParamValidation))
  // public async delete(
  //   @requestParam('id') id: string,
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   try {
  //     const result = await this.youtubeService.delete(id);

  //     return res.status(200).json(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
