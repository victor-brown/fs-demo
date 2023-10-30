import { Logger } from "../Logger/Logger";
import { type IFileSystem } from "./IFileSytem";
import md5 from "md5";

export class FS implements IFileSystem {
  private readonly contentMap: Map<string, string>;
  private readonly fileToContentMap: Map<string, string>;
  private readonly logger = new Logger(FS.name);

  constructor() {
    this.contentMap = new Map();
    this.fileToContentMap = new Map();
  }

  log(): void {
    this.logger.log("contentMap:");
    this.logger.logMap(this.contentMap);

    console.log("");

    this.logger.log("fileToContentMap:");
    this.logger.logMap(this.fileToContentMap);
  }

  store(filename: string, content: string): void {
    const hashedContent = this.getHashedContent(content);

    if (!this.contentMap.has(hashedContent)) {
      this.contentMap.set(hashedContent, content);
      this.logger.log(`"${content}", has been saved as: "${hashedContent}"`);
    } else {
      this.logger.log(`"${content}", already exists as: "${hashedContent}"`);
    }

    this.fileToContentMap.set(filename, hashedContent);
    this.logger.log(`"${filename}", has been assigned to: "${hashedContent}"`);
  }

  get(filename: string): string {
    if (!this.fileToContentMap.has(filename)) {
      throw new Error(`Failed to found file with "${filename}" name`);
    }

    const hashedContent = this.fileToContentMap.get(filename) as string;
    this.logger.log(
      `Successfully found "${hashedContent}" key for "${filename}"`,
    );

    if (!this.contentMap.has(hashedContent)) {
      throw new Error(
        `Could not found content for "${filename}" with "${hashedContent}" key`,
      );
    }
    return this.contentMap.get(hashedContent) as string;
  }

  private getHashedContent(content: string): string {
    return md5(content);
  }
}
