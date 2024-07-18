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

  // createDto(req: Request): CreateDto {
  //   const dto = {};

  //   return dto;
  // }

  // updateDto(req: Request): UpdateDto {
  //   return this.createDto(req);
  // }

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
