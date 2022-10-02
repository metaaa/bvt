import axios, {Axios} from 'axios';

class AxiosProvider {
  /**
   * Axios client instance
   *
   * @private
   */
  private client: Axios;

  /**
   * Whether there is an active connection
   *
   * @private
   */
  private connected: boolean = false;

  constructor() {
    if (!this.connected) {
      this.client = axios.create({
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
        },
      });
      this.connected = true;
    }
  }

  /**
   * Returns the active client
   */
  getClient (): Axios {
    return this.client;
  }
}

export const axiosClient = new AxiosProvider().getClient();
