export interface BaseControllerInterface {
  handle(...params: any[]): Promise<any> | any;
}
