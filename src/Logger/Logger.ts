import { type ILogger } from "./ILogger";

export class Logger implements ILogger {
  constructor(private readonly componentName: string) {}

  log(message: string): void {
    console.log(`LOG: ${this.componentName} -- ${message}`);
  }

  error(message: string): void {
    console.log(`ERROR: ${this.componentName} -- ${message}`);
  }

  logMap(map: Map<any, any>): void {
    for (const [key, value] of map.entries()) {
      console.log(`Key: ${key}, Value: ${value}`);
    }
  }
}
