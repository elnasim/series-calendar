export class BaseService {
  public headers = {};

  public setHeaders(config: any) {
    this.headers = { headers: config };
  }
}
