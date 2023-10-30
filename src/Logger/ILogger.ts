export interface ILogger {
  log: (message: string) => void;
  error: (message: string) => void;
  logMap: (map: Map<any, any>) => void;
}
