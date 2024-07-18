import { ContainerModule } from 'inversify';
import { YoutubeService } from './services/youtube.service';
import { TYPES } from './types';
import { YoutubePolicy } from './policies/youtube.policy';
import { YoutubeRepository } from './repositories/youtube.repository';
import { YoutubeController } from './controllers/youtube.controller';
import { AxiosService } from './services/axios.service';

const youtubeModule = new ContainerModule((bind): void => {
  bind<YoutubeController>(TYPES.YoutubeController).to(YoutubeController);
  bind<YoutubeService>(TYPES.YoutubeService)
    .to(YoutubeService)
    .inSingletonScope();
  bind<YoutubePolicy>(TYPES.YoutubePolicy).to(YoutubePolicy).inSingletonScope();
  bind<YoutubeRepository>(TYPES.YoutubeRepository)
    .to(YoutubeRepository)
    .inSingletonScope();
  bind<AxiosService>(TYPES.AxiosService).to(AxiosService).inSingletonScope();
});

export { youtubeModule };
