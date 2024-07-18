import { inject, injectable } from 'inversify';
import { YoutubeRepository } from '../repositories/youtube.repository';
import { SearchDto, TYPES } from '../types';
import { SEARCH_URL, API_KEY } from '../helpers/utils';
import { AxiosService } from './axios.service';

@injectable()
export class YoutubeService {
  private youtubeRepository: YoutubeRepository;
  private axiosService: AxiosService;
  constructor(
    @inject(TYPES.YoutubeRepository)
    youtubeRepository: YoutubeRepository,
    @inject(TYPES.AxiosService) // ??
    axiosService: AxiosService
  ) {
    this.youtubeRepository = youtubeRepository;
    this.axiosService = axiosService;
  }

  async search(searchDto: SearchDto) {
    const result = await this.axiosService.get(SEARCH_URL, {
      ...searchDto,
      key: API_KEY,
    });
    return result.data;
  }

  // async create(dto: CreateDto) {
  //   return await this.youtubeRepository.create(dto);
  // }

  // async findById(id: string) {
  //   return await this.youtubeRepository.findById(id);
  // }

  // async update(id: string, dto: UpdateDto) {
  //   return await this.youtubeRepository.update(id, dto);
  // }

  // async delete(id: string) {
  //   return await this.youtubeRepository.delete(id);
  // }
}
