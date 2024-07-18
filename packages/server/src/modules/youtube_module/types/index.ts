export const TYPES = {
  YoutubeController: Symbol.for('YoutubeController'),
  YoutubeService: Symbol.for('YoutubeService'),
  YoutubePolicy: Symbol.for('YoutubePolicy'),
  YoutubeRepository: Symbol.for('YoutubeRepository'),
  AxiosService: Symbol.for('AxiosService'), // ??
};

// export interface CreateDto {}

// export type UpdateDto = Partial<CreateDto>;

export interface SearchDto {
  type: string;
  q: string[];
  maxResults: string;
  part: string;
  pageToken?: string;
}

export enum searchParameters {
  'channel',
  video,
  playlist,
}
