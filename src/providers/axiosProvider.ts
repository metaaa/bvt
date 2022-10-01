import axios, {Axios} from 'axios';

class AxiosProvider {
  private client: Axios;

  private connected: boolean = false;

  constructor() {
    if (!this.connected) {
      this.client = axios.create();
      this.connected = true;
    }
  }

  // TODO: set headers
  getClient (): Axios {
    return this.client;
  }
}

export const axiosClient = new AxiosProvider().getClient();
