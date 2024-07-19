import { YoutubeService } from '../services/youtube.service';
import { YoutubePolicy } from '../policies/youtube.policy';
import { Redis } from '../../../shared/utils/redis';
import { AxiosService } from '../services/axios.service';

// ?? why do we mock the servers
jest.mock('../services/youtube.service');
jest.mock('../policies/youtube.policy');
jest.mock('../../../shared/utils/redis');
jest.mock('');

describe('Search list of youtube', () => {
  let youtubeService: YoutubeService;
  let youtubePolicy: YoutubePolicy;
  let redis: Redis;
  beforeEach(() => {
    redis = new Redis();
    youtubePolicy = new YoutubePolicy();
    youtubeService = new YoutubeService();
  });
});
