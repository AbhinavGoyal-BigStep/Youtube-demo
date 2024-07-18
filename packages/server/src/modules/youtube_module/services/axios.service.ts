import { injectable } from 'inversify';
import axios from 'axios';

@injectable()
export class AxiosService {
  constructor() {}

  async get(url: string, params: any) {
    const result = await axios.get(url, { params });
    return result;
  }
}
