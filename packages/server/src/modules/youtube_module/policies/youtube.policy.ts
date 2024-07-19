import { Request } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES, SearchDto } from '../types';
import { YoutubeRepository } from '../repositories/youtube.repository';

@injectable()
export class YoutubePolicy {
  private youtubeRepository: YoutubeRepository;
  constructor(
    @inject(TYPES.YoutubeRepository)
    youtubeRepository: YoutubeRepository
  ) {
    this.youtubeRepository = youtubeRepository;
  }

  /*
    method used to transform the req data in the required format
    @param {req}
    @return the required format of request
  */

  searchDto(req: Request): SearchDto {
    const body = req.body;
    const data: SearchDto = {
      part: body.part,
      type: body.type,
      q: body.q.join('|'),
      maxResults: body.maxResults,
    };
    if (body.pageToken) {
      data.pageToken = body.pageToken;
    }
    return data;
  }
}
