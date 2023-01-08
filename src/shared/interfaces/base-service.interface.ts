export interface IBaseServiceInterface {
  execute(...params: any): Promise<any>;
}
